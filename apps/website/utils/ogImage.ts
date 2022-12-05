export const ogImage = (url: string) =>
  `${process.env.NEXT_PUBLIC_HOST}/_next/image?url=${encodeURIComponent(
    url
  )}&w=640&q=75`;
