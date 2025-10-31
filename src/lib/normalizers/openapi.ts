// src/lib/normalizers/openapi.ts
import { OpenApiSpec, OpenApiOperation, OpenApiParameter, OpenApiResponses, OpenApiRequestBody } from "@/types/openapi"
import { RawApiData, ApiSpec, Endpoint, Example, Param } from "@/types/api"

export function normalizeOpenApi(rawData: RawApiData): ApiSpec {
  if (rawData.kind !== 'openapi') {
    throw new Error(`Expected kind 'openapi', got '${rawData.kind}'`)
  }

  const spec = rawData.data as OpenApiSpec

  return {
    kind: 'openapi',
    title: spec.info?.title ?? 'Untitled API',
    baseUrl: extractBaseUrl(spec),
    endpoints: extractEndpoints(spec),
    types: {},
    raw: {
      source: rawData.source,
      format: rawData.format
    }
  }
}

function extractBaseUrl(spec: OpenApiSpec): string | undefined {
  return spec.servers?.[0]?.url
}

function isHttpMethod(method: string): boolean {
  const httpMethods = ['get', 'post', 'put', 'patch', 'delete', 'options', 'head']
  return httpMethods.includes(method.toLowerCase())
}

function sanitizeId(method: string, path: string): string {
  return `${method.toUpperCase()}-${path}`
    .replace(/[{}]/g, '')
    .replace(/\//g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-')
}

function extractEndpoints(spec: OpenApiSpec): Endpoint[] {
  const endpoints: Endpoint[] = []

  if (!spec.paths) return []

  for (const [path, pathItem] of Object.entries(spec.paths)) {
    if (!pathItem) continue
    const pathLevelParams = (pathItem.parameters ?? []) as OpenApiParameter[];

    for (const [method, operationRaw] of Object.entries(pathItem)) {
      if (!isHttpMethod(method) || !operationRaw) continue

      const operation = operationRaw as OpenApiOperation

      const opParams = (operation.parameters ?? []) as OpenApiParameter[];

      const mergedParams = mergeParameters(pathLevelParams, opParams);

      endpoints.push({
        id: sanitizeId(method, path),
        method: method.toUpperCase(),
        path,
        title: operation.summary ?? operation.operationId,
        description: operation.description,
        params: extractParams(mergedParams),
        requestSchema: extractRequestSchema(operation.requestBody),
        responseExamples: extractResponses(operation.responses),
        tags: operation.tags ?? [],
        deprecated: operation.deprecated ?? false,
        metadata: { operationId: operation.operationId }
      })
    }
  }

  return endpoints
}

function extractParams(params?: OpenApiParameter[]): Param[] {
  if (!params) return []

  return params.map(p => ({
    name: p.name,
    in: p.in,
    required: p.required ?? (p.in === 'path'),
    description: p.description,
    schema: p.schema ?? null,
    example: p.example
  }))
}

function extractRequestSchema(requestBody?: OpenApiRequestBody): object | null {
  if (!requestBody?.content) return null

  const jsonContent = requestBody.content['application/json']
  return jsonContent?.schema ?? null
}

function extractResponses(responses?: OpenApiResponses): Example[] {
  if (!responses) return []

  const examples: Example[] = []

  for (const [status, responseObj] of Object.entries(responses)) {
    const content = responseObj.content ?? {}

    for (const [mediaType, mediaTypeObj] of Object.entries(content)) {

      if (mediaTypeObj.example !== undefined) {
        examples.push({
          content: mediaTypeObj.example,
          contentType: mediaType,
          source: 'spec'
        })
      }
    }
  }

  return examples
}

function mergeParameters(
  pathParams: OpenApiParameter[],
  opParams: OpenApiParameter[]
): OpenApiParameter[] {
  const combined = [...pathParams];

  for (const opParam of opParams) {
    const existingIndex = combined.findIndex(
      p => p.name === opParam.name && p.in === opParam.in
    );

    if (existingIndex !== -1) {
      combined[existingIndex] = opParam;
    } else {
      combined.push(opParam);
    }
  }

  return combined;
}
