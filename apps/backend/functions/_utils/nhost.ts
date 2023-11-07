import { NhostClient } from "@nhost/nhost-js";
import settings from "./settings";

const nhost = new NhostClient({
  backendUrl: settings.nhost_subdomain,
  adminSecret: settings.security.nhost_admin_secret,
  graphqlUrl: settings.nhost_graphql_url,
});

export { nhost };

export interface HasuraEvent<T = any> {
  event: {
    session_variables: { [x: string]: string };
    op: "INSERT" | "UPDATE" | "DELETE" | "MANUAL";
    data: {
      old: T | null;
      new: T | null;
    };
  };
  created_at: string;
  id: string;
  delivery_info: {
    max_retries: number;
    current_retry: number;
  };
  trigger: {
    name: string;
  };
  table: {
    schema: string;
    name: string;
  };
}
