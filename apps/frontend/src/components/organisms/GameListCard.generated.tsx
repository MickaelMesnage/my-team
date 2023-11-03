import * as Types from '../../graphql/types';

import { gql } from '@apollo/client';
export type GameListCardFragment = { __typename?: 'games', id: any, timestamp: any, creator: { __typename?: 'users', email?: any | null }, user_games: Array<{ __typename?: 'user_game', id: any, user: { __typename?: 'users', email?: any | null } }> };

export const GameListCardFragmentDoc = gql`
    fragment GameListCard on games {
  id
  timestamp
  creator {
    email
  }
  user_games {
    id
    user {
      email
    }
  }
}
    `;