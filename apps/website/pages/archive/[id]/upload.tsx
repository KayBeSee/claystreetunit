import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';

import { ontour, Prisma } from '@ontour/archive';
import { data } from 'data';
import { useAppContext } from 'context/state';
import { LoadingSpinner, Photo, PhotoEmptyState } from '@ontour/components';

import { useRouter } from 'next/router';
import { getSlug } from 'utils/getSlug';

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

  const Preview = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 md:px-4 py-6 px-4">
      <div className="col-span-1">
        <h2 className="text-slate-700 font-bold text-3xl">Submit photos</h2>

        <p className="text-slate-500 text-sm mt-1">
          Thanks for snapping these. After you submit them, we’ll review them
          and add our favorite’s to the show page.
        </p>
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
      <div className="w-full h-56 relative flex flex-col justify-end z-0">
        <Image
          src="/page-backgrounds/info.jpg"
          className="absolute inset-0 brightness-50 object-cover object-center md:object-bottom z-0"
          layout="fill"
        />
        <div className="flex flex-col px-4 py-6 max-w-7xl mx-auto w-full justify-end z-[1]">
          <Link href={`/archive/${show.id}`}>
            <a className="group flex font-semibold text-sm leading-6 text-slate-100 hover:text-slate-200 py-4">
              <svg
                viewBox="0 -9 3 24"
                className="overflow-visible mr-3 text-slate-100 w-auto h-6 group-hover:text-slate-200"
              >
                <path
                  d="M3 0L0 3L3 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Back to show
            </a>
          </Link>
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
      <div className="flex flex-col max-w-7xl w-full mx-auto flex-1">
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
