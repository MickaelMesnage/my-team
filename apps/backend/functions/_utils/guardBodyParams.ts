import { guardParams } from "@utils/guardParams";
import { z } from "zod";
import { FunctionContext } from "./getContext";

export const guardBodyParams = <T extends z.ZodTypeAny>(
  context: FunctionContext,
  schema: T
): z.infer<T> => {
  return guardParams(context.req.body, schema);
};
