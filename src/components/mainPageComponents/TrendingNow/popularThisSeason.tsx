import {
  AnimeSection,
  ListName,
  ViewAll
} from './animeComponentTrendingNow'
import React, { type JSX } from 'react'


import {usePopularThisSeasonAndUpcomingQuery} from "~/enteris/anime/titleList.g";
import {AnimeCard} from "~/components/AnimeCard/AnimeCard";
import Link from "next/link";

export const PopularThisSeason = (): JSX.Element => {
  const { isLoading, error, data } = usePopularThisSeasonAndUpcomingQuery({
    season: "FALL",
    seasonYear: 2023
  })

  if (isLoading) return <>Loading...</>

  if (error) return <>An error has occurred: {(error as Error).message}</>

  const popularThisSeason = data?.Page?.media
  const popularThisSeasonSlice = popularThisSeason?.slice(0, 5) as Array<NonNullable<typeof popularThisSeason[number]>>

  return <><Link href='search/anime/this-season'><ListName>POPULAR THIS SEASON <ViewAll>View All</ViewAll></ListName></Link>
        <AnimeSection>
            {popularThisSeasonSlice?.map(item => <AnimeCard key={item.id} {...item}/>)}
        </AnimeSection>
    </>
}
