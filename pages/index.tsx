// ORGANIZE THESE IMPORTS
import type { NextPage } from "next";
// import { FormEvent } from "react";
import React, {
  useState,
  useEffect,
  ChangeEvent,
  FormEvent,
  Dispatch,
  SetStateAction,
  useRef,
} from "react";

import Head from "next/head";
// utlize this in the picture grid and also for clicking individual pictures
import Image from "next/image";
import styles from "../styles/Home.module.css";

import { getPhotosMiddleware, FormattedPhoto } from "../apiMiddleware";

import { useScrollHeight } from "../customHooks/useScrollHeight";

// import throttle from "lodash/throttle";

type FormattedPhotos = [FormattedPhoto] | [];

// THINGS TO HANDLE
// REACHING END OF PAGES -- NO MORE PHOTOS TO NOW - total photos - photos.length === 0 or pagesLeft === 0?
// NO PHOTO RESULTS

// MAKE MODULAR
// PHOTO DETAILS CLICK
// REREAD DIRECTIONS

// LOADING STATE?

type FormSubmit = {
  searchTerm: string;
  lastFetched: { current: number };
  reset: boolean;
  setPhotos: Dispatch<SetStateAction<FormattedPhotos>>;
  setPagesLeft: Dispatch<SetStateAction<number | undefined>>;
};

const submitForm = ({
  searchTerm,
  lastFetched,
  reset,
  setPhotos,
  setPagesLeft,
}: FormSubmit) => {
  // should this function get a flag called reset that resets currentPage
  // eg if the searchTerm changes?
  getPhotosMiddleware({ searchTerm, reset })
    .then((res) => {
      const {
        formattedPhotos,
        pagesLeft,
        totalPhotos,
        currentPage,
        timeStamp,
      } = res;
      console.log({ pagesLeft, totalPhotos, currentPage, timeStamp, res });
      // IF PAGES LEFT IS A NEGATIVE
      // IF PAGES LEFT === -1 then no results were returned --> handle this with some sort of front end error

      // debugger;
      // only set photos here if they exist?
      // setTimeStamp(timeStamp);
      lastFetched.current = timeStamp;
      setPagesLeft(pagesLeft);
      setPhotos(
        (prevPhotos) => [...prevPhotos, ...formattedPhotos] as FormattedPhotos
      );
    })
    .catch((e) => console.log(e));
};

const noResultsString =
  "Doesn't look like your search returned any results, try adjusting your search term";
const endOfResultsString =
  "Looks like we ran out of photos to show you, try a different search!";

// pull concat additonal photos out of render cycle?

const Home: NextPage = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [photos, setPhotos] = useState<FormattedPhotos>([]);
  const [pagesLeft, setPagesLeft] = useState<number | undefined>();
  const lastFetched = useRef<number>(0);

  const currentScrollHeight = useScrollHeight();

  useEffect(() => {
    const imgContainerNodeScrollHeight =
      document.getElementById("imageContainer")?.scrollHeight || 0;

    const shouldFetch =
      imgContainerNodeScrollHeight - currentScrollHeight < 2000 &&
      !!photos.length &&
      lastFetched.current !== 0 &&
      lastFetched.current + 2000 <= Date.now();

    // at the bottom - no more photos left if totalPhots === photos.length
    if (shouldFetch) {
      submitForm({
        reset: false,
        searchTerm: searchInput,
        lastFetched,
        setPhotos,
        setPagesLeft,
      });
    }
  }, [currentScrollHeight, lastFetched, photos.length, searchInput]);

  // update the id of the image container when you make this more modular and make components for everything
  return (
    <div className={styles.container} id="imageContainer">
      <Head>
        <title>Image Search</title>
        <meta name="search images using unsplash API" content="image search" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <form
        onSubmit={(e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          // reset photos array for new search
          if (photos.length) setPhotos([]);
          submitForm({
            searchTerm: searchInput,
            lastFetched,
            reset: true,
            setPhotos,
            setPagesLeft,
          });
        }}
      >
        {/* MAKE THIS FORM INPUT IT'S OWN COMPONENT SO IT DOESN'T REPAINT THE WHOLE LIST/PAGE WHEN YOU TYPE A CHARACTER */}
        <input
          type="text"
          placeholder="search term"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchInput(e.target.value)
          }
        />
        {/* disable button based on there being an actual input*/}
        <button type="submit">Search Photos</button>
      </form>
      {photos.map(({ height, width, id, urls }, i) => {
        const { full, raw, regular, small } = urls;
        return (
          <div key={`${id}`}>
            {/* <Image src={small} quality={100} height={400} width={400} alt="" /> */}
            {/* mess with this height/ width in order to get images to load in faster? */}
            <Image
              src={small}
              quality={100}
              layout="responsive"
              height={height}
              width={width}
              alt=""
            />
          </div>
        );
      })}
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
