import * as Types from '../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type InsertGameMutationVariables = Types.Exact<{
  game: Types.Games_Insert_Input;
}>;


export type InsertGameMutation = { __typename?: 'mutation_root', insert_games_one?: { __typename?: 'games', id: any } | null };


export const InsertGameDocument = gql`
    mutation InsertGame($game: games_insert_input!) {
  insert_games_one(object: $game) {
    id
  }
}
    `;
export type InsertGameMutationFn = Apollo.MutationFunction<InsertGameMutation, InsertGameMutationVariables>;

/**
 * __useInsertGameMutation__
 *
 * To run a mutation, you first call `useInsertGameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertGameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertGameMutation, { data, loading, error }] = useInsertGameMutation({
 *   variables: {
 *      game: // value for 'game'
 *   },
 * });
 */
export function useInsertGameMutation(baseOptions?: Apollo.MutationHookOptions<InsertGameMutation, InsertGameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InsertGameMutation, InsertGameMutationVariables>(InsertGameDocument, options);
      }
export type InsertGameMutationHookResult = ReturnType<typeof useInsertGameMutation>;
export type InsertGameMutationResult = Apollo.MutationResult<InsertGameMutation>;
export type InsertGameMutationOptions = Apollo.BaseMutationOptions<InsertGameMutation, InsertGameMutationVariables>;