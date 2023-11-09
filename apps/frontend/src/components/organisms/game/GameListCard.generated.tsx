import * as Types from '../../../graphql/types';

import { gql } from '@apollo/client';
export type GameListCardFragment = { __typename?: 'games', id: any, timestamp: any, joinedByUser?: boolean | null, creator: { __typename?: 'users', email?: any | null, displayName: string }, user_games: Array<{ __typename?: 'user_game', user: { __typename?: 'users', email?: any | null, displayName: string, profile?: { __typename?: 'profiles', avatar?: string | null } | null } }> };

export const GameListCardFragmentDoc = gql`
    fragment GameListCard on games {
  id
  timestamp
  joinedByUser
  creator {
    email
    displayName
  }
  user_games {
    user {
      email
      profile {
        avatar
      }
      displayName
    }
  }
}
    `;