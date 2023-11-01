import * as Types from '../../graphql/types';

import { gql } from '@apollo/client';
export type TeamListCardFragment = { __typename?: 'teams', id: any, name: string, description?: string | null, creator?: { __typename?: 'users', email?: any | null } | null, user_teams: Array<{ __typename?: 'user_team', user?: { __typename?: 'users', email?: any | null } | null }> };

export const TeamListCardFragmentDoc = gql`
    fragment TeamListCard on teams {
  id
  name
  description
  creator {
    email
  }
  user_teams {
    user {
      email
    }
  }
}
    `;