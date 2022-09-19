import axios from "axios";

export type FormattedPhoto = {
  height: number;
  width: number;
  id: string;
  urls: {
    full: string;
    raw: string;
    small: string;
    regular: string;
    thumb: string;
  };
};

let currentPage: number, previousSearch: string | undefined;

async function getPhotosMiddleware({
  searchTerm,
  reset,
}: {
  searchTerm: string;
  reset: boolean;
}) {
  let formattedPhotos = [],
    pagesLeft,
    totalPhotos,
    timeStamp = 0;

  if (!currentPage || reset) currentPage = 1;

  if (searchTerm || previousSearch) {
    const {
      status,
      data: { results, total, total_pages: totalPages },
    } = await axios.get("/api/searchPhotos", {
      params: {
        searchTerm: searchTerm || previousSearch,
        currentPage,
      },
    });
    if (status !== 200)
      throw new Error("searchPhotos failed: check console logs");

    // set timestamp to current date after successful return
    timeStamp = Date.now();
    pagesLeft = totalPages - currentPage;
    currentPage = totalPages - pagesLeft + 1;
    totalPhotos = total;

    // set previousSearch so if input is cleared pagination works
    previousSearch = searchTerm;

    // return id for unique react key
    formattedPhotos = results.map(
      ({ height, width, id, urls }: FormattedPhoto) => ({
        height,
        width,
        id,
        urls,
      })
    );
  }

  return { formattedPhotos, pagesLeft, timeStamp };
}

export { getPhotosMiddleware };
