import * as Types from '../../graphql/types';

import { gql } from '@apollo/client';
import { GameListCardFragmentDoc } from '../organisms/GameListCard.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GameListSubscriptionVariables = Types.Exact<{ [key: string]: never; }>;


export type GameListSubscription = { __typename?: 'subscription_root', games: Array<{ __typename?: 'games', id: any, timestamp: any, joinedByUser?: boolean | null, creator: { __typename?: 'users', email?: any | null }, user_games: Array<{ __typename?: 'user_game', id: any, user: { __typename?: 'users', email?: any | null } }> }> };


export const GameListDocument = gql`
    subscription GameList {
  games {
    id
    ...GameListCard
  }
}
    ${GameListCardFragmentDoc}`;

/**
 * __useGameListSubscription__
 *
 * To run a query within a React component, call `useGameListSubscription` and pass it any options that fit your needs.
 * When your component renders, `useGameListSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGameListSubscription({
 *   variables: {
 *   },
 * });
 */
export function useGameListSubscription(baseOptions?: Apollo.SubscriptionHookOptions<GameListSubscription, GameListSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<GameListSubscription, GameListSubscriptionVariables>(GameListDocument, options);
      }
export type GameListSubscriptionHookResult = ReturnType<typeof useGameListSubscription>;
export type GameListSubscriptionResult = Apollo.SubscriptionResult<GameListSubscription>;