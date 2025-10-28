import { isGraphql } from '@/lib/detectors/graphql'
import { server } from '@/mocks/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('isGraphql', () => {
  it('should return true for GraphQL endpoint', async () => {
    const result = await isGraphql('http://example.com/graphql');
    expect(result).toBe(true);
  });

  it('should return false for non-GraphQL endpoint', async () => {
    const result = await isGraphql('http://example.com/openapi');
    expect(result).toBe(false);
  });
});
