import { http, HttpResponse } from 'msw'

function isRecord(x: unknown): x is Record<string, unknown> {
  return typeof x === 'object' && x !== null;
}


export const handlers = [
  http.post('http://example.com/graphql', async ({ request }) => {
    const body: unknown = await request.json()

    if (!isRecord(body)) {
      return HttpResponse.json({ errors: ['Invalid request body'] });
    }

    const query = body['query'];
    if (typeof query === 'string' && query.includes('__schema')) {
      return HttpResponse.json({
        data: { __schema: { queryType: { name: 'Query' } } }
      });
    }

    return HttpResponse.json({ errors: ['Invalid query'] })
  }),

  http.get('http://example.com/openapi.json', () => {
    return HttpResponse.json({
      openapi: '3.0.0',
      info: { title: 'Test API', version: '1.0' },
      paths: {}
    })
  })

]
