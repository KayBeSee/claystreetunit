import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';
import { format } from 'date-fns';
import data from 'data';
import { getImageUrlFromPublicId } from 'utils/getImageUrlFromPublicId';
import clsx from 'clsx';

export const config = {
  runtime: 'experimental-edge',
};

function getFontSize(length) {
  if (length > 32) {
    return 'text-6xl';
  }
  return 'text-8xl';
}

// // Make sure the font exists in the specified path:
// const ralewayBoldLoader = fetch(
//   new URL('../../assets/Raleway-Bold.ttf', import.meta.url)
// ).then((res) => res.arrayBuffer());

// // Make sure the font exists in the specified path:
// const ralewayMediumLoader = fetch(
//   new URL('../../assets/Raleway-Bold.ttf', import.meta.url)
// ).then((res) => res.arrayBuffer());

export default async function handler(req: NextRequest) {
  console.log('hits');
  try {
    const { searchParams } = req.nextUrl;
    const date = searchParams.get('date');
    const venueName = searchParams.get('venueName');
    const venueCity = searchParams.get('venueCity');
    const venueState = searchParams.get('venueState');
    const imagePublicId = searchParams.get('imagePublicId');
    console.log('imagePublicId: ', imagePublicId);

    const imgSrc =
      getImageUrlFromPublicId(imagePublicId) ||
      'https://res.cloudinary.com/dyxybmew8/image/upload/q_10/airshow/shows/may-05-2022-hifi-clyde%27s-chattanooga-tn/fsumwwchsq1wdoeyzkh7.jpg';
    // `https://${process.env.NEXT_PUBLIC_VERCEL_URL}${data.info.style.backgroundImage}`;

    console.log('imgSrc: ', imgSrc);

    // const ralewayBold = await ralewayBoldLoader;
    // const ralewayMedium = await ralewayMediumLoader;

    return new ImageResponse(
      (
        <div
          tw="bg-slate-800"
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          {/* <img
            style={{
              filter: 'brightness(0.5)',
              width: '100vw',
              objectFit: 'cover',
              objectPosition: 'center',
            }}
            src={imgSrc}
            tw="absolute inset-0"
          /> */}

          <div tw="flex flex-col px-4 py-6 w-full h-screen justify-between">
            <div tw="flex justify-between w-full">
              <div tw="flex flex-col">
                <time
                  tw="font-sans text-4xl text-slate-300 mb-2"
                  style={{ fontFamily: '"Raleway"' }}
                >
                  {format(new Date(date), 'MMMM d, y')}
                </time>
                <span
                  style={{ fontFamily: '"Raleway-Bold"' }}
                  tw={clsx(
                    (getFontSize(venueName.length),
                    'font-serif text-slate-200 mb-2')
                  )}
                >
                  {venueName}
                </span>
                <span
                  tw="font-sans text-lg text-slate-200 text-4xl"
                  style={{ fontFamily: '"Raleway"' }}
                >
                  {venueCity}, {venueState}
                </span>
              </div>
            </div>
            <div tw="flex w-full justify-between">
              <div tw="flex text-white bg-sky-700/80 py-4 px-4 text-5xl rounded-3xl items-center justify-center">
                View the setlist, audio, & photos
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="3"
                  stroke="currentColor"
                  style={{ width: 36, height: 36, marginLeft: 8, marginTop: 8 }}
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </div>
              {/* <img
                src={`http://${process.env.NEXT_PUBLIC_VERCEL_URL}/${data.archive.ogImageLogo}`}
                style={{ width: 100, height: 100 }}
                tw="flex opacity-75"
              /> */}
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    console.log('e: ', e);
  }
}
