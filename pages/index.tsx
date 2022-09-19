import React, { useState, useRef } from "react";
import type { NextPage } from "next";

import Head from "next/head";
import ImageGrid from "../components/ImageGrid";
import SearchPhotosForm from "../components/SearchPhotosForm";

import { useScrollHeight } from "../customHooks/useScrollHeight";
import { FormattedPhoto } from "../apiMiddleware";
import { useInfiniteScroll } from "../customHooks/useInfiniteScroll";

import styles from "./main.module.scss";

type FormattedPhotos = [FormattedPhoto] | [];

const noResultsString =
  "Oops... doesn't look like your search returned any results, try adjusting your search term";
const endOfResultsString =
  "Looks like we ran out of photos to show you, try a different search!";

const Home: NextPage = () => {
  // TODO:
  // app state - setup a better state management system (eg: context, redux, etc) depending on use cases/app size
  const [searchInput, setSearchInput] = useState<string>("");
  const [photos, setPhotos] = useState<FormattedPhotos>([]);
  const [pagesLeft, setPagesLeft] = useState<number | undefined>();
  const lastFetched = useRef<number>(0);

  const currentScrollHeight = useScrollHeight();

  useInfiniteScroll({
    currentScrollHeight,
    photos,
    lastFetched,
    searchInput,
    pagesLeft,
    setPhotos,
    setPagesLeft,
  });

  return (
    <div className={styles.main}>
      <Head>
        <title>Image Search</title>
        <meta name="search images using unsplash API" content="image search" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <h1>Welcome to Image Search!</h1>
      <SearchPhotosForm
        {...{
          searchInput,
          setSearchInput,
          photos,
          setPhotos,
          lastFetched,
          pagesLeft,
          setPagesLeft,
        }}
      />
      <ImageGrid {...{ photos }} />
      {!!pagesLeft && pagesLeft < 0 && !photos.length && (
        <div className={styles.noResults}>{noResultsString}</div>
      )}
      {!!pagesLeft && pagesLeft <= 0 && !!photos.length && (
        <div className={styles.noResults}>{endOfResultsString}</div>
      )}
    </div>
  );
};

export default Home;
