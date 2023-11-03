import * as Types from '../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type TeamSelectQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type TeamSelectQuery = { __typename?: 'query_root', teams: Array<{ __typename?: 'teams', id: any, name: string }> };


export const TeamSelectDocument = gql`
    query TeamSelect {
  teams {
    id
    name
  }
}
    `;

/**
 * __useTeamSelectQuery__
 *
 * To run a query within a React component, call `useTeamSelectQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeamSelectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeamSelectQuery({
 *   variables: {
 *   },
 * });
 */
export function useTeamSelectQuery(baseOptions?: Apollo.QueryHookOptions<TeamSelectQuery, TeamSelectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TeamSelectQuery, TeamSelectQueryVariables>(TeamSelectDocument, options);
      }
export function useTeamSelectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TeamSelectQuery, TeamSelectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TeamSelectQuery, TeamSelectQueryVariables>(TeamSelectDocument, options);
        }
export type TeamSelectQueryHookResult = ReturnType<typeof useTeamSelectQuery>;
export type TeamSelectLazyQueryHookResult = ReturnType<typeof useTeamSelectLazyQuery>;
export type TeamSelectQueryResult = Apollo.QueryResult<TeamSelectQuery, TeamSelectQueryVariables>;