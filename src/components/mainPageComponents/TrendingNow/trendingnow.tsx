import {
  AnimeSection,
  ListName,
  ViewAll
} from './animeComponentTrendingNow'
import React, { type JSX } from 'react'
import {useTrendingNowQuery} from "~/enteris/anime/titleList.g";
import {AnimeCard} from "~/components/AnimeCard/AnimeCard";
import Link from "next/link";

export const TrendingNow = (): JSX.Element => {
  const { isLoading, error, data } = useTrendingNowQuery({
  })

  if (isLoading) return <>Loading...</>

  if (error) return <>An error has occurred: {(error as Error).message}</>

  const trendingArr = data?.Page?.media
  const trendingSplice = trendingArr?.slice(0, 5) as Array<NonNullable<typeof trendingArr[number]>>

  return <><Link href='search/anime/trending'><ListName>TRENDING NOW <ViewAll>View All</ViewAll></ListName></Link>
    <AnimeSection>
        {trendingSplice?.map(item => <AnimeCard key={item?.id} {...item} />)}
    </AnimeSection>
</>
}
