import * as Types from '../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GameLeaveMutationVariables = Types.Exact<{
  id: Types.Scalars['uuid'];
}>;


export type GameLeaveMutation = { __typename?: 'mutation_root', delete_user_game_by_pk?: { __typename?: 'user_game', id: string } | null };

export type GameLeaveConnectedFragment = { __typename?: 'games', id: string, joinedByUser?: boolean | null, user_games: Array<{ __typename?: 'user_game', id: string, userId: string }> };

export const GameLeaveConnectedFragmentDoc = gql`
    fragment GameLeaveConnected on games {
  id
  joinedByUser
  user_games {
    id
    userId
  }
}
    `;
export const GameLeaveDocument = gql`
    mutation GameLeave($id: uuid!) {
  delete_user_game_by_pk(id: $id) {
    id
  }
}
    `;
export type GameLeaveMutationFn = Apollo.MutationFunction<GameLeaveMutation, GameLeaveMutationVariables>;

/**
 * __useGameLeaveMutation__
 *
 * To run a mutation, you first call `useGameLeaveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGameLeaveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [gameLeaveMutation, { data, loading, error }] = useGameLeaveMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGameLeaveMutation(baseOptions?: Apollo.MutationHookOptions<GameLeaveMutation, GameLeaveMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GameLeaveMutation, GameLeaveMutationVariables>(GameLeaveDocument, options);
      }
export type GameLeaveMutationHookResult = ReturnType<typeof useGameLeaveMutation>;
export type GameLeaveMutationResult = Apollo.MutationResult<GameLeaveMutation>;
export type GameLeaveMutationOptions = Apollo.BaseMutationOptions<GameLeaveMutation, GameLeaveMutationVariables>;