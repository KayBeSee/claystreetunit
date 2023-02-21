import React, { useState } from 'react';
import { Venue, CreateShowFormInput } from '@ontour/archive';
import { Combobox } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/outline';
import deepCopy from 'utils/deepCopy';
import { Input } from 'components';

import { fetcher } from 'lib/fetcher';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

interface Props {
  show: CreateShowFormInput;
  setShow: (show: CreateShowFormInput) => void;
}

export const VenueInput = ({ show, setShow }: Props) => {
  const { data: venues, error: venueError } = fetcher<Venue[]>(`/api/venues`);

  const [query, setQuery] = useState('');

  if (!venues) {
    return null;
  }

  const filteredVenues =
    query === ''
      ? venues
      : venues.filter((venue) => {
          return venue.name.toLowerCase().includes(query.toLowerCase());
        });

  const onChange = (venue) => {
    const updatedShow = deepCopy(show);
    updatedShow.venue = venue;
    if (!venue.id) {
      updatedShow.venue.city = '';
      updatedShow.venue.state = '';
    }
    setShow(updatedShow);
  };

  return (
    <div className="grid grid-cols-6 gap-6">
      <div className="col-span-6 sm:col-span-4 sm:space">
        <label
          htmlFor="venueName"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Venue Name
        </label>
        <Combobox
          as="div"
          value={show.venue}
          onChange={onChange}
          className="col-span-6 sm:col-span-4 sm:space"
        >
          {(activeOption) => (
            <div className="relative">
              <Combobox.Input
                className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                onChange={(event) => setQuery(event.target.value)}
                displayValue={(venue: CreateShowFormInput['venue']) => {
                  return venue.name;
                }}
                autoFocus
                placeholder="Enter venue name"
                id="venueName"
              />
              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                  />
                </svg>
              </Combobox.Button>

              <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {query.length > 0 && (
                  <Combobox.Option
                    value={{ id: undefined, name: query }}
                    className={({ active }) =>
                      classNames(
                        'relative cursor-default select-none py-2 pl-3 pr-9',
                        active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                      )
                    }
                  >
                    Create "{query}"
                  </Combobox.Option>
                )}
                {filteredVenues.map((venue) => (
                  <Combobox.Option
                    key={venue.id}
                    value={venue}
                    className={({ active }) =>
                      classNames(
                        'relative cursor-default select-none py-2 pl-3 pr-9',
                        active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                      )
                    }
                  >
                    {({ active, selected }) => (
                      <>
                        <div className="flex">
                          <span
                            className={classNames(
                              'truncate',
                              selected && 'font-semibold'
                            )}
                          >
                            {venue.name}
                          </span>
                          <span
                            className={classNames(
                              'ml-2 truncate text-gray-500',
                              active ? 'text-indigo-200' : 'text-gray-500'
                            )}
                          >
                            {venue.city}, {venue.state}
                          </span>
                        </div>

                        {selected && (
                          <span
                            className={classNames(
                              'absolute inset-y-0 right-0 flex items-center pr-4',
                              active ? 'text-white' : 'text-indigo-600'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        )}
                      </>
                    )}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            </div>
          )}
        </Combobox>
      </div>
      <div className="col-span-6 sm:col-span-3 col-start-1">
        <Input
          value={show.venue.city}
          setValue={(value) => {
            const updatedShow = deepCopy(show);
            updatedShow.venue.city = value;
            setShow(updatedShow);
          }}
          label="Venue City"
          placeholder="Denver"
          disabled={!!show.venue.id}
        />
      </div>

      <div className="col-span-6 sm:col-span-3">
        <Input
          value={show.venue.state}
          setValue={(value) => {
            const updatedShow = deepCopy(show);
            updatedShow.venue.state = value;
            setShow(updatedShow);
          }}
          label="Venue State"
          placeholder="CO"
          disabled={!!show.venue.id}
        />
      </div>
    </div>
  );
};
