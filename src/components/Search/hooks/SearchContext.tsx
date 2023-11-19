import React, {
  createContext,
  type Dispatch,
  type FC,
  type ReactNode, type SetStateAction,
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react'
import {MediaSeason} from "~/gql/types.g";
import {useRouter} from "next/router";

interface ISearchContext {
  data: {
    genres: string[]
    tags: string[]
    search: string
    year: string
    season: MediaSeason | undefined
    currentPage: number
  }
  operations: {
    setSeason: Dispatch<SetStateAction<MediaSeason | undefined>>
    clearSeason: () => void

    setTags: Dispatch<SetStateAction<string[]>>
    setGenres: Dispatch<SetStateAction<string[]>>
    clearGenresAndTags: () => void

    setYear: Dispatch<SetStateAction<string>>
    clearYear: () => void

    setSearch: Dispatch<SetStateAction<string>>
    clearSearch: () => void

    addSearchUrl: () => void
    addGenreUrl: () => void
    addTagUrl: () => void
    addYearToUrl: () => void
    addSeasonToUrl: () => void
    clearUrl: () => void

    setCurrentPage: Dispatch<React.SetStateAction<number>>
  }
}

const SearchContext = createContext<ISearchContext | null>(null)
export const SearchContextWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const [genres, setGenres] = useState<string[]>([])
  const [tags, setTags] = useState<string[]>([])
  const [search, setSearch] = useState<string>('')
  const [year, setYear] = useState<string>('')
  const [season, setSeason] = useState<MediaSeason | undefined>(undefined)
  // const [searchParams, setSearchParams] = useSearchParams()
  const { push, query, pathname }  = useRouter()
  const [currentPage, setCurrentPage] = useState<number>(1)

  const clearSeason = useCallback((): void => {
    setSeason(undefined)
    push({query: query})
    setCurrentPage(1)
  }, [])
  const clearSearch = useCallback((): void => {
    setSearch('')
    push({query: query})
    setCurrentPage(1)
  }, [])
  const clearGenresAndTags = useCallback((): void => {
    setGenres([])
    setTags([])
    push({query: query})
    setCurrentPage(1)
  }, [])
  const clearYear = useCallback((): void => {
    setYear('')
    push({query: query})
    setCurrentPage(1)
  }, [])

  const addSearchUrl = useCallback((): void => {
    const queryParams = { ...query, search: search };

    if (query.sort === undefined) {
      push({
        pathname: 'search/anime/',
        query: queryParams,
      });
    } else {
      push({
        pathname,
        query: queryParams,
      });
    }

    setCurrentPage(1)
  }, [search])


  const addYearToUrl = useCallback(() => {
    const queryParams = { ...query, year: year };

    if (query.sort === undefined) {
      push({
        pathname: 'search/anime/',
        query: queryParams,
      });
    } else {
      push({
        pathname,
        query: queryParams,
      });
    }

    setCurrentPage(1)
  }, [year])

  const addSeasonToUrl = useCallback(() => {
    const queryParams = { ...query, season: season };

    if (query.sort === undefined) {
      push({
        pathname: 'search/anime/',
        query: queryParams,
      });
    } else {
      push({
        pathname,
        query: queryParams,
      });
    }

    setCurrentPage(1)
  }, [season])

  const addGenreUrl = useCallback((): void => {
    const queryParams = { ...query, genres: genres };

    if (query.sort === undefined) {
          push({
            pathname: 'search/anime/',
            query: queryParams,
          });
    } else {
      push({
        pathname,
        query: queryParams,
      });
    }

    setCurrentPage(1);
  }, [genres])

  const addTagUrl = useCallback((): void => {
    const queryParams = { ...query, tags: tags };

    if (query.sort === undefined) {
      push({
        pathname: 'search/anime/',
        query: queryParams,
      });
    } else {
      push({
        pathname,
        query: queryParams,
      });
    }

    setCurrentPage(1)
  }, [tags])

  const clearUrl = useCallback((): void => {
    push(`/`)
    setCurrentPage(1)
  }, [])

  const context: ISearchContext = useMemo(() => ({
    data: {
      genres,
      tags,
      search,
      season,
      year,
      currentPage
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

      setCurrentPage
    }
  }), [genres, tags, search, season, year, currentPage, clearSearch, clearYear, clearGenresAndTags, clearSeason, addSearchUrl, addGenreUrl, addTagUrl, addYearToUrl, addSeasonToUrl, clearUrl])

  return (
      <SearchContext.Provider value={context}>
        {children}
      </SearchContext.Provider>
  )
}

export const useSearchContext = (): ISearchContext => {
  const value = useContext(SearchContext)
  if (value === null) {
    throw new Error('empty SearchContext')
  }

  return value
}
