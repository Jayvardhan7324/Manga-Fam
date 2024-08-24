import type { NextApiRequest, NextApiResponse } from 'next'

const API_URL = "https://api.mangadex.org/at-home/server"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  const response = await fetch(`${API_URL}/${id}`)

  if (response.status >= 400) {
    res.status(400)
    return
  }

  const json = await response.json()
  res.status(200).json(json)
}
