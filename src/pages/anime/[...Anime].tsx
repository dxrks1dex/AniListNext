// import { useParams, useSearchParams } from 'react-router-dom'
import styled from 'styled-components'
import {useMediaAnimeQuery} from "~/enteris/anime/titleList.g";
import {useRouter} from "next/router";
import {GetStaticPaths} from "next";
import {AnimePageInfoReturn} from "~/components/SinglePageInfo/AnimePageInfo";

type RouteProps = {params?: {Anime: string[]}}

export async function getStaticProps({params}: RouteProps) {
  return {
    props: {params},
  }
}
export const getStaticPaths: GetStaticPaths<
    NonNullable<RouteProps["params"]>
> = async () => {

  return {
    paths: [],
    fallback: true
  }
}


export default function AnimePage (props: RouteProps): JSX.Element {
  // const { id } = useSearchParams()
  const { push, query } = useRouter()

  const id = props.params?.Anime[0]
  const name = props.params?.Anime[1]
  const info = props.params?.Anime[2]

  const { isLoading, data } = useMediaAnimeQuery(
      { id: Number(id) },
      { enabled: !!id })

  if (!id) return <div>no id...</div>
  if (isLoading) return <div>Loading...</div>

  const relations = data?.Media?.relations

  const AnimePageInfo = (info: string | null): void => {
    if (info === null) {
      push(`${id}/${name}`);
    }
    if (info === "staff") {
      push(`${id}/${name}/staff`, undefined, {scroll: false});
    }
    if (info === "characters") {
      push(`${id}/${name}/characters`, undefined, {scroll: false});
    }
    if (info === "stats") {
      push(`${id}/${name}/stats`, undefined, {scroll: false});
    }
    if (info === "social") {
      push(`${id}/${name}/social`, undefined, {scroll: false});
    }
    if (info === "reviews") {
      push(`${id}/${name}/reviews`, undefined, {scroll: false});
    }
    if (info === "watch") {
      push(`${id}/${name}/watch`, undefined, {scroll: false});
    }
  }

  return <AnimePageGrid>
    <AnimePageHeader>
      <div>
        <BannerImage src={data?.Media?.bannerImage ?? ''} alt={''}/>
        <HeaderGrid>
          <div>
            <AnimeImage src={data?.Media?.coverImage?.extraLarge ?? ''} alt={''}/>
            <button>Add to List</button>
          </div>
          <DescriptionGrid>
            <HeaderTitle>{data?.Media?.title?.romaji}</HeaderTitle>
            <HeaderDescription dangerouslySetInnerHTML={{ __html: data?.Media?.description ?? '' }}>{null}</HeaderDescription>
          <NavBar>
            <StyledLink onClick={() => { AnimePageInfo(null) }}>Overview</StyledLink>
            <StyledLink onClick={() => { AnimePageInfo('characters') }}>Characters</StyledLink>
            <StyledLink onClick={() => { AnimePageInfo('staff') }}>Staff</StyledLink>
            <StyledLink onClick={() => { AnimePageInfo('stats') }}>Stats</StyledLink>
            <StyledLink onClick={() => { AnimePageInfo('social') }}>Social</StyledLink>
            <StyledLink onClick={() => { AnimePageInfo('watch') }}>Watch</StyledLink>
            <StyledLink onClick={() => { AnimePageInfo('reviews') }}>Reviews</StyledLink>
          </NavBar>
          </DescriptionGrid>
        </HeaderGrid>
      </div>
    </AnimePageHeader>
    <AnimePageContent>
    <LeftContent>
      <LeftContainer>
        Genres
        <LeftTextStyle>{data?.Media?.genres?.map(mediaGenre => <div key={mediaGenre}>{mediaGenre}</div>)}</LeftTextStyle>
        Episodes
        <div><LeftTextStyle>{data?.Media?.episodes}</LeftTextStyle></div>
      </LeftContainer>
      Tags
      <div>{data?.Media?.tags?.map(mediaTag =>
          <TagContainer key={mediaTag?.name}>{mediaTag?.name}<div>{mediaTag?.rank}%</div></TagContainer>)}
      </div>
    </LeftContent>
    <RightContent>
      {AnimePageInfoReturn({info, relations})}
      <div>{data?.Media?.characters?.edges?.map(char => char?.name)}</div>
    </RightContent>
    </AnimePageContent>
  </AnimePageGrid>
}

const AnimePageGrid = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr; 
  grid-template-columns: 100%; 
  height: 100vh;
`

const AnimePageHeader = styled.div`
  background-color: #ccc;
  text-align: center;
`

const BannerImage = styled.img`
  width: 100%;
`
const HeaderDescription = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  
  &:hover{
    color: #99adbf;
    transition: 0.2s;
    
    overflow: initial;
  }
`
const HeaderTitle = styled.h1`
  color: #9FADBD;
`
const HeaderGrid = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 10% 70%;
  grid-column-gap: 7%;

  text-align: left;
  padding-left: 15%;
  
  background-color: #151F2E;
  color:  #728AA1;
`
const AnimeImage = styled.img`
  border-radius: 5px;
  width: 185px;
  height: 265px;
`

const DescriptionGrid = styled.div`
  display: grid;
  grid-template-rows: 30%;
`
const AnimePageContent = styled.div`
  display: grid;
  grid-template-columns: 30% 70%; 
  background-color: #0b1622;
`

const LeftContent = styled.div`
  text-align: center;
  padding: 20px;
  
  display: block;
  color: #9FADBD;
`
const LeftContainer = styled.section`
  background-color: #151f2e;
`
const LeftTextStyle = styled.span`
color: #8586A5;
`
const TagContainer = styled.div`
  height: 10%;
  width: 50%;
  
  background-color: #151f2e;
  color: #8586A5;
  
  margin: 10px;
  
  text-align: left;
  padding-left: 1%;
  
  display: flex;
  justify-content: space-between;
  
  box-shadow: #1f2126;
  //border-right: 5%;
`

const RightContent = styled.div`
  background-color: #888;
  text-align: center;
  padding: 20px;
`

const NavBar = styled.nav`
  height: 10%;
  
  display: flex;
  justify-content: space-around;
`
const StyledLink = styled.nav`
  color: #9FADBD;
  &:hover{
    color: #61dafb;
    transition: 0.2s;
  }
  text-decoration: none;
  
  cursor: pointer;
`
