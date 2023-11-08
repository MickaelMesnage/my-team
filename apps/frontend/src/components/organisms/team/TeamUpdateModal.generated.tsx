import * as Types from '../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type TeamUpdateMutationVariables = Types.Exact<{
  teamId: Types.Scalars['uuid'];
  data: Types.Teams_Set_Input;
}>;


export type TeamUpdateMutation = { __typename?: 'mutation_root', update_teams_by_pk?: { __typename?: 'teams', id: any } | null };


export const TeamUpdateDocument = gql`
    mutation TeamUpdate($teamId: uuid!, $data: teams_set_input!) {
  update_teams_by_pk(pk_columns: {id: $teamId}, _set: $data) {
    id
  }
}
    `;
export type TeamUpdateMutationFn = Apollo.MutationFunction<TeamUpdateMutation, TeamUpdateMutationVariables>;

/**
 * __useTeamUpdateMutation__
 *
 * To run a mutation, you first call `useTeamUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTeamUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [teamUpdateMutation, { data, loading, error }] = useTeamUpdateMutation({
 *   variables: {
 *      teamId: // value for 'teamId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useTeamUpdateMutation(baseOptions?: Apollo.MutationHookOptions<TeamUpdateMutation, TeamUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TeamUpdateMutation, TeamUpdateMutationVariables>(TeamUpdateDocument, options);
      }
export type TeamUpdateMutationHookResult = ReturnType<typeof useTeamUpdateMutation>;
export type TeamUpdateMutationResult = Apollo.MutationResult<TeamUpdateMutation>;
export type TeamUpdateMutationOptions = Apollo.BaseMutationOptions<TeamUpdateMutation, TeamUpdateMutationVariables>;