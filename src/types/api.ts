export type specKind = 'openapi' | 'graphql' | 'manual';

export interface Example {
  content: unknown;
  contentType?: string;
  source?: 'spec' | 'capture' | 'manual';
  sizeBytes?: number;
}

export interface Param {
  name: string;
  in: 'path' | 'query' | 'header' | 'cookie';
  required: boolean;
  description?: string;
  schema?: object | null;
  example?: unknown;
}

export interface Endpoint {
  id: string;
  method: string;
  path: string;
  title?: string;
  description?: string;
  params?: Param[];
  requestSchema?: object | null;
  responseExamples: Example[];
  tags?: string[];
  deprecated?: boolean;
  metadata?: Record<string, unknown>;
}
export interface ApiSpec {
  kind: specKind;
  title?: string;
  baseUrl?: string;
  endpoints: Endpoint[];
  types?: Record<string, string>;
  raw?: {
    source?: string;
    format?: 'json' | 'yaml' | 'instrospection';
  }
}
