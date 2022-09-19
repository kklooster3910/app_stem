// ORGANIZE THESE IMPORTS
import type { NextPage } from "next";
import Head from "next/head";

import React, {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  useRef,
} from "react";

import { useScrollHeight } from "../customHooks/useScrollHeight";
import { getPhotosMiddleware, FormattedPhoto } from "../apiMiddleware";

// utlize this in the picture grid and also for clicking individual pictures
// import styles from "../styles/Home.module.css";
import SearchPhotosForm from "../components/SearchPhotosForm";

import MainPageWrapper from "../components/MainPageWrapper";
import ImageGrid from "../components/ImageGrid";
import { useInfiniteScroll } from "../customHooks/useInfiniteScroll";

// import throttle from "lodash/throttle";

type FormattedPhotos = [FormattedPhoto] | [];

// THINGS TO HANDLE
// REACHING END OF PAGES -- NO MORE PHOTOS TO NOW - total photos - photos.length === 0 or pagesLeft === 0?
// NO PHOTO RESULTS

// MAKE MODULAR
// PHOTO DETAILS CLICK
// REREAD DIRECTIONS

// MAKE TYPES FILE AND EXPORT ALL TYPES FROM THERE?

// LOADING STATE?

const noResultsString =
  "Doesn't look like your search returned any results, try adjusting your search term";
const endOfResultsString =
  "Looks like we ran out of photos to show you, try a different search!";

const Home: NextPage = () => {
  // notes for discussion in readme
  // app state - would setup a better state management system (eg: context, redux, etc) depending on use cases if app was more than a single page
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

  // update the id of the image container when you make this more modular and make components for everything
  return (
    <div>
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
      {pagesLeft && pagesLeft < 0 && !photos.length && (
        <div>{noResultsString}</div>
      )}
      {pagesLeft && pagesLeft <= 0 && photos.length && (
        <div>{endOfResultsString}</div>
      )}
    </div>
  );
};

export default Home;
