import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { format } from 'date-fns';
import Link from 'next/link';
import { v2 as cloudinary, ResourceApiResponse } from 'cloudinary';

import { data } from '@ontour/data';

import { ontour, ShowWithSetlist } from '@ontour/archive';
import { Photo, StreamLogo } from '@ontour/components';

import { PageWidthWrapper } from 'components';
import { SetlistView, LoadingSpinner } from '@ontour/components';
import { fetcher } from 'lib/fetcher';
import { getSlug } from 'utils/getSlug';

const uploadFile = async (files, show) => {
  try {
    const folderPath = `${data.archive.cloudinary_root_folder}/shows/${getSlug(
      show
    )}`;

    const resp = await fetch('/api/cloudinary', {
      method: 'post',
      body: JSON.stringify({
        folder: folderPath,
      }),
    }).then((response) => response.json());
    const { signature, timestamp } = resp;

    const response = await Promise.all(
      files.map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'lmicqrpq');
        formData.append(
          'folder',
          `${data.archive.cloudinary_root_folder}/shows`
        );

        const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload?api_key=${process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY}&timestamp=${timestamp}&signature=${signature}&folder=${folderPath}`;
        const response = await fetch(url, {
          method: 'post',
          body: formData,
        });
        return response;
      })
    );
  } catch (e) {
    console.log('e: ', e);
  }
};

const EditArchivePage = ({ photos, show }) => {
  const { query } = useRouter();
  const { data: showData, error: showError } = fetcher<ShowWithSetlist>(
    `/api/shows/${query.id}`
  );

  if (showError) {
    console.log('showError: ', showError);
    return (
      <div className="h-screen flex items-center justify-center">
        Oops, something went wrong
      </div>
    );
  }

  if (!showData) {
    return (
      <div className="h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <PageWidthWrapper className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 z-[1]">
        <div className="divide-y divide-slate-300 space-y-6">
          <div className="flex flex-col">
            <div className="flex flex-col">
              <h2 className="font-bold text-2xl mt-1">{showData.venue.name}</h2>
              <time
                dateTime={format(new Date(showData.date), 'utc')}
                className="order-first text-sm text-slate-500"
              >
                {format(new Date(showData.date), 'EEEE')}{' '}
                {new Date(showData.date).getMonth()}/
                {new Date(showData.date).getDay()}/
                {new Date(showData.date).getFullYear()}
              </time>
              <p className="mt-0 text-slate-500">
                {showData.venue.city}, {showData.venue.state}
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-3xl px-4 sm:px-6 md:flex md:flex-col md:items-start md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8 w-full py-8">
            <div className="flex w-full justify-between">
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-700">
                Setlist
              </h2>
              <div className="justify-stretch mt-6 flex flex-col-reverse space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-y-0 sm:space-x-3 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3">
                <Link
                  href={`./${query.id}/edit`}
                  className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                >
                  Edit setlist
                </Link>
              </div>
            </div>
            <div className="max-w-prose">
              <SetlistView show={showData} />
            </div>
          </div>
          <div className="mx-auto max-w-3xl px-4 sm:px-6 md:flex md:flex-col md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8 w-full py-8">
            <div className="flex w-full justify-between">
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-700">
                Audio sources
              </h2>
              <div className="justify-stretch mt-6 flex flex-col-reverse space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-y-0 sm:space-x-3 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3">
                <Link
                  href={`./${query.id}/audio`}
                  className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                >
                  Edit audio
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 w-full py-8">
              {showData.audioSources.map((source) => (
                <StreamLogo source={source} />
              ))}
            </div>
          </div>
          <div className="mx-auto max-w-3xl px-4 sm:px-6 md:flex md:flex-col md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8 w-full py-8">
            <div className="flex w-full justify-between">
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-700">
                Photos
              </h2>
              <div className="justify-stretch mt-6 flex flex-col-reverse space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-y-0 sm:space-x-3 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3">
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer group inline-flex items-center h-9 rounded-full text-sm font-semibold whitespace-nowrap px-3 focus:outline-none focus:ring-2 bg-sicard-blue-100 text-sicard-blue-700 hover:bg-sicard-blue-200 hover:text-sicard-blue-900 focus:ring-sicard-blue-500 mt-8"
                >
                  <span className="text-white">Add photos</span>
                  <svg
                    className="overflow-visible ml-3 text-gray-100 group-hover:text-white"
                    width="3"
                    height="6"
                    viewBox="0 0 3 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M0 0L3 3L0 6"></path>
                  </svg>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    multiple
                    accept="image/*;video/*;capture=camcorder"
                    className="sr-only"
                    onChange={(e) => {
                      const files = e.target.files;
                      Object.keys(Array.from(files)).forEach((i) => {
                        const fileReader = new FileReader();
                        fileReader.onload = (e) => {
                          const content = e.target.result;
                          uploadFile(content, show);
                        };
                        fileReader.readAsDataURL(files[i]);
                      });
                    }}
                  />
                </label>
              </div>
            </div>
            <div className="relative w-full flex">
              <ul className="w-full py-4 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {photos.map((photo) => {
                  return <Photo src={photo.secure_url} />;
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </PageWidthWrapper>
  );
};

export async function getServerSideProps(context) {
  const { params } = context;
  const show = await ontour.show.findFirst({
    where: {
      id: params.id,
    },
    include: {
      venue: true,
    },
  });

  cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
  });

  try {
    const { resources } = await cloudinary.api.resources_by_asset_folder(
      `airshow/shows/${getSlug(show)}`,
      { transformation: 'f_jpg,w_8,q_70' }
    );
    console.log('resources: ', resources);

    return {
      props: {
        config: data,
        photos: resources,
        show: { ...show, date: JSON.parse(JSON.stringify(show.date)) },
      },
    };
  } catch (e) {
    console.log('e: ', e);
  }

  return {
    props: {
      config: data,
      photos: [],
      show: { ...show, date: JSON.parse(JSON.stringify(show.date)) },
    },
  };
}

// export async function getStaticPaths() {
//   const shows = await ontour.show.findMany();
//   const formattedSlugs = shows.map((show) => ({
//     params: {
//       id: show.id,
//     },
//   }));

//   return {
//     paths: formattedSlugs,
//     fallback: false,
//   };
// }

// export async function getStaticProps(context) {
//   return {
//     props: {
//       config,
//     },
//   };
// }

EditArchivePage.auth = true;

export default EditArchivePage;
