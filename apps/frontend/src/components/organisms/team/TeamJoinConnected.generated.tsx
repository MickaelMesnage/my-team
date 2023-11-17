import * as Types from '../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type TeamJoinMutationVariables = Types.Exact<{
  teamId: Types.Scalars['uuid'];
}>;


export type TeamJoinMutation = { __typename?: 'mutation_root', insert_user_team_one?: { __typename?: 'user_team', id: string } | null };


export const TeamJoinDocument = gql`
    mutation TeamJoin($teamId: uuid!) {
  insert_user_team_one(object: {teamId: $teamId}) {
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
 *      teamId: // value for 'teamId'
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