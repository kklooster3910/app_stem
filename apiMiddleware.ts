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
  };
};

let currentPage: number;

async function getPhotosMiddleware({
  searchTerm,
  // endOfPages,
  reset,
}: {
  searchTerm: string;
  endOfPages: boolean;
  reset: boolean;
}) {
  // if (endOfPages) return {};

  let formattedPhotos = [],
    pagesLeft,
    totalPhotos,
    timeStamp = 0;

  if (!currentPage || reset) currentPage = 1;

  if (searchTerm) {
    const {
      status,
      data: { results, total, total_pages: totalPages },
    } = await axios.get("/api/searchPhotos", {
      params: {
        searchTerm,
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

  console.log("INSIDE MIDDLEWARE -- before return");
  console.log({ searchTerm, currentPage });

  // make sure you re-evaluate this and only return to the front end what it needs
  // return { formattedPhotos, pagesLeft, totalPhotos, currentPage, timeStamp };
  return { formattedPhotos, pagesLeft, timeStamp };
}

export { getPhotosMiddleware };
