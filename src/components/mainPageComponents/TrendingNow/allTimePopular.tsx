import React, { type JSX } from 'react'
import {
  AnimeSection,
  ListName,
  ViewAll
} from './animeComponentTrendingNow'

import {AnimeCard} from "~/components/AnimeCard/AnimeCard";
import {useAllTimePopularQuery} from "~/enteris/anime/titleList.g";
import Link from "next/link";

export const AllTimePopular = (): JSX.Element => {
  const { isLoading, error, data } = useAllTimePopularQuery({

  })
  if (isLoading) return <>Loading...</>
  if (error) return <>An error has occurred: {(error as Error).message}</>

  const allTimePopularArr = data?.Page?.media
  const allTimePopularSlice = allTimePopularArr?.slice(0, 5) as Array<NonNullable<typeof allTimePopularArr[number]>>

  return <><Link href={'search/anime/all-time-popular'}><ListName>ALL TIME POPULAR <ViewAll>View All</ViewAll></ListName></Link>
        <AnimeSection>
            {allTimePopularSlice?.map(item => <AnimeCard key={item.id} {...item}/>)}
        </AnimeSection>
    </>
}
