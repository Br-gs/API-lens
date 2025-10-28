import { handlersApi } from "@/mocks/handlersApi";
import { setupServer } from "msw/node";
import { fetchOpenApi } from "../fetchOpenApi";

export const serverApi = setupServer(...handlersApi);

beforeAll(() => serverApi.listen());
afterEach(() => serverApi.resetHandlers());
afterAll(() => serverApi.close());

describe('OpenAPI Fetching', () => {
  it('successfully fetches OpenAPI spec', async () => {
    const apiUrl = await fetchOpenApi('http://example.com/openapi.json');
    expect(apiUrl).toEqual({
      kind: 'openapi',
      data: {
        openapi: '3.0.0',
        info: { title: 'Mocked API', version: '1.0' },
        paths: {}
      },
      source: 'http://example.com/openapi.json',
      format: 'json'
    });
  });

  it('handles invalid OpenAPI endpoint', async () => {
    await expect(fetchOpenApi('http://example.com/invalid-openapi')).rejects.toThrow('Error fetching OpenAPI spec from http://example.com/invalid-openapi: Error: Failed to fetch OpenAPI spec from http://example.com/invalid-openapi: 404 Not Found');
  });
});
