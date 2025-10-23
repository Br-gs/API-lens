import { RawApiData } from "../types/api"

export async function fetchRestBasic(url: string): Promise<RawApiData> {
  try {

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
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
  }
}
