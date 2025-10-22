export async function isGraphql(url: string): Promise<boolean> {
  try {
    const introspectionQuery = {
      query: '{ __schema {queryType {name} } }'
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(introspectionQuery)
    })

    const data = await response.json()

    return !!data?.data?.__schema
  } catch (error) {
    return false
  }
}
