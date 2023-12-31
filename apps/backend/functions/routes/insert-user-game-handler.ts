import { z } from "zod";
import {
  GameInformationsDocument,
  Game_Status_Enum,
  UpdateGameDocument,
} from "../_gql/graphql";
import { sendEmailWhenGameAlmostFull } from "../_project_utils/sendEmailWhenGameAlmostFull";
import { sendEmailWhenGameFull } from "../_project_utils/sendEmailWhenGameFull";
import { FunctionContext } from "../_utils/getContext";
import { graphQLRequest } from "../_utils/graphQLRequest";
import { guardAuthAdmin } from "../_utils/guardAuthAdmin";
import { guardParams } from "../_utils/guardParams";
import { route } from "../_utils/route";
import settings from "../_utils/settings";

const dateModel = new Intl.DateTimeFormat("fr-FR", {
  dateStyle: "full",
});

const timeModel = new Intl.DateTimeFormat("fr-FR", {
  timeStyle: "short",
});

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
  // Only called by server
  guardAuthAdmin(context);

  const {
    op,
    data: { new: newGame },
  } = guardParams(context.req.body.event, gameUpdateParamsSchema);

  if (op !== "INSERT")
    throw new Error("Insert user game handler: op not equals to INSERT");

  if (!newGame) throw new Error("Insert user game handler: newGame is null");

  const { games_by_pk } = await graphQLRequest(GameInformationsDocument, {
    gameId: newGame.game_id,
  });

  if (!games_by_pk)
    throw new Error("Insert user game handler: games_by_pk is null");

  const {
    creator: { email: emailCreator },
    user_games: listOfParticipants,
    timestamp,
    status,
    team: { name: teamName, gameFullTreshold, gameAlmostFullTreshold },
  } = games_by_pk;

  if (!emailCreator)
    throw new Error("Insert user game handler: emailCreator is null");

  if (
    gameAlmostFullTreshold &&
    listOfParticipants.length === gameAlmostFullTreshold
  ) {
    // No email for now
    await sendEmailWhenGameAlmostFull();
  }

  if (gameFullTreshold && listOfParticipants.length === gameFullTreshold) {
    await graphQLRequest(UpdateGameDocument, {
      gameId: newGame.game_id,
      data: {
        status: Game_Status_Enum.Full,
      },
    });
    await sendEmailWhenGameFull(emailCreator, {
      teamName,
      gameDate: dateModel.format(new Date(timestamp)),
      gameTime: timeModel.format(new Date(timestamp)),
      gameUrl: `${settings.frontend_url}/game/${newGame.game_id}`,
    });
  }

  if (
    gameFullTreshold &&
    status === Game_Status_Enum.Full &&
    listOfParticipants.length < gameFullTreshold
  ) {
    await graphQLRequest(UpdateGameDocument, {
      gameId: newGame.game_id,
      data: {
        status: Game_Status_Enum.Create,
      },
    });
  }
});
