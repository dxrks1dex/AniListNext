import * as Types from '../../gql/types.g';

import { useQuery, UseQueryOptions } from 'react-query';
import { fetcher } from '~/gql/fetcher';
export type TrendingNowQueryVariables = Types.Exact<{
  page?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type TrendingNowQuery = { __typename?: 'Query', Page?: { __typename?: 'Page', media?: Array<{ __typename?: 'Media', id: number, coverImage?: { __typename?: 'MediaCoverImage', extraLarge?: string | null, color?: string | null } | null, title?: { __typename?: 'MediaTitle', romaji?: string | null } | null } | null> | null } | null };

export type AllTimePopularQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AllTimePopularQuery = { __typename?: 'Query', Page?: { __typename?: 'Page', media?: Array<{ __typename?: 'Media', id: number, coverImage?: { __typename?: 'MediaCoverImage', extraLarge?: string | null, color?: string | null } | null, title?: { __typename?: 'MediaTitle', romaji?: string | null } | null } | null> | null } | null };

export type Top100QueryVariables = Types.Exact<{ [key: string]: never; }>;


export type Top100Query = { __typename?: 'Query', Page?: { __typename?: 'Page', media?: Array<{ __typename?: 'Media', id: number, genres?: Array<string | null> | null, meanScore?: number | null, popularity?: number | null, format?: Types.MediaFormat | null, episodes?: number | null, season?: Types.MediaSeason | null, status?: Types.MediaStatus | null, duration?: number | null, coverImage?: { __typename?: 'MediaCoverImage', medium?: string | null, color?: string | null } | null, title?: { __typename?: 'MediaTitle', romaji?: string | null } | null } | null> | null } | null };

export type PopularThisSeasonAndUpcomingQueryVariables = Types.Exact<{
  season?: Types.InputMaybe<Types.MediaSeason>;
  seasonYear?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type PopularThisSeasonAndUpcomingQuery = { __typename?: 'Query', Page?: { __typename?: 'Page', media?: Array<{ __typename?: 'Media', id: number, coverImage?: { __typename?: 'MediaCoverImage', extraLarge?: string | null, color?: string | null } | null, title?: { __typename?: 'MediaTitle', romaji?: string | null } | null } | null> | null } | null };

export type GenreAndTagCollectionQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GenreAndTagCollectionQuery = { __typename?: 'Query', GenreCollection?: Array<string | null> | null, MediaTagCollection?: Array<{ __typename?: 'MediaTag', name: string, isAdult?: boolean | null } | null> | null };

export type SearchResultQueryVariables = Types.Exact<{
  page?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  genre?: Types.InputMaybe<Array<Types.InputMaybe<Types.Scalars['String']['input']>> | Types.InputMaybe<Types.Scalars['String']['input']>>;
  year?: Types.InputMaybe<Types.Scalars['String']['input']>;
  tag?: Types.InputMaybe<Array<Types.InputMaybe<Types.Scalars['String']['input']>> | Types.InputMaybe<Types.Scalars['String']['input']>>;
  season?: Types.InputMaybe<Types.MediaSeason>;
  sort?: Types.InputMaybe<Array<Types.InputMaybe<Types.MediaSort>> | Types.InputMaybe<Types.MediaSort>>;
  search?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type SearchResultQuery = { __typename?: 'Query', Page?: { __typename?: 'Page', media?: Array<{ __typename?: 'Media', id: number, genres?: Array<string | null> | null, meanScore?: number | null, popularity?: number | null, format?: Types.MediaFormat | null, episodes?: number | null, season?: Types.MediaSeason | null, status?: Types.MediaStatus | null, duration?: number | null, coverImage?: { __typename?: 'MediaCoverImage', extraLarge?: string | null, color?: string | null } | null, title?: { __typename?: 'MediaTitle', romaji?: string | null } | null, tags?: Array<{ __typename?: 'MediaTag', name: string } | null> | null, startDate?: { __typename?: 'FuzzyDate', year?: number | null } | null } | null> | null } | null };

export type MediaAnimeQueryVariables = Types.Exact<{
  id?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  page?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type MediaAnimeQuery = { __typename?: 'Query', Media?: { __typename?: 'Media', id: number, description?: string | null, season?: Types.MediaSeason | null, seasonYear?: number | null, type?: Types.MediaType | null, format?: Types.MediaFormat | null, status?: Types.MediaStatus | null, episodes?: number | null, duration?: number | null, chapters?: number | null, volumes?: number | null, meanScore?: number | null, averageScore?: number | null, popularity?: number | null, favourites?: number | null, genres?: Array<string | null> | null, bannerImage?: string | null, characters?: { __typename?: 'CharacterConnection', edges?: Array<{ __typename?: 'CharacterEdge', id?: number | null, role?: Types.CharacterRole | null, name?: string | null, voiceActorRoles?: Array<{ __typename?: 'StaffRoleType', roleNotes?: string | null, dubGroup?: string | null, voiceActor?: { __typename?: 'Staff', id: number, language?: string | null, name?: { __typename?: 'StaffName', userPreferred?: string | null } | null, image?: { __typename?: 'StaffImage', large?: string | null } | null } | null } | null> | null, node?: { __typename?: 'Character', id: number, name?: { __typename?: 'CharacterName', userPreferred?: string | null } | null, image?: { __typename?: 'CharacterImage', large?: string | null } | null } | null } | null> | null } | null, title?: { __typename?: 'MediaTitle', romaji?: string | null, english?: string | null, native?: string | null } | null, tags?: Array<{ __typename?: 'MediaTag', name: string, rank?: number | null, description?: string | null } | null> | null, coverImage?: { __typename?: 'MediaCoverImage', extraLarge?: string | null } | null, relations?: { __typename?: 'MediaConnection', nodes?: Array<{ __typename?: 'Media', id: number, type?: Types.MediaType | null, title?: { __typename?: 'MediaTitle', romaji?: string | null } | null, coverImage?: { __typename?: 'MediaCoverImage', extraLarge?: string | null } | null } | null> | null, edges?: Array<{ __typename?: 'MediaEdge', id?: number | null, characterRole?: Types.CharacterRole | null, characters?: Array<{ __typename?: 'Character', id: number, name?: { __typename?: 'CharacterName', full?: string | null } | null } | null> | null } | null> | null } | null } | null };



export const TrendingNowDocument = `
    query trendingNow($page: Int = 1) {
  Page(page: $page, perPage: 20) {
    media(sort: TRENDING_DESC, type: ANIME) {
      id
      coverImage {
        extraLarge
        color
      }
      title {
        romaji
      }
    }
  }
}
    `;

export const useTrendingNowQuery = <
      TData = TrendingNowQuery,
      TError = unknown
    >(
      variables?: TrendingNowQueryVariables,
      options?: UseQueryOptions<TrendingNowQuery, TError, TData>
    ) => {
    
    return useQuery<TrendingNowQuery, TError, TData>(
      variables === undefined ? ['trendingNow'] : ['trendingNow', variables],
      fetcher<TrendingNowQuery, TrendingNowQueryVariables>(TrendingNowDocument, variables),
      options
    )};

export const AllTimePopularDocument = `
    query allTimePopular {
  Page(page: 1, perPage: 6) {
    media(sort: POPULARITY_DESC, type: ANIME) {
      id
      coverImage {
        extraLarge
        color
      }
      title {
        romaji
      }
    }
  }
}
    `;

export const useAllTimePopularQuery = <
      TData = AllTimePopularQuery,
      TError = unknown
    >(
      variables?: AllTimePopularQueryVariables,
      options?: UseQueryOptions<AllTimePopularQuery, TError, TData>
    ) => {
    
    return useQuery<AllTimePopularQuery, TError, TData>(
      variables === undefined ? ['allTimePopular'] : ['allTimePopular', variables],
      fetcher<AllTimePopularQuery, AllTimePopularQueryVariables>(AllTimePopularDocument, variables),
      options
    )};

export const Top100Document = `
    query top100 {
  Page(page: 1) {
    media(sort: SCORE_DESC, type: ANIME) {
      id
      coverImage {
        medium
        color
      }
      title {
        romaji
      }
      genres
      meanScore
      popularity
      format
      episodes
      season
      status
      duration
    }
  }
}
    `;

export const useTop100Query = <
      TData = Top100Query,
      TError = unknown
    >(
      variables?: Top100QueryVariables,
      options?: UseQueryOptions<Top100Query, TError, TData>
    ) => {
    
    return useQuery<Top100Query, TError, TData>(
      variables === undefined ? ['top100'] : ['top100', variables],
      fetcher<Top100Query, Top100QueryVariables>(Top100Document, variables),
      options
    )};

export const PopularThisSeasonAndUpcomingDocument = `
    query popularThisSeasonAndUpcoming($season: MediaSeason, $seasonYear: Int) {
  Page(page: 1, perPage: 6) {
    media(
      type: ANIME
      sort: POPULARITY_DESC
      season: $season
      seasonYear: $seasonYear
    ) {
      id
      coverImage {
        extraLarge
        color
      }
      title {
        romaji
      }
    }
  }
}
    `;

export const usePopularThisSeasonAndUpcomingQuery = <
      TData = PopularThisSeasonAndUpcomingQuery,
      TError = unknown
    >(
      variables?: PopularThisSeasonAndUpcomingQueryVariables,
      options?: UseQueryOptions<PopularThisSeasonAndUpcomingQuery, TError, TData>
    ) => {
    
    return useQuery<PopularThisSeasonAndUpcomingQuery, TError, TData>(
      variables === undefined ? ['popularThisSeasonAndUpcoming'] : ['popularThisSeasonAndUpcoming', variables],
      fetcher<PopularThisSeasonAndUpcomingQuery, PopularThisSeasonAndUpcomingQueryVariables>(PopularThisSeasonAndUpcomingDocument, variables),
      options
    )};

export const GenreAndTagCollectionDocument = `
    query GenreAndTagCollection {
  GenreCollection
  MediaTagCollection {
    name
    isAdult
  }
}
    `;

export const useGenreAndTagCollectionQuery = <
      TData = GenreAndTagCollectionQuery,
      TError = unknown
    >(
      variables?: GenreAndTagCollectionQueryVariables,
      options?: UseQueryOptions<GenreAndTagCollectionQuery, TError, TData>
    ) => {
    
    return useQuery<GenreAndTagCollectionQuery, TError, TData>(
      variables === undefined ? ['GenreAndTagCollection'] : ['GenreAndTagCollection', variables],
      fetcher<GenreAndTagCollectionQuery, GenreAndTagCollectionQueryVariables>(GenreAndTagCollectionDocument, variables),
      options
    )};

export const SearchResultDocument = `
    query searchResult($page: Int = 1, $genre: [String], $year: String, $tag: [String], $season: MediaSeason, $sort: [MediaSort] = [POPULARITY_DESC, SCORE_DESC], $search: String) {
  Page(page: $page, perPage: 20) {
    media(
      sort: $sort
      type: ANIME
      genre_in: $genre
      startDate_like: $year
      tag_in: $tag
      season: $season
      search: $search
    ) {
      id
      coverImage {
        extraLarge
        color
      }
      title {
        romaji
      }
      genres
      meanScore
      popularity
      format
      episodes
      season
      status
      id
      duration
      tags {
        name
      }
      startDate {
        year
      }
    }
  }
}
    `;

export const useSearchResultQuery = <
      TData = SearchResultQuery,
      TError = unknown
    >(
      variables?: SearchResultQueryVariables,
      options?: UseQueryOptions<SearchResultQuery, TError, TData>
    ) => {
    
    return useQuery<SearchResultQuery, TError, TData>(
      variables === undefined ? ['searchResult'] : ['searchResult', variables],
      fetcher<SearchResultQuery, SearchResultQueryVariables>(SearchResultDocument, variables),
      options
    )};

export const MediaAnimeDocument = `
    query MediaAnime($id: Int, $page: Int) {
  Media(id: $id, type: ANIME) {
    characters(sort: [ROLE, RELEVANCE, ID], page: $page) {
      edges {
        id
        role
        name
        voiceActorRoles(sort: [RELEVANCE, ID]) {
          roleNotes
          dubGroup
          voiceActor {
            id
            name {
              userPreferred
            }
            language: languageV2
            image {
              large
            }
          }
        }
        node {
          id
          name {
            userPreferred
          }
          image {
            large
          }
        }
      }
    }
    id
    description
    season
    seasonYear
    type
    format
    status(version: 2)
    episodes
    duration
    chapters
    volumes
    meanScore
    averageScore
    popularity
    favourites
    title {
      romaji
      english
      native
    }
    genres
    tags {
      name
      rank
      description
    }
    bannerImage
    coverImage {
      extraLarge
    }
    relations {
      nodes {
        id
        type
        title {
          romaji
        }
        coverImage {
          extraLarge
        }
      }
      edges {
        id
        characters {
          name {
            full
          }
          id
        }
        characterRole
      }
    }
  }
}
    `;

export const useMediaAnimeQuery = <
      TData = MediaAnimeQuery,
      TError = unknown
    >(
      variables?: MediaAnimeQueryVariables,
      options?: UseQueryOptions<MediaAnimeQuery, TError, TData>
    ) => {
    
    return useQuery<MediaAnimeQuery, TError, TData>(
      variables === undefined ? ['MediaAnime'] : ['MediaAnime', variables],
      fetcher<MediaAnimeQuery, MediaAnimeQueryVariables>(MediaAnimeDocument, variables),
      options
    )};
