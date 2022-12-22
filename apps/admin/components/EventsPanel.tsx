import axios from 'axios';
import { useEffect, useState } from 'react';
import { DataConfig } from 'types';

const getDate = (date) => {
  const dateObj = new Date(date);
  const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(
    dateObj
  );
  const day = new Intl.DateTimeFormat('en-US', { day: 'numeric' }).format(
    dateObj
  );
  const year = new Intl.DateTimeFormat('en-US', { year: 'numeric' }).format(
    dateObj
  );
  const weekday = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(
    dateObj
  );
  return `${month} ${day}, ${year}`;
};

interface Props {
  config: DataConfig;
}

export const EventsPanel = ({ config }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchTourDates = async () => {
      try {
        const { data } = await axios.get(config.bandsInTownApiEndpoint);
        setShows(data);
      } catch (e) {
        console.log('e: ', e);
      }
      setIsLoading(false);
    };
    fetchTourDates();
  });

  return (
    <section aria-labelledby="announcements-title">
      <div className="rounded-lg bg-white overflow-hidden shadow">
        <div className="p-6">
          <h2
            className="text-base font-medium text-gray-900"
            id="announcements-title"
          >
            Upcoming shows
          </h2>
          <div className="flow-root">
            <ul className="divide-y-2 divide-slate-200">
              {shows.slice(0, 5).map((show) => (
                <li
                  className="flex justify-between py-6 items-center"
                  key={show.id}
                >
                  <div className="flex flex-col">
                    <time className="font-sans text-sm text-slate-600">
                      {getDate(show.datetime)}
                    </time>
                    <span className="text-xl font-serif text-slate-700">
                      {show.venue.city}, {show.venue.region}
                    </span>
                    <span className="font-sans text-sm text-slate-700">
                      {show.venue.name}
                    </span>
                  </div>
                  {show.offers[0] ? (
                    <a
                      href={show.offers[0].url}
                      target="_blank"
                      rel="noreferrer"
                      // passHref={true}
                      className="border border-sicard-blue-200 text-sicard-blue-200 flex py-2 px-4 font-medium font-serif"
                    >
                      Tickets
                    </a>
                  ) : (
                    <div className="border border-sicard-blue-200 text-sicard-blue-200 flex py-2 px-4 font-medium font-serif">
                      Free show!
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6">
            <a
              href={`${process.env.NEXT_PUBLIC_WEBSITE_URL}/tour`}
              className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              View all
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
