import { z } from "zod";
import { FunctionContext } from "../_utils/getContext";
import { graphQLRequest } from "../_utils/graphQLRequest";
import { guardAuthAdmin } from "../_utils/guardAuthAdmin";
import { guardParams } from "../_utils/guardParams";
import { route } from "../_utils/route";
import { sendEmail } from "../_utils/sendEmail";

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
    throw new Error("Game update handler: op not equals to INSERT");

  if (!newGame) throw new Error("Game update handler: newGame is null");

  const body = {
    query: `query gameInformations ($gameId: uuid!) {
      games_by_pk(id: $gameId) {
        timestamp
        creator {
          email
        }
        team {
          name
        }
        user_games {
          userId
        }
      }
    }`,
    variables: { gameId: newGame.game_id },
  };

  const data = await graphQLRequest<{
    games_by_pk: {
      timestamp: string;
      team: { name: string };
      creator: { email: string };
      user_games: { userId: string }[];
    };
  }>(body);

  console.log({ data });

  const {
    creator: { email: emailCreator },
    user_games: listOfParticipants,
    team: { name: teamName },
  } = data.games_by_pk;

  // const emailCreator = games_by_pk.creator.email;

  if (!emailCreator)
    throw new Error("Game update handler: emailCreator is null");

  // if (listOfParticipants.length === 2) {
  await sendEmail(emailCreator, 5288063, { gameName: teamName });
  console.log("ok");
  // }
});
