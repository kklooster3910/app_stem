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

// let timeStamp: number, currentPage: number;
let currentPage: number;

// how to reset currentPage if searchTerm changes?

async function getPhotosMiddleware({
  searchTerm,
}: // currentPage,
{
  searchTerm: string;
  // currentPage: number;
}) {
  let formattedPhotos = [],
    pagesLeft,
    totalPhotos,
    timeStamp;

  // only let end point be called every 2 seconds max
  // console.log({ timeStamp });
  // DO I NEED THIS TIMESTAMP SAFEGUARD OR SHOULD I LET THE FRONT END HANDLE IT AND JUST SEND THE TIMESTAMP BACK ?
  // if (!timeStamp || timeStamp + 2000 < Date.now()) {
  if (!currentPage) currentPage = 1;

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
  // }

  console.log("INSIDE MIDDLEWARE -- before return");
  console.log({ searchTerm, currentPage });

  return { formattedPhotos, pagesLeft, totalPhotos, currentPage, timeStamp };
}

export { getPhotosMiddleware };
