import { DetectionResult, RawApiData } from "../types/api";
import { fetchOpenApi } from "./fetchOpenApi";
import { fetchRestBasic } from "./fetchRestBasic";
import { fetchGraphqlSchema } from "./fetchGraphql";

function assertNever(x: never): never {
  throw new Error(`Unsupported API kind: ${JSON.stringify(x)}`);
}

export async function fetchApi(
  url: string,
  detection: DetectionResult
): Promise<RawApiData> {

  switch (detection.kind) {
    case 'graphql':
      return fetchGraphqlSchema(detection.apiUrl);
    case 'openapi':
      return fetchOpenApi(detection.apiUrl);
    case 'manual':
      return fetchRestBasic(url);
    default:
      return assertNever(detection);
  }
}
