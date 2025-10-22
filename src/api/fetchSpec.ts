
const fetchSpec = (url: string) => {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    throw new Error('Invalid URL. Must start with http:// or https://');
  }



}
