import * as Types from '../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UserInfoQueryVariables = Types.Exact<{
  userId: Types.Scalars['uuid'];
}>;


export type UserInfoQuery = { __typename?: 'query_root', user?: { __typename?: 'users', displayName: string, profile?: { __typename?: 'profiles', avatar?: string | null } | null } | null };


export const UserInfoDocument = gql`
    query UserInfo($userId: uuid!) {
  user(id: $userId) {
    displayName
    profile {
      avatar
    }
  }
}
    `;

/**
 * __useUserInfoQuery__
 *
 * To run a query within a React component, call `useUserInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserInfoQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUserInfoQuery(baseOptions: Apollo.QueryHookOptions<UserInfoQuery, UserInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserInfoQuery, UserInfoQueryVariables>(UserInfoDocument, options);
      }
export function useUserInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserInfoQuery, UserInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserInfoQuery, UserInfoQueryVariables>(UserInfoDocument, options);
        }
export type UserInfoQueryHookResult = ReturnType<typeof useUserInfoQuery>;
export type UserInfoLazyQueryHookResult = ReturnType<typeof useUserInfoLazyQuery>;
export type UserInfoQueryResult = Apollo.QueryResult<UserInfoQuery, UserInfoQueryVariables>;