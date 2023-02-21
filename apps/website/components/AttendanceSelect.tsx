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
        selected
          ? 'bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500'
          : 'bg-gray-500 focus:ring-gray-400',
        'transition-all duration-200 inline-flex items-center justify-center rounded-md border border-transparent  px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2'
      )}
    >
      <div className="shrink-0 text-white mr-2 -ml-2">
        <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
          <circle cx="12" cy="12" r="12" fill="#fff" opacity="0.2"></circle>
          {selected ? (
            <path
              d="M7 13l3 3 7-7"
              stroke="#fff"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          ) : null}
        </svg>
      </div>
      I was there
    </button>
  );
}
