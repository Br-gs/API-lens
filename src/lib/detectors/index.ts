import type { DetectionResult } from '../../types/api';
import { isGraphql } from './graphql';
import { findOpenApiSpec } from './openApi';

export async function detectApiType(url: string): Promise<DetectionResult> {
  if (await isGraphql(url)) {
    return {
      kind: 'graphql',
      confidence: 'high'
    };
  }

  const specUrl = await findOpenApiSpec(url);
  if (specUrl) {
    return {
      kind: 'openapi',
      specUrl,
      confidence: 'high'
    };
  }

  return {
    kind: 'manual',
    confidence: 'low'
  }
}
