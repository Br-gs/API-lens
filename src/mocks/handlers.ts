import { http, HttpResponse } from 'msw'

function isRecord(x: unknown): x is Record<string, unknown> {
  return typeof x === 'object' && x !== null;
}


export const handlers = [
  http.post('http://example.com/graphql', async ({ request }) => {
    const body: unknown = await request.json() as { query: string }

    if (!isRecord(body)) {
      return HttpResponse.json({ errors: ['Invalid request body'] });
    }

    const query = body['query'];
    if (typeof query === 'string' && query.includes('__schema')) {
      return HttpResponse.json({
        data: { __schema: { queryType: { name: 'Query' } } }
      });
    }

    return HttpResponse.json({
      errors: [{ message: 'Invalid query' }]
    }, { status: 400 })
  }),

  http.get('http://example.com/openapi.json', () => {
    return HttpResponse.json({
      openapi: '3.0.0',
      info: { title: 'Test API', version: '1.0' },
      paths: {
        '/users': {
          get: {
            summary: 'Get users',
            responses: { '200': { description: 'Success' } }
          }
        }
      }
    })
  }),

  http.post('http://example.com/*', () => {
    return HttpResponse.text('Not a GraphQL endpoint', { status: 400 })
  }),

  http.head('http://example.com/*', () => {
    return new HttpResponse(null, { status: 404 })
  }),

  http.get('http://example.com/*', () => {
    return new HttpResponse(null, { status: 404 })
  }),

  http.all('http://unknown-api.test/*', () => {
    return new HttpResponse(null, { status: 404 })
  }),

  http.all('http://no-spec-api.test/*', () => {
    return new HttpResponse(null, { status: 404 })
  }),

]
