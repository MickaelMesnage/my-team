CREATE OR REPLACE FUNCTION game_joined_by_user(game_row games, hasura_session json)
RETURNS boolean AS $$
SELECT EXISTS (
    SELECT 1
    FROM user_game A
    WHERE CAST(A.user_id AS text) = hasura_session ->> 'x-hasura-user-id' AND A.game_id = game_row.id
);
$$ LANGUAGE sql STABLE;
