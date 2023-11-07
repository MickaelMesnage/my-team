import settings from "./settings";

export async function graphQLRequestAsAdmin2(): Promise<void> {
  // const headers = {
  //   "content-type": "application/json",
  //   Authorization: settings.security.nhost_admin_secret,
  // };
  // console.log({ headers });
  const graphqlQuery = {
    query: `query participants ($gameId: uuid!) { user_game () { id } }`,
    variables: {},
  };

  // const response = await axios({
  //   url: settings.nhost_graphql_url,
  //   method: "post",
  //   headers: headers,
  //   data: graphqlQuery,
  // });

  const aa = await fetch(settings.nhost_graphql_url, {
    headers: {
      "Content-Type": "application/json",
      "x-hasura-admin-secret": settings.security.nhost_admin_secret,
    },
    method: "POST",
    body: JSON.stringify(graphqlQuery),
  });

  const result = await aa.json();

  console.log(JSON.stringify(result)); // data
}
