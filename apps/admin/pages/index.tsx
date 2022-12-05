import React from 'react';
import Head from 'next/head';
import { useSession } from 'next-auth/react';

import { PageWidthWrapper, EventsPanel, ActionsPanel } from 'components';

const Home = () => {
  const {
    data: { user },
  } = useSession();

  return (
    <div>
      <Head>
        <title>Sicard Hollow | Admin</title>
      </Head>

      <header className="pb-24 bg-gradient-to-r from-sicard-blue-800 to-sicard-blue-600"></header>
      <div className="-mt-24 pb-8">
        <PageWidthWrapper>
          <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
            {/* Left column */}
            <div className="grid grid-cols-1 gap-4 lg:col-span-2">
              {/* Welcome panel */}
              <section aria-labelledby="profile-overview-title">
                <div className="rounded-lg bg-white overflow-hidden shadow">
                  <h2 className="sr-only" id="profile-overview-title">
                    Profile Overview
                  </h2>
                  <div className="bg-white p-6">
                    <div className="sm:flex sm:items-center sm:justify-between">
                      <div className="sm:flex sm:space-x-5">
                        <div className="flex-shrink-0">
                          <img
                            className="mx-auto h-20 w-20 rounded-full"
                            src={user.image}
                            alt=""
                          />
                        </div>
                        <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                          <p className="text-sm font-medium text-gray-600">
                            Welcome back,
                          </p>
                          <p className="text-xl font-bold text-gray-900 sm:text-2xl">
                            {user.name}
                          </p>
                          <p className="text-sm font-medium text-gray-600">
                            {/* {user.role} */}
                            Band Manager
                          </p>
                        </div>
                      </div>
                      <div className="mt-5 flex justify-center sm:mt-0">
                        <a
                          href={process.env.NEXT_PUBLIC_WEBSITE_URL}
                          className="flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                          Visit website
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 bg-gray-50 grid grid-cols-1 divide-y divide-gray-200 sm:grid-cols-3 sm:divide-y-0 sm:divide-x"></div>
                </div>
              </section>
              <ActionsPanel />
            </div>
            <div className="grid grid-cols-1 gap-4">
              <EventsPanel />
            </div>
          </div>
        </PageWidthWrapper>
      </div>
    </div>
  );
};

Home.auth = true;
export default Home;
