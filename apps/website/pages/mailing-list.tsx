import React, { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

import { Title, Description } from 'utils/Meta';

import { data } from '@ontour/data';
import { DataConfig } from '@ontour/types';

interface Props {
  config: DataConfig;
}

export default function MailingList({ config }: Props) {
  const [email, setEmail] = useState('');
  const [buttonText, setButtonText] = useState('Sign up');

  const tryApi = async () => {
    try {
      setButtonText('Adding...');
      await axios.post(`/api/mailing-list`, {
        email: email,
      });
      setButtonText('Added!');
    } catch (e) {
      setButtonText('Try again');
    }
  };

  return (
    <div>
      <Title>Mailing List</Title>
      <Description>{`Mailing list for ${config.artistName}`}</Description>

      <Image
        alt="Mailing List background image"
        src={config.mailingList.style.backgroundImage}
        layout="fill"
        objectFit="cover"
        quality={100}
        className="brightness-50"
      />

      <section className="flex items-center justify-center h-screen">
        <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="relative rounded-2xl px-6 py-10 bg-sicard-gold-500 overflow-hidden shadow-xl sm:px-12 sm:py-20">
            <div
              aria-hidden="true"
              className="absolute inset-0 -mt-72 sm:-mt-32 md:mt-0"
            >
              <svg
                className="absolute inset-0 h-full w-full"
                preserveAspectRatio="xMidYMid slice"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 1463 360"
              >
                <path
                  className="text-sicard-gold-400 text-opacity-40"
                  fill="currentColor"
                  d="M-82.673 72l1761.849 472.086-134.327 501.315-1761.85-472.086z"
                />
                <path
                  className="text-sicard-gold-600 text-opacity-40"
                  fill="currentColor"
                  d="M-217.088 544.086L1544.761 72l134.327 501.316-1761.849 472.086z"
                />
              </svg>
            </div>
            <div className="relative">
              <div className="sm:text-center">
                <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
                  Join the {config.artistName} mailing list
                </h2>
                <p className="mt-6 mx-auto max-w-lg text-md sm:text-lg text-sicard-gold-100">
                  Get the latest tour announcements, show recordings, and videos
                  right to your inbox.
                </p>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  tryApi();
                }}
                className="mt-12 sm:mx-auto sm:max-w-lg sm:flex"
              >
                <div className="min-w-0 flex-1">
                  <label htmlFor="cta-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="cta-email"
                    type="email"
                    className="block w-full border border-transparent rounded-md px-5 py-3 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-sicard-gold-500"
                    placeholder="Enter your email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-3">
                  <button
                    type="submit"
                    className="block w-full rounded-md border border-transparent px-5 py-3 bg-gray-900 text-base font-medium text-white shadow hover:bg-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-sicard-gold-500 sm:px-10"
                  >
                    {buttonText}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      config: data,
    },
  };
}
