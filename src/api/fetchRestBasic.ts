import { RawApiData } from "../types/api"

export async function fetchRestBasic(url: string): Promise<RawApiData> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);
  try {

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      },
      signal: controller.signal
    })

    let data = null
    try {
      data = await response.json()
    } catch {
      data = { message: 'API responde pero sin JSON válido' }
    }

    return {
      kind: 'manual',
      data,
      source: url,
      format: 'json'
    }

  } catch (error: any) {
    throw new Error(`Error conectando con API REST: ${error.message}`)
  } finally {
    clearTimeout(timeoutId);
  }
}
