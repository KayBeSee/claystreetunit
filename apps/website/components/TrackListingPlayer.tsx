import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { Album } from '@ontour/types';
import { PlayIcon, PauseIcon } from '@heroicons/react/24/solid';
import { Equalizer } from 'components/logos';

interface Props {
  album: Album;
}

export const TrackListingPlayer = ({ album }: Props) => {
  const ref = useRef<HTMLAudioElement>(null);
  const [currentAudioUrl, setCurrentAudioUrl] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (ref.current) {
      ref.current.pause();
      ref.current = new Audio(currentAudioUrl);
      ref.current.play();
      ref.current.onended = () => {
        setCurrentAudioUrl('');
        setIsPlaying(false);
      };
    } else {
      ref.current = new Audio(currentAudioUrl);
      ref.current.play();
      ref.current.onended = () => {
        setCurrentAudioUrl('');
        setIsPlaying(false);
      };
    }
  }, [currentAudioUrl]);

  useEffect(() => {
    return () => {
      ref.current.pause();
      setCurrentAudioUrl('');
      setIsPlaying(false);
    };
  }, []);

  if (!album.trackList.length) {
    return null;
  }

  const togglePlay = (url) => {
    if (currentAudioUrl === url) {
      if (!isPlaying) {
        ref.current.play();
        setIsPlaying(true);
      } else {
        ref.current.pause();
        setIsPlaying(false);
      }
    } else {
      setCurrentAudioUrl(url);
      setIsPlaying(true);
    }
  };

  return (
    <div
      className={`${album.pageStyle.albumCoverBorderColor} prose font-serif px-6 py-5 w-full rounded-2xl`}
    >
      <h3 className={`${album.pageStyle.primaryText} -mb-0.5`}>
        Track Listing
      </h3>
      <p className={`${album.pageStyle.primaryText} opacity-70 text-sm`}>
        Click tracks for preview
      </p>
      <ol
        className={clsx(
          album.pageStyle.primaryText,
          'list-none columns-1 md:columns-2 list-inside pl-0 not-prose'
        )}
      >
        {album.trackList.map((item, i) => (
          <li
            key={item.name}
            className={clsx(
              item.url === currentAudioUrl ? 'font-semibold' : '',
              'hover:bg-white/20 hover:cursor-pointer group not-prose font-semibold rounded-xl'
            )}
          >
            <button
              onClick={() => {
                togglePlay(item.url);
              }}
              className="not-prose items-center flex px-2 py-1"
            >
              <span
                className={clsx(
                  currentAudioUrl === item.url && isPlaying
                    ? 'hidden'
                    : 'flex group-hover:hidden',
                  'mr-2 mt-0 w-4 h-4 flex items-center opacity-60'
                )}
              >
                {i + 1}
              </span>
              <PlayIcon
                className={clsx(
                  (currentAudioUrl === item.url && !isPlaying) ||
                    currentAudioUrl !== item.url
                    ? 'group-hover:flex'
                    : currentAudioUrl === item.url && !isPlaying
                    ? ''
                    : '',
                  'w-4 h-4 hidden mr-2'
                )}
              />
              <PauseIcon
                className={clsx(
                  currentAudioUrl === item.url && isPlaying
                    ? 'group-hover:flex'
                    : 'hidden',
                  'w-4 h-4 hidden mr-2'
                )}
              />
              <Equalizer
                className={clsx(
                  currentAudioUrl === item.url && isPlaying
                    ? 'flex group-hover:hidden'
                    : 'hidden',
                  `w-4 h-4 mr-2`
                )}
              />

              {item.name}
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
};
