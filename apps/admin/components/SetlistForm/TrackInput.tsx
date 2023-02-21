import React, { useState } from 'react';
import clsx from 'clsx';
import { Prisma, TrackFormInput } from '@ontour/archive';
import { Combobox } from '@headlessui/react';
import { ChevronRightIcon, CheckIcon } from '@heroicons/react/outline';
import deepCopy from 'utils/deepCopy';
import { TrackNoteInput } from './TrackNoteInput';
import NewSongModal from './NewSongModal';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

interface Props {
  track: TrackFormInput;
  setTrack: (value: TrackFormInput) => void;
  songs: Prisma.SongGetPayload<true>[];
  autoFocus: boolean;
}

export const TrackInput = ({ track, setTrack, songs, autoFocus }: Props) => {
  const [query, setQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [songQuery, setSongQuery] = useState<Prisma.SongCreateInput>({
    name: '',
    originalArtist: '',
    notes: '',
  });

  const addNote = () => {
    const updatedTrack = deepCopy(track);
    updatedTrack.notes.push('');
    setTrack(updatedTrack);
  };

  const toggleSegue = () => {
    const updatedTrack = deepCopy(track);
    updatedTrack.segue = !updatedTrack.segue;
    setTrack(updatedTrack);
  };

  const filteredSongs =
    query === ''
      ? songs
      : songs.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <div className="grid grid-cols-6 gap-y-1 items-center">
      <div className="col-span-4">
        <Combobox
          as="div"
          value={track.song}
          onChange={(song) => {
            if (song.id) {
              const updatedTrack = deepCopy(track);
              updatedTrack.song = song;
              setTrack(updatedTrack);
            } else {
              setSongQuery(song);
              setShowModal(true);
            }
          }}
        >
          {(activeOption) => (
            <div className="relative">
              <Combobox.Input
                className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                onChange={(event) => setQuery(event.target.value)}
                displayValue={(song: TrackFormInput['song']) => {
                  return song.name;
                }}
                autoFocus
                placeholder="Enter song name"
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
                    value={{ id: null, name: query }}
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
                {filteredSongs.map((song) => (
                  <Combobox.Option
                    key={song.id}
                    value={song}
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
                            {song.name}
                          </span>
                          <span
                            className={classNames(
                              'ml-2 truncate text-gray-500',
                              active ? 'text-indigo-200' : 'text-gray-500'
                            )}
                          >
                            {song.originalArtist}
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
              <NewSongModal
                open={showModal}
                onClose={() => setShowModal(false)}
                onSave={(song) => {
                  const updatedTrack = deepCopy(track);
                  updatedTrack.song = song;
                  setTrack(updatedTrack);
                  setShowModal(false);
                }}
                // @ts-ignore
                song={songQuery}
              />
            </div>
          )}
        </Combobox>
      </div>
      <div className="col-span-2">
        <div className="flex justify-between items-center">
          <button
            onClick={() => toggleSegue()}
            className={clsx(
              'mx-2 hover:bg-slate-100 active:bg-slate-200 active:text-slate-700 p-2 rounded-full',
              track.segue ? 'text-slate-900' : 'text-slate-300'
            )}
          >
            <ChevronRightIcon className="h-4 w-4" />
          </button>
          <button
            onClick={() => addNote()}
            className="py-2 px-4 text-sm text-slate-600 whitespace-nowrap hover:bg-slate-100 active:bg-slate-200 rounded-xl"
          >
            Add note
          </button>
        </div>
      </div>
      {track.notes.map((note, noteIndex) => {
        return (
          <TrackNoteInput
            key={noteIndex}
            value={note}
            setValue={(value) => {
              const updatedTrack = deepCopy(track);
              updatedTrack.notes[noteIndex] = value;
              setTrack(updatedTrack);
            }}
            placeholder="Track details"
            autofocus
            deleteNote={() => {
              const updatedTrack = deepCopy(track);
              updatedTrack.notes.splice(noteIndex, 1);
              setTrack(updatedTrack);
            }}
          />
        );
      })}
    </div>
  );
};
