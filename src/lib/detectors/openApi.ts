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
    const headResponse = await fetch(specUrl, {
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
    console.log()
  }

  try {
    const getResponse = await fetch(specUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Range': 'bytes=0-1023'
      },
      signal: controller.signal
    })

    if (getResponse.status === 206) {
      const partialText = await getResponse.text()
      if (partialText.includes('"openapi"') || partialText.includes('"swagger"')) {
        return true
      }
    }
  } catch (error) {
    console.log(error)
  } finally {
    clearTimeout(timeoutId)
  }
  return false
}
