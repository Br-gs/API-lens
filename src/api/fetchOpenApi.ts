import { RawApiData } from "../types/api";

export async function fetchOpenApi(apiUrl: string): Promise<RawApiData> {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch OpenAPI spec from ${apiUrl}: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return {
      kind: 'openapi',
      data,
      source: apiUrl,
      format: 'json'
    };
  } catch (error) {
    throw new Error(`Error fetching OpenAPI spec from ${apiUrl}: ${error}`);
  }
}
