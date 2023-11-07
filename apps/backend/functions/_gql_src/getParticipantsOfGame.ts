import { gql } from "_gql/gql";

// It is the trigger for reminder five minute before the end of an event
gql(`
  query getParticipantsOfGame($gameId: uuid!) {
    user_game(where: {gameId: {_eq: $gameId}}) {
      userId
    }
  }
`);
