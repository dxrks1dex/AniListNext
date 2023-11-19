import {
  AnimeSection,
  ListName,
  ViewAll
} from './animeComponentTrendingNow'
import React, { type JSX } from 'react'
import {usePopularThisSeasonAndUpcomingQuery} from "~/enteris/anime/titleList.g";
import Link from "next/link";
import {AnimeCard} from "~/components/AnimeCard/AnimeCard";

export const UpcomingNextSeason = (): JSX.Element => {
  const { isLoading, error, data } = usePopularThisSeasonAndUpcomingQuery({
    season: "WINTER",
    seasonYear: 2024
  })

  if (isLoading) return <>Loading...</>

  if (error) return <>An error has occurred: {(error as Error).message}</>

  const upcomingNextSeason = data?.Page?.media
  const upcomingNextSeasonSlice = upcomingNextSeason?.slice(0, 5) as Array<NonNullable<typeof upcomingNextSeason[number]>>

  return <><Link href={'search/anime/next-season'}><ListName>UPCOMING NEXT SEASON<ViewAll>View All</ViewAll></ListName></Link>
        <AnimeSection>
            {upcomingNextSeasonSlice?.map(item => <AnimeCard key={item.id} {...item}/>)}
        </AnimeSection>
    </>
}
