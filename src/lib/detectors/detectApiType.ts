import type { DetectionResult } from '../../types/api';
import { isGraphql } from './graphql';
import { findOpenApiSpec } from './openApi';

export async function detectApiType(url: string): Promise<DetectionResult> {
  try {
    const parsedUrl = new URL(url)

    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      throw new Error('URL must use http:// or https:// protocol')
    }
  } catch (error) {
    throw new Error(`Invalid URL: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }

  if (await isGraphql(url)) {
    return {
      kind: 'graphql',
      apiUrl: url,
    };
  }

  const specUrl = await findOpenApiSpec(url);
  if (specUrl) {
    return {
      kind: 'openapi',
      apiUrl: specUrl,
    };
  }

  return {
    kind: 'manual',
  }
}
