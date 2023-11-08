import * as Types from '../../graphql/types';

import { gql } from '@apollo/client';
import { TeamListCardFragmentDoc } from '../organisms/team/TeamListCard.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type TeamListPageSubscriptionVariables = Types.Exact<{ [key: string]: never; }>;


export type TeamListPageSubscription = { __typename?: 'subscription_root', teams: Array<{ __typename?: 'teams', id: any, name: string, description?: string | null, creator?: { __typename?: 'users', email?: any | null } | null, user_teams: Array<{ __typename?: 'user_team', user?: { __typename?: 'users', email?: any | null } | null }> }> };


export const TeamListPageDocument = gql`
    subscription TeamListPage {
  teams {
    id
    name
    ...TeamListCard
  }
}
    ${TeamListCardFragmentDoc}`;

/**
 * __useTeamListPageSubscription__
 *
 * To run a query within a React component, call `useTeamListPageSubscription` and pass it any options that fit your needs.
 * When your component renders, `useTeamListPageSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeamListPageSubscription({
 *   variables: {
 *   },
 * });
 */
export function useTeamListPageSubscription(baseOptions?: Apollo.SubscriptionHookOptions<TeamListPageSubscription, TeamListPageSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<TeamListPageSubscription, TeamListPageSubscriptionVariables>(TeamListPageDocument, options);
      }
export type TeamListPageSubscriptionHookResult = ReturnType<typeof useTeamListPageSubscription>;
export type TeamListPageSubscriptionResult = Apollo.SubscriptionResult<TeamListPageSubscription>;