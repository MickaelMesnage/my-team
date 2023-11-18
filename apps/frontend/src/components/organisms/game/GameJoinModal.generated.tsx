import * as Types from '../../../graphql/types';

import { gql } from '@apollo/client';
export type GameJoinModalFragment = { __typename?: 'games', id: string, timestamp: string };

export const GameJoinModalFragmentDoc = gql`
    fragment GameJoinModal on games {
  id
  timestamp
}
    `;