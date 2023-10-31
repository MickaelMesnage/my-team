import { ApolloError } from "@apollo/client";
import { NextRouter } from "next/router";
import { toast } from "react-toastify";

export const handleApolloError = (
  error: ApolloError | undefined,
  push: NextRouter["push"]
) => {
  if (error) {
    console.log({ error });
    toast.error("Une erreur est survenue");
    if (process.env.NODE_ENV !== "development") push("/");
  }
};
