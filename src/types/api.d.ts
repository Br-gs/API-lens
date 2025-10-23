export type apiKind = 'openapi' | 'graphql' | 'manual';

/**
 * Represents an example of an endpoint response
 *
 * @example
 * {
 *   content: { id: 1, name: "John" },
 *   contentType: "application/json",
 *   source: "spec"
 * }
 */
export interface Example {
  content: unknown;
  contentType?: string;
  source?: 'spec' | 'capture' | 'manual';
  sizeBytes?: number;
}

/**
 * Represents a parameter that accepts an endpoint
 *
 * @example
 * {
 *   name: "userId",
 *   in: "path",
 *   required: true,
 *   description: "User ID"
 * }
 */
export interface Param {
  name: string;
  in: 'path' | 'query' | 'header' | 'cookie';
  required: boolean;
  description?: string;
  schema?: object | null;
  example?: unknown;
}

/**
 * Represents an API endpoint
 *
 * @example
 * {
 *   id: "GET-/users",
 *   method: "GET",
 *   path: "/users",
 *   title: "Get users"
 * }
 */
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

/**
 * Represents all information from an API
 */
export interface ApiSpec {
  kind: apiKind;
  title?: string;
  baseUrl?: string;
  endpoints: Endpoint[];
  types?: Record<string, string>;
  raw?: {
    source?: string;
    format?: 'json' | 'yaml' | 'instrospection';
  }
}

export type DetectionResult =
  | { kind: 'graphql'; apiUrl: string }
  | { kind: 'openapi'; apiUrl: string }
  | { kind: 'manual';};

export interface RawApiData {
  kind: apiKind;
  data: unknown;
  source: string;
  format: 'json' | 'yaml' | 'introspection';
}
