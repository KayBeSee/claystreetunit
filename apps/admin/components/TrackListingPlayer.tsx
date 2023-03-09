import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { Album } from '@ontour/types';

interface Props {
  album: Album;
}

export const TrackListingPlayer = ({ album }: Props) => {
  const ref = useRef<HTMLAudioElement>(null);
  const [currentAudioUrl, setCurrentAudioUrl] = useState('');

  useEffect(() => {
    if (ref.current) {
      ref.current.pause();
      ref.current = new Audio(currentAudioUrl);
      ref.current.play();
      ref.current.onended = () => {
        setCurrentAudioUrl('');
      };
    }
  }, [currentAudioUrl]);

  if (!album.trackList.length) {
    return null;
  }

  return (
    <div
      className={`${album.pageStyle.albumCoverBorderColor} prose font-serif px-4 py-4 w-full`}
    >
      <h3 className={`${album.pageStyle.primaryText}`}>Track Listing</h3>
      <ol
        className={clsx(
          album.pageStyle.primaryText,
          `marker:${album.pageStyle.primaryText}`,
          'list-decimal columns-1 md:columns-2'
        )}
      >
        {album.trackList.map((item) => (
          <li
            key={item.name}
            className={clsx(item.url === currentAudioUrl ? 'bg-black' : '')}
          >
            <button
              onClick={() => {
                setCurrentAudioUrl(item.url);
              }}
            >
              {item.name}
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
};
