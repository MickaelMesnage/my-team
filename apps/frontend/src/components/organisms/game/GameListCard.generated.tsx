import * as Types from '../../../graphql/types';

import { gql } from '@apollo/client';
import { GameJoinConnectedFragmentDoc } from './GameJoinConnected.generated';
import { GameJoinModalFragmentDoc } from './GameJoinModal.generated';
import { GameLeaveConnectedFragmentDoc } from './GameLeaveConnected.generated';
export type GameListCardFragment = { __typename?: 'games', id: string, timestamp: string, joinedByUser?: boolean | null, status: Types.Game_Status_Enum, creator: { __typename?: 'users', email?: string | null, displayName: string }, team: { __typename?: 'teams', name: string }, user_games: Array<{ __typename?: 'user_game', id: string, userId: string, gameId: string, user: { __typename?: 'users', email?: string | null, displayName: string, profile?: { __typename?: 'profiles', avatar?: string | null } | null } }> };

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
  team {
    name
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
  ...GameJoinModal
  ...GameLeaveConnected
}
    ${GameJoinConnectedFragmentDoc}
${GameJoinModalFragmentDoc}
${GameLeaveConnectedFragmentDoc}`;