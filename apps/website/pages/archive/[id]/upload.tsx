import React, { useState } from 'react';
import Image from 'next/image';
import { format } from 'date-fns';

import { ontour, Prisma, Show } from '@ontour/archive';
import { data } from 'data';
import { useAppContext } from 'context/state';
import { Photo, PhotoEmptyState } from '@ontour/components';
import { LinkIcon } from '@heroicons/react/outline';
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
      setIsLoading(false);
    } catch (e) {
      console.log('e: ', e);
    }
  };

  const EmptyStateWrapped = () => (
    <div className="max-w-md mx-auto flex justify-center items-center py-8">
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
      <div className="py-6 space-y-1 col-span-2">
        <h2 className="text-slate-700 font-bold text-3xl">
          Submit your photos
        </h2>

        <p className="text-slate-500 text-sm">
          Thanks for snapping these. After you submit them, we’ll review them
          and add our favorite’s to the show page.
        </p>
        <ul className="pt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
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

      <div className="col-span-1 py-6">
        <div>
          <div className="flex items-center text-base font-semibold leading-7 text-slate-900">
            <LinkIcon className="h-7 w-7 flex-none rounded-full border border-emerald-400 bg-emerald-50 fill-emerald-50 stroke-emerald-400 p-[0.2rem]" />
            <h4 className="ml-3">Want credit for these photos?</h4>
          </div>
          <div className="mt-3 max-w-none prose-sm prose prose-slate prose-a:font-semibold prose-a:text-sky-500 hover:prose-a:text-sky-600">
            <p>
              Connect a social account to receive credit for your photos, track
              your shows, and sign up for our mailing list.
            </p>
          </div>
        </div>
        <div className="space-y-3 mt-8 flex flex-col items-start">
          {isLoading ? 'loading...' : null}
          <button className="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-green-500 text-white hover:bg-green-700">
            Connect with Spotify
          </button>
          <button className="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-slate-700 text-white hover:bg-slate-700">
            Connect with AppleID
          </button>
          <button
            onClick={async () => {
              await uploadFile(state.files, show);
            }}
            className="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-white text-slate-700 hover:bg-slate-100 border border-slate-300 shadow-sm"
          >
            Connect without signing in
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="overflow-y-auto h-screen">
      <div className="w-full h-36 relative flex items-end justify-center">
        <Image
          src="/page-backgrounds/info.jpg"
          className="absolute inset-0 brightness-50 object-cover object-center md:object-bottom"
          layout="fill"
        />
        <div className="flex flex-col z-10 px-4 py-6 max-w-7xl w-full">
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
      <div className="flex flex-col z-10 px-4 py-6 max-w-7xl w-full mx-auto">
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
