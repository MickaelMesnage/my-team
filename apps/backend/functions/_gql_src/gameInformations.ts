import { gql } from "_gql/gql";

// It is the trigger for reminder five minute before the end of an event
gql(`
  query gameInformations ($gameId: uuid!) {
    games_by_pk(id: $gameId) {
        timestamp
        creator {
            id
            email
        }
        team {
            name
            gameFullTreshold
            gameAlmostFullTreshold
        }
        user_games {
            userId
        }
        status
    }
  }
`);
