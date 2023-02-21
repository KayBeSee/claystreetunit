import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, CheckIcon, UploadIcon } from '@heroicons/react/solid';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const options = [
  {
    title: 'Upload a photo',
    description:
      'Got a good shot at the show? Upload your photo to be featured in the archives.',
  },
];

export function ContributeDropdown() {
  return (
    <Menu as="div" className="relative inline-block text-left mt-6">
      <div className="inline-flex divide-x divide-emerald-600 rounded-md shadow-sm w-full">
        <div className="inline-flex divide-x divide-emerald-600 rounded-md shadow-sm w-full">
          <div className="inline-flex items-center justify-center rounded-l-md border border-transparent bg-emerald-500 py-2 pl-3 pr-4 text-white shadow-sm w-full">
            <p className="ml-2.5 text-sm font-medium">Contribute</p>
          </div>
          <Menu.Button className="inline-flex items-center rounded-l-none rounded-r-md bg-emerald-500 p-2 text-sm font-medium text-white hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-50">
            <span className="sr-only">Change published status</span>
            <ChevronDownIcon
              className="h-5 w-5 text-white"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-72 origin-top-right divide-y divide-gray-200 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {options.map((option) => (
              <Menu.Item>
                {({ active }) => (
                  <div
                    className={classNames(
                      active ? 'bg-emerald-500' : 'white',
                      'cursor-pointer select-none p-4 text-sm'
                    )}
                  >
                    <div className="flex flex-col">
                      <div className="flex justify-between">
                        <p
                          className={
                            active
                              ? 'font-semibold text-white'
                              : 'font-normal text-gray-900'
                          }
                        >
                          {option.title}
                        </p>
                        {active ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-emerald-500'
                            )}
                          >
                            <UploadIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </span>
                        ) : null}
                      </div>
                      <p
                        className={classNames(
                          active ? 'text-emerald-200' : 'text-gray-500',
                          'mt-2'
                        )}
                      >
                        {option.description}
                      </p>
                    </div>
                  </div>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
