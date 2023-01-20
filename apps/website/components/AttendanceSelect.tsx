import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/solid';
import clsx from 'clsx';

const publishingOptions = [
  {
    title: 'Submit photos from the show',
    description:
      'Did you take any photos at the show? Submit them to the band to get them featured below.',
    current: true,
  },
  {
    title: "I wasn't at this show",
    description: "Unfortunately, I wasn't able to attend this show.",
    current: false,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function AttendanceSelect() {
  const [selected, setSelected] = useState(false);

  return (
    <button
      onClick={() => setSelected(!selected)}
      type="button"
      className={clsx(
        selected ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-gray-500',
        'transition-all duration-200 inline-flex items-center justify-center sm:justify-start rounded-md border border-transparent  px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2'
      )}
    >
      {selected ? (
        <CheckIcon className="-ml-4 sm:-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
      ) : (
        <div className="border-white rounded-sm border -ml-4 sm:-ml-1 mr-5 h-3 w-3" />
      )}
      I was there
    </button>
  );
}
