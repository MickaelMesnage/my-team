import { isPast } from "date-fns";
import { z } from "zod";
import {
  GameInformationsDocument,
  Game_Status_Enum,
  UpdateGameDocument,
} from "../_gql/graphql";
import { FunctionContext } from "../_utils/getContext";
import { graphQLRequest } from "../_utils/graphQLRequest";
import { guardAuth } from "../_utils/guardAuth";
import { guardParams } from "../_utils/guardParams";
import { route } from "../_utils/route";

const gameUpdateParamsSchema = z.object({
  gameId: z.string(),
});

export default route(async (context: FunctionContext) => {
  // Only called by server
  const userId = guardAuth(context);

  const { gameId } = guardParams(context.req.body, gameUpdateParamsSchema);

  const { games_by_pk } = await graphQLRequest(GameInformationsDocument, {
    gameId,
  });

  if (!games_by_pk) throw new Error("Valid game: games_by_pk is null");

  const {
    timestamp,
    creator: { id: creatorId },
  } = games_by_pk;

  if (creatorId !== userId)
    throw new Error("Valid game: user should be the game creator");

  if (isPast(new Date(timestamp)))
    throw new Error("Valid game: cant valid past game");

  const { update_games_by_pk } = await graphQLRequest(UpdateGameDocument, {
    gameId,
    data: {
      status: Game_Status_Enum.Validate,
    },
  });

  if (!update_games_by_pk) {
    throw new Error("Valid game: update_games_by_pk is null");
  }

  return { update_games_by_pk };
});
