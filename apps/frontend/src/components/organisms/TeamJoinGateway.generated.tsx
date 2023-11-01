import * as Types from '../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type TeamJoindMutationVariables = Types.Exact<{
  object: Types.User_Team_Insert_Input;
}>;


export type TeamJoindMutation = { __typename?: 'mutation_root', insert_user_team_one?: { __typename?: 'user_team', id: any } | null };


export const TeamJoindDocument = gql`
    mutation TeamJoind($object: user_team_insert_input!) {
  insert_user_team_one(object: $object) {
    id
  }
}
    `;
export type TeamJoindMutationFn = Apollo.MutationFunction<TeamJoindMutation, TeamJoindMutationVariables>;

/**
 * __useTeamJoindMutation__
 *
 * To run a mutation, you first call `useTeamJoindMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTeamJoindMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [teamJoindMutation, { data, loading, error }] = useTeamJoindMutation({
 *   variables: {
 *      object: // value for 'object'
 *   },
 * });
 */
export function useTeamJoindMutation(baseOptions?: Apollo.MutationHookOptions<TeamJoindMutation, TeamJoindMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TeamJoindMutation, TeamJoindMutationVariables>(TeamJoindDocument, options);
      }
export type TeamJoindMutationHookResult = ReturnType<typeof useTeamJoindMutation>;
export type TeamJoindMutationResult = Apollo.MutationResult<TeamJoindMutation>;
export type TeamJoindMutationOptions = Apollo.BaseMutationOptions<TeamJoindMutation, TeamJoindMutationVariables>;