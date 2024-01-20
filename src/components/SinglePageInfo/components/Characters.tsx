import { MediaAnimeQuery } from "~/enteris/anime/titleList.g";
import styled from "styled-components";
import Link from "next/link";
import React, { Dispatch, useCallback, useMemo, useRef, useState } from "react";
import { isElementAtBottomOfPage } from "~/utilits/dom/isElementAtBottomOfPage";
import { useScrollListener } from "~/hooks/dom/useScrollListener";
import { usePaginateData } from "~/hooks/common/usePaginateData";
import { doubleDelete } from "~/components/Search/searchFunctions/doubleDelete";
import { useStaffLanguageContext } from "~/components/SinglePageInfo/components/CharactersFunc/staffLanguageContext";
import { SelectOption } from "~/components/Search/searchFunctions/SelectOption";
import { GenreOrTagStyleList } from "~/components/Search/searchStyleComponents/genreOrTagStyleComponent";
import { useOutsideDetect } from "~/hooks/common/useOutsideDetect";

interface props {
  chars: NonNullable<MediaAnimeQuery["Media"]>["characters"];
  setCurrentPage: Dispatch<React.SetStateAction<number>>;
  isFetching: boolean;
  currentPage: number;
}
export default function Characters({
  chars,
  setCurrentPage,
  isFetching,
  currentPage,
}: props) {
  const [isLanguageList, setIsLanguageList] = useState(false);
  const [isEncountered, setIsEncountered] = useState(false);

  const {
    data: { staffLanguage },
    operations: { setStaffLanguage },
  } = useStaffLanguageContext();

  const isFetchingRef = useRef(isFetching);
  isFetchingRef.current = isFetching;

  const scrollHandler = useCallback(() => {
    if (isElementAtBottomOfPage() && !isFetchingRef.current) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  }, [setCurrentPage]);

  useScrollListener(scrollHandler);

  const paginatedData = usePaginateData({
    data: chars?.edges,
    currentPage,
  });

  const paginatedCharsPrepared = useMemo(
    () => paginatedData?.filter(Boolean),
    [paginatedData],
  );

  const voiceActorLanguage = useMemo(
    () =>
      doubleDelete(
        chars?.edges
          ?.map(
            (mediaItem) =>
              mediaItem?.voiceActorRoles?.map(
                (actorItem) => actorItem?.voiceActor?.language,
              ),
          )
          .flat(),
      ),
    [chars?.edges],
  );

  const onLanguageClick = (mediaLanguage) => {
    setStaffLanguage(mediaLanguage);
  };

  const isLanguage = (mediaLanguage: string | undefined): boolean => {
    if (
      mediaLanguage === undefined ||
      staffLanguage === undefined ||
      staffLanguage === null
    ) {
      return false;
    }

    return staffLanguage.includes(mediaLanguage);
  };

  const wrapperRef = useRef(null);
  useOutsideDetect(wrapperRef, setIsLanguageList);

  const staffArr = paginatedData.flatMap((item) => {
    const additionalItem =
      item?.voiceActorRoles
        ?.filter((staff) => staff?.voiceActor?.language === staffLanguage)
        .map((voiceItem) => voiceItem?.voiceActor?.language).length > 1
        ? { ...item }
        : null;

    return additionalItem ? [item, additionalItem] : [item];
  });

  const combitatedArr = [...[staffArr], ...[paginatedData]];
  paginatedData.map((mediaItem) => (
    <>
      <div>{mediaItem?.node?.name?.userPreferred}</div>
      <div>
        {mediaItem?.voiceActorRoles?.map((staffItem) => (
          <>{staffItem?.voiceActor?.language}</>
        ))}
      </div>
    </>
  ));
  const onConsoleLog = () => {
    console.log(
      paginatedData.map(
        (item) =>
          item?.voiceActorRoles
            ?.filter(
              (mediaStaff) =>
                mediaStaff?.voiceActor?.language === staffLanguage,
            )
            .map(
              (mediaStaff) => mediaStaff?.voiceActor?.name?.userPreferred,
            )[0],
      ),
    );
  };

  return (
    <>
      <div
        onClick={() => setIsLanguageList(true)}
        style={{ backgroundColor: "black", color: "wheat", cursor: "pointer" }}
      >
        {staffLanguage}
      </div>
      {isLanguageList ? (
        <GenreOrTagStyleList ref={wrapperRef} style={{ position: "relative" }}>
          {voiceActorLanguage?.map((mediaLanguage) => (
            <SelectOption
              key={mediaLanguage}
              onClick={() => {
                onLanguageClick(mediaLanguage ?? "");
                onConsoleLog();
              }}
              selected={isLanguage(mediaLanguage ?? "")}
            >
              {mediaLanguage}
            </SelectOption>
          ))}
        </GenreOrTagStyleList>
      ) : (
        <></>
      )}
      <CharactersGrid>
        {paginatedData?.map((mediaCharacters) => (
          <CardGrid key={mediaCharacters?.node?.id}>
            <Link
              href={{
                pathname: `/character/[id]/[name]`,
                query: {
                  id: mediaCharacters?.node?.id,
                  name: mediaCharacters?.node?.name?.userPreferred,
                },
              }}
            >
              <CharactersCard>
                <CardImg src={mediaCharacters?.node?.image?.large ?? ""} />
                <TextBlock>
                  <CharactersName>
                    {mediaCharacters?.node?.name?.userPreferred}
                  </CharactersName>
                  {mediaCharacters?.role}
                </TextBlock>
              </CharactersCard>
            </Link>
            {
              mediaCharacters?.voiceActorRoles
                ?.filter(
                  (mediaStaff) =>
                    mediaStaff?.voiceActor?.language === staffLanguage,
                )
                .map((mediaItem) => (
                  <>
                    <Link
                      key={mediaItem?.voiceActor?.id}
                      href={{
                        pathname: `/staff/[id]/[name]`,
                        query: {
                          id: mediaItem?.voiceActor?.id,
                          name: mediaItem?.voiceActor?.name?.userPreferred,
                        },
                      }}
                    >
                      <CharactersCard>
                        <TextBlock>
                          <CharactersName>
                            {mediaItem?.voiceActor?.name?.userPreferred}
                          </CharactersName>
                          <>{mediaItem?.voiceActor?.language}</>
                        </TextBlock>
                        <CardImg
                          src={mediaItem?.voiceActor?.image?.large ?? ""}
                        />
                      </CharactersCard>
                    </Link>
                  </>
                ))[0]
            }
          </CardGrid>
        ))}
      </CharactersGrid>
    </>
  );
}

const CardGrid = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100px;
  min-width: 70%;
  max-width: 71%;

  margin-bottom: 5%;
  //display: flex;
  //justify-content: space-between;

  border-radius: 5px;
`;

const CharactersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  background-color: #0b1622;
`;

const CharactersCard = styled.section`
  color: lightgrey;
  background-color: #151f2e;
  display: flex;
`;

const CardImg = styled.img`
  height: 115px;
  width: 85px;
`;

const CharactersName = styled.span`
  color: #9fadbd;
  font-size: 16px;

  &:hover {
    color: #61dafb;
    transition: 0.2s;
  }
`;

const TextBlock = styled.div`
  display: block;
  max-width: 200px;
  text-align: center;
`;
