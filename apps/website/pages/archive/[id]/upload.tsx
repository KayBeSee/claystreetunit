import React, { useState } from 'react';

import { ontour, Prisma } from '@ontour/archive';
import { data } from '@ontour/data';
import { useAppContext } from 'context/state';
import { LoadingSpinner, Photo, PhotoEmptyState } from '@ontour/components';

import { useRouter } from 'next/router';
import { getSlug } from 'utils/getSlug';
import clsx from 'clsx';
import { PageWithSidebar, ShowArchiveWrapper } from 'components';

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
  const [hasError, setError] = useState(false);
  const { state, setState } = useAppContext();

  const uploadFile = async (files, show) => {
    try {
      setIsLoading(true);
      setError(false);

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
      setIsLoading(false);
      setError(true);
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
      <div className="md:col-span-2">
        <h2 className="text-slate-700 font-bold text-3xl">Submit photos</h2>

        <p className="text-slate-500 text-sm mt-1">
          Thanks for snapping these. After you submit them, we’ll review them
          and add our favorite’s to the show page.
        </p>
      </div>
      <div className="md:col-span-2 md:col-start-2">
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
              className={clsx(
                hasError
                  ? 'bg-red-700 hover:bg-slate-800'
                  : 'bg-slate-700 hover:bg-slate-800',
                'w-full inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 text-white mt-4'
              )}
            >
              {hasError ? 'Try again' : 'Submit photos'}
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
    <div className="flex flex-col max-w-7xl w-full mx-auto flex-1">
      {state.files ? (
        <Preview />
      ) : (
        <div className="py-8">
          <EmptyStateWrapped />
        </div>
      )}
    </div>
  );
};

ShowUpload.getLayout = function getLayout(page: React.ReactElement) {
  const { data, config } = page.props;
  return (
    <ShowArchiveWrapper
      config={config}
      alwaysShowImage={true}
      show={data}
      navBackOptions={{ text: 'Back to show', href: `/archive/${data.id}` }}
    >
      {page}
    </ShowArchiveWrapper>
  );
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
