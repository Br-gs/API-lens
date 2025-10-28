import { http, HttpResponse } from 'msw'

export const handlersApi = [

  http.post('http://example.com/graphql', async ({ request }) => {
    const body: unknown = await request.json() as { query: string }

    if (typeof body === 'object' && body !== null && 'query' in body) {
      const query = (body as { query: string }).query

      if (query.includes('IntrospectionQuery') || query.includes('__schema')) {

        return HttpResponse.json({
          data: {
            __schema: {
              queryType: { name: 'Query' },
              mutationType: null,
              subscriptionType: null,
              types: [
                {
                  kind: 'OBJECT',
                  name: 'Query',
                  fields: [
                    {
                      name: 'hello',
                      type: { name: 'String', kind: 'SCALAR' }
                    }
                  ]
                }
              ]
            }
          }
        })
      }
    }

    return HttpResponse.json(
      { errors: [{ message: 'Invalid GraphQL query' }] },
      { status: 400 }
    )
  }),

  http.get('http://example.com/openapi.json', async () => {
    return HttpResponse.json({
      openapi: '3.0.0',
      info: {
        title: 'Mocked API',
        version: '1.0',
        description: 'Test OpenAPI spec'
      },
      paths: {
        '/users': {
          get: {
            summary: 'Get users',
            responses: {
              '200': {
                description: 'Success',
                content: {
                  'application/json': {
                    schema: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/User' }
                    }
                  }
                }
              }
            }
          }
        }
      },
      components: {
        schemas: {
          User: {
            type: 'object',
            properties: {
              id: { type: 'integer' },
              name: { type: 'string' }
            }
          }
        }
      }
    })
  }),

  // Handlers for invalid endpoints
  http.get('http://example.com/invalid-openapi', () => {
    return new HttpResponse(null, { status: 404 })
  }),

  http.post('http://example.com/invalid-graphql', () => {
    return new HttpResponse(null, { status: 404 })
  }),

  // Basic REST (to fetchRestBasic)
  http.get('http://example.com/api/data', () => {
    return HttpResponse.json({
      message: 'Success',
      data: [{ id: 1, name: 'Test' }]
    })
  }),

  http.head('http://example.com/api/data', () => {
    return new HttpResponse(null, { status: 200 })
  }),

  http.get('http://example.com/api/invalid-json', () => {
    return HttpResponse.text('<html>Not JSON</html>', {
      headers: { 'Content-Type': 'text/html' }
    })
  }),

];

