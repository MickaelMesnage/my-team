import { NhostClient } from "@nhost/nhost-js";
import settings from "./settings";

const nhost = new NhostClient({
  subdomain: settings.nhost_subdomain,
  adminSecret: settings.nhost_admin_secret,
  graphqlUrl: settings.nhost_graphql_url,
});

export { nhost };
