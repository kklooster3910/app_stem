// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import axios from "axios";

type Data = {
  name: string;
};

const unsplashAPIKey = process.env.UNSPLASH_ACCESS_KEY;
export interface SearchPhotosApiReq extends NextApiRequest {
  params: {
    searchTerm: string;
    currentPage: number;
  };
}

export default async function searchPhotos(
  req: SearchPhotosApiReq,
  res: NextApiResponse<Data>
) {
  try {
    const { searchTerm, currentPage } = req.query;

    const photos = await axios.get(
      `https://api.unsplash.com/search/photos?client_id=${unsplashAPIKey}&page=${currentPage}&per_page=30&query=${searchTerm}`
    );

    const { data: photosData, status, statusText } = photos;

    // log error from unsplash api
    if (status !== 200) {
      throw new Error(
        `API Request to Unsplash failed. Status: ${status} StatusText: ${statusText}}`
      );
    }

    return res.status(status).json(photosData);
  } catch (e) {
    console.error({
      exception: e,
      operation: "searchPhotos failed",
    });
  }
}
