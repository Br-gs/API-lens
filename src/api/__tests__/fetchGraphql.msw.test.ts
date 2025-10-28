import { fetchGraphqlSchema } from "@/api/fetchGraphql";
import { http, HttpResponse } from "msw";
import { server } from '@/mocks/server';

beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('GraphQL Schema Fetching', () => {
  it('successfully fetches GraphQL schema', async () => {
    const result = await fetchGraphqlSchema('http://example.com/graphql');

    expect(result).toMatchObject({
      kind: 'graphql',
      source: 'http://example.com/graphql',
      format: 'json'
    })

    expect(result.data).toHaveProperty('__schema')

    const data = result.data as { __schema: { queryType: { name: string } } }
    expect(data.__schema.queryType.name).toBe('Query')
  });

  it('throws error on network failure', async () => {
    await expect(
      fetchGraphqlSchema('http://example.com/invalid-graphql')
    ).rejects.toThrow('Failed to fetch GraphQL schema')
  })

  it('throws error when response is not valid GraphQL', async () => {
    server.use(
      http.post('http://example.com/graphql', () => {
        return HttpResponse.json({ notData: 'invalid' })
      })
    )

    await expect(
      fetchGraphqlSchema('http://example.com/graphql')
    ).rejects.toThrow('No data received from GraphQL introspection query')
  })
});
