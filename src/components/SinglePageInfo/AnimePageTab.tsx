import { type JSX } from "react";
import Overviewed from "~/components/SinglePageInfo/components/Overviewed";
import { MediaConnection } from "~/gql/types.g";
import Watch from "~/components/SinglePageInfo/components/Watch";
import { MediaAnimeQuery } from "~/enteris/anime/titleList.g";

interface props {
  tab: string | undefined;
  relations: NonNullable<MediaAnimeQuery["Media"]>["relations"];
  name: string | undefined;
}

export const AnimePageTab = ({
  tab,
  relations,
  name,
}: props): JSX.Element | undefined => {
  if (tab === undefined) {
    return <Overviewed relations={relations} />;
  }
  if (tab === "staff") {
    return <>Staff</>;
  }
  if (tab === "characters") {
    return <>characters</>;
  }
  if (tab === "stats") {
    return <>stats</>;
  }
  if (tab === "social") {
    return <>social</>;
  }
  if (tab === "watch") {
    return <Watch name={name} />;
  }
  if (tab === "reviews") {
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