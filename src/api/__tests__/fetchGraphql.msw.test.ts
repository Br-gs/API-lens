import { handlersApi } from "@/mocks/handlersApi";
import { setupServer } from "msw/node";
import { fetchGraphqlSchema } from "@/api/fetchGraphql";

export const serverApi = setupServer(...handlersApi);

beforeAll(() => serverApi.listen());
afterEach(() => serverApi.resetHandlers());
afterAll(() => serverApi.close());

describe('GraphQL Schema Fetching', () => {
  it('successfully fetches GraphQL schema', async () => {
    const apiUrl = await fetchGraphqlSchema('http://example.com/graphql');
    expect(apiUrl).toEqual({
      kind: 'graphql',
      data: { data: {} },
      source: 'http://example.com/graphql',
      format: 'json'
    });
  });

  it('handles invalid GraphQL endpoint', async () => {
    await expect(fetchGraphqlSchema('http://example.com/invalid-graphql')).rejects.toThrow('Failed to fetch GraphQL schema');
  });
});
