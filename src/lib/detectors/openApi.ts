import { fetchWithTimeout } from '@/utils/fetchWithTimeout'

export async function findOpenApiSpec(url: string): Promise<string | null> {

  const commonPaths = [
    '/openapi.json',
    '/swagger.json',
    '/api-docs',
    '/v3/api-docs',
    '/swagger/v1/swagger.json'
  ]
  for (const path of commonPaths) {
    try {
      const specUrl = new URL(path, url).toString()
      const isValid = await tryDetectOpenAPI(specUrl)

      if (isValid) {
        return specUrl
      }
    } catch (error) {
      console.log('Error constructing URL or detecting OpenAPI spec:', error)
      continue
    }
  }

  return null
}

async function tryDetectOpenAPI(specUrl: string): Promise<boolean> {

  try {
    const headResponse = await fetchWithTimeout(specUrl, {
      method: 'HEAD',
      headers: { 'Accept': 'application/json' }
    }, 3000)

    if (headResponse.ok) {
      const contentType = headResponse.headers.get('content-type')

      if (contentType?.includes('application/json')) {
        return true
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        console.log(`⏱️ HEAD timeout after 3s for ${specUrl}`)
      } else {
        console.log(`❌ HEAD error: ${error.message}`)
      }
    }
  }

  try {
    const getResponse = await fetchWithTimeout(specUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Range': 'bytes=0-1023'
      }
    }, 5000)

    if (getResponse.status === 206) {
      const partialText = await getResponse.text()
      if (partialText.includes('"openapi"') || partialText.includes('"swagger"')) {
        return true
      }
    }

    if (getResponse.status === 200) {
      const contentType = getResponse.headers.get('content-type')

      if (contentType?.includes('application/json')) {
        const text = await getResponse.text()

        const preview = text.substring(0, 1000)

        if (preview.includes('"openapi"') || preview.includes('"swagger"')) {
          return true
        }
      }
    }

  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        console.log(`⏱️ GET timeout after 5s for ${specUrl}`)
      } else {
        console.log(`❌ GET error: ${error.message}`)
      }
    }
  }
  return false
}
