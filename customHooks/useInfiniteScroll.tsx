import { useEffect, Dispatch, SetStateAction } from "react";

import { FormattedPhoto } from "../apiMiddleware";

import { submitForm } from "../pages/utils";

type FormattedPhotos = [FormattedPhoto] | [];

type UseInfiniteScroll = {
  currentScrollHeight: number;
  photos: FormattedPhotos;
  lastFetched: { current: number };
  searchInput: string;
  pagesLeft: number | undefined;
  setPhotos: Dispatch<SetStateAction<FormattedPhotos>>;
  setPagesLeft: Dispatch<SetStateAction<number | undefined>>;
};

export const useInfiniteScroll = ({
  currentScrollHeight,
  photos,
  lastFetched,
  searchInput,
  pagesLeft,
  setPhotos,
  setPagesLeft,
}: UseInfiniteScroll) => {
  useEffect(() => {
    const imgContainerNodeScrollHeight =
      document.getElementById("imageContainer")?.scrollHeight || 0;

    const shouldFetch =
      // scrolled to less than 2000 px from bottom of image grid
      imgContainerNodeScrollHeight - currentScrollHeight < 2000 &&
      !!photos.length &&
      lastFetched.current !== 0 &&
      lastFetched.current + 2000 <= Date.now();

    if (shouldFetch) {
      submitForm({
        reset: false,
        searchTerm: searchInput,
        lastFetched,
        pagesLeft,
        setPhotos,
        setPagesLeft,
      });
    }
  }, [
    currentScrollHeight,
    lastFetched,
    pagesLeft,
    photos.length,
    searchInput,
    setPagesLeft,
    setPhotos,
  ]);
};
