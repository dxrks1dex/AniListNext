import React, { Dispatch, type JSX, SetStateAction } from "react";
import Overviewed from "~/components/SinglePageInfo/components/Overviewed";
import Watch from "~/components/SinglePageInfo/components/Watch";
import { MediaAnimeQuery } from "~/enteris/anime/titleList.g";
import Characters from "~/components/SinglePageInfo/components/Characters";
import { InputMaybe, StaffLanguage } from "~/gql/types.g";

interface props {
  tab: string | undefined;
  relations: NonNullable<MediaAnimeQuery["Media"]>["relations"];
  name: string | undefined;
  chars: NonNullable<MediaAnimeQuery["Media"]>["characters"];
  setCurrentPage: Dispatch<React.SetStateAction<number>>;
  isFetching: boolean;
  currentPage: number;
  titleImage: string | null | undefined;
}

export const AnimePageTab = ({
  tab,
  relations,
  name,
  chars,
  setCurrentPage,
  isFetching,
  currentPage,
  titleImage,
}: props): JSX.Element | undefined => {
  if (tab === undefined) {
    return <Overviewed relations={relations} />;
  }
  if (tab === "staff") {
    return <>Staff</>;
  }
  if (tab === "characters") {
    return (
      <Characters
        currentPage={currentPage}
        isFetching={isFetching}
        setCurrentPage={setCurrentPage}
        chars={chars}
      />
    );
  }
  // if (tab === "stats") {
  //   return <>stats</>;
  // }
  // if (tab === "social") {
  //   return <>social</>;
  // }
  if (tab === "watch") {
    return <Watch name={name} titleImage={titleImage} />;
  }
  // if (tab === "reviews") {
  //   return <>reviews</>;
  // }
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
