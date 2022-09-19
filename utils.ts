import { Dispatch, SetStateAction } from "react";

import { getPhotosMiddleware, FormattedPhoto } from "./apiMiddleware";

type FormattedPhotos = [FormattedPhoto] | [];

type FormSubmit = {
  searchTerm: string;
  lastFetched: { current: number };
  pagesLeft: number | undefined;
  reset: boolean;
  setPhotos: Dispatch<SetStateAction<FormattedPhotos>>;
  setPagesLeft: Dispatch<SetStateAction<number | undefined>>;
};

const submitForm = ({
  searchTerm,
  lastFetched,
  reset,
  pagesLeft,
  setPhotos,
  setPagesLeft,
}: FormSubmit) => {
  const endOfPages = !!pagesLeft && pagesLeft <= 0;
  // prevent api from being hit if at the end of pages
  if (endOfPages && !reset) return;

  getPhotosMiddleware({ searchTerm, reset })
    .then((res) => {
      const { formattedPhotos, pagesLeft, timeStamp } = res;

      lastFetched.current = timeStamp;
      setPagesLeft(pagesLeft);
      setPhotos(
        (prevPhotos) => [...prevPhotos, ...formattedPhotos] as FormattedPhotos
      );
    })
    .catch((e) => console.log(e));
};

export { submitForm };
