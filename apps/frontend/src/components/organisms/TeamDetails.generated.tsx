import * as Types from '../../graphql/types';

import { gql } from '@apollo/client';
export type TeamDetailsFragment = { __typename?: 'teams', id: any, name: string, description?: string | null, creator?: { __typename?: 'users', email?: any | null, id: any } | null };

export const TeamDetailsFragmentDoc = gql`
    fragment TeamDetails on teams {
  id
  name
  description
  creator {
    email
    id
  }
}
    `;