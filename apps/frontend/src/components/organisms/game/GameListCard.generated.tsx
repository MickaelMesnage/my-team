import * as Types from '../../../graphql/types';

import { gql } from '@apollo/client';
import { GameJoinConnectedFragmentDoc } from './GameJoinConnected.generated';
import { GameLeaveConnectedFragmentDoc } from './GameLeaveConnected.generated';
export type GameListCardFragment = { __typename?: 'games', id: string, timestamp: string, joinedByUser?: boolean | null, status?: Types.Game_Status_Enum | null, creator: { __typename?: 'users', email?: string | null, displayName: string }, user_games: Array<{ __typename?: 'user_game', id: string, userId: string, gameId: string, user: { __typename?: 'users', email?: string | null, displayName: string, profile?: { __typename?: 'profiles', avatar?: string | null } | null } }> };

export const GameListCardFragmentDoc = gql`
    fragment GameListCard on games {
  id
  timestamp
  joinedByUser
  status
  creator {
    email
    displayName
  }
  user_games {
    id
    userId
    user {
      email
      profile {
        avatar
      }
      displayName
    }
  }
  ...GameJoinConnected
  ...GameLeaveConnected
}
    ${GameJoinConnectedFragmentDoc}
${GameLeaveConnectedFragmentDoc}`;