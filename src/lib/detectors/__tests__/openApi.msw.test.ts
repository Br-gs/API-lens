import { findOpenApiSpec } from '@/lib/detectors/openApi';
import { server } from '@/mocks/server';

beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('findOpenApiSpec', () => {
  it('should find OpenAPI spec at /openapi.json', async () => {
    const result = await findOpenApiSpec('http://example.com/openapi');
    expect(result).toBe('http://example.com/openapi.json');
  });

  it('should return null if no OpenAPI spec is found', async () => {
    const result = await findOpenApiSpec('http://no-spec-api.test')
    expect(result).toBeNull();
  });
});
