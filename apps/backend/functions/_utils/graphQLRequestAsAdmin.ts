import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { nhost } from "@utils/nhost";

// Be carful, nhost graphql not working
export async function graphQLRequestAsAdmin<Type, Params>(
  document: string | TypedDocumentNode<Type, Params>,
  variables: Params
): Promise<Type> {
  const result = await nhost.graphql.request(document, variables);

  if (result.error) throw result.error;
  return result.data;
}
