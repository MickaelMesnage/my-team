import * as Types from '../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type TeamJoinMutationVariables = Types.Exact<{
  object: Types.User_Team_Insert_Input;
}>;


export type TeamJoinMutation = { __typename?: 'mutation_root', insert_user_team_one?: { __typename?: 'user_team', id: any } | null };


export const TeamJoinDocument = gql`
    mutation TeamJoin($object: user_team_insert_input!) {
  insert_user_team_one(object: $object) {
    id
  }
}
    `;
export type TeamJoinMutationFn = Apollo.MutationFunction<TeamJoinMutation, TeamJoinMutationVariables>;

/**
 * __useTeamJoinMutation__
 *
 * To run a mutation, you first call `useTeamJoinMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTeamJoinMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [teamJoinMutation, { data, loading, error }] = useTeamJoinMutation({
 *   variables: {
 *      object: // value for 'object'
 *   },
 * });
 */
export function useTeamJoinMutation(baseOptions?: Apollo.MutationHookOptions<TeamJoinMutation, TeamJoinMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TeamJoinMutation, TeamJoinMutationVariables>(TeamJoinDocument, options);
      }
export type TeamJoinMutationHookResult = ReturnType<typeof useTeamJoinMutation>;
export type TeamJoinMutationResult = Apollo.MutationResult<TeamJoinMutation>;
export type TeamJoinMutationOptions = Apollo.BaseMutationOptions<TeamJoinMutation, TeamJoinMutationVariables>;