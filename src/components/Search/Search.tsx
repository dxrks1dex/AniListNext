import React, { type JSX } from 'react'
import { SearchByName } from './SearchByName'
import { SearchByGenre } from './SearchByGenre'

import { SearchBar } from './searchStyleComponents/searchStyle'
import { SearchByYear } from './SearchByYear'
import { SearchBySeason } from './SearchBySeason'
import {useRouter} from "next/router";

export const Searcher = (): JSX.Element => {
    const {query, pathname, push} = useRouter()
    const genres = ['1', '2', '3']
    const queryParams = {...query, genres: genres };

    const handleClick = () => {
    if (!pathname.startsWith('/search/anime')) {
        push({
            pathname: 'search/anime/',
            query: queryParams,
        });
        console.log(pathname.startsWith('/search/anime'))
    } else if (query.sort !== undefined && query.sort[0] !== undefined){
        push({
            pathname: `/search/anime/${query.sort[0]}`,
            query: queryParams
        });
        console.log(query)
    } else {
        push ({
            pathname: pathname,
            query: queryParams
        })
        console.log('false way')
    }}
  return <><SearchBar>
      <SearchByName/>
      <SearchByGenre/>
      <SearchByYear/>
      <SearchBySeason/>
      <button onClick={handleClick}>Test</button>
    </SearchBar>

      {/* <SearchResult */}
      {/*  tagArr={tagArr} */}
      {/*  genreArr={genreArr} */}
      {/*  genreOrTag={ genreOrTag } */}
      {/*  foundByName={ foundByName } */}
      {/*  tags = {tag} */}
      {/*  year = {year} */}
      {/*  animeNameValue={handleNameFound} */}
      {/*  season={season} */}
      {/* ></SearchResult> */}
    </>
}
