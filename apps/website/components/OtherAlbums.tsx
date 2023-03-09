import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Album } from '@ontour/types';

interface Props {
  currentSlug: string;
  artistName: string;
  albums: Album[];
  className: string;
}

const OtherAlbums = ({ currentSlug, artistName, albums, className }: Props) => {
  if (!Object.values(albums).filter((album) => album.slug !== currentSlug)) {
    return;
  }

  return (
    <section
      className={`${className} w-full md:max-w-prose space-y-6 mx-auto mt-10`}
    >
      <h4 className="font-serif text-xl px-4">Other music by {artistName}</h4>

      <ul
        role="list"
        className="overflow-x-auto scroll-pl-6 snap-x px-4 flex items-start justify-start w-full space-x-8"
      >
        {Object.values(albums)
          .filter((album) => album.slug !== currentSlug)
          .map((album) => (
            <li
              key={album.name}
              className="snap-start flex flex-col hover:cursor-pointer hover:brightness-50"
            >
              <Link href={`/music/${album.slug}`}>
                <div className="relative h-48 w-48">
                  <Image
                    src={album.albumCoverUrl}
                    layout="fill"
                    objectFit="cover"
                    alt={`${album.name} album cover`}
                    className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden bg-gray-100"
                    priority
                  />
                </div>
                <h5 className="font-serif mt-2 font-medium">{album.name}</h5>
                <div className="flex font-serif text-sm">
                  <time>{album.year}</time>
                  <span className="mx-1">&#x2022;</span>
                  <p className="capitalize">{album.type}</p>
                </div>
              </Link>
            </li>
          ))}
      </ul>
    </section>
  );
};

export default OtherAlbums;
