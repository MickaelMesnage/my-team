import * as Types from '../../../graphql/types';

import { gql } from '@apollo/client';
export type TeamDetailsFragment = { __typename?: 'teams', id: any, name: string, description?: string | null, creator?: { __typename?: 'users', email?: any | null, id: any } | null, user_teams: Array<{ __typename?: 'user_team', user?: { __typename?: 'users', email?: any | null } | null }> };

export const TeamDetailsFragmentDoc = gql`
    fragment TeamDetails on teams {
  id
  name
  description
  creator {
    email
    id
  }
  user_teams {
    user {
      email
    }
  }
}
    `;