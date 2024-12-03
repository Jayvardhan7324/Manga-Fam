import { FC, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import classnames from "classnames";
import { ModeContext } from "../../hooks/theme_provider";
import * as Skeleton from "../Skeleton";

const isChapterAlreadyRead = (readChapters: string[], id: string) => {
  let found = false;

  readChapters.forEach((chapterID: string) => {
    if (chapterID === id) found = true;
  });

  return found;
};

interface IChapterProps {
  ch: any
  recentData: any
  vol: string
}

const Chapter: FC<IChapterProps> = ({
  ch,
  recentData,
  vol,
}) => {
  const router = useRouter();

  const { chapter, id } = ch;

  const mangaID = router.query.id;
  const active_volume = router.query.vol;
  const active_chapter = router.query.chapter;
  const isActive = useMemo(() => 
      active_volume === vol && active_chapter === chapter, 
    [active_volume, active_chapter, vol, chapter]);

  const isRead = recentData
    ? isChapterAlreadyRead(recentData.readChapters, id)
    : false;

  // push the url in the router on click
  const handleClick = useCallback(() => {
    router.push({
      pathname: `/manga/${mangaID}/read`,
      query: {
        vol,
        chapter,
      },
    });

    // router.reload() // Reload Page
  }, [chapter, vol, router, mangaID]);

  return (
    <ModeContext.Consumer>
      {({ theme }) => (
        <dd
          className={classnames(
            "text-sm my-1 p-2 rounded-md",
            theme === "LIGHT" ? "text-4B-black" : "text-d9-white",
            theme === "LIGHT"
              ? "hover:bg-d9-white"
              : "hover:bg-secondary_black",
            isActive
              ? theme === "LIGHT"
                ? "bg-secondary_white"
                : "bg-4B-black"
              : "",
            isRead ? "text-custom-gray" : "",
          )}
        >
          <button
            className="flex flex-row flex-nowrap justify-start h-full w-full transition-none duration-75"
            role="chapter button"
            type="button"
            onClick={handleClick}
          >
            <p className="">Chapter {chapter === "none" ? "TBD" : chapter}</p>
          </button>
        </dd>
      )}
    </ModeContext.Consumer>
  );
};

interface IVolumeProps {
  recentData: any
  vol: any
  clearBg?: boolean
}

const Volume: FC<IVolumeProps> = ({
  recentData,
  vol,
  clearBg = false,
}) => {
  const { volume, chapters } = vol;
  return (
    <ModeContext.Consumer>
      {({ theme }) => (
        <>
          <dt
            className={classnames(
              "sticky top-0 left-0 text-lg px-2 py-1 rounded-md w-full my-1",
              true
                ? theme === "LIGHT"
                  ? "md:bg-secondary_white text-secondary_black"
                  : "md:bg-secondary_black text-secondary_white"
                : "md:bg-[var(--primary-bg-color)]",
            )}
          >
            Vol.{volume === "none" ? "TBD" : volume}
          </dt>
          {Object.values(chapters).map((item: any, index: number) => (
            <Chapter
              key={index}
              recentData={recentData}
              ch={item}
              vol={volume}
            />
          ))}
        </>
      )}
    </ModeContext.Consumer>
  );
};

interface ChaptersProps  {
  chapters: any;
  loading: boolean;
  recentData: any;
  clearBg?: boolean;
};

const Chapters: FC<ChaptersProps> = ({
  chapters,
  recentData,
  loading,
  clearBg = false,
}) => {
  return (
    <ModeContext.Consumer>
      {({ theme }) => (
        <div
          className={classnames(
            "chapters_wrapper flex flex-col rounded-md px-1 lg:mr-5",
            // !clearBg
            //   ? theme === "LIGHT"
            //     ? "md:bg-secondary_white"
            //     : "md:bg-secondary_black"
            //   : "",
          )}
        >
          <h2
            className={classnames(
              "text-xl p-2 rounded-md",
              theme === "LIGHT" ? "text-primary-color" : "text-d9-white",
            )}
          >
            Chapters
          </h2>
          {!chapters ? (
            <Skeleton.MangaChapters />
          ) : chapters ? (
            <div className="overflow-y-auto">
              <dl className="w-full px-2 my-2">
                {Object.values(chapters).map((item: any, index: number) => (
                  <Volume
                    key={index}
                    recentData={recentData}
                    vol={item}
                    {...{ clearBg }}
                  />
                ))}
              </dl>
            </div>
          ) : null}
        </div>
      )}
    </ModeContext.Consumer>
  );
};

export default Chapters;
