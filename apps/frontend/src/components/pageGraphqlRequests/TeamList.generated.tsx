import * as Types from '../../graphql/types';

import { gql } from '@apollo/client';
import { TeamListCardFragmentDoc } from '../organisms/TeamListCard.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type TeamListSubscriptionVariables = Types.Exact<{ [key: string]: never; }>;


export type TeamListSubscription = { __typename?: 'subscription_root', teams: Array<{ __typename?: 'teams', id: any, name: string, description?: string | null, creator?: { __typename?: 'users', email?: any | null } | null, user_teams: Array<{ __typename?: 'user_team', members: Array<{ __typename?: 'users', email?: any | null }> }> }> };


export const TeamListDocument = gql`
    subscription TeamList {
  teams {
    id
    name
    ...TeamListCard
  }
}
    ${TeamListCardFragmentDoc}`;

/**
 * __useTeamListSubscription__
 *
 * To run a query within a React component, call `useTeamListSubscription` and pass it any options that fit your needs.
 * When your component renders, `useTeamListSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeamListSubscription({
 *   variables: {
 *   },
 * });
 */
export function useTeamListSubscription(baseOptions?: Apollo.SubscriptionHookOptions<TeamListSubscription, TeamListSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<TeamListSubscription, TeamListSubscriptionVariables>(TeamListDocument, options);
      }
export type TeamListSubscriptionHookResult = ReturnType<typeof useTeamListSubscription>;
export type TeamListSubscriptionResult = Apollo.SubscriptionResult<TeamListSubscription>;