import { z } from "zod";
import { FunctionContext } from "../_utils/getContext";
import { graphQLRequest } from "../_utils/graphQLRequest";
import { guardAuthAdmin } from "../_utils/guardAuthAdmin";
import { guardParams } from "../_utils/guardParams";
import { route } from "../_utils/route";

const gameSchema = z.object({
  id: z.string(),
  game_id: z.string(),
});

const gameUpdateParamsSchema = z.object({
  op: z.enum(["INSERT"]),
  data: z.object({
    new: gameSchema.nullable(),
    old: gameSchema.nullable(),
  }),
});

export default route(async (context: FunctionContext) => {
  console.log("Game update handler called");
  console.log("eeee", process.env);

  // Only called by server
  guardAuthAdmin(context);

  const {
    op,
    data: { new: newGame },
  } = guardParams(context.req.body.event, gameUpdateParamsSchema);

  if (op !== "INSERT")
    throw new Error("Game update handler: op not equals to INSERT");

  if (!newGame) throw new Error("Game update handler: newGame is null");

  const body = {
    query: `query participants ($gameId: uuid!) { user_game (where: {gameId: {_eq: $gameId}}) { id } }`,
    variables: { gameId: newGame.game_id },
  };

  const { user_game: listOfParticipants } = await graphQLRequest<{
    user_game: any[];
  }>(body);

  if (listOfParticipants.length === 10) {
  }
});
