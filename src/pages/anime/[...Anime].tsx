// import { useParams, useSearchParams } from 'react-router-dom'
import styled from "styled-components";
import { useMediaAnimeQuery } from "~/enteris/anime/titleList.g";
import { useRouter } from "next/router";
import { GetStaticPaths } from "next";
import { AnimePageTab } from "~/components/SinglePageInfo/AnimePageTab";
import { useCallback } from "react";

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

export default function AnimePage(props: RouteProps): JSX.Element {
  // const { id } = useSearchParams()
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

  const { isLoading, data } = useMediaAnimeQuery(
    { id: Number(id) },
    { enabled: !!id },
  );

  if (!id) return <div>no id...</div>;
  if (isLoading) return <div>Loading...</div>;

  const relations = data?.Media?.relations;

  return (
    <AnimePageGrid>
      <AnimePageHeader>
        <div>
          <BannerImage src={data?.Media?.bannerImage ?? ""} alt={""} />
          <HeaderGrid>
            <div>
              <AnimeImage
                src={data?.Media?.coverImage?.extraLarge ?? ""}
                alt={""}
              />
              <button>Add to List</button>
            </div>
            <DescriptionGrid>
              <HeaderTitle>{data?.Media?.title?.romaji}</HeaderTitle>
              <HeaderDescription
                dangerouslySetInnerHTML={{
                  __html: data?.Media?.description ?? "",
                }}
              >
                {null}
              </HeaderDescription>
              <NavBar>
                <StyledLink onClick={() => pushInfoUrl(null)}>
                  Overview
                </StyledLink>
                <StyledLink
                  onClick={() => {
                    pushInfoUrl("characters");
                  }}
                >
                  Characters
                </StyledLink>
                <StyledLink
                  onClick={() => {
                    pushInfoUrl("staff");
                  }}
                >
                  Staff
                </StyledLink>
                <StyledLink
                  onClick={() => {
                    pushInfoUrl("stats");
                  }}
                >
                  Stats
                </StyledLink>
                <StyledLink
                  onClick={() => {
                    pushInfoUrl("social");
                  }}
                >
                  Social
                </StyledLink>
                <StyledLink
                  onClick={() => {
                    pushInfoUrl("watch");
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
          <AnimePageTab tab={tab} relations={relations} name={name} />
          <div>{data?.Media?.characters?.edges?.map((char) => char?.name)}</div>
        </RightContent>
      </AnimePageContent>
    </AnimePageGrid>
  );
}

const AnimePageGrid = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 100%;
  height: 100vh;
`;

const AnimePageHeader = styled.div`
  background-color: #ccc;
  text-align: center;
`;

const BannerImage = styled.img`
  width: 100%;
`;
const HeaderDescription = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    color: #99adbf;
    transition: 0.2s;

    overflow: initial;
  }
`;
const HeaderTitle = styled.h1`
  color: #9fadbd;
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
`;
const AnimeImage = styled.img`
  border-radius: 5px;
  width: 185px;
  height: 265px;
`;

const DescriptionGrid = styled.div`
  display: grid;
  grid-template-rows: 30%;
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
  background-color: #888;
  text-align: center;
  padding: 20px;
`;

const NavBar = styled.nav`
  height: 10%;

  display: flex;
  justify-content: space-around;
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
