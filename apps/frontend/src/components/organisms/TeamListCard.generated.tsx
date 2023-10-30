import * as Types from '../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type TeamListCardFragment = { __typename?: 'teams', id: any, name: string, description?: string | null, creator?: { __typename?: 'users', email?: any | null } | null };

export type UserTestQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type UserTestQuery = { __typename?: 'query_root', users: Array<{ __typename?: 'users', email?: any | null }> };

export const TeamListCardFragmentDoc = gql`
    fragment TeamListCard on teams {
  id
  name
  description
  creator {
    email
  }
}
    `;
export const UserTestDocument = gql`
    query UserTest {
  users {
    email
  }
}
    `;

/**
 * __useUserTestQuery__
 *
 * To run a query within a React component, call `useUserTestQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserTestQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserTestQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserTestQuery(baseOptions?: Apollo.QueryHookOptions<UserTestQuery, UserTestQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserTestQuery, UserTestQueryVariables>(UserTestDocument, options);
      }
export function useUserTestLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserTestQuery, UserTestQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserTestQuery, UserTestQueryVariables>(UserTestDocument, options);
        }
export type UserTestQueryHookResult = ReturnType<typeof useUserTestQuery>;
export type UserTestLazyQueryHookResult = ReturnType<typeof useUserTestLazyQuery>;
export type UserTestQueryResult = Apollo.QueryResult<UserTestQuery, UserTestQueryVariables>;