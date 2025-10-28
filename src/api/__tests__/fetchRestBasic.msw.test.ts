import { handlersApi } from '@/mocks/handlersApi'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { fetchRestBasic } from '@/api/fetchRestBasic'

const serverApi = setupServer(...handlersApi)

beforeAll(() => serverApi.listen({ onUnhandledRequest: 'warn' }))
afterEach(() => serverApi.resetHandlers())
afterAll(() => serverApi.close())

describe('fetchRestBasic', () => {
  it('successfully fetches JSON data', async () => {
    const result = await fetchRestBasic('http://example.com/api/data')

    expect(result).toMatchObject({
      kind: 'manual',
      source: 'http://example.com/api/data',
      format: 'json'
    })

    const data = result.data as { message: string; data: unknown[] }
    expect(data.message).toBe('Success')
    expect(Array.isArray(data.data)).toBe(true)
  })

  it('throws error on 404', async () => {
    serverApi.use(
      http.get('http://example.com/api/missing', () => {
        return new HttpResponse('Not Found', { status: 404 })
      })
    )

    await expect(
      fetchRestBasic('http://example.com/api/missing')
    ).rejects.toThrow(/HTTP 404/)
  })

  it('handles non-JSON response gracefully', async () => {
    jest.spyOn(console, 'warn').mockImplementation()
    const result = await fetchRestBasic('http://example.com/api/invalid-json')

    expect(result.kind).toBe('manual')
    expect(result.data).toBeNull()
  })

  it('throws error on network timeout', async () => {
    serverApi.use(
      http.get('http://example.com/api/timeout', async () => {
        await new Promise(resolve => setTimeout(resolve, 1000))
        return HttpResponse.json({ data: 'late' })
      })
    )

    await expect(
      fetchRestBasic('http://example.com/api/timeout')
    ).rejects.toThrow()
  })
})
