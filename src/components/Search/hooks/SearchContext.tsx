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

    addSearchUrl: () => void;
    addGenreUrl: () => void;
    addTagUrl: () => void;
    addYearToUrl: () => void;
    addSeasonToUrl: () => void;
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

  const addSearchUrl = useCallback((): void => {
    // const queryParams = { ...query, search: search };
    //
    // if (query.sort === undefined && search !== "") {
    //   push({
    //     pathname: "search/anime/",
    //     query: queryParams,
    //   });
    // } else {
    //   push({
    //     pathname,
    //     query: queryParams,
    //   });
    // }
    //
    // setCurrentPage(1);
  }, [search]);
  useEffect(() => {
    if (search !== "") {
      addSearchUrl();
    }
    // else {
    //   push({pathname})
    // }
  }, [search]);

  const addYearToUrl = useCallback(() => {
    const queryParams = { ...query, year: year };

    if (query.sort === undefined) {
      push({
        pathname: "search/anime/",
        query: queryParams,
      });
    } else {
      push({
        pathname,
        query: queryParams,
      });
    }

    setCurrentPage(1);
  }, [year]);

  const addSeasonToUrl = useCallback(() => {
    const queryParams = { ...query, season: season };

    if (query.sort === undefined) {
      push({
        pathname: "search/anime/",
        query: queryParams,
      });
    } else {
      push({
        pathname,
        query: queryParams,
      });
    }

    setCurrentPage(1);
  }, [season]);

  const addGenreUrl = useCallback((): void => {}, []);

  const pathnameRef = useRef(pathname);
  pathnameRef.current = pathname;
  const queryRef = useRef(query);
  queryRef.current = query;

  useEffect(() => {
    if (
      genres.length === 0
      // && search.length === 0 && tags.length === 0
    ) {
      return;
    }

    const queryVal = queryRef.current;
    const pathnameVal = pathnameRef.current;

    const queryParams = { ...queryVal };

    if (genres.length > 0) {
      queryParams.genres = genres;
      // queryParams.search = search;
      // queryParams.tags = tags;

      setCurrentPage(1);
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
  }, [genres, push]);

  const addTagUrl = useCallback((): void => {
    const queryParams = { ...query, tags: tags };

    if (query.sort === undefined) {
      push({
        pathname: "search/anime/",
        query: queryParams,
      });
    } else {
      push({
        pathname,
        query: queryParams,
      });
    }

    setCurrentPage(1);
  }, [tags]);

  useEffect(() => {
    if (year !== "") {
      addYearToUrl();
    }
    if (season !== undefined) {
      addSeasonToUrl();
    }
  }, [year, season]);

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

        addSearchUrl,
        addGenreUrl,
        addTagUrl,
        addYearToUrl,
        addSeasonToUrl,
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
      addSearchUrl,
      addGenreUrl,
      addTagUrl,
      addYearToUrl,
      addSeasonToUrl,
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
