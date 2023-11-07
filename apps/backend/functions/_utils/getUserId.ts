import { FunctionContext } from "./getContext";
import { RouteError } from "./route";

export function getUserId(context: FunctionContext) {
  if (!context.userId) {
    throw new RouteError(401, "Unauthorized");
  }

  return context.userId;
}
