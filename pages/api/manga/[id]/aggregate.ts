import type { NextApiRequest, NextApiResponse } from 'next'

const API_URL = "https://api.mangadex.org/manga";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  const aggregate_res = await fetch(`${API_URL}/${id}/aggregate`);

  if (aggregate_res.status >= 400) {
    res.status(400)
    return
  }

  const json = await aggregate_res.json();
  res.status(200).json(json);
}
