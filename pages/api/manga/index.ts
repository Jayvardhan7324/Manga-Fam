import type { NextApiRequest, NextApiResponse } from 'next'

const API_URL = "https://api.mangadex.org/manga";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const query_string = req.url?.split("?")[1];

  const manga_req = await fetch(`${API_URL}?${query_string}`);

  if (manga_req.status >= 400) 
    res.status(400);


  const req_body = await manga_req.json();
  res.status(200).json(req_body);
}
