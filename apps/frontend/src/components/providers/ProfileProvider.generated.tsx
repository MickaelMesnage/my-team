import * as Types from '../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ProfileSubscriptionVariables = Types.Exact<{
  userId: Types.Scalars['uuid'];
}>;


export type ProfileSubscription = { __typename?: 'subscription_root', profiles_by_pk?: { __typename?: 'profiles', avatar?: string | null } | null };


export const ProfileDocument = gql`
    subscription Profile($userId: uuid!) {
  profiles_by_pk(userId: $userId) {
    avatar
  }
}
    `;

/**
 * __useProfileSubscription__
 *
 * To run a query within a React component, call `useProfileSubscription` and pass it any options that fit your needs.
 * When your component renders, `useProfileSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfileSubscription({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useProfileSubscription(baseOptions: Apollo.SubscriptionHookOptions<ProfileSubscription, ProfileSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<ProfileSubscription, ProfileSubscriptionVariables>(ProfileDocument, options);
      }
export type ProfileSubscriptionHookResult = ReturnType<typeof useProfileSubscription>;
export type ProfileSubscriptionResult = Apollo.SubscriptionResult<ProfileSubscription>;