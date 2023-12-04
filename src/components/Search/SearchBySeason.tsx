import React, { type JSX, useRef, useState } from "react";
import {
  SearchButton,
  SearchInput,
  SearchSection,
  SearchSectionName,
} from "./searchStyleComponents/searchStyle";
import { GenreOrTagStyleList } from "./searchStyleComponents/genreOrTagStyleComponent";
import { useSearchContext } from "~/components/Search/hooks/SearchContext";
import { SelectOption } from "./searchFunctions/SelectOption";
import { doubleDelete } from "./searchFunctions/doubleDelete";
import { useOutsideDetect } from "~/hooks/common/useOutsideDetect";
import { MediaSeason } from "~/gql/types.g";
import { useSearchResultQuery } from "~/enteris/anime/titleList.g";

export const SearchBySeason = (): JSX.Element => {
  const [seasonList, setSeasonList] = useState(false);

  const {
    data: { season },
    operations: { setSeason, clearSeason, addSeasonToUrl },
  } = useSearchContext();

  const wrapperRef = useRef(null);
  useOutsideDetect(wrapperRef, setSeasonList);

  const { isLoading, error, data } = useSearchResultQuery({});
  if (isLoading) return <>Loading...</>;
  if (error) return <>An error has occurred: {(error as Error).message}</>;

  const seasons = data?.Page?.media?.map((mediaSeason) => mediaSeason?.season);
  const seasonSort = seasons?.sort();

  const onSeasonClick = (mediaSeason: MediaSeason | undefined): void => {
    if (mediaSeason === undefined) {
      return;
    }
    if (isSeasonSelect(mediaSeason)) {
      clearSeason();
      return;
    }
    addSeasonToUrl();
    setSeason(mediaSeason);
  };

  const isSeasonSelect = (mediaSeason: MediaSeason | undefined): boolean => {
    if (mediaSeason === undefined) {
      return false;
    }
    if (season === undefined) {
      return false;
    } else {
      return season?.includes(mediaSeason);
    }
  };
  const seasonToLowerCase = (): string => {
    if (season === undefined) {
      return "";
    }

    return season.slice(0, 1) + season.slice(1, season.length).toLowerCase();
  };

  return (
    <div>
      <SearchSectionName>Season</SearchSectionName>
      <SearchSection
        onClick={() => {
          setSeasonList(true);
        }}
      >
        <SearchInput value={seasonToLowerCase()} placeholder="Any" />
        {season !== undefined ? (
          <SearchButton
            onClick={(e) => {
              clearSeason();
              setSeasonList(true);
              e.preventDefault();
            }}
          >
            X
          </SearchButton>
        ) : null}
      </SearchSection>
      {seasonList ? (
        <GenreOrTagStyleList ref={wrapperRef}>
          <>
            {doubleDelete(seasonSort)?.map((mediaSeason) => (
              <SelectOption
                key={mediaSeason}
                onClick={() => {
                  onSeasonClick(mediaSeason ?? undefined);
                }}
                selected={isSeasonSelect(mediaSeason ?? undefined)}
              />
            ))}
          </>
        </GenreOrTagStyleList>
      ) : (
        <></>
      )}
    </div>
  );
};
