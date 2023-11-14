import * as Types from '../../graphql/types';

import { gql } from '@apollo/client';
import { GameListCardFragmentDoc } from '../organisms/game/GameListCard.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GameListPageQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GameListPageQuery = { __typename?: 'query_root', games: Array<{ __typename?: 'games', id: string, timestamp: string, joinedByUser?: boolean | null, status?: Types.Game_Status_Enum | null, creator: { __typename?: 'users', email?: string | null, displayName: string }, user_games: Array<{ __typename?: 'user_game', id: string, userId: string, gameId: string, user: { __typename?: 'users', email?: string | null, displayName: string, profile?: { __typename?: 'profiles', avatar?: string | null } | null } }> }> };


export const GameListPageDocument = gql`
    query GameListPage {
  games {
    id
    ...GameListCard
  }
}
    ${GameListCardFragmentDoc}`;

/**
 * __useGameListPageQuery__
 *
 * To run a query within a React component, call `useGameListPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGameListPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGameListPageQuery({
 *   variables: {
 *   },
 * });
 */
export function useGameListPageQuery(baseOptions?: Apollo.QueryHookOptions<GameListPageQuery, GameListPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GameListPageQuery, GameListPageQueryVariables>(GameListPageDocument, options);
      }
export function useGameListPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GameListPageQuery, GameListPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GameListPageQuery, GameListPageQueryVariables>(GameListPageDocument, options);
        }
export type GameListPageQueryHookResult = ReturnType<typeof useGameListPageQuery>;
export type GameListPageLazyQueryHookResult = ReturnType<typeof useGameListPageLazyQuery>;
export type GameListPageQueryResult = Apollo.QueryResult<GameListPageQuery, GameListPageQueryVariables>;