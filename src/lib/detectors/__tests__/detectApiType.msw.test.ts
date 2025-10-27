import { handlers } from '@/mocks/handlers';
import { setupServer } from 'msw/node';
import { detectApiType } from '../detectApiType';

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('detectApiType', () => {
  it('should detect GraphQL API', async () => {
    const result = await detectApiType('http://example.com/graphql');

    expect(result.kind).toBe('graphql');
    expect(result.apiUrl).toBe('http://example.com/graphql');
  });

  it('should detect OpenApi spec', async () => {
    const result = await detectApiType('http://example.com/openapi');

    expect(result.kind).toBe('openapi');
    expect(result.apiUrl).toContain('openapi.json')
    expect(result.apiUrl).toBe('http://example.com/openapi.json');
  });

  //it('should return manual for unknown API types', async () => {
  //const result = await detectApiType('http://example.com/unknown');
  //expect(result.kind).toBe('manual');
  //});
});
