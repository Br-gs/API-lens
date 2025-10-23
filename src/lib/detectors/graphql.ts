import { fetchWithTimeout } from "@/utils/fetchWithTimeout";

export async function isGraphql(url: string): Promise<boolean> {
  try {
    const introspectionQuery = {
      query: '{ __schema {queryType {name} } }'
    }

    const response = await fetchWithTimeout(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(introspectionQuery)
    }, 3000)

    if (!response.ok) return false
    const data = await response.json()

    return !!data?.data?.__schema

  } catch (error) {
    return false
  }
}
