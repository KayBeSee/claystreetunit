import React, { useEffect, useState } from 'react';
import { Prisma, CreateShowFormInput, Song } from '@ontour/archive';
import { Input } from 'components';
import { TrackInput } from './TrackInput';
import { VenueInput } from './VenueInput';

import deepCopy from 'utils/deepCopy';

import { fetcher } from 'lib/fetcher';
import { SetNameInput } from './SetNameInput';

interface Props {
  show: CreateShowFormInput;
  onSubmit: (show: CreateShowFormInput) => void;
}

const EMPTY_TRACK = {
  notes: [],
  segue: false,
  song: {
    name: '',
    originalArtist: '',
    notes: '',
  },
};

const isLastItemInArray = (index: number, array: any[]) => {
  return index === array.length - 1;
};

const cleanShow = (show: CreateShowFormInput) => {
  const cleanedShow = deepCopy(show);

  cleanedShow.setlist = cleanedShow.setlist.map((set) => {
    return {
      ...set,
      tracks: set.tracks.filter((track) => track.song.name),
    };
  });

  cleanedShow.setlist = cleanedShow.setlist.filter((set) => set.tracks.length);

  return cleanedShow;
};

export const SetlistForm = ({ show, onSubmit }: Props) => {
  const [currentShow, setCurrentShow] = useState(show);

  const { data: songs, error: songError } = fetcher<Song[]>(`/api/songs`);

  const addTrack = (setNumber: number) => {
    const updatedShow = deepCopy(currentShow);
    updatedShow.setlist[setNumber].tracks.push(EMPTY_TRACK);
    setCurrentShow(updatedShow);
  };

  useEffect(() => {
    for (let i = 0; i < currentShow.setlist.length; i++) {
      const currentSet = currentShow.setlist[i];
      if (currentSet.tracks[currentSet.tracks.length - 1].song.name) {
        addTrack(i);
      }
    }
  }, [currentShow]);

  return (
    <>
      <div>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Basic information
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Information about time and place
              </p>
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <div className="shadow sm:overflow-hidden sm:rounded-md">
              <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                <div className="grid grid-cols-3 gap-6">
                  {/* <div className="col-span-3 sm:col-span-2">
                    <Input
                      value={currentShow.eventName}
                      setValue={(value) => {
                        const updatedShow = deepCopy(currentShow);
                        updatedShow.eventName = value;
                        setCurrentShow(updatedShow);
                      }}
                      label="Name"
                      placeholder="Magnaball"
                    />
                  </div> */}

                  <div className="col-span-3 sm:col-span-1">
                    <Input
                      value={currentShow.date.toString()}
                      setValue={(value) => {
                        const updatedShow = deepCopy(currentShow);
                        updatedShow.date = value;
                        setCurrentShow(updatedShow);
                      }}
                      label="Date"
                      placeholder="04/20/2023"
                    />
                  </div>
                </div>
                <VenueInput show={currentShow} setShow={setCurrentShow} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>

      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Setlist information
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                This is some filler text
              </p>
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0 space-y-10">
            {songs
              ? currentShow.setlist.map((set, setIndex) => (
                  <div key={setIndex} className="shadow sm:rounded-md">
                    <div className="bg-white px-4 py-5 sm:p-6 sm:rounded-md">
                      <SetNameInput
                        set={set}
                        onUpdate={(setName) => {
                          const updatedShow = deepCopy(currentShow);
                          updatedShow.setlist[setIndex].name = setName;
                          setCurrentShow(updatedShow);
                        }}
                      />
                      <div className="space-y-4">
                        {set.tracks.map((track, trackIndex) => (
                          <div
                            key={`${setIndex}-${trackIndex}`}
                            className="col-span-6 sm:col-span-5 sm:space"
                          >
                            <TrackInput
                              track={track}
                              songs={songs}
                              autoFocus={
                                isLastItemInArray(
                                  setIndex,
                                  currentShow.setlist
                                ) &&
                                isLastItemInArray(
                                  trackIndex,
                                  currentShow.setlist[setIndex].tracks
                                )
                              }
                              setTrack={(track) => {
                                const updatedShow = deepCopy(currentShow);
                                updatedShow.setlist[setIndex].tracks[
                                  trackIndex
                                ] = track;
                                setCurrentShow(updatedShow);
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))
              : null}
            <button
              onClick={() => {
                const updatedShow = deepCopy(currentShow);
                updatedShow.setlist.push({
                  name: `Set ${currentShow.setlist.length + 1}`,
                  tracks: [EMPTY_TRACK],
                });
                setCurrentShow(updatedShow);
              }}
              className="mb-10 py-2 px-3 bg-slate-800 hover:bg-slate-700 text-white my-4 rounded-2xl w-full"
            >
              {currentShow.setlist.length ? 'Add another set' : 'Add a setlist'}
            </button>
          </div>
        </div>

        <div className="hidden sm:block mt-4" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-gray-200" />
          </div>
        </div>

        <div className="mt-10 sm:mt-0">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Confirm information
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  This is some filler text
                </p>
              </div>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-2 col-start-6">
                      <button
                        onClick={() => onSubmit(cleanShow(currentShow))}
                        className="w-full inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
