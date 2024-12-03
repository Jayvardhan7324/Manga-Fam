/* eslint-disable @next/next/no-img-element */
import { type FC, useState, forwardRef } from "react";
import classname from "classnames";
import { ModeContext } from "../../hooks/theme_provider";
import NavLink from "../NavLink";

interface MangaPageType {
  data: string;
  dataSaver: string;
  index: number;
}

const MangaPage: FC<MangaPageType> = ({ data, dataSaver, index }) => {
  const [retry, changeRetry] = useState(false);

  const handleError = (event: any) => {
    changeRetry(true);
  };

  const handleRetryClick = () => {
    changeRetry(false);
  };

  return (
    <ModeContext.Consumer>
      {({ theme }) => (
        <div
          data-index={index + 1}
          className="w-full max-h-full min-h-0 page_wrapper"
        >
          {retry ? (
            <div className="flex-shrink-0 flex flex-row flex-nowrap items-center justify-center">
              <button
                className={classname(
                  "px-2 py-1 rounded-xl text-sm md:text-lg",
                  theme === "LIGHT"
                    ? "bg-secondary_white text-secondary_black"
                    : "bg-4B-black text-d9-white",
                )}
                role="button"
                type="button"
                onClick={handleRetryClick}
              >
                Retry
              </button>
            </div>
          ) : (
            <div className="relative w-full" style={{ /* aspectRatio: "0.8" */ }}>
              <img
                referrerPolicy="no-referrer"
                loading="lazy"
                alt=""
                src={dataSaver}
                srcSet={`${dataSaver} 300w, ${data} 600w`}
                sizes={`(max-width: 600px) 300px, 600px`}
                onError={handleError}
              />
            </div>
          )}
        </div>
      )}
    </ModeContext.Consumer>
  );
};

type PageRef = HTMLDivElement | null;
interface PageProps { manga: any; chapters: any; result: any };

const Pages = forwardRef<PageRef, PageProps>(function Pages(
  { manga, chapters, result },
  ref,
) {
  let chapter = result ? result.chapter : null;
  let baseURL = result ? result.baseUrl : "";
  let hash = chapter ? chapter.hash : "";
  let data = chapter ? chapter.data : [];
  let dataSaver = chapter ? chapter.dataSaver : [];

  return (
    <ModeContext.Consumer>
      {({ theme }) => (
        <>
          <section
            ref={ref}
            className={classname(
              "relative w-full h-min flex flex-col overflow-hidden",
              theme === "LIGHT" ? "bg-secondary_white" : "",
            )}
          >
            {/* Navigation  */}
            <NavLink manga={manga} />

            {/* Pages Swipper */}
            <div className="overflow-y-scroll">
              {chapters
                ? data.map((filename: string, index: number) => (
                  <MangaPage
                    key={index}
                    index={index}
                    data={`${baseURL}/data/${hash}/${filename}`}
                    dataSaver={`${baseURL}/data-saver/${hash}/${dataSaver[index]}`}
                  />
                ))
                : null}
            </div>
          </section>
        </>
      )}
    </ModeContext.Consumer>
  );
});

export default Pages;
