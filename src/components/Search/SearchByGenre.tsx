"use client";

import React, {
  type ChangeEvent,
  type JSX,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  SearchButton,
  SearchInput,
  SearchSection,
  SearchSectionName,
} from "./searchStyleComponents/searchStyle";

import {
  GenreOrTagStyleList,
  GenreTagTitleStyle,
} from "./searchStyleComponents/genreOrTagStyleComponent";
import { useSearchContext } from "./hooks/SearchContext";
import { getSearchInputPlaceholder } from "./searchFunctions/GetSearchInputPlaceholder";
import { SelectOption } from "./searchFunctions/SelectOption";
import { useGenreAndTagCollectionQuery } from "~/enteris/anime/titleList.g";
import { useOutsideDetect } from "~/hooks/common/useOutsideDetect";

export const SearchByGenre = (): JSX.Element => {
  const [isGenreAndTagListOpen, setIsGenreAndTagListOpen] = useState(false);
  const [searchTagOrGenre, setSearchTagOrGenre] = useState("");

  const {
    data: { genres, tags },
    operations: {
      setCurrentPage,
      setGenres,
      setTags,
      addTagUrl,
      addGenreUrl,
      clearGenresAndTags,
    },
  } = useSearchContext();

  useEffect(() => {
    if (genres.length > 0) {
      addGenreUrl();
    }
    if (tags.length > 0) {
      addTagUrl();
    }
  }, [addGenreUrl, addTagUrl, genres.length, tags.length]);

  const wrapperRef = useRef(null);
  useOutsideDetect(wrapperRef, setIsGenreAndTagListOpen);

  const { isLoading, error, data } = useGenreAndTagCollectionQuery({});

  if (isLoading) return <>Loading...</>;
  if (error) return <>An error has occurred: {(error as Error).message}</>;

  const genreFiltered = data?.GenreCollection?.filter(
    (mediaGenre) =>
      mediaGenre?.slice(0, searchTagOrGenre.length) === searchTagOrGenre,
  );

  const tagFiltered = data?.MediaTagCollection?.filter(
    (mediaTag) =>
      mediaTag?.name.slice(0, searchTagOrGenre.length) === searchTagOrGenre,
  );

  const onGenreClick = (mediaGenre: string | null): void => {
    if (mediaGenre === null) {
      return;
    }
    if (isGenreSelected(mediaGenre)) {
      setGenres(
        (prevState) => prevState?.filter((item) => item !== mediaGenre),
      );
      setCurrentPage(1);
    } else {
      setGenres((prevState) => [...prevState, mediaGenre]);
    }
  };
  const onTagClick = (mediaTag: string): void => {
    if (mediaTag === undefined || mediaTag === null) {
      return;
    }
    if (isTagSelected(mediaTag)) {
      setTags((prevState) => prevState?.filter((item) => item !== mediaTag));
      setCurrentPage(1);
    } else {
      setTags((prevState) => [...prevState, mediaTag]);
      addTagUrl();
    }
  };

  const isGenreSelected = (mediaGenre: string | null): boolean => {
    if (mediaGenre === null) {
      return false;
    }
    return genres.includes(mediaGenre);
  };

  const isTagSelected = (mediaTag: string): boolean => {
    if (mediaTag === undefined || null) {
      return false;
    }
    return tags.includes(mediaTag);
  };

  return (
    <div>
      <SearchSectionName>Genre</SearchSectionName>
      <SearchSection
        onClick={() => {
          setIsGenreAndTagListOpen(true);
        }}
      >
        <SearchInput
          value={searchTagOrGenre}
          placeholder={getSearchInputPlaceholder({
            values: [...genres, ...tags],
          })}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setSearchTagOrGenre(e.target.value);
          }}
        />
        {genres.length === 0 && tags.length === 0 ? null : (
          <SearchButton
            onClick={(e) => {
              clearGenresAndTags();
              setIsGenreAndTagListOpen(false);
              e.preventDefault();
            }}
          >
            X
          </SearchButton>
        )}
      </SearchSection>
      {isGenreAndTagListOpen ? (
        <GenreOrTagStyleList ref={wrapperRef}>
          <GenreTagTitleStyle>GENRES</GenreTagTitleStyle>
          {genreFiltered?.map((mediaGenre) => (
            <SelectOption
              key={mediaGenre}
              onClick={() => {
                onGenreClick(mediaGenre);
              }}
              selected={isGenreSelected(mediaGenre)}
            >
              {mediaGenre}
            </SelectOption>
          ))}
          <GenreTagTitleStyle>TAGS</GenreTagTitleStyle>
          {tagFiltered?.map((mediaTag) => (
            <SelectOption
              key={mediaTag?.name}
              onClick={() => {
                onTagClick(mediaTag?.name ?? "");
              }}
              selected={isTagSelected(mediaTag?.name ?? "")}
            >
              {mediaTag?.name}
            </SelectOption>
          ))}
        </GenreOrTagStyleList>
      ) : (
        <></>
      )}
    </div>
  );
};
