import { ApolloError } from "@apollo/client";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { toast } from "react-toastify";

export type ErrorProps = {
  error: ApolloError;
};

export const Error = ({ error }: ErrorProps) => {
  const isDev = useMemo(() => process.env.NODE_ENV === "development", []);
  const router = useRouter();

  if (error) {
    console.log({ error });
    toast.error("Une erreur est survenue");

    if (!isDev) router.push("/");
  }

  return <span>Une erreur apollo est survenue</span>;
};
