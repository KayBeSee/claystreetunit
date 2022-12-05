import fetch from 'isomorphic-unfetch';

import { PageWidthWrapper, LoadingSpinner } from 'components';
import { useRouter } from 'next/router';
import { shows } from 'data';

import { Header, Tabs } from 'components/shows';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

// @ts-ignore
const fetcher = (...args) => fetch(...args).then((res) => res.json());

const otherData = {
  hospitalityName: '',
  hospitalityPhone: 7063739378,
  hospitalityEmail: 'foobar@jones.com',
  arrivalInstructions: '',
  loadinInstructions: '',
  greenRoomProvided: false,
  greenRoomInfo: '',
  wifi: '',

  productionManager: 'Foobar Jones',
  productionManagerPhone: 7063739378,
  productionManagerEmail: 'foobar@jones.com',
  stageInfo: '',
  transitionNotes: '',

  frontOfHouseTechProvided: false,
  frontOfHouseTechName: '',
  frontOfHouseTechPhone: '',
  frontOfHouseTechEmail: '',
  backline: false,

  lightingDirectorProvided: false,
  lightingDirectorName: '',
  lightingDirectorPhone: '',
  lightingDirectorEmail: '',
  lightingSpecs: '',
};

const Venue = () => {
  const { query } = useRouter();
  console.log('query: ', query);
  const data = shows.filter((item) => item._id === Number(query.id))[0];
  console.log('data: ', data);

  if (!data) {
    return (
      <div className="h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <PageWidthWrapper>
      <main className="py-10">
        <Header show={data} />
        <Tabs />
        <div className="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
          <div className="space-y-6 lg:col-start-1 lg:col-span-2">
            <section aria-labelledby="applicant-information-title">
              <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h2
                    id="applicant-information-title"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    Venue details
                  </h2>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Venue
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {data.venue.name}
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Location
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {data.venue.city}, {data.venue.state}
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Address
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        Last Rd NW Radford, VA 24141
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Phone
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        +1 555-555-5555
                      </dd>
                    </div>
                    <div className="sm:col-span-2">
                      <dt className="text-sm font-medium text-gray-500">
                        Notes
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        Fugiat ipsum ipsum deserunt culpa aute sint do nostrud
                        anim incididunt cillum culpa consequat. Excepteur qui
                        ipsum aliquip consequat sint. Sit id mollit nulla mollit
                        nostrud in ea officia proident. Irure nostrud pariatur
                        mollit ad adipisicing reprehenderit deserunt qui eu.
                      </dd>
                    </div>
                  </dl>
                </div>
                <div>
                  <a
                    href="#"
                    className="block bg-gray-50 text-sm font-medium text-gray-500 text-center px-4 py-4 hover:text-gray-700 sm:rounded-b-lg"
                  >
                    Read full application
                  </a>
                </div>
              </div>
            </section>

            <section aria-labelledby="applicant-information-title">
              <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h2
                    id="applicant-information-title"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    Personnel details
                  </h2>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Production manager
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {otherData.productionManager}
                      </dd>
                      <dd className="mt-1 text-sm text-gray-900">
                        {otherData.productionManagerPhone}
                      </dd>
                      <dd className="mt-1 text-sm text-gray-900">
                        {otherData.productionManagerEmail}
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Front of House Tech
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {otherData.frontOfHouseTechProvided ? (
                          <>
                            <dd className="mt-1 text-sm text-gray-900">
                              {otherData.frontOfHouseTechName}
                            </dd>
                            <dd className="mt-1 text-sm text-gray-900">
                              {otherData.frontOfHouseTechPhone}
                            </dd>
                            <dd className="mt-1 text-sm text-gray-900">
                              {otherData.frontOfHouseTechEmail}
                            </dd>
                          </>
                        ) : (
                          'Not provided'
                        )}
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Lighting Director
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {otherData.lightingDirectorProvided ? (
                          <>
                            <dd className="mt-1 text-sm text-gray-900">
                              {otherData.lightingDirectorName}
                            </dd>
                            <dd className="mt-1 text-sm text-gray-900">
                              {otherData.lightingDirectorPhone}
                            </dd>
                            <dd className="mt-1 text-sm text-gray-900">
                              {otherData.lightingDirectorEmail}
                            </dd>
                          </>
                        ) : (
                          'Not provided'
                        )}
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Phone
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        +1 555-555-5555
                      </dd>
                    </div>
                    <div className="sm:col-span-2">
                      <dt className="text-sm font-medium text-gray-500">
                        Notes
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        Fugiat ipsum ipsum deserunt culpa aute sint do nostrud
                        anim incididunt cillum culpa consequat. Excepteur qui
                        ipsum aliquip consequat sint. Sit id mollit nulla mollit
                        nostrud in ea officia proident. Irure nostrud pariatur
                        mollit ad adipisicing reprehenderit deserunt qui eu.
                      </dd>
                    </div>
                  </dl>
                </div>
                <div>
                  <a
                    href="#"
                    className="block bg-gray-50 text-sm font-medium text-gray-500 text-center px-4 py-4 hover:text-gray-700 sm:rounded-b-lg"
                  >
                    Read full application
                  </a>
                </div>
              </div>
            </section>
          </div>
          <section
            aria-labelledby="timeline-title"
            className="lg:col-start-3 lg:col-span-1"
          >
            <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
              <h2
                id="timeline-title"
                className="text-lg font-medium text-gray-900"
              >
                Contact information
              </h2>

              {/* Activity Feed */}
              <div className="mt-6 flow-root"></div>
              <div className="mt-6 flex flex-col justify-stretch">
                <button
                  type="button"
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Some action
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </PageWidthWrapper>
  );
};

Venue.auth = true;

export default Venue;
