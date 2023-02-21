import React, { useEffect } from 'react';
import { SearchIcon, PlusIcon } from '@heroicons/react/solid';
import { fetcher } from 'lib/fetcher';
import { AudioSuggestion } from '@ontour/types';
import { AudioSource } from '@ontour/archive';

const people = [
  {
    name: 'Jane Cooper',
    title: 'Regional Paradigm Technician',
    role: 'Admin',
    email: 'janecooper@example.com',
    telephone: '+1-202-555-0170',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  // More people...
];

interface Props {
  date: string;
  onAdd: (item: { provider: string; identifier: string }) => void;
}

export const Suggestions = ({ date, onAdd }: Props) => {
  const { data, mutate } = fetcher<AudioSuggestion[]>(
    `/api/audio/suggestions/${date}`
  );

  const addSuggestion = async (item: AudioSuggestion) => {
    await onAdd({
      identifier: item.identifier,
      provider: item.provider,
    });
    const filteredSuggestions = data.filter(
      (suggestion) => suggestion.identifier !== item.identifier
    );
    mutate(filteredSuggestions);
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  if (!data.length) return;

  return (
    <div className="mt-8">
      <h4 className="text-lg font-medium leading-6 text-gray-900">
        Suggestions
      </h4>
      <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm w-full">
        <ul role="list" className="divide-y divide-gray-200">
          {data.map((item) => (
            <li className="divide-y divide-gray-200 rounded-lg bg-white shadow mt-6">
              <div className="flex py-6 px-4 sm:px-6">
                <div className="ml-6 flex flex-1 flex-col">
                  <div className="flex">
                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm">
                        <a
                          href="#"
                          className="font-medium text-gray-700 hover:text-gray-800"
                        >
                          {item.name}
                        </a>
                      </h4>
                      <p className="mt-1 text-sm text-gray-500 capitalize">
                        {item.provider}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="-mt-px flex divide-x divide-gray-200">
                  <div className="flex w-0 flex-1">
                    <a
                      href={`https://archive.org/details/${item.identifier}`}
                      target="_blank"
                      className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
                    >
                      <SearchIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <span className="ml-3">View</span>
                    </a>
                  </div>
                  <div className="-ml-px flex w-0 flex-1">
                    <button
                      onClick={() => addSuggestion(item)}
                      className="relative inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
                    >
                      <PlusIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <span className="ml-3">Add source</span>
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
