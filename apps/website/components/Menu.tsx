import React, { Fragment, useState } from 'react';
import { useRouter } from 'next/router';

import { MenuIcon, XIcon } from '@heroicons/react/solid';
import { Transition, Dialog } from '@headlessui/react';

import { SplashPage } from 'components';

import { DataConfig } from 'types';

interface Props {
  config: DataConfig;
}

export const Menu = ({ config }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useRouter();

  return (
    <>
      {pathname !== '/' ? (
        <button
          className="absolute inset-4 w-8 h-8 z-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <XIcon className="text-white" />
          ) : (
            <MenuIcon className="text-white" />
          )}
        </button>
      ) : null}
      <Transition show={isOpen} unmount={false} as={Fragment}>
        <Dialog
          unmount={false}
          onClose={() => setIsOpen(false)}
          as="div"
          className="z-40"
        >
          <Transition.Child
            enter="transition-opacity duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            unmount={false}
          >
            <Dialog.Panel className="w-full h-full">
              <SplashPage config={config} setIsOpen={setIsOpen} />
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
};
