import { TypedDocumentString } from "./graphql/graphql";

export const execute = async <TResult, TVariables>(
  query: TypedDocumentString<TResult, TVariables>,
  ...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
) => {
  const response = await fetch("http://localhost:8082/v1/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/graphql-response+json",
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const json = await response.json();
  return json.data as TResult;
};
