import { z } from "zod";
import { RouteError } from "./route";

export const guardParams = <T extends z.ZodTypeAny>(
  params: unknown,
  schema: T
): z.infer<T> => {
  try {
    return schema.parse(params);
  } catch (err) {
    // handle error
    throw new RouteError(400, "Bad request");
  }
};
