import settings from "@utils/settings";
import { FunctionContext } from "./getContext";
import { RouteError } from "./route";

export function guardAuthAdmin(context: FunctionContext) {
  const secret = context.req.headers["nhost-webhook-secret"];

  // check if is requested by server
  if (secret !== settings.security.nhost_webhook_secret) {
    console.log("Received wrong nhost-webhook-secret : ", secret);
    throw new RouteError(401, "Unauthorized");
  }
}
