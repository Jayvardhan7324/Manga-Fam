import { type FC } from "react";
import classname from "classnames";
import Head from "next/head";
import { type Manga } from "../utils/Manga";
import { ModeContext } from "../../hooks/theme_provider";
import Cover from "../Cover";
import Recommended from "../Recommended";
import Title from "./title";
import Author from "./author";
import Tags from "./tag";
import AddToFavourite from "./addToFavourite";
import Description from "./description";
import * as Skeleton from "../Skeleton";
import NavLink from "../NavLink";

const MangaCover: FC<{ manga: Manga; loading: boolean }> = ({
  loading,
  manga,
}) => {
  const { id, relationships } = manga;
  const cover_art = relationships.find((item) => item.type === "cover_art");
  const filename = cover_art?.attributes.fileName;

  const low_cover = `https://uploads.mangadex.org/covers/${id}/${filename}.256.jpg`;
  const high_cover = `https://uploads.mangadex.org/covers/${id}/${filename}.512.jpg`;
  return (
    <>
      {loading ? (
        <div className="skeleton rounded-lg"></div>
      ) : (
        <div
          className="rounded-md overflow-hidden m-1"
          style={{ maxWidth: "300px", aspectRatio: "0.8" }}
        >
          <Cover low={low_cover} high={high_cover} />
        </div>
      )}
    </>
  );
};

const UpdatedAt = ({
  updatedDate,
  theme,
}: {
  updatedDate: Date;
  theme: "LIGHT" | "DARK";
}) => {
  return (
    <div
      className={classname(
        "py-2 text-sm rounded-sm",
        theme === "LIGHT" ? "text-secondary_black" : "text-d9-white",
      )}
    >
      <span>
        Last updated at:{" "}
        {`${updatedDate.getDate()}/${updatedDate.getMonth()}/${updatedDate.getFullYear()}`}{" "}
        (DD/MM/YY)
      </span>
    </div>
  );
};

type MangaProps = {
  manga: Manga;
  loading: boolean;
};

/**
 *
 * @param tags Tags received from the manga
 * @returns {string[]}
 */
const getTags = (tags: any): string[] => {
  const tagList: string[] = [];

  // iterate over the tags
  tags.forEach((item: any, index: number) => {
    const { attributes } = item;
    tagList.push(attributes.name.en);
  });

  return tagList;
};

const MangaSection: FC<MangaProps> = ({ loading, manga }) => {
  const { id, relationships, attributes } = manga;
  const {
    title,
    altTitles,
    description,
    status,
    publicationDemographic,
    contentRating,
    tags,
    updatedAt,
  } = attributes;

  const author = relationships.find((item) => item.type === "author");
  const author_name = author?.attributes.name || "";

  const updatedDate = new Date(updatedAt);
  const tagList = getTags(tags);

  return (
    <>
      <Head>
        <title>{title ? title.en : "Title is not available"}</title>
        <meta
          name="description"
          content={description ? description.en : "No description available"}
        />
        <meta name="keywords" content={title.en} />
        <meta property="og:title" content={title.en} />
        <meta property="og:url" content={`/manga/${id}`} />
        <meta property="og:description" content={description.en} />
      </Head>

      <ModeContext.Consumer>
        {({ theme }) => (
          <div className="flex-shrink-1 flex flex-col flex-nowrap">
            <NavLink {...{ manga }} />
            <section className="flex-grow-1 w-full">
              <div className="flex flex-col flex-nowrap md:flex-row lg:flex-row">
                <MangaCover {...{ loading, manga }} />

                <div className="min-w-0 w-full flex flex-col flex-nowrap m-2 xl:ml-10">
                  <Title {...{ loading, title, altTitles }} />
                  <Author
                    {...{
                      loading,
                      author_name,
                      publicationDemographic,
                      status,
                      contentRating,
                    }}
                  />
                  <UpdatedAt {...{ updatedDate, theme }} />
                  <Tags tags={tagList} loading={loading} />
                  <AddToFavourite {...{ manga }} />
                </div>
              </div>

              <Description {...{ description, loading }} />
            </section>

            <Recommended {...{ loading, manga }} />
          </div>
        )}
      </ModeContext.Consumer>
    </>
  );
};

type SectionType = { loading: boolean; recentData: any; manga: Manga };

const Section: FC<SectionType> = ({ loading, recentData, manga }) => {
  return loading || !manga ? (
    <Skeleton.MangaSection />
  ) : (
    <MangaSection {...{ loading, manga }} />
  );
};

export default Section;
