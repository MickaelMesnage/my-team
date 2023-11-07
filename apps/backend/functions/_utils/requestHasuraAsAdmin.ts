import settings from "./settings";

export async function requestHasuraAsAdmin(
  url: string,
  body: any
): Promise<Response> {
  return await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "x-hasura-admin-secret": settings.security.nhost_admin_secret,
    },
    method: "POST",
    body: JSON.stringify(body),
  });
}
