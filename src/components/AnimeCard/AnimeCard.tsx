import React from 'react'
import {
  AnimeComponentStyle,
  AnimeImage,
  AnimeTitleStyle
} from "~/components/mainPageComponents/TrendingNow/animeComponentTrendingNow";
import Link from "next/link";


type Props = {
  id: number
  coverImage?: {
    color?: string | null
    extraLarge?: string | null
  } | null
  title?: {
    romaji?: string | null
  } | null
}

export function AnimeCard ({ id, coverImage, title }: Props): JSX.Element {
  return <Link href={`/anime/${id}/${title?.romaji}`}><AnimeComponentStyle hoverColor={coverImage?.color}>
    {coverImage?.extraLarge && <AnimeImage src = {coverImage.extraLarge}/>}
    <div style={{ cursor: 'pointer' }}>
      <AnimeTitleStyle>
        {title?.romaji}
      </AnimeTitleStyle>
    </div>
  </AnimeComponentStyle></Link>
}
