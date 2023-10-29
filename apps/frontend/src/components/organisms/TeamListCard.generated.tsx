import * as Types from '../../graphql/types';

import { gql } from '@apollo/client';
export type TeamListCardFragment = { __typename?: 'teams', id: any, name: string };

export const TeamListCardFragmentDoc = gql`
    fragment TeamListCard on teams {
  id
  name
}
    `;