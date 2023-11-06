import * as Types from '../../graphql/types';

import { gql } from '@apollo/client';
import { ProfileFormConnectedFragmentDoc } from '../organisms/ProfileFormConnected.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ProfilePageSubscriptionVariables = Types.Exact<{
  userId: Types.Scalars['uuid'];
}>;


export type ProfilePageSubscription = { __typename?: 'subscription_root', user?: { __typename?: 'users', displayName: string, profile?: { __typename?: 'profiles', avatar?: string | null } | null } | null };


export const ProfilePageDocument = gql`
    subscription ProfilePage($userId: uuid!) {
  user(id: $userId) {
    ...ProfileFormConnected
  }
}
    ${ProfileFormConnectedFragmentDoc}`;

/**
 * __useProfilePageSubscription__
 *
 * To run a query within a React component, call `useProfilePageSubscription` and pass it any options that fit your needs.
 * When your component renders, `useProfilePageSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfilePageSubscription({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useProfilePageSubscription(baseOptions: Apollo.SubscriptionHookOptions<ProfilePageSubscription, ProfilePageSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<ProfilePageSubscription, ProfilePageSubscriptionVariables>(ProfilePageDocument, options);
      }
export type ProfilePageSubscriptionHookResult = ReturnType<typeof useProfilePageSubscription>;
export type ProfilePageSubscriptionResult = Apollo.SubscriptionResult<ProfilePageSubscription>;