import React, { useCallback, useMemo, useRef } from "react";
import { useSearchContext } from "~/components/Search/hooks/SearchContext";
import { useSearchResultQuery } from "~/enteris/anime/titleList.g";
import { GetSearchParams } from "~/components/Search/searchFunctions/searchParams";
import { usePaginateData } from "~/hooks/common/usePaginateData";
import { ContentContainer } from "~/common/mainContainer";
import { Searcher } from "~/components/Search/Search";
import { SearchResultGrid } from "~/components/Search/searchStyleComponents/searchResultComponentStyle";
import { AnimeCard } from "~/components/AnimeCard/AnimeCard";
import { useScrollListener } from "~/hooks/dom/useScrollListener";
import { isElementAtBottomOfPage } from "~/utilits/dom/isElementAtBottomOfPage";
import { Title } from "~/common/queryTitleStyle";
import Link from "next/link";
import { TopNumber } from "~/components/mainPageComponents/Top100/top100Style";

export default function TrendingNow() {
  // const [currentPage, setCurrentPage] = useState(1)
  const {
    data: { currentPage },
    operations: { setCurrentPage },
  } = useSearchContext();

  const { isLoading, error, data, isFetching } = useSearchResultQuery(
    GetSearchParams(currentPage),
    {
      keepPreviousData: true,
    },
  );

  const isFetchingRef = useRef(isFetching);
  isFetchingRef.current = isFetching;

  const paginatedData = usePaginateData({
    data: data?.Page?.media,
    currentPage,
  });

  const scrollHandler = useCallback(() => {
    if (isElementAtBottomOfPage() && !isFetchingRef.current) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  }, [setCurrentPage]);

  useScrollListener(scrollHandler);

  const paginatedItemsPrepared = useMemo(
    () =>
      paginatedData?.filter(Boolean) as Array<
        NonNullable<(typeof paginatedData)[number]>
      >,
    [paginatedData],
  );

  if (isLoading) return <>Loading...</>;

  if (error) return <>An error has occurred: {(error as Error).message}</>;

  return (
    <ContentContainer>
      <Link href={"/"}>Home Page</Link>
      <Title>TRENDING ANIME</Title>
      <Searcher />
      <SearchResultGrid>
        {paginatedItemsPrepared?.map((item, index) => (
          <>
            <AnimeCard
              key={item.id}
              {...item}
              index={index}
              currentPage={currentPage}
            />
          </>
        ))}
        {isFetching ? <>Loading...</> : null}
      </SearchResultGrid>
    </ContentContainer>
  );
}
