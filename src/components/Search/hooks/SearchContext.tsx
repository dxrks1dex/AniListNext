import React, {
  createContext,
  type Dispatch,
  type FC,
  type ReactNode,
  type SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { MediaSeason } from "~/gql/types.g";
import { useRouter } from "next/router";

interface ISearchContext {
  data: {
    genres: string[];
    tags: string[];
    search: string;
    year: string;
    season: MediaSeason | undefined;
    currentPage: number;
  };
  operations: {
    setSeason: Dispatch<SetStateAction<MediaSeason | undefined>>;
    clearSeason: () => void;

    setTags: Dispatch<SetStateAction<string[]>>;
    setGenres: Dispatch<SetStateAction<string[]>>;
    clearGenresAndTags: () => void;

    setYear: Dispatch<SetStateAction<string>>;
    clearYear: () => void;

    setSearch: Dispatch<SetStateAction<string>>;
    clearSearch: () => void;

    clearUrl: () => void;

    setCurrentPage: Dispatch<React.SetStateAction<number>>;
  };
}

const SearchContext = createContext<ISearchContext | null>(null);
export const SearchContextWrapper: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [genres, setGenres] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [search, setSearch] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [season, setSeason] = useState<MediaSeason | undefined>(undefined);
  // const [searchParams, setSearchParams] = useSearchParams()
  const { push, query, pathname } = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const clearSeason = useCallback((): void => {
    setSeason(undefined);
    push({ query: query });
    setCurrentPage(1);
  }, []);

  const clearSearch = useCallback((): void => {
    setSearch("");
    push({ query: query });
    setCurrentPage(1);
  }, []);

  const clearGenresAndTags = useCallback((): void => {
    setGenres([]);
    setTags([]);
    push({ query: query });
    setCurrentPage(1);
  }, []);

  const clearYear = useCallback((): void => {
    setYear("");
    push({ query: query });
    setCurrentPage(1);
  }, []);

  const addGenreUrl = useCallback((): void => {}, []);

  const pathnameRef = useRef(pathname);
  pathnameRef.current = pathname;
  const queryRef = useRef(query);
  queryRef.current = query;

  useEffect(() => {
    if (
      genres.length === 0 &&
      search === "" &&
      tags.length === 0 &&
      year === "" &&
      season === undefined
    ) {
      return;
    }

    const queryVal = queryRef.current;
    const pathnameVal = pathnameRef.current;

    const queryParams = { ...queryVal };

    if (genres.length > 0) {
      queryParams.genres = genres;
    }

    if (search.length > 0) {
      queryParams.search = search;
    }

    if (tags.length > 0) {
      queryParams.tags = tags;
    }

    if (year.length > 0) {
      queryParams.year = year;
    }

    if (season !== undefined) {
      queryParams.season = season;
    }

    if (!pathnameVal.startsWith("/search/anime")) {
      push({
        pathname: "search/anime/",
        query: queryParams,
      });
      console.log(pathnameVal.startsWith("/search/anime"));
    } else if (queryVal.sort !== undefined && queryVal.sort[0] !== undefined) {
      push({
        pathname: `/search/anime/${queryVal.sort[0]}`,
        query: queryParams,
      });
    } else {
      push({
        pathname: pathnameVal,
        query: queryParams,
      });
      console.log("false way");
    }

    setCurrentPage(1);
  }, [genres, search, season, tags, year]);

  const clearUrl = useCallback((): void => {
    push(`/`);
    setCurrentPage(1);
  }, []);

  const context: ISearchContext = useMemo(
    () => ({
      data: {
        genres,
        tags,
        search,
        season,
        year,
        currentPage,
      },
      operations: {
        clearSearch,
        setSearch,

        clearYear,
        setYear,

        clearGenresAndTags,
        setGenres,
        setTags,

        clearSeason,
        setSeason,

        addGenreUrl,
        clearUrl,

        setCurrentPage,
      },
    }),
    [
      genres,
      tags,
      search,
      season,
      year,
      currentPage,
      clearSearch,
      clearYear,
      clearGenresAndTags,
      clearSeason,
      addGenreUrl,
      clearUrl,
    ],
  );

  return (
    <SearchContext.Provider value={context}>{children}</SearchContext.Provider>
  );
};

export const useSearchContext = (): ISearchContext => {
  const value = useContext(SearchContext);
  if (value === null) {
    throw new Error("empty SearchContext");
  }

  return value;
};
