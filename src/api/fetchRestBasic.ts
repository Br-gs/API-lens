import { RawApiData } from "../types/api"
import { fetchWithTimeout } from "@/utils/fetchWithTimeout"

export async function fetchRestBasic(url: string): Promise<RawApiData> {
  try {

    const response = await fetchWithTimeout(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    }, 5000)

    if (!response.ok) {
      const snippet = await response.text().catch(() => "");
      throw new Error(`HTTP ${response.status} ${response.statusText} - ${snippet.slice(0, 200)}`);
    }

    let data: unknown = null
    try {
      data = await response.json()
    } catch (parseError) {
      const rawText = await response.text().catch(() => '[unable to read]')
      console.warn('Non-JSON response:', rawText.slice(0, 200))
    }

    return {
      kind: 'manual',
      data,
      source: url,
      format: 'json'
    }

  } catch (error) {
    throw new Error(`Error conectando con API REST: ${error}`)
  }
}
