// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function searchPhotos(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
  } catch (e) {
    console.error({
      exception: e,
      operation: "searchPohotos failed",
      // log more data like the search string, etc?
    });
  }
}
