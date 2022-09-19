import React, {
  ChangeEvent,
  FormEvent,
  // useState,
  Dispatch,
  SetStateAction,
} from "react";

import { FormattedPhoto } from "../../apiMiddleware";
import { submitForm } from "../../pages/utils";

import styles from "./SearchPhotosForm.module.scss";

type FormattedPhotos = [FormattedPhoto] | [];

type SearchPhotosFormProps = {
  searchInput: string;
  photos: FormattedPhotos;
  lastFetched: { current: number };
  pagesLeft: number | undefined;
  setPagesLeft: Dispatch<SetStateAction<number | undefined>>;
  setPhotos: Dispatch<SetStateAction<FormattedPhotos>>;
  setSearchInput: Dispatch<SetStateAction<string>>;
};

const SearchPhotosForm = ({
  searchInput,
  photos,
  lastFetched,
  pagesLeft,
  setPagesLeft,
  setPhotos,
  setSearchInput,
}: SearchPhotosFormProps) => {
  return (
    <div className={styles.searchPhotosForm}>
      <form
        onSubmit={(e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          // reset photos array for new search
          if (photos.length) setPhotos([]);
          submitForm({
            searchTerm: searchInput,
            lastFetched,
            reset: true,
            pagesLeft,
            setPhotos,
            setPagesLeft,
          });
        }}
      >
        <input
          type="text"
          placeholder="search term"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchInput(e.target.value)
          }
        />
        {/* MAKE SURE YOU DISABLET HIS BUTTON IF THERE IS NO SEARCH INPUT */}
        {/* disable button based on there being an actual input*/}
        <button type="submit">Search Photos</button>
      </form>
    </div>
  );
};

export default SearchPhotosForm;
