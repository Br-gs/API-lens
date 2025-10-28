import { http, HttpResponse } from 'msw'

export const handlersApi = [

  http.post('http://example.com/graphql', async ({ request }) => {
    const body: unknown = await request.json() as { query: string }

    if (typeof body === 'object' && body !== null && 'query' in body) {
      return HttpResponse.json({
        kind: 'graphql',
        data: { data: {} },
        source: 'http://example.com/graphql',
        format: 'json'
      });
    }
    return HttpResponse.json({ errors: ['Invalid request body'] });
  }),

  http.get('http://example.com/openapi.json', async () => {
    return HttpResponse.json({
      openapi: '3.0.0',
      info: { title: 'Mocked API', version: '1.0' },
      paths: {}
    });
  }),

  http.get('http://example.com/invalid-openapi', () => {
    return new HttpResponse(null, { status: 404 })
  }),

  http.post('http://example.com/invalid-graphql', () => {
    return new HttpResponse(null, { status: 404 })
  }),
];

