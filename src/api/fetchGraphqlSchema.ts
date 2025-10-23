import { RawApiData } from "../types/api";
import { getIntrospectionQuery } from 'graphql'
import { fetchWithTimeout } from "@/utils/fetchWithTimeout";

type GraphQLIntrospectionResult = {
  data?: unknown;
  errors?: unknown[];
}

export async function fetchGraphqlSchema(apiUrl: string): Promise<RawApiData> {
  const query = getIntrospectionQuery();
  try {
    const response = await fetchWithTimeout(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ query }),
    }, 5000);

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    const result: unknown = (await response.json());

    if (typeof result !== 'object' || result === null || !('data' in result)) {
      throw new Error('No data received from GraphQL introspection query');
    }

    return {
      kind: 'graphql',
      data: (result as GraphQLIntrospectionResult).data,
      source: apiUrl,
      format: 'json'
    };

  } catch (error) {
    throw new Error(`Failed to fetch GraphQL schema: ${error}`);

  }
}
