import { requestHasuraAsAdmin } from "./requestHasuraAsAdmin";
import settings from "./settings";

export async function graphQLRequest<Type>(body: any): Promise<Type> {
  const response = await requestHasuraAsAdmin(settings.nhost_graphql_url, body);
  const result = await response.json();

  if (result.error) throw new Error(result.error);

  return result.data;
}
