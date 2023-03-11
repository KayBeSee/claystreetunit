import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';
import { data } from '@ontour/data';

export const config = {
  runtime: 'experimental-edge',
};

function getFontSize(length) {
  if (length > 32) {
    return 'text-8xl';
  }
  return 'text-8xl';
}

// Make sure the font exists in the specified path:
const ralewayBoldLoader = fetch(
  new URL('../../assets/Raleway-Bold.ttf', import.meta.url)
).then((res) => res.arrayBuffer());

// Make sure the font exists in the specified path:
const ralewayMediumLoader = fetch(
  new URL('../../assets/Raleway-Bold.ttf', import.meta.url)
).then((res) => res.arrayBuffer());

export default async function handler(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const title = searchParams.get('title');
    const description = searchParams.get('description');

    const ralewayBold = await ralewayBoldLoader;
    const ralewayMedium = await ralewayMediumLoader;

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            backgroundImage:
              'linear-gradient(to bottom right, #374151, #111827)',
          }}
        >
          <img
            style={{
              filter: 'brightness(0.5)',
              width: '100vw',
              objectFit: 'cover',
              objectPosition: 'center',
            }}
            src={`http://${process.env.NEXT_PUBLIC_VERCEL_URL}/${data.openGraph.backgroundImage}`}
            tw="absolute inset-0"
          />

          <div tw="flex flex-col px-20 py-10 w-full h-screen justify-between">
            <div tw="flex justify-between w-full">
              <img
                src={`http://${process.env.NEXT_PUBLIC_VERCEL_URL}/${data.openGraph.textLogo}`}
                style={{ width: 700, height: 200 }}
                tw="flex opacity-100 my-10"
              />
            </div>
            <div tw="flex flex-col w-full py-2">
              <div tw="flex text-white py-2 px-4 text-8xl rounded-3xl items-center justify-center">
                {title}
              </div>
              <div tw="flex text-gray-300 py-2 px-4 text-4xl rounded-3xl items-center justify-center">
                {description}
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Raleway',
            data: ralewayMedium,
            style: 'normal',
          },
          {
            name: 'Raleway-Bold',
            data: ralewayBold,
            style: 'normal',
          },
        ],
      }
    );
  } catch (e) {
    console.log('e: ', e);
  }
}
