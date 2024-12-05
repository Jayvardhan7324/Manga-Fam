import type { NextApiRequest, NextApiResponse } from "next"

const API_URL = "https://api.mangadex.org/chapter"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const query_string = req.url?.split("?")[1]

  const chapter_res = await fetch(`${API_URL}?${query_string}`)

  if (chapter_res.status >= 400) {
    const json = await chapter_res.json().catch(console.error)

    res.status(400).json(json ?? {})
    return
  }

  const json = await chapter_res.json()
  res.status(200).json(json)
}
