import React, { useEffect, useState } from 'react';
import { XMarkIcon, PlusIcon } from '@heroicons/react/24/solid';

import { Input } from 'components';

import {
  parseSpotifyUrl,
  parseArchiveUrl,
  parseAppleMusicUrl,
  parseAmazonMusicUrl,
  parseYoutubeMusicUrl,
} from 'components/AudioForm/util';
import clsx from 'clsx';

interface Props {
  onSubmit: (item: { provider: string; identifier: string }) => void;
}

export const AddSourceForm = ({ onSubmit }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const autoAddSource = async () => {
      if (audioUrl.length) {
        try {
          setIsLoading(true);
          setIsError(false);
          if (audioUrl.includes('spotify')) {
            const item = {
              identifier: parseSpotifyUrl(audioUrl),
              provider: 'spotify',
            };
            await onSubmit(item);
            setAudioUrl('');
          } else if (audioUrl.includes('archive')) {
            const item = {
              identifier: parseArchiveUrl(audioUrl),
              provider: 'archive',
            };
            await onSubmit(item);
            setAudioUrl('');
          } else if (audioUrl.includes('apple')) {
            const item = {
              identifier: parseAppleMusicUrl(audioUrl),
              provider: 'apple',
            };
            await onSubmit(item);
            setAudioUrl('');
          } else if (audioUrl.includes('amazon')) {
            const item = {
              identifier: parseAmazonMusicUrl(audioUrl),
              provider: 'amazon',
            };
            await onSubmit(item);
            setAudioUrl('');
          } else if (audioUrl.includes('youtube')) {
            const item = {
              identifier: parseYoutubeMusicUrl(audioUrl),
              provider: 'youtube',
            };
            await onSubmit(item);
            setAudioUrl('');
          } else {
            setIsError(true);
          }
          setIsLoading(false);
        } catch (e) {
          setIsError(true);
        }
      }
    };
    autoAddSource();
  }, [audioUrl]);

  return (
    <div className="divide-y divide-gray-200 rounded-lg bg-white shadow mt-6">
      <div className="flex w-full items-center justify-between space-x-6 p-6">
        <Input
          value={audioUrl}
          setValue={setAudioUrl}
          placeholder="https://open.spotify.com/album/7diHYi0CglGJekoM3KaWBK?si=10mGpc0iRUedFnlENaTgfQ"
          label="URL"
          className="w-full"
        />
      </div>
      <div>
        <div className="-mt-px flex divide-x divide-gray-200">
          <div className="flex w-0 flex-1">
            <button
              onClick={() => {
                setAudioUrl('');
                setIsError(false);
              }}
              className={clsx(
                isError ? 'bg-red-50 text-red-700 hover:text-red-800' : '',
                'relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500'
              )}
            >
              <XMarkIcon
                className={clsx(
                  isError ? 'text-red-700' : 'text-gray-400',
                  'h-5 w-5'
                )}
                aria-hidden="true"
              />
              <span className="ml-3">Clear</span>
            </button>
          </div>
          {isError ? null : (
            <div className="-ml-px flex w-0 flex-1">
              <a
                //   href={`tel:${person.telephone}`}
                className="relative inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
              >
                <PlusIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                <span className="ml-3">
                  {isLoading ? 'Loading...' : 'Add source'}
                </span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
