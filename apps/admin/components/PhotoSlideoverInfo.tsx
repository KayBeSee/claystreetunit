import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { ShowWithSetlist } from '@ontour/archive';
import { ResourceApiResponse } from 'cloudinary';

import { fetcher } from 'lib/fetcher';
import { useState } from 'react';

interface Props {
  initialPhoto: ResourceApiResponse['resources'][0];
  show: ShowWithSetlist;
  onChangeFavorite: (publicId: string) => void;
  onChangeStatus: (publicId: string, status: string) => void;
}

export const PhotoSlideoverInfo = ({
  initialPhoto,
  show,
  onChangeFavorite,
  onChangeStatus,
}: Props) => {
  const [photo, setPhoto] = useState(initialPhoto);

  const togglePublish = () => {
    const newStatus =
      photo.metadata.status === 'submitted' ||
      photo.metadata.status === 'rejected'
        ? 'published'
        : 'submitted';
    onChangeStatus(photo.public_id, newStatus);
    setPhoto({
      ...photo,
      metadata: {
        ...photo.metadata,
        status: newStatus,
      },
    });
  };

  const toggleFavorite = () => {
    onChangeFavorite(photo.public_id);
  };

  return (
    <aside className="overflow-y-auto border-l border-gray-200 bg-white p-8 lg:block">
      <div className="space-y-6 pb-16">
        <div>
          <div className="aspect-w-10 aspect-h-7 block w-full overflow-hidden rounded-lg">
            <img src={photo.secure_url} alt="" className="object-cover" />
          </div>
          <div className="mt-4 flex items-start justify-between">
            <div>
              <h2 className="text-lg font-medium text-gray-900">
                <span className="sr-only">Details for </span>
                {photo.display_name}
              </h2>
              <p className="text-sm font-medium text-gray-500">{photo.size}</p>
            </div>
            <button
              onClick={toggleFavorite}
              type="button"
              className="ml-4 flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {show.imagePublicId === photo.public_id ? (
                <StarIconSolid className="h-6 w-6" aria-hidden="true" />
              ) : (
                <StarIconOutline className="h-6 w-6" aria-hidden="true" />
              )}
              <span className="sr-only">Favorite</span>
            </button>
          </div>
        </div>
        <div>
          <h3 className="font-medium text-gray-900">Information</h3>
          <dl className="mt-2 divide-y divide-gray-200 border-t border-b border-gray-200">
            {Object.keys(photo.metadata).map((key) => (
              <div
                key={key}
                className="flex justify-between py-3 text-sm font-medium"
              >
                <dt className="text-gray-500 capitalize">{key}</dt>
                <dd className="whitespace-nowrap text-gray-900 capitalize">
                  {photo.metadata[key]}
                </dd>
              </div>
            ))}
            <div className="flex justify-between py-3 text-sm font-medium">
              <dt className="text-gray-500 capitalize">Size</dt>
              <dd className="whitespace-nowrap text-gray-900 capitalize">
                {photo.bytes / 1000000} MB
              </dd>
            </div>
            <div className="flex justify-between py-3 text-sm font-medium">
              <dt className="text-gray-500 capitalize">Dimensions</dt>
              <dd className="whitespace-nowrap text-gray-900 capitalize">
                {photo.width} x {photo.height}
              </dd>
            </div>
          </dl>
        </div>
        <div className="flex">
          <button
            onClick={togglePublish}
            type="button"
            className="flex-1 rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {photo.metadata.status === 'submitted' ||
            photo.metadata.status === 'rejected'
              ? 'Publish'
              : 'Unpublish'}
          </button>
          <button
            type="button"
            className="ml-3 flex-1 rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Delete
          </button>
        </div>
      </div>
    </aside>
  );
};
