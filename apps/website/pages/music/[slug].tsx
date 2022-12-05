import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getPlaiceholder, IGetPlaiceholderReturn } from 'plaiceholder';

import { ogImage } from 'utils/ogImage';

import { Title, Description } from 'utils/Meta';

import ListenNow from 'components/ListenNow';
import OtherAlbums from 'components/OtherAlbums';

import { data } from 'data';
import { Album, DataConfig } from 'types';
import { Copyright } from 'components';

export function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

interface Props {
  albumData: Album;
  config: DataConfig;
  leftSideBackground: IGetPlaiceholderReturn;
}

export default function Music({
  albumData,
  config,
  leftSideBackground,
}: Props) {
  const router = useRouter();
  const currentSlug = router.query.slug as string;
  const leftLayoutRef = useRef(null);
  const rightLayoutRef = useRef(null);
  const layoutRef = useRef(null);

  // resets scroll position on both layouts
  useEffect(() => {
    rightLayoutRef.current?.scrollTo(0, 0);
    leftLayoutRef.current?.scrollTo(0, 0);
    layoutRef.current?.scrollTo(0, 0);
  }, [currentSlug]);

  const album = albumData;

  return (
    <>
      <Title>{`${album.name} | Music`}</Title>
      <Description>{`Listen to ${album.name} on all streaming platforms. Track listing, streaming links, description, and more for ${config.artistName}'s ${album.type} "${album.name}".`}</Description>
      <Head>
        <meta
          property="og:image"
          content={ogImage(album.albumCoverUrl)}
          key="og:image"
        />
      </Head>
      <div
        className="grid grid-cols-1 md:grid-cols-2 h-screen overflow-y-auto"
        ref={layoutRef}
      >
        <div
          className="flex items-center justify-center relative px-4 py-3"
          ref={leftLayoutRef}
        >
          <Image
            src={leftSideBackground.img.src}
            alt=""
            layout="fill"
            objectFit="cover"
            className="brightness-[0.25]"
            placeholder="blur"
            blurDataURL={leftSideBackground.base64}
          />

          <div
            className={`${album.pageStyle.albumCoverBorderColor} rounded-lg shadow p-2 translate-y-20 md:translate-y-0`}
          >
            <Image
              src={album.albumCoverUrl}
              alt={`${album.name} album cover`}
              width={500}
              height={500}
            />
          </div>
        </div>
        <div
          className={`${album.pageStyle.backgroundColor} 
            'flex flex-col items-center md:overflow-y-scroll pb-20 md:h-screen`}
          ref={rightLayoutRef}
        >
          <div className="w-full mx-auto px-4 py-6 space-y-10 md:space-y-20 max-w-prose mt-20 flex flex-col items-center justify-center">
            <h1
              className={`${album.pageStyle.primaryText} font-serif text-center text-3xl sm:text-4xl`}
            >
              {album.name}
            </h1>
            <ListenNow {...album} />

            <div className="prose">
              {album.description.split('\n').map((section, index) => (
                <p
                  className={`${album.pageStyle.secondaryText} font-serif`}
                  key={index}
                >
                  {section}
                </p>
              ))}
            </div>
            {album.youtubeVideoId ? (
              <div className="relative rounded-xl overflow-auto w-full">
                <iframe
                  src={`https://www.youtube.com/embed/${album.youtubeVideoId}?controls=0`}
                  title="YouTube video player"
                  frameBorder="0"
                  className="w-full aspect-video rounded-lg shadow-lg"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ) : null}
            {album.trackList.length > 0 ? (
              <div
                className={`${album.pageStyle.albumCoverBorderColor} prose font-serif px-4 py-4 w-full`}
              >
                <h3>Track Listing</h3>
                <ol className="list-decimal text-sicard-blue-700 columns-1 md:columns-2">
                  {album.trackList.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ol>
              </div>
            ) : null}
            <div>
              {album.otherImages.map((image) => (
                <div className="relative" key={image}>
                  <Image
                    src={image}
                    layout="intrinsic"
                    objectFit="cover"
                    width={1200}
                    height={1200}
                    alt={`Another image from ${album.name}`}
                  />
                </div>
              ))}
            </div>
          </div>
          <OtherAlbums
            albums={Object.values(config.music.items)}
            artistName={config.artistName}
            currentSlug={currentSlug}
          />
          <Copyright
            legalEntity={config.legalEntity}
            textColor={album.pageStyle.secondaryText}
          />
        </div>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const formattedSlugs = Object.keys(data.music.items).map((slug) => ({
    params: {
      slug,
    },
  }));

  return {
    paths: formattedSlugs,
    fallback: false, // can also be true or 'blocking'
  };
}

export async function getStaticProps(context) {
  const { slug } = context.params;
  const albumData = data.music.items[slug];
  const leftSideBackground = await getPlaiceholder(
    data.music.style.leftSideBackground
  );
  return {
    props: {
      albumData,
      config: data,
      leftSideBackground,
    },
  };
}
