import styled from "styled-components";
import { useMediaAnimeQuery } from "~/enteris/anime/titleList.g";
import { useRouter } from "next/router";
import { GetStaticPaths } from "next";
import { AnimePageTab } from "~/components/SinglePageInfo/AnimePageTab";
import { ReactElement, useCallback, useEffect, useRef, useState } from "react";
import { useSearchContext } from "~/components/Search/hooks/SearchContext";
import { useStaffLanguageContext } from "~/components/SinglePageInfo/components/CharactersFunc/staffLanguageContext";
import AnimePageLayout from "~/pages/anime/layout";

type RouteProps = { params?: { Anime: string[] } };

export async function getStaticProps({ params }: RouteProps) {
  return {
    props: { params },
  };
}
export const getStaticPaths: GetStaticPaths<
  NonNullable<RouteProps["params"]>
> = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export default function AnimePage(props: RouteProps) {
  const [isHover, setIsHover] = useState(false);
  const [overflowStyle, setOverflowStyle] = useState("hidden");
  const [fetchedData, setFetchedData] = useState(null);
  const [readMoreClick, setReadMoreClick] = useState(true);

  const {
    data: { currentPage },
    operations: { setCurrentPage },
  } = useSearchContext();

  const { push } = useRouter();

  const id = props.params?.Anime[0];
  const name = props.params?.Anime[1];
  const tab = props.params?.Anime[2];

  const pushInfoUrl = useCallback(
    (newTab: string | null) => {
      if (newTab === null) {
        push(`${id}/${name}`);
      } else {
        push(`${id}/${name}/${newTab}`, undefined, { scroll: false });
      }
    },
    [id, name, push],
  );

  const { isLoading, data, isFetching } = useMediaAnimeQuery(
    {
      id: Number(id),
      page: currentPage,
    },
    { enabled: !!id, keepPreviousData: true },
  );

  const isFetchingRef = useRef(isFetching);
  isFetchingRef.current = isFetching;

  useEffect(() => {
    if (!isFetchingRef.current && data) {
      setFetchedData(data);
    }
  }, [data, fetchedData]);

  if (!id) return <div>no id...</div>;
  if (isLoading) return <div>Loading...</div>;

  const relations = data?.Media?.relations;
  const chars = data?.Media?.characters;

  return (
    <AnimePageGrid>
      <AnimePageHeader>
        <div>
          {data?.Media?.bannerImage === null ? null : (
            <BannerImage src={data?.Media?.bannerImage ?? ""} />
          )}
          <HeaderGrid>
            <div>
              <AnimeImage
                src={data?.Media?.coverImage?.extraLarge ?? ""}
                alt={""}
              />
              <button>Add to List</button>
            </div>
            <DescriptionGrid
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
            >
              <HeaderTitle>{data?.Media?.title?.romaji}</HeaderTitle>
              <HeaderDescription
                dangerouslySetInnerHTML={{
                  __html: data?.Media?.description ?? "",
                }}
                overflowStyle={overflowStyle}
              >
                {null}
              </HeaderDescription>
              {isHover && readMoreClick ? (
                <div>
                  <ReadMoreButton
                    onClick={() => {
                      setOverflowStyle("initial");
                      setReadMoreClick(false);
                    }}
                  >
                    Read More
                  </ReadMoreButton>
                </div>
              ) : null}
              <NavBar>
                <StyledLink onClick={() => pushInfoUrl(null)}>
                  Overview
                </StyledLink>
                <StyledLink
                  onClick={() => {
                    pushInfoUrl("characters");
                    setCurrentPage(1);
                  }}
                >
                  Characters
                </StyledLink>
                <StyledLink
                  onClick={() => {
                    pushInfoUrl("staff");
                    setCurrentPage(1);
                  }}
                >
                  Staff
                </StyledLink>
                <StyledLink
                  onClick={() => {
                    pushInfoUrl("stats");
                    setCurrentPage(1);
                  }}
                >
                  Stats
                </StyledLink>
                <StyledLink
                  onClick={() => {
                    pushInfoUrl("social");
                    setCurrentPage(1);
                  }}
                >
                  Social
                </StyledLink>
                <StyledLink
                  onClick={() => {
                    pushInfoUrl("watch");
                    setCurrentPage(1);
                  }}
                >
                  Watch
                </StyledLink>
                <StyledLink
                  onClick={() => {
                    pushInfoUrl("reviews");
                  }}
                >
                  Reviews
                </StyledLink>
              </NavBar>
            </DescriptionGrid>
          </HeaderGrid>
        </div>
      </AnimePageHeader>
      <AnimePageContent>
        <LeftContent>
          <LeftContainer>
            Genres
            <LeftTextStyle>
              {data?.Media?.genres?.map((mediaGenre) => (
                <div key={mediaGenre}>{mediaGenre}</div>
              ))}
            </LeftTextStyle>
            Episodes
            <div>
              <LeftTextStyle>{data?.Media?.episodes}</LeftTextStyle>
            </div>
          </LeftContainer>
          Tags
          <div>
            {data?.Media?.tags?.map((mediaTag) => (
              <TagContainer key={mediaTag?.name}>
                {mediaTag?.name}
                <div>{mediaTag?.rank}%</div>
              </TagContainer>
            ))}
          </div>
        </LeftContent>
        <RightContent>
          <AnimePageTab
            chars={chars}
            tab={tab}
            relations={relations}
            name={name}
            setCurrentPage={setCurrentPage}
            isFetching={isFetching}
            currentPage={currentPage}
            titleImage={data?.Media?.coverImage?.extraLarge}
          />
          <div>{data?.Media?.characters?.edges?.map((char) => char?.name)}</div>
        </RightContent>
      </AnimePageContent>
    </AnimePageGrid>
  );
}

AnimePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <AnimePageLayout>
      <>{page}</>
    </AnimePageLayout>
  );
};

const AnimePageGrid = styled.div`
  //display: grid;
  //grid-template-rows: 1fr 1fr;
  //grid-template-columns: 100%;
  //height: 100vh;
`;

const AnimePageHeader = styled.div`
  background-color: #ccc;
  text-align: center;
`;

const BannerImage = styled.img`
  width: 100%;
`;
const HeaderDescription = styled.span<{ overflowStyle: string }>`
  height: 70%;

  overflow: ${({ overflowStyle }) => overflowStyle};
  text-overflow: ellipsis;

  &:hover {
    color: #99adbf;
    transition: 0.2s;
  }
`;
const HeaderTitle = styled.h1`
  color: #9fadbd;

  font-size: 1.5rem;
  font-weight: bold;
`;

const HeaderGrid = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 10% 70%;
  grid-column-gap: 7%;

  text-align: left;
  padding-left: 15%;

  background-color: #151f2e;
  color: #728aa1;

  //min-height: 250px;
`;

const AnimeImage = styled.img`
  border-radius: 5px;

  width: 11.56rem;
  height: 16.56rem;
`;

const DescriptionGrid = styled.div`
  display: grid;
  //grid-template-rows: 30%;

  margin-top: 3%;
`;

const AnimePageContent = styled.div`
  display: grid;
  grid-template-columns: 30% 70%;
  background-color: #0b1622;
`;

const LeftContent = styled.div`
  text-align: center;
  padding: 20px;

  display: block;
  color: #9fadbd;
`;
const LeftContainer = styled.section`
  background-color: #151f2e;
`;
const LeftTextStyle = styled.span`
  color: #8586a5;
`;
const TagContainer = styled.div`
  height: 10%;
  width: 50%;

  background-color: #151f2e;
  color: #8586a5;

  margin: 10px;

  text-align: left;
  padding-left: 1%;

  display: flex;
  justify-content: space-between;

  box-shadow: #1f2126;
  //border-right: 5%;
`;

const RightContent = styled.div`
  text-align: center;
  padding: 20px;
`;

const NavBar = styled.nav`
  height: 10%;

  display: flex;
  justify-content: space-around;

  padding-top: 2%;
  padding-bottom: 2%;
`;
const StyledLink = styled.nav`
  color: #9fadbd;
  &:hover {
    color: #61dafb;
    transition: 0.2s;
  }
  text-decoration: none;

  cursor: pointer;
`;

const ReadMoreButton = styled.button`
  height: 5%;
  width: 60%;

  background-color: #151f2e;
  color: #61dafb;

  opacity: 50%;

  position: absolute;
  //
  //margin-top: 15%;

  cursor: pointer;
  border: none;
`;
