import { useSearchContext } from '../hooks/SearchContext'
import {SortParams} from "~/components/Search/searchFunctions/sortParams";
import {Exact, MediaSeason, MediaSort} from "~/gql/types.g";

type SearchParams = {
  sort: MediaSort | undefined;
  page: number;
  genre?: string[] | undefined;
  tag?: string[] | undefined;
  year?: string | undefined;
  season: MediaSeason | undefined;
  search?: string | undefined;
}

export const GetSearchParams = (currentPage: number): SearchParams => {
  const { data: { tags, season, year, genres, search } } = useSearchContext()

  return {
    sort: search === '' ? SortParams() : "SEARCH_MATCH",
    page: currentPage,
    genre: genres.length === 0 ? undefined : genres,
    tag: tags.length === 0 ? undefined : tags,
    year: year === '' ? undefined : year + '%',
    season,
    search: search === '' ? undefined : search
  }
}
