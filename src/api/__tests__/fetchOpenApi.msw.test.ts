import { fetchOpenApi } from "../fetchOpenApi";
import { http, HttpResponse } from "msw";
import { server } from '@/mocks/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('OpenAPI Fetching', () => {
  it('successfully fetches OpenAPI spec', async () => {
    const result = await fetchOpenApi('http://example.com/openapi.json');
    expect(result).toMatchObject({
      kind: 'openapi',
      source: 'http://example.com/openapi.json',
      format: 'json'
    })

    const data = result.data as { openapi: string; info: { title: string } }
    expect(data.openapi).toBe('3.0.0')
    expect(data.info.title).toBe('Mocked API')
  })

  it('throws error on 404', async () => {
    await expect(
      fetchOpenApi('http://example.com/invalid-openapi')
    ).rejects.toThrow(/Failed to fetch OpenAPI spec/)
  })

  it('throws error on invalid JSON', async () => {
    server.use(
      http.get('http://example.com/openapi.json', () => {
        return HttpResponse.text('Not JSON', {
          headers: { 'Content-Type': 'text/html' }
        })
      })
    )

    await expect(
      fetchOpenApi('http://example.com/openapi.json')
    ).rejects.toThrow()
  })
});
