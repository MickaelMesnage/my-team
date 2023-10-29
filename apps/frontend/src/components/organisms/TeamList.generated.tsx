import * as Types from '../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type TeamListQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type TeamListQuery = { __typename?: 'query_root', teams: Array<{ __typename?: 'teams', id: any, name: string }> };


export const TeamListDocument = gql`
    query TeamList {
  teams {
    id
    name
  }
}
    `;

/**
 * __useTeamListQuery__
 *
 * To run a query within a React component, call `useTeamListQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeamListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeamListQuery({
 *   variables: {
 *   },
 * });
 */
export function useTeamListQuery(baseOptions?: Apollo.QueryHookOptions<TeamListQuery, TeamListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TeamListQuery, TeamListQueryVariables>(TeamListDocument, options);
      }
export function useTeamListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TeamListQuery, TeamListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TeamListQuery, TeamListQueryVariables>(TeamListDocument, options);
        }
export type TeamListQueryHookResult = ReturnType<typeof useTeamListQuery>;
export type TeamListLazyQueryHookResult = ReturnType<typeof useTeamListLazyQuery>;
export type TeamListQueryResult = Apollo.QueryResult<TeamListQuery, TeamListQueryVariables>;