import { Tag } from "./tags";
import DB from "./DB";

const headers = new Headers();

headers.append("Access-Control-Allow-Origin", "*");

const Fetch = (url: URL | string) =>
  fetch(url, { method: "GET", headers: headers });

// const MANGADEX_URL = "https://api.mangadex.org"
const FAVOURITE_KEY = "FAVOURITE";
const RECENT_KEY = "RECENT";

type PublicationDemographic = "shounen" | "shoujo" | "josei" | "seinen";

type Status = "ongoing" | "completed" | "hiatus" | "cancelled";

type ContentRating = "safe" | "suggestive" | "erotica" | "pronographic";

type Group = "theme" | "format" | "genre";

type Rel_type = "author" | "artist" | "cover_art";

interface Relationship {
  id: string;
  type: Rel_type;
  attributes: Record<string, string>;
}

interface Tag {
  id: string;
  type: "tag";
  attributes: {
    name: Record<string, string>;
    description: Record<string, string>;
    group: Group;
  };
}

interface Manga {
  id: string;
  type: "manga";
  attributes: {
    title: Record<string, string>;
    altTitles: Record<string, string>[];
    description: Record<string, string>;
    originalLanguage: string;
    lastVolume: string;
    lastChapter: string;
    publicationDemographic: PublicationDemographic;
    status: Status;
    year: number;
    contentRating: ContentRating;
    tags: Tag[];
    chapterNumbersResetOnNewVolume: boolean;
    createdAt: Date;
    updatedAt: Date;
    availableTranslatedLanguages: string[];
    latestUploadedChapter: string;
  };
  relationships: Relationship[];
}

type Options = {
  publication: string[];
  status: string[];
  contentRating: string[];
  tags: string[];
};

// const API_PATH = "https://api.mangadex.org/manga";
const API_PATH = "/api/manga";

/**
 * @desc Add the query to the request
 * @param url {URL} url of the request
 */
function processURL(url: URL, options: Options): URL {
  // console.log(options)

  for (const option of Object.keys(options)) {
    switch (option) {
      case "publication": {
        // iterate over the publication
        (options as any)["publication"].forEach((item: string) => {
          url.searchParams.append("publicationDemographic[]", item);
        });
        break;
      }
      case "status": {
        // iterate over the status
        (options as any)["status"].forEach((item: string) => {
          url.searchParams.append("status[]", item);
        });

        break;
      }
      case "contentRating": {
        // iterate over the content rating
        (options as any)["contentRating"].forEach((item: string) => {
          url.searchParams.append("contentRating[]", item);
        });

        break;
      }
      case "tags": {
        (options as any)["tags"].forEach((item: string) => {
          const id = (Tag as any)[item];
          url.searchParams.append("includedTags[]", id);
        });

        break;
      }
      default:
        break;
    }
  }

  return url;
}

/**
 * @desc Fetch the manga from the Mangadex api
 */
class Manga {
  static LIMIT: number = 30;

  /**
   * @desc fetch the random Mangas
   */
  static async fetchMangas(offset: number, options: Options) {
    let fetch_url = new URL(API_PATH, window.location.origin);

    fetch_url.searchParams.append("offset", offset.toString());
    fetch_url.searchParams.append("limit", this.LIMIT.toString());
    fetch_url.searchParams.append("includes[]", "cover_art");
    fetch_url.searchParams.append("includes[]", "author");

    // process the all the tags and add to the query
    fetch_url = processURL(fetch_url, options);

    const response = await Fetch(fetch_url).catch(console.error);

    if (!response || response.status !== 200)
      throw new Error("Cannot fetch mangas");

    const json = await response.json();

    return json;
  }

  /**
   * @desc search mangas according to the search text
   * @param searchText {string} manga title
   * @param offset {number | undefined} offset required ny the api
   * @returns {any}
   */
  static async searchMangas(
    searchText: string,
    offset?: number,
    limit?: number,
  ) {
    let fetch_url = new URL(API_PATH, window.location.origin);

    fetch_url.searchParams.append(
      "limit",
      limit ? limit.toString() : this.LIMIT.toString(),
    );
    offset && fetch_url.searchParams.append("offset", offset.toString()); // offset may be undefined
    fetch_url.searchParams.append("title", searchText);
    fetch_url.searchParams.append("includes[]", "cover_art");
    fetch_url.searchParams.append("includes[]", "author");

    // fetch the response
    const response = await Fetch(fetch_url).catch(console.error);

    if (!response || response.status !== 200)
      throw new Error("Cannot search text");

    const json = await response.json();

    return json;
  }

  /**
   * @desc Fetch Manga and Chapters
   * @param mangaID {string} Unique ID of the manga
   * @returns
   */
  static async getMangaAndChapters(mangaID: string) {
    const url = new URL(`${API_PATH}/${mangaID}`, window.location.origin);
    url.searchParams.append("includes[]", "cover_art");
    url.searchParams.append("includes[]", "author");

    const responses = await Promise.all([
      Fetch(url).then((res) => res.json()),
      Fetch(`${API_PATH}/${mangaID}/aggregate`).then((res) => res.json()),
    ]).catch(console.error);

    if (!responses) throw new Error("Cannot fetch manga and chapter");

    const result = { manga: responses[0], chapters: responses[1] };

    return result;
  }

  /**
   *
   * @param manga Manga
   * @returns {Manga[]}
   */
  static getRecommendedMangas = async (manga: Manga): Promise<Manga[]> => {
    const { attributes } = manga;
    const { tags } = attributes;

    const fetch_url = new URL(API_PATH, window.location.origin);
    fetch_url.searchParams.append("offset", "0");
    fetch_url.searchParams.append("limit", "10");
    fetch_url.searchParams.append("includes[]", "cover_art");
    fetch_url.searchParams.append("includes[]", "author");

    // add the tags to the url
    tags.forEach((item: any) => {
      if (item.attributes.group === "genre")
        fetch_url.searchParams.append("includedTags[]", item.id);
    });

    const response = await Fetch(fetch_url).catch(console.error);

    if (!response) throw new Error("Response is void");

    const json = await response.json();

    return json;
  };

  /**
   *
   * @param ids {string[]} Unique ids of the manga
   * @returns {Manga[]}
   */
  static getMangasByIds = async (ids: string[]): Promise<Manga[]> => {
    const fetch_url = new URL(API_PATH, window.location.origin);
    fetch_url.searchParams.append("includes[]", "cover_art");
    fetch_url.searchParams.append("includes[]", "author");

    // append the ids to the url
    ids.forEach((id: string) => {
      fetch_url.searchParams.append("ids[]", id);
    });

    const response = await Fetch(fetch_url)
      .then((res) => res.json())
      .catch(console.error);

    if (!response) throw new Error("Response is void");

    return response;
  };

  /**
   * @desc Fetches favourite mangas from the localStorage
   */
  static getFavouriteMangas = (): Manga[] => {
    const value = DB.getValue(FAVOURITE_KEY);
    if (value) {
      return value;
    } else {
      return [];
    }
  };

  static setFavouriteMangas = (value: any) => {
    if (!value) throw new Error("Value is undefined");
    DB.setValue(FAVOURITE_KEY, value);
  };
}

type RecentType = {
  id: string;
  lastRead: number;
  readChapters: string[];
};

class Recent {
  static getAll() {
    const recents = DB.getValue(RECENT_KEY);
    if (!recents) return [];

    return recents;
  }

  static updateManga(manga: Manga, readChapter: string) {
    let recents: RecentType[] = DB.getValue(RECENT_KEY);
    let found = false;

    if (recents) {
      for (const item of recents) {
        found = item.id === manga.id;
        if (found) {
          // update the lastRead time
          item.lastRead = Date.now();

          // check if the chapter already read
          if (!item.readChapters.includes(readChapter))
            item.readChapters.push(readChapter);
        }
      }
    }

    if (!found) {
      const new_item: RecentType = {
        id: manga.id,
        lastRead: Date.now(),
        readChapters: [readChapter],
      };

      recents = recents ? [...recents, new_item] : [new_item];
    }

    const sorted_recents = recents.sort((a, b) => b.lastRead - a.lastRead);

    // console.log("Sorted recents: ", sorted_recents)

    // store the recents in the DB
    DB.setValue(RECENT_KEY, sorted_recents);

    return recents;
  }
}

export type {
  Manga,
  Relationship,
  Tag,
  ContentRating,
  PublicationDemographic,
  Status,
  RecentType,
};

export { Recent };

export default Manga;
