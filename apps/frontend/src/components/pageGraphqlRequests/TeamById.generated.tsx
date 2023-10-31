import * as Types from '../../graphql/types';

import { gql } from '@apollo/client';
import { TeamDetailsFragmentDoc } from '../organisms/TeamDetails.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type TeamByIdQueryVariables = Types.Exact<{
  id: Types.Scalars['uuid'];
}>;


export type TeamByIdQuery = { __typename?: 'query_root', teams_by_pk?: { __typename?: 'teams', id: any, name: string, description?: string | null, creator?: { __typename?: 'users', email?: any | null, id: any } | null } | null };


export const TeamByIdDocument = gql`
    query TeamById($id: uuid!) {
  teams_by_pk(id: $id) {
    id
    name
    ...TeamDetails
  }
}
    ${TeamDetailsFragmentDoc}`;

/**
 * __useTeamByIdQuery__
 *
 * To run a query within a React component, call `useTeamByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeamByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeamByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTeamByIdQuery(baseOptions: Apollo.QueryHookOptions<TeamByIdQuery, TeamByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TeamByIdQuery, TeamByIdQueryVariables>(TeamByIdDocument, options);
      }
export function useTeamByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TeamByIdQuery, TeamByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TeamByIdQuery, TeamByIdQueryVariables>(TeamByIdDocument, options);
        }
export type TeamByIdQueryHookResult = ReturnType<typeof useTeamByIdQuery>;
export type TeamByIdLazyQueryHookResult = ReturnType<typeof useTeamByIdLazyQuery>;
export type TeamByIdQueryResult = Apollo.QueryResult<TeamByIdQuery, TeamByIdQueryVariables>;