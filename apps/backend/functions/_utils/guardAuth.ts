import { FunctionContext } from "./getContext";
import { RouteError } from "./route";

export function guardAuth(context: FunctionContext) {
  if (!context.isAuthenticated && !context.userId) {
    throw new RouteError(401, "Unauthorized");
  }

  return context.userId!;
}
