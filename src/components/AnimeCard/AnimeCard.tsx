import React from "react";
import {
  AnimeComponentStyle,
  AnimeImage,
  AnimeTitleStyle,
} from "~/components/mainPageComponents/TrendingNow/animeComponentTrendingNow";
import Link from "next/link";
import { GetSearchParams } from "~/components/Search/searchFunctions/searchParams";
import { TopNumber } from "~/components/mainPageComponents/Top100/top100Style";

type Props = {
  id: number;
  coverImage?: {
    color?: string | null;
    extraLarge?: string | null;
  } | null;
  title?: {
    romaji?: string | null;
  } | null;
  currentPage: number;
  index: number;
};

export function AnimeCard({
  id,
  coverImage,
  title,
  currentPage,
  index,
}: Props): JSX.Element {
  return (
    <Link
      href={{
        pathname: `/anime/[id]/[name]`,
        query: { id: id, name: title?.romaji },
      }}
    >
      <AnimeComponentStyle hoverColor={coverImage?.color}>
        {GetSearchParams(currentPage).sort === "SCORE_DESC" ? (
          <TopNumber circleColor={coverImage?.color}>#{index + 1}</TopNumber>
        ) : null}
        {coverImage?.extraLarge && <AnimeImage src={coverImage.extraLarge} />}
        <div style={{ cursor: "pointer" }}>
          <AnimeTitleStyle>{title?.romaji}</AnimeTitleStyle>
        </div>
      </AnimeComponentStyle>
    </Link>
  );
}
