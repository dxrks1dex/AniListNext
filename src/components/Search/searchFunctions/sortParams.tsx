import {useSearchContext} from "~/components/Search/hooks/SearchContext";
import {useRouter} from "next/router";
import {MediaSort} from "~/gql/types.g";


export const SortParams = (): MediaSort | undefined => {
  const { query } = useRouter()
  console.log(query.sort)
  const { operations: { setYear, setSeason } } = useSearchContext()
  if (query.sort !== undefined && query.sort[1] === 'trending') {
    return "TRENDING_DESC"
  }
  if (query.sort !== undefined && query.sort[1] === 'this-season') {
    setYear('2023')
    setSeason('FALL')
    return "POPULARITY_DESC"
  }
  if (query.sort !== undefined && query.sort[1] === 'next-season') {
    setYear('2024')
    setSeason('WINTER')
    return "POPULARITY_DESC"
  }
  if (query.sort !== undefined && query.sort[1] === 'all-time-popular') {
    return "POPULARITY_DESC"
  }
}
