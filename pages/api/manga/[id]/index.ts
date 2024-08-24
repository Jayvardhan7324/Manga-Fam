import type { NextApiRequest, NextApiResponse } from 'next'

const API_URL = "https://api.mangadex.org/manga"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const query_string = req.url?.split("?")[1]

  const manga_res = await fetch(`${API_URL}/${id}/?${query_string}`)

  if (manga_res.status >= 400) {
    res.status(400)
    return
  }

  const json = await manga_res.json();
  res.status(200).json(json);
}
