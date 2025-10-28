import { fetchApi } from '@/api/fetchAPI'
import type { DetectionResult } from '@/types/api'
import { server } from '@/mocks/server';

beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('fetchApi (integration)', () => {
  it('fetches GraphQL API when detected', async () => {
    const detection: DetectionResult = {
      kind: 'graphql',
      apiUrl: 'http://example.com/graphql'
    }

    const result = await fetchApi('http://example.com/graphql', detection)

    expect(result.kind).toBe('graphql')
    expect(result.source).toBe('http://example.com/graphql')
  })

  it('fetches OpenAPI spec when detected', async () => {
    const detection: DetectionResult = {
      kind: 'openapi',
      apiUrl: 'http://example.com/openapi.json'
    }

    const result = await fetchApi('http://example.com', detection)

    expect(result.kind).toBe('openapi')
    expect(result.source).toBe('http://example.com/openapi.json')
  })

  it('fetches manual REST API when detected', async () => {
    const detection: DetectionResult = {
      kind: 'manual'
    }

    const result = await fetchApi('http://example.com/api/data', detection)

    expect(result.kind).toBe('manual')
    expect(result.source).toBe('http://example.com/api/data')
  })
})
