import { type FC } from "react";
import classname from "classnames";
import Link from "next/link";
import { ModeContext } from "../../hooks/theme_provider";
import { type Manga } from "../utils/Manga";
import { useGetFavourites } from "../../hooks/getFavourites";
import { useGetRecents } from "../../hooks/getRecentsManga";
import Cover from "../Cover";

const MANGADEX_URL = "https://uploads.mangadex.org";

const FavouriteItem: FC<{ manga: any }> = ({ manga }) => {
  const { id, attributes, relationships } = manga;
  const { title, status, updatedAt } = attributes;

  const cover_art = relationships.find(
    (item: any) => item.type === "cover_art",
  );
  const author = relationships.find((item: any) => item.type === "author");

  const filename = cover_art ? cover_art.attributes.fileName : "";
  const author_name = author ? author.attributes.name : "";

  const low_cover = `${MANGADEX_URL}/covers/${id}/${filename}.256.jpg`;
  const high_cover = `${MANGADEX_URL}/covers/${id}/${filename}.512.jpg`;

  return (
    <ModeContext.Consumer>
      {({ theme }) => (
        <Link href={`/manga/${id}`}>
          <div
            className={classname(
              "flex flex-row flex-nowrap p-2 rounded-lg recent_item md:m-2",
              theme === "LIGHT" ? "text-secondary_black" : "text-d9-white",
              theme === "LIGHT"
                ? "hover:bg-secondary_white"
                : "hover:bg-secondary_black",
            )}
          >
            <div className="rounded-lg overflow-hidden h-full flex-shrink-0">
              <Cover low={low_cover} high={high_cover} />
            </div>

            <div className="flex flex-col flex-nowrap ml-2">
              <span className="text-sm font-semibold">{title.en}</span>

              <div
                className={classname(
                  "w-min-0 flex-shrink-0 text-custom-gray flex flex-row flex-nowrap items-center my-2",
                )}
              >
                <span>{author_name}</span>
                <span
                  className={classname(
                    "ml-4 px-2 py-1 rounded-md bg-custom-gray text-d9-white",
                  )}
                >
                  {status}
                </span>
              </div>

              <span>
                Updated at{" "}
                {`${new Date(updatedAt).getDate()}/${new Date(
                  updatedAt,
                ).getMonth()}/${new Date(updatedAt).getFullYear()}`}
              </span>
            </div>
          </div>
        </Link>
      )}
    </ModeContext.Consumer>
  );
};

const FavouritesContainer = () => {
  const favourites = useGetFavourites();
  const recents = useGetRecents();

  return (
    <ModeContext.Consumer>
      {({ theme }) => (
        <section className="w-full flex-shrink-0">
          {favourites && favourites.length > 0 ? (
            <div className="flex flex-row flex-wrap w-full h-auto">
              {favourites.map((item: Manga, index: number) => {
                return <FavouriteItem key={index} manga={item} />;
              })}
            </div>
          ) : (
            <div className="flex-shrink-0 h-full flex flex-row flex-nowrap items-center justify-center w-full">
              <span className={classname("text-lg text-custom-gray")}>
                No favourites..!
              </span>
            </div>
          )}
        </section>
      )}
    </ModeContext.Consumer>
  );
};

export default FavouritesContainer;
