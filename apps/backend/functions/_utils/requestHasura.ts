import axios from "axios";
import settings from "./settings";

export async function requestHasuraAsAdmin(body: any) {
  return axios.post(settings.nhost_metadata_url, body, {
    headers: {
      "x-hasura-admin-secret": settings.security.nhost_admin_secret,
      "X-Hasura-Role": "admin",
    },
  });
}
