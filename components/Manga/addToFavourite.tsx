import { type FC } from "react";
import classname from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { updateFavourite } from "../../redux/action/manga_action";
import { ModeContext } from "../../hooks/theme_provider";
import Favourite from "./favourite";
import { type Manga } from "../utils/Manga";

interface AddToFavouriteProps {
  manga: Manga;
}

const isFavourite = (favourites: Manga[], manga: Manga): boolean => {
  let result = false;

  if (favourites.length === 0) return result;

  favourites.forEach((item) => {
    if (item.id === manga.id) result = true;
  });

  return result;
};

const AddToFavourite: FC<AddToFavouriteProps> = ({ manga }) => {
  const dispatch = useDispatch();
  const favourites = useSelector((state: any) => state.favourites);

  const isFav = isFavourite(favourites, manga);

  const handleClick = () => {
    let new_favourites: Manga[] = [];

    if (isFav) {
      new_favourites = favourites.filter((item: Manga) => {
        if (item.id === manga.id) return;
        return item;
      });
    } else {
      new_favourites = favourites.concat(manga);
    }

    // dispatch the manga to the store
    dispatch(updateFavourite(new_favourites));
  };

  return (
    <ModeContext.Consumer>
      {({ theme }) => (
        <>
          <div className="m-1">
            <button
              role="button"
              type="button"
              onClick={handleClick}
              className={classname(
                "p-2 flex flex-row flex-nowrap items-center rounded-md text-sm font-semi-bold text-white bg-primary-color",
                "fill-white border border-solid border-primary-color transition-colors hover:bg-white hover:text-primary-color hover:border-white hover:fill-primary-color",
              )}
            >
              <span className={classname("w-5 h-5 mr-2 fill-inherit")}>
                <Favourite />
              </span>
              {isFav ? "Added" : "Add to Favourites"}
            </button>
          </div>
        </>
      )}
    </ModeContext.Consumer>
  );
};

export default AddToFavourite;
