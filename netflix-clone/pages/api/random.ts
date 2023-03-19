import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(405).end();
    return;
  }
  try {
    await serverAuth(req);
    const movieCount = await prismadb.movie.count();
    const random = Math.floor(Math.random() * movieCount);
    const randomMovie = await prismadb.movie.findMany({
      take: 1,
      skip: random,
    });
    return res.status(200).json(randomMovie[0]);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
