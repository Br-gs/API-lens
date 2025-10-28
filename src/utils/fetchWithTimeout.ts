const TEST_MODE = process.env.NODE_ENV === 'test'

export async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeoutMs: number,
): Promise<Response> {

  const effectiveTimeout = TEST_MODE ? timeoutMs / 10 : timeoutMs

  const controller = new AbortController()

  const timeoutId = setTimeout(() => {
    controller.abort()
  }, effectiveTimeout)

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    })

    return response

  } finally {
    clearTimeout(timeoutId)
  }
}
