import { NextResponse, NextRequest } from "next/server";
import type { NextApiRequest, NextApiResponse } from "next";
import { SearchPhotosApiReq } from "./pages/api/searchPhotos";
import searchPhotos from "./pages/api/searchPhotos";

import axios from "axios";

// don't need to determine environment to hit proper domain. eg: localahost vs deployed domain
// console.log({ process, env: process.env.NODE_ENV });

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

// HANDLE THIS!!
// how to reset currentPage if searchTerm changes?

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

    console.log({ total, totalPages });

    // set timestamp to current date after unsplash api return
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
  return { formattedPhotos, pagesLeft, totalPhotos, currentPage, timeStamp };
}

export { getPhotosMiddleware };
