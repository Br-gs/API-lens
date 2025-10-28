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

    const text = await response.text()

    let data: unknown = null
    try {
      data = JSON.parse(text)
    } catch (parseError) {
      console.warn('Non-JSON response:', text.slice(0, 200))
      data = null
    }

    return {
      kind: 'manual',
      data,
      source: url,
      format: 'json'
    }

  } catch (error) {
    throw new Error(`Error connecting to REST API: ${error}`)
  }
}
