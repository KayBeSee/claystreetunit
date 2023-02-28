import { Fragment, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

const SetlistIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    className="w-6 h-6 p-1 stroke-blue-600"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
    />
  </svg>
);

const SongsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    className="w-6 h-6 p-1 stroke-violet-500"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z"
    />
  </svg>
);

const VideoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    className="w-6 h-6 p-1 stroke-rose-500"
  >
    <path
      stroke-linecap="round"
      d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
    />
  </svg>
);

const navigation = [
  { name: 'Setlists', href: '#', icon: SetlistIcon, current: true },
  { name: 'Songs', href: '#', icon: SongsIcon, current: false },
  { name: 'Videos', href: '#', icon: VideoIcon, current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function PageWithSidebar({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { data: session, status } = useSession();

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full">
        <body class="h-full">
        ```
      */}
      <div>
        {/* <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 md:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XCircleIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                    <div className="flex flex-shrink-0 items-center px-4">
                      <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                      />
                    </div>
                    <nav className="mt-5 space-y-1 px-2">
                      <Image
                        src={'/band-photo.jpeg'}
                        width={900}
                        height={300}
                      />
                    </nav>
                  </div>
                  <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
                    <a href="#" className="group block flex-shrink-0">
                      <div className="flex items-center">
                        <div>
                          <img
                            className="inline-block h-10 w-10 rounded-full"
                            src={session ? session.user.image : ''}
                            alt=""
                          />
                        </div>
                        <div className="ml-3">
                          <p className="text-base font-medium text-gray-700 group-hover:text-gray-900">
                            {session ? session.user.name : ''}
                          </p>
                          <p className="text-sm font-medium text-gray-500 group-hover:text-gray-700">
                            View profile
                          </p>
                        </div>
                      </div>
                    </a>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="w-14 flex-shrink-0">
              </div>
            </div>
          </Dialog>
        </Transition.Root> */}

        {/* Static sidebar for desktop */}
        <div className="hidden md:fixed md:inset-y-0 md:flex md:w-96 md:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white">
            <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
              <div className="flex flex-shrink-0 items-center px-4 h-8"></div>
              <nav className="mt-8 flex-1 bg-white px-10">
                <div className="relative mx-auto block w-48 overflow-hidden rounded-lg bg-slate-200 shadow-xl shadow-slate-200 sm:w-64 sm:rounded-xl lg:w-auto lg:rounded-2xl">
                  <Image
                    className="absolute inset-0 rounded-lg ring-1 ring-inset ring-black/10 sm:rounded-xl lg:rounded-2xl"
                    src={'/band-photo.jpeg'}
                    width={900}
                    height={700}
                  />
                </div>
                <div className="space-y-1 mt-6">
                  <h2 className="text-2xl font-bold text-slate-900">Airshow</h2>
                  <p className="mt-3 text-lg font-medium leading-6 text-slate-700">
                    Nashville’s psychedelic punk-grass rockers.
                  </p>
                </div>
                <ul className="mt-10 space-y-8">
                  {navigation.map((item) => (
                    <a
                      href="https://tailwindui.com/templates?ref=sidebar"
                      className="group flex items-center lg:text-lg lg:leading-6 mb-4 font-medium text-slate-700 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300"
                    >
                      <div className="mr-4 rounded-md ring-1 ring-slate-900/5 shadow-sm group-hover:shadow group-hover:ring-slate-900/10 dark:ring-0 dark:shadow-none dark:group-hover:shadow-none dark:group-hover:highlight-white/10 group-hover:shadow-fuchsia-200 dark:group-hover:bg-fuchsia-600 dark:bg-slate-800 dark:highlight-white/5">
                        <item.icon />
                      </div>
                      {item.name}
                    </a>
                  ))}
                </ul>
                <div className="mt-14 space-y-3">
                  <h3 className="font-serif text-lg font-semibold text-slate-800">
                    Next show...
                  </h3>
                  <div className="space-y-0">
                    <p className="text-slate-500 text-sm font-medium">
                      Thursday, January 20th
                    </p>
                    <p className="text-slate-800 font-serif text-lg font-semibold">
                      The Shaka Stage Beer Garden
                    </p>
                    <p className="text-slate-500 text-sm font-medium">
                      Hampstead, NC
                    </p>
                  </div>
                  <Link
                    href="/tour"
                    className="text-blue-500 font-semibold text-sm flex flex-nowrap items-center group hover:text-blue-400 cursor-pointer"
                  >
                    View all upcoming shows{' '}
                    <ChevronRightIcon className="h-4 w-4 ml-3" />
                  </Link>
                </div>
                <div className="mt-14 space-y-3">
                  <h3 className="font-serif text-lg font-semibold text-slate-800">
                    About
                  </h3>
                  <div className="space-y-0">
                    <p className="text-slate-500 text-sm font-medium">
                      Nashville’s psychedelic punk-grass rockers, Sicard Hollow,
                      grew up sick of any existing institution telling them who
                      and what to be. Now, as they navigate adulthood, they’re
                      equally tired of the music institutions telling them what
                      their music should sound like—so they dunked it in
                      patchouli and a skate-and-destroy ethos that brings an
                      enduring sound into the modern age.
                    </p>
                  </div>
                </div>
              </nav>
            </div>
            <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
              <a href="#" className="group block w-full flex-shrink-0">
                <div className="flex items-center">
                  <div>
                    <img
                      className="inline-block h-9 w-9 rounded-full"
                      src={session ? session.user.image : ''}
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                      {session ? session.user.name : ''}
                    </p>
                    <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                      View profile
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col md:pl-96">
          {/* <div className="sticky top-0 z-10 bg-white pl-1 pt-1 sm:pl-3 sm:pt-3 md:hidden">
            <button
              type="button"
              className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div> */}
          <main className="flex-1">
            <div className="overflow-y-scroll h-screen">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
}
