export async function isGraphql(url: string): Promise<boolean> {
  const controller = new AbortController();
  const timeout = setTimeout(() => {
    controller.abort();
  }, 3000);

  try {
    const introspectionQuery = {
      query: '{ __schema {queryType {name} } }'
    }

    const response = await fetch(url, {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(introspectionQuery)
    })

    if (!response.ok) return false
    const data = await response.json()

    return !!data?.data?.__schema
  } catch (error) {
    return false

  } finally {
    clearTimeout(timeout);
  }
}
