export interface OpenApiSpec {
  openapi: string;
  info: {
    title: string;
    version: string;
    description?: string;
  };
  servers?: Array<{ url: string; description?: string }>;
  paths: Record<string, OpenApiPathItem>;
  components?: {
    schemas?: Record<string, object>;
    parameters?: Record<string, OpenApiParameter>;
  };
}

export interface OpenApiPathItem {
  get?: OpenApiOperation
  post?: OpenApiOperation
  put?: OpenApiOperation
  delete?: OpenApiOperation
  patch?: OpenApiOperation
  parameters?: OpenApiParameter[];
  $ref?: string
  summary?: string
  description?: string
}

export interface OpenApiOperation {
  operationId?: string
  summary?: string
  description?: string
  tags?: string[]
  parameters?: OpenApiParameter[]
  requestBody?: OpenApiRequestBody
  responses: OpenApiResponses
  deprecated?: boolean
}

export interface OpenApiParameter {
  name: string
  in: 'query' | 'path' | 'header' | 'cookie'
  required?: boolean
  description?: string
  schema?: OpenApiSchema
  example?: unknown
}

export interface OpenApiSchema {
  type?: string
  properties?: Record<string, OpenApiSchema>
  items?: OpenApiSchema
  $ref?: string
  example?: unknown
  enum?: unknown[]
  format?: string
}

export interface OpenApiResponses {
  [statusCode: string]: {
    description: string
    content?: {
      [mediaType: string]: {
        schema?: OpenApiSchema
        example?: unknown
      }
    }
  }
}

export interface OpenApiRequestBody {
  description?: string
  content: Record<string, {
    schema?: OpenApiSchema
    example?: unknown
    examples?: Record<string, { value: unknown }>
  }>
  required?: boolean
}
