import { type JSX } from 'react'
import Overviewed from "~/components/SinglePageInfo/components/Overviewed";
import {MediaConnection} from "~/gql/types.g";
import Watch from "~/components/SinglePageInfo/components/Watch";

interface props {
  info: string | undefined,
  relations: MediaConnection | null,
  name: string
}

export const AnimePageInfoReturn = ({ info, relations, name }: props): JSX.Element | undefined => {

  if (info === undefined) {
    return <Overviewed relations={relations} />;
  }
  if (info === "staff") {
    return <>Staff</>;
  }
  if (info === "characters") {
    return <>characters</>;
  }
  if (info === "stats") {
    return <>stats</>;
  }
  if (info === "social") {
    return <>social</>;
  }
  if (info === "watch") {
    return <Watch name={name}/>;
  }
  if (info === "reviews") {
    return <>reviews</>;
  }
};

// export const AnimePageInfo = (info: string | undefined): JSX.Element => {
//   const [searchParams, setSearchParams] = useSearchParams()
//
//   if (info === undefined) {
//     setSearchParams(undefined)
//   }
//   if (info === 'staff') {
//     searchParams.set('/', 'staff')
//     setSearchParams(searchParams)
//   }
//   if (info === 'characters') {
//     searchParams.set('/', 'characters')
//     setSearchParams(searchParams)
//   }
//   if (info === 'stats') {
//     searchParams.set('/', 'stats')
//     setSearchParams(searchParams)
//   }
//   if (info === 'social') {
//     searchParams.set('/', 'social')
//     setSearchParams(searchParams)
//   }
//   return <>{searchParams.get('/') ? <></> : <></>}</>
// }
