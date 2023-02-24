import React from 'react';
import { signIn, useSession } from 'next-auth/react';
import clsx from 'clsx';

import { LinkIcon } from '@heroicons/react/24/outline';

export const SessionLogin = ({ className }) => {
  const { data: session } = useSession();

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
              Connect a social account to receive credit for your photos, track
              your shows, and sign up for our mailing list.
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
