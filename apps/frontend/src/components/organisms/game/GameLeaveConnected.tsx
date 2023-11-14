import { useGameLeaveMutation } from "@/components/organisms/game/GameLeaveConnected.generated";
import { GameListCardFragmentDoc } from "@/components/organisms/game/GameListCard.generated";
import { gql } from "@apollo/client";
import { useUserId } from "@nhost/nextjs";
import React, { ReactNode, cache } from "react";
import { toast } from "react-toastify";

export type GameLeaveConnectedProps = {
  render: (
    onLeave: (gameId: string, id: string) => void,
    loading: boolean
  ) => ReactNode;
};

export const GameLeaveConnected = ({ render }: GameLeaveConnectedProps) => {
  const userId = useUserId();

  const [isLoading, setIsLoading] = React.useState(false);
  const [leaveGame, { loading }] = useGameLeaveMutation();

  if (!userId) throw new Error("GameLeaveConnected: User id is undefined");

  const onLeave = async (gameId: string, id: string) => {
    try {
      setIsLoading(true);
      await leaveGame({
        variables: {
          id,
        },
        // refetchQueries: [GameListPageDocument],
        // update: (cache) => {
        //   const cacheId = cache.identify({
        //     __typename: "user_game",
        //     id,
        //   });

        //   cache.evict({ id: cacheId });
        //   cache.gc();
        // },
        update: (cache) => {
          cache.writeFragment({
            id: cache.identify({
              __typename: "games",
              id: gameId,
            }),
            fragment: GameListCardFragmentDoc,
            data: {
              joinedByUser: false,
            },
          });
          cache.gc();
          // cache.modify({
          //   id: cache.identify({
          //     __typename: "games",
          //     id: gameId,
          //   }),
          //   fields: {
          //     joinedByUser(_cachedJoinedByUser) {
          //       return false;
          //     },
          //   },
          // });
        },
      });
      setIsLoading(false);
      toast.success("Vous avez annulé votre participation !");
    } catch (error) {
      toast.error("Une erreur est survenue");
      console.error(error);
    }
  };

  return <div>{render(onLeave, isLoading)}</div>;
};
