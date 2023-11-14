import * as Types from '../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GameJoinMutationVariables = Types.Exact<{
  gameId: Types.Scalars['uuid'];
}>;


export type GameJoinMutation = { __typename?: 'mutation_root', insert_user_game_one?: { __typename?: 'user_game', id: string, userId: string, gameId: string } | null };

export type GameJoinConnectedFragment = { __typename?: 'games', id: string, joinedByUser?: boolean | null, user_games: Array<{ __typename?: 'user_game', id: string, userId: string, gameId: string }> };

export const GameJoinConnectedFragmentDoc = gql`
    fragment GameJoinConnected on games {
  id
  joinedByUser
  user_games {
    id
    userId
    gameId
  }
}
    `;
export const GameJoinDocument = gql`
    mutation GameJoin($gameId: uuid!) {
  insert_user_game_one(object: {gameId: $gameId}) {
    id
    userId
    gameId
  }
}
    `;
export type GameJoinMutationFn = Apollo.MutationFunction<GameJoinMutation, GameJoinMutationVariables>;

/**
 * __useGameJoinMutation__
 *
 * To run a mutation, you first call `useGameJoinMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGameJoinMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [gameJoinMutation, { data, loading, error }] = useGameJoinMutation({
 *   variables: {
 *      gameId: // value for 'gameId'
 *   },
 * });
 */
export function useGameJoinMutation(baseOptions?: Apollo.MutationHookOptions<GameJoinMutation, GameJoinMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GameJoinMutation, GameJoinMutationVariables>(GameJoinDocument, options);
      }
export type GameJoinMutationHookResult = ReturnType<typeof useGameJoinMutation>;
export type GameJoinMutationResult = Apollo.MutationResult<GameJoinMutation>;
export type GameJoinMutationOptions = Apollo.BaseMutationOptions<GameJoinMutation, GameJoinMutationVariables>;