import React, { useState } from 'react';
import Image from 'next/image';
import { format } from 'date-fns';

import { ontour, Prisma, Show } from '@ontour/archive';
import { data } from 'data';
import { useAppContext } from 'context/state';
import { LoadingSpinner, Photo, PhotoEmptyState } from '@ontour/components';
import { LinkIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { getSlug } from 'utils/getSlug';
import { signIn, useSession } from 'next-auth/react';
import clsx from 'clsx';

type ShowWithVenue = Prisma.ShowGetPayload<{
  include: {
    venue: true;
  };
}>;

interface Props {
  data: ShowWithVenue;
}

const ShowUpload = ({ data: show }: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { state, setState } = useAppContext();
  const { data: session } = useSession();

  const uploadFile = async (files, show) => {
    try {
      setIsLoading(true);

      const folderPath = `${
        data.archive.cloudinary_root_folder
      }/shows/${getSlug(show)}`;

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
            // headers: { 'content-type': 'multipart/form-data' },
          });
          return response;
        })
      );

      router.push(`/archive/${show.id}/thank-you`);
      setState({ files: [] });
      setIsLoading(false);
    } catch (e) {
      console.log('e: ', e);
    }
  };

  const EmptyStateWrapped = () => (
    <div className="mx-auto flex justify-center items-center py-8 w-full px-6">
      <PhotoEmptyState
        show={{}}
        onChange={(files) => {
          Object.keys(files).forEach((i) => {
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
              const content = e.target.result;
              setState((state) => {
                if (state.files) {
                  return { files: [...state.files, content] };
                } else {
                  return { files: [content] };
                }
              });
            };
            fileReader.readAsDataURL(files[i]);
          });
        }}
      />
    </div>
  );
  const SessionLogin = ({ className }) => {
    if (!session) {
      return (
        <div
          className={clsx(
            className,
            'mt-8 flex-col col-span-1 py-6 bg-white px-4 md:rounded-2xl w-full shadow border border-slate-900/20'
          )}
        >
          <div>
            <div className="flex items-center text-base font-semibold leading-7 text-slate-900">
              <LinkIcon className="h-7 w-7 flex-none rounded-full border border-emerald-400 bg-emerald-50 fill-emerald-50 stroke-emerald-400 p-[0.2rem]" />
              <h4 className="ml-3">Want credit for these photos?</h4>
            </div>
            <div className="mt-3 max-w-none prose-sm prose prose-slate prose-a:font-semibold prose-a:text-sky-500 hover:prose-a:text-sky-600">
              <p className="text-slate-500">
                Connect a social account to receive credit for your photos,
                track your shows, and sign up for our mailing list.
              </p>
            </div>
          </div>
          <div className="space-y-3 mt-8 flex flex-col items-start">
            <button
              onClick={async () => {
                const response = await signIn('spotify', {
                  redirect: false,
                });
              }}
              className="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-green-500 text-white hover:bg-green-700"
            >
              Connect with Spotify
            </button>
            <button className="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-slate-700 text-white hover:bg-slate-700">
              Connect with AppleID
            </button>
          </div>
        </div>
      );
    }
    return null;
  };

  const Preview = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 md:px-4 py-6 px-4">
      <div className="col-span-1">
        <h2 className="text-slate-700 font-bold text-3xl">Submit photos</h2>

        <p className="text-slate-500 text-sm mt-1">
          Thanks for snapping these. After you submit them, we’ll review them
          and add our favorite’s to the show page.
        </p>
        <SessionLogin className="hidden md:flex" />
      </div>
      <div className="md:col-span-2">
        <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6">
          {state.files.map((item) => {
            if (item) {
              return (
                <li className="relative">
                  <Photo src={item} />
                </li>
              );
            }
          })}
        </ul>
        <SessionLogin className="flex md:hidden" />
      </div>

      <div className="py-6 space-y-1 md:col-span-2 px-4 md:col-start-2">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center w-full space-y-1">
            <LoadingSpinner />
            <p className="text-slate-400">Uploading photos...</p>
          </div>
        ) : (
          <>
            <button
              onClick={async () => {
                await uploadFile(state.files, show);
              }}
              className="w-full inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-slate-700 text-white hover:bg-slate-700 mt-4"
            >
              Submit photos
            </button>
            <p className="text-xs text-gray-400 text-center py-2">
              By submitting, you agree to the{' '}
              <a href="#" className="underline underline-offset-2">
                Terms
              </a>{' '}
              and{' '}
              <a href="#" className="underline">
                Privacy Policy
              </a>
              .
            </p>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className="overflow-y-auto h-screen bg-gray-50">
      <div className="w-full h-48 relative flex">
        <Image
          src="/page-backgrounds/info.jpg"
          className="absolute inset-0 brightness-50 object-cover object-center md:object-bottom"
          layout="fill"
        />
        <div className="flex flex-col z-10 px-4 py-6 max-w-7xl mx-auto w-full justify-end">
          <time className="font-sans text-sm text-slate-100">
            {format(new Date(show.date), 'MMMM d, y')}
          </time>
          <span className="text-3xl font-serif text-slate-100">
            {show.venue.city}, {show.venue.state}
          </span>
          <span className="font-sans text-lg text-slate-100">
            {show.venue.name}
          </span>
        </div>
      </div>
      <div className="flex flex-col z-10 max-w-7xl w-full mx-auto flex-1">
        {state.files ? <Preview /> : <EmptyStateWrapped />}
      </div>
    </div>
  );
};

ShowUpload.getLayout = function getLayout(page: React.ReactElement) {
  return page;
  // <PageWithSidebar>
  // <NestedLayout>{page}</NestedLayout>
  // {page}
  // </PageWithSidebar>
};

export async function getStaticPaths() {
  const items = await ontour.show.findMany({ select: { id: true } });
  const formattedIds = items.map((item) => ({
    params: {
      id: item.id,
    },
  }));

  return {
    paths: formattedIds,
    fallback: false, // can also be true or 'blocking'
  };
}

export async function getStaticProps(context) {
  const { id } = context.params;

  const show = await ontour.show.findFirst({
    where: { id },
    include: {
      venue: true,
    },
  });

  return {
    props: {
      data: { ...show, date: JSON.parse(JSON.stringify(show.date)) },
      config: data,
    },
  };
}

export default ShowUpload;
