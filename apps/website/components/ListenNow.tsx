import React from 'react';
import clsx from 'clsx';

import {
  AppleMusic,
  AmazonMusic,
  Spotify,
  YoutubeMusic,
} from 'components/logos';

import { Album } from '@ontour/types';

const streamingProviders = {
  apple: AppleMusic,
  amazon: AmazonMusic,
  spotify: Spotify,
  youtube: YoutubeMusic,
};

const ListenNow = ({ ...album }: Album) => {
  return (
    <div className="z-0">
      <div className="flex justify-center -mb-4">
        <h4
          className={clsx(
            album.pageStyle.primaryText,
            album.pageStyle.backgroundColor,
            'w-fit px-3 text-lg sm:text-xl uppercase font-sans text-sicard-gold-300'
          )}
        >
          Listen Now
        </h4>
      </div>
      <div
        className={`${album.pageStyle.listenNowBorder} border rounded-2xl px-8 py-8 relative z-[-1]`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {Object.keys(album.streamingLinks).map((service) => {
            const StreamLogo = streamingProviders[service];

            return (
              <a
                href={album.streamingLinks[service]}
                target="_blank"
                className="flex items-center justify-center w-40 h-16 md:w-28 md:h-12 relative"
                key={service}
              >
                <StreamLogo
                  className={`${album.pageStyle.streamServiceColor} w-40 h-16 md:w-28 md:h-12 hover:${album.pageStyle.streamServiceColor}/50 hover:scale-110 transition duration-300 cursor-pointer`}
                />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ListenNow;
