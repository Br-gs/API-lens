import { RawApiData } from "../types/api";

export async function fetchOpenApi(apiUrl: string): Promise<RawApiData> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetch(apiUrl, { signal: controller.signal });
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
  } finally {
    clearTimeout(timeoutId);
  }
}
