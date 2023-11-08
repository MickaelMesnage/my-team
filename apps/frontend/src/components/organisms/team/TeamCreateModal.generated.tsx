import * as Types from '../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type InsertTeamMutationVariables = Types.Exact<{
  team: Types.Teams_Insert_Input;
}>;


export type InsertTeamMutation = { __typename?: 'mutation_root', insert_teams_one?: { __typename?: 'teams', id: any } | null };


export const InsertTeamDocument = gql`
    mutation InsertTeam($team: teams_insert_input!) {
  insert_teams_one(object: $team) {
    id
  }
}
    `;
export type InsertTeamMutationFn = Apollo.MutationFunction<InsertTeamMutation, InsertTeamMutationVariables>;

/**
 * __useInsertTeamMutation__
 *
 * To run a mutation, you first call `useInsertTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertTeamMutation, { data, loading, error }] = useInsertTeamMutation({
 *   variables: {
 *      team: // value for 'team'
 *   },
 * });
 */
export function useInsertTeamMutation(baseOptions?: Apollo.MutationHookOptions<InsertTeamMutation, InsertTeamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InsertTeamMutation, InsertTeamMutationVariables>(InsertTeamDocument, options);
      }
export type InsertTeamMutationHookResult = ReturnType<typeof useInsertTeamMutation>;
export type InsertTeamMutationResult = Apollo.MutationResult<InsertTeamMutation>;
export type InsertTeamMutationOptions = Apollo.BaseMutationOptions<InsertTeamMutation, InsertTeamMutationVariables>;