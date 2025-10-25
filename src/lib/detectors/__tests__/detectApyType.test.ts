import { detectApiType } from '../detectApiType'

describe('detectApiType - URL Validation', () => {

  it('should reject URLs without protocol', async () => {
    const invalidUrl = 'example.com'

    await expect(detectApiType(invalidUrl))
      .rejects
      .toThrow('Invalid URL')
  })

  it('should reject URLs with invalid protocol', async () => {
    const ftpUrl = 'ftp://example.com'

    await expect(detectApiType(ftpUrl))
      .rejects
      .toThrow('URL must use http:// or https:// protocol')
  })

})
