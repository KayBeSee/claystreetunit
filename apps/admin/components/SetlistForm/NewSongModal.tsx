import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationCircleIcon } from '@heroicons/react/outline';
import { Prisma, Song } from '@ontour/archive';
import { Input } from 'components';

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (song: Prisma.SongCreateInput) => void;
  song: Prisma.SongCreateInput;
}

export default function NewSongModal({ open, onClose, onSave, song }: Props) {
  //   const [currentSongName, setCurrentSongName] = useState(song.name);
  const [currentSongArtist, setCurrentSongArtist] = useState(
    song.originalArtist
  );

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationCircleIcon
                      className="h-6 w-6 text-slate-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="my-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Add new song
                    </Dialog.Title>
                    <div className="mt-4 space-y-3">
                      <Input
                        label="Name"
                        value={song.name}
                        disabled
                        setValue={() => {}}
                        placeholder="Enter song name"
                      />
                      <Input
                        label="Artist"
                        value={currentSongArtist}
                        setValue={setCurrentSongArtist}
                        placeholder="Enter artist name"
                        autofocus
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-slate-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() =>
                      onSave({
                        name: song.name,
                        originalArtist: currentSongArtist,
                        notes: '',
                      })
                    }
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                    onClick={() => onClose()}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
