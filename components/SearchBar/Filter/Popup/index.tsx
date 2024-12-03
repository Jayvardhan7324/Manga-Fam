import { type FC, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import classname from "classnames";
import { ModeContext } from "../../../../hooks/theme_provider";
import {
  updatedPublication,
  updatedContentRating,
  updatedStatus,
  updatedTheme,
  refreshManga,
} from "../../../../redux/action/action";

const getOptions = (state: any) => ({
  publication: state.main.publication,
  status: state.main.status,
  contentRating: state.main.contentRating,
  theme: state.main.theme,
});

interface FilterGroupProps {
  label: string;
  options: Record<string, boolean>;
  changeSelected: (option: string) => void;
};

const FilterGroup: FC<FilterGroupProps> = ({
  label,
  options,
  changeSelected,
}) => {
  return (
    <ModeContext.Consumer>
      {({ theme }) => (
        <div className="flex flex-col gap-1 w-full p-2">
          <span
            className={classname(
              "w-full p-1 px-2 rounded-lg font-sans text-sm",
              theme === "LIGHT" ? "text-primary-color" : "text-white",
              // theme === "LIGHT" ? "bg-d9-white" : "bg-4B-black",
            )}
          >
            {label}
          </span>
          <div className="flex flex-row flex-wrap gap-2">
            {Object.keys(options).map((option: string) => (
              <button
                role="button"
                type="button"
                key={option}
                className={classname(
                  "py-1 px-1.5 flex flex-row flex-nowrap justify-start rounded-full font-sans text-xs md:text-xs",
                  theme === "LIGHT"
                    ? "text-4B-black hover:border-primary-color "
                    : "text-custom-gray hover:border-secondary_white ",

                  /* if selected */
                  options[option]
                    ? theme === "LIGHT"
                      ? "text-secondary_white bg-primary-color"
                      : "text-primary_black bg-secondary_white"
                    : theme === "LIGHT"
                    ? "hover:text-primary-color"
                    : "hover:text-secondary_white",
                )}
                onClick={() => changeSelected(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </ModeContext.Consumer>
  );
};

const FilterPopup = () => {

  const context = useContext(ModeContext) 

  const dispatch = useDispatch();
  const options = useSelector(getOptions);

  const { publication, status, contentRating, theme } = options;

  const changePublication = (option: string) => {
    const new_publication = { ...publication };
    new_publication[option] = !publication[option];

    dispatch(updatedPublication(new_publication));
  };

  const changeStatus = (option: string) => {
    const new_status = { ...status };
    new_status[option] = !status[option];

    dispatch(updatedStatus(new_status));
  };

  const changeContentRating = (option: string) => {
    const new_contentRating = { ...contentRating };
    new_contentRating[option] = !contentRating[option];

    dispatch(updatedContentRating(new_contentRating));
  };

  const changeTheme = (option: string) => {
    const new_theme = { ...theme };
    new_theme[option] = !theme[option];

    dispatch(updatedTheme(new_theme));
  };

  const refreshPage = () => {
    // dispatch the event
    dispatch(refreshManga());
  };

  return (
    <section
      data-dark={context.theme === "DARK"}
      className="rounded-lg relative overflow-y-scroll h-full md:max-h-[400px] bg-[var(--primary-color)] data-[dark=true]:bg-secondary_black shadow-lg"
    >
      <div
        data-dark={context.theme === "DARK"}
        className="sticky top-0 left-0 z-20 flex flex-row flex-nowrap items-center px-1 py-2 justify-end bg-[var(--primary-color)] data-[dark=true]:bg-secondary_black"
      >
        <button
          role="button"
          type="button"
          className="rounded-md text-sm text-d9-white p-2 px-3 filter_apply_button"
          onClick={refreshPage}
        >
         Apply 
        </button>
      </div>

      <FilterGroup
        label="Status"
        options={status}
        changeSelected={changeStatus}
      />
      <FilterGroup
        label="Publication"
        options={publication}
        changeSelected={changePublication}
      />
      <FilterGroup
        label="Content Rating"
        options={contentRating}
        changeSelected={changeContentRating}
      />
      <FilterGroup label="Theme" options={theme} changeSelected={changeTheme} />
    </section>
  );
};

export default FilterPopup;
