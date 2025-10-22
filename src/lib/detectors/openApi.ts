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
      const response = await fetch(specUrl)
      if (!response.ok) continue

      const data = await response.json()

      if (data.openapi || data.swagger) {
        return specUrl
      }
    } catch (error) {
      continue
    }
  }

  return null
}
