import * as Types from '../../../graphql/types';

import { gql } from '@apollo/client';
import { TeamUpdateConnectedFragmentDoc } from './TeamUpdateConnected.generated';
export type TeamListCardFragment = { __typename?: 'teams', id: string, name: string, description?: string | null, gameFullTreshold?: number | null, creator?: { __typename?: 'users', id: string, email?: string | null, displayName: string } | null, user_teams: Array<{ __typename?: 'user_team', user?: { __typename?: 'users', email?: string | null, displayName: string, profile?: { __typename?: 'profiles', avatar?: string | null } | null } | null }> };

export const TeamListCardFragmentDoc = gql`
    fragment TeamListCard on teams {
  id
  name
  description
  creator {
    id
    email
    displayName
  }
  user_teams {
    user {
      email
      profile {
        avatar
      }
      displayName
    }
  }
  ...TeamUpdateConnected
}
    ${TeamUpdateConnectedFragmentDoc}`;