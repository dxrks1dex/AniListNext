import { MediaAnimeQuery } from "~/enteris/anime/titleList.g";
import styled from "styled-components";
import Link from "next/link";
import React, { Dispatch, useCallback, useMemo, useRef, useState } from "react";
import { isElementAtBottomOfPage } from "~/utilits/dom/isElementAtBottomOfPage";
import { useScrollListener } from "~/hooks/dom/useScrollListener";
import { usePaginateData } from "~/hooks/common/usePaginateData";
import { doubleDelete } from "~/components/Search/searchFunctions/doubleDelete";

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

  const voiceActorLanguage = chars?.edges
    ?.map(
      (mediaItem) =>
        mediaItem?.voiceActorRoles?.map(
          (actorItem) => actorItem?.voiceActor?.language,
        ),
    )
    .flat();

  return (
    <>
      <div onClick={() => setIsLanguageList(true)} style={{ color: "wheat" }}>
        Random
      </div>
      {isLanguageList ? (
        <select>
          <option>{doubleDelete(voiceActorLanguage)}</option>
        </select>
      ) : (
        <></>
      )}
      <CharactersGrid>
        {paginatedCharsPrepared?.map((mediaCharacters) => (
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
            {mediaCharacters?.voiceActorRoles?.map((mediaStaff) => (
              <Link
                key={mediaStaff?.voiceActor?.id}
                href={{
                  pathname: `/staff/[id]/[name]`,
                  query: {
                    id: mediaStaff?.voiceActor?.id,
                    name: mediaStaff?.voiceActor?.name?.userPreferred,
                  },
                }}
              >
                <CharactersCard>
                  <TextBlock>
                    <CharactersName>
                      {mediaStaff?.voiceActor?.name?.userPreferred}
                    </CharactersName>
                    <>{mediaStaff?.voiceActor?.language}</>
                  </TextBlock>
                  <CardImg src={mediaStaff?.voiceActor?.image?.large ?? ""} />
                </CharactersCard>
              </Link>
            ))}
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
