import React from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

interface Props {
  value: string;
  setValue: (value: string) => void;
  placeholder: string;
  autofocus?: boolean;
  deleteNote: () => void;
}

export const TrackNoteInput = ({
  value,
  setValue,
  placeholder,
  autofocus,
  deleteNote,
}: Props) => (
  <div className="col-span-6 grid grid-cols-6 gap-y-1 items-center group">
    <div className="col-span-4">
      <div className="flex items-center my-1">
        <PencilIcon className="h-5 w-5 text-gray-400 ml-2 mt-1 mr-1" />
        <div className="ml-2 w-full">
          <div className="mt-1">
            <input
              type="text"
              autoFocus={autofocus}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-xs"
              placeholder={placeholder}
            />
          </div>
        </div>
      </div>
    </div>
    <div className="flex items-center">
      <button
        className="ml-2 opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus:opacity-100 hover:bg-red-100 p-2 rounded-full active:bg-red-200 group"
        onClick={() => deleteNote()}
      >
        <TrashIcon className="h-4 w-4 text-red-500 group-active:text-red-600" />
      </button>
    </div>
  </div>
);
