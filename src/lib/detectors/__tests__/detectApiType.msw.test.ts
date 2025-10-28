import { detectApiType } from '../detectApiType';
import { server } from '@/mocks/server';

beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('detectApiType', () => {
  it('should detect GraphQL API', async () => {
    const result = await detectApiType('http://example.com/graphql');

    expect(result.kind).toBe('graphql');
    expect(result.apiUrl).toBe('http://example.com/graphql');
  });

  it('should detect OpenApi spec', async () => {
    const result = await detectApiType('http://example.com');

    expect(result.kind).toBe('openapi')
    expect(result.apiUrl).toBe('http://example.com/openapi.json')
  });

  it('should return manual for unknown API types', async () => {

    const result = await detectApiType('http://unknown-api.test')
    expect(result.kind).toBe('manual')
  })
});
