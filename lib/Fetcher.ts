export const Fetcher = (url: string) => fetch(url).then((res) => res.json())

