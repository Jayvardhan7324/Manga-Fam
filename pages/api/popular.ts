import type { NextApiRequest, NextApiResponse } from 'next'

const Fetch_URL = 'https://api.jikan.moe/v4/top/manga'

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const response = await fetch(Fetch_URL, { method: "GET" })
  
  if (response.status === 200) {
    const json = await response.json()
    res.status(200).json(json)
  }

  res.status(404)
}