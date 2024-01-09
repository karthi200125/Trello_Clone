import { createApi } from 'unsplash-js'

export const Unsplash = createApi({
    accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY!,
    fetch: fetch,
})