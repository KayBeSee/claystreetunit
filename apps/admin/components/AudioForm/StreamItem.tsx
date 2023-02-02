import React, { useState } from 'react';
import { DecoratedAudioSource } from '@ontour/archive';

interface Props extends DecoratedAudioSource {
  onDelete: (id: string) => void;
}

export const StreamItem = ({
  id,
  provider,
  name,
  imageUrl,
  onDelete,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const deleteAudioSource = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        // @ts-ignore
        `${process.env.NEXT_PUBLIC_APP_URL}/api/audio/${id}`,
        {
          method: 'delete',
        }
      );
      onDelete(id);
      setIsLoading(false);
    } catch (e) {}
  };

  return (
    <li className="flex py-6 px-4 sm:px-6">
      <div className="flex-shrink-0">
        <img
          src={imageUrl}
          alt={`${name} album art from ${provider}`}
          className="w-20 rounded-md aspect-square"
        />
      </div>

      <div className="ml-6 flex flex-1 flex-col">
        <div className="flex">
          <div className="min-w-0 flex-1">
            <h4 className="text-sm">
              <a
                href="#"
                className="font-medium text-gray-700 hover:text-gray-800"
              >
                {name}
              </a>
            </h4>
            <p className="mt-1 text-sm text-gray-500 capitalize">{provider}</p>
          </div>

          <div className="ml-4 flow-root flex-shrink-0">
            <button
              onClick={() => deleteAudioSource()}
              disabled={isLoading}
              type="button"
              className="-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500 disabled:opacity-50"
            >
              <span className="sr-only">Remove</span>
              <svg
                className="h-5 w-5"
                x-description="Heroicon name: mini/trash"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};
