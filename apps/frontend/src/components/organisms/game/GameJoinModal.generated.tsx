import * as Types from '../../../graphql/types';

import { gql } from '@apollo/client';
import { GameJoinConnectedFragmentDoc } from './GameJoinConnected.generated';
export type GameJoinModalFragment = { __typename?: 'games', id: string, timestamp: string, joinedByUser?: boolean | null, user_games: Array<{ __typename?: 'user_game', id: string, userId: string, gameId: string }> };

export const GameJoinModalFragmentDoc = gql`
    fragment GameJoinModal on games {
  id
  timestamp
  ...GameJoinConnected
}
    ${GameJoinConnectedFragmentDoc}`;