import type { Manga } from './Manga' 

export const pushMangas = (storedMangas: Manga[], fetchedMangas: Manga[]): Manga[] => {
  const mangas: Manga[] = []

  for (const item of fetchedMangas) {

    const found = storedMangas.find((manga: Manga) => item.id === manga.id)

    if (!found) mangas.push(item) // add the manga if the manga doesn't exists
  }

  return mangas
}