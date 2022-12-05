import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { SocialIcons } from 'components';

import { data } from 'data';
import { DataConfig } from 'types';

interface Props {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  config: DataConfig;
}

const links = [
  {
    slug: '/tour',
    text: 'Tour',
  },
  {
    slug: `/music/${Object.keys(data.music.items)[0]}`,
    text: 'Music',
  },
  {
    slug: '/news',
    text: 'News',
  },
  {
    slug: '/info',
    text: 'Info',
  },
  {
    slug: '/mailing-list',
    text: 'Mailing List',
  },
  {
    slug: 'https://shop.sicardhollow.com/',
    text: 'Shop',
  },
];

export const SplashPage = ({ config, setIsOpen }: Props) => (
  <>
    <div className="w-screen h-screen object-cover inset-0">
      <video
        className="aspect-video fixed w-screen h-screen object-cover inset-0 brightness-50"
        preload="auto"
        autoPlay={true}
        muted={true}
        loop={true}
        playsInline={true}
        poster="/placeholder.png"
        id="bgvid"
      >
        <source
          src={
            process.env.NODE_ENV === 'production'
              ? config.home.splashVideoUrl
              : ''
          }
        />
      </video>

      <div className="fixed inset-0 flex h-screen flex-col align-center justify-center">
        <div className="flex items-center justify-center mb-6">
          <div className="w-full h-48 sm:h-56 md:h-72 lg:h-80 relative max-w-screen-2xl">
            <Link href="/" onClick={() => setIsOpen(false)}>
              <Image
                src={config.home.logo}
                alt={`${config.artistName} Logo`}
                layout="fill"
                objectFit="contain"
                priority
              />
            </Link>
          </div>
        </div>
        <div className="flex sm:hidden gap-x-6 items-center justify-center mb-8">
          <SocialIcons
            socialLinks={config.info.social}
            iconClassName="text-white"
          />
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center relative gap-x-6 gap-y-2 mb-6">
          {links.map((link) => (
            <Link
              href={link.slug}
              key={link.slug}
              onClick={() => setIsOpen(false)}
              className="text-white text-2xl font-serif hover:text-sicard-blue-100 hover:scale-110 transition duration-300"
            >
              {link.text}
            </Link>
          ))}
        </div>
        <div className="hidden sm:flex gap-x-6 items-center justify-center">
          <SocialIcons
            socialLinks={config.info.social}
            iconClassName="text-white"
          />
        </div>
      </div>
    </div>
  </>
);
