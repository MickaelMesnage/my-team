import { gql } from "_gql/gql";

// It is the trigger for reminder five minute before the end of an event
gql(`
  mutation updateGame ($gameId: uuid!, $data: games_set_input!) {
    update_games_by_pk(pk_columns: {id: $gameId}, _set: $data) {
      id
    }
  }
`);
