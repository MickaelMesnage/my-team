import * as Types from '../../graphql/types';

import { gql } from '@apollo/client';
import { GameListCardFragmentDoc } from '../organisms/game/GameListCard.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GameListPageSubscriptionVariables = Types.Exact<{ [key: string]: never; }>;


export type GameListPageSubscription = { __typename?: 'subscription_root', games: Array<{ __typename?: 'games', id: any, timestamp: any, joinedByUser?: boolean | null, creator: { __typename?: 'users', email?: any | null, displayName: string }, user_games: Array<{ __typename?: 'user_game', user: { __typename?: 'users', email?: any | null, displayName: string, profile?: { __typename?: 'profiles', avatar?: string | null } | null } }> }> };


export const GameListPageDocument = gql`
    subscription GameListPage {
  games {
    id
    ...GameListCard
  }
}
    ${GameListCardFragmentDoc}`;

/**
 * __useGameListPageSubscription__
 *
 * To run a query within a React component, call `useGameListPageSubscription` and pass it any options that fit your needs.
 * When your component renders, `useGameListPageSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGameListPageSubscription({
 *   variables: {
 *   },
 * });
 */
export function useGameListPageSubscription(baseOptions?: Apollo.SubscriptionHookOptions<GameListPageSubscription, GameListPageSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<GameListPageSubscription, GameListPageSubscriptionVariables>(GameListPageDocument, options);
      }
export type GameListPageSubscriptionHookResult = ReturnType<typeof useGameListPageSubscription>;
export type GameListPageSubscriptionResult = Apollo.SubscriptionResult<GameListPageSubscription>;