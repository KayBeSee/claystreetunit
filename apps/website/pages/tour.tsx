import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Copyright } from 'components';

import { Title, Description } from 'utils/Meta';

import { data } from 'data';
import { DataConfig } from 'types';

import * as ga from 'utils/gtag';

export const getDate = (date) => {
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

const logTicketClickEvent = (show) => {
  if (process.env.NODE_ENV === 'production') {
    const formattedDate = show.datetime.slice(0, show.datetime.indexOf('T'));
    ga.event({
      action: 'buy_ticket',
      params: {
        id: `${formattedDate} - ${show.venue.name}`,
      },
    });
  }
};

interface Props {
  config: DataConfig;
}

export default function Tour({ config }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchTourDates = async () => {
      try {
        const { data } = await axios.get(config.tour.bandsInTownApiEndpoint);
        setShows(data);
      } catch (e) {
        console.log('e: ', e);
      }
      setIsLoading(false);
    };
    fetchTourDates();
  });

  return (
    <div>
      <Title>Tour</Title>
      <Description>{`Tour dates for ${config.artistName}'s upcoming concerts and shows.`}</Description>
      <div
        className="bg-fixed bg-no-repeat overflow-y-scroll bg-cover bg-center h-screen w-screen relative pt-16 pb-20 px-0 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8"
        style={{ backgroundImage: `url(${config.tour.style.backgroundImage})` }}
      >
        {/* <div className="pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8"> */}
        <div className="max-w-prose mx-auto flex flex-col bg-white bg-opacity- rounded-lg shadow-lg overflow-hidden pt-8 pb-8 px-4 sm:px-6">
          <div className="text-center py-8">
            <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl font-serif">
              Tour Dates
            </h2>
          </div>
          <ul className="divide-y-2 divide-slate-200">
            {isLoading
              ? Array.from(Array(10).keys()).map((item) => (
                  <li
                    className="grid grid-cols-6 gap-2 py-4 animate-pulse"
                    key={item}
                  >
                    <div className="grid grid-cols-3 space-y-2 col-span-2">
                      <div className="h-3 bg-slate-300 rounded col-span-1"></div>
                      <div className="h-6 bg-slate-300 rounded col-span-3"></div>
                      <div className="h-3 bg-slate-300 rounded col-span-2"></div>
                    </div>
                    <div className="h-0 bg-slate-300 rounded col-span-3"></div>
                    <div className="h-8 bg-slate-300 rounded col-span-1"></div>
                  </li>
                ))
              : shows.map((show) => {
                  const primaryText = show.title
                    ? show.title
                    : `${show.venue.city}, ${show.venue.region}`;
                  const secondaryText = show.title
                    ? `${show.venue.city}, ${show.venue.region}`
                    : show.venue.name;
                  const lineup =
                    show.lineup.length > 1 && !show.title
                      ? show.lineup.slice(1).join(', ')
                      : [];
                  return (
                    <li
                      className="flex justify-between py-6 items-center"
                      key={show.id}
                    >
                      <div className="flex flex-col">
                        <time className="font-sans text-md text-slate-600">
                          {getDate(show.datetime)}
                        </time>
                        <span className="text-3xl font-serif text-slate-700">
                          {primaryText}
                        </span>
                        <span className="font-sans text-md text-slate-700">
                          {secondaryText}
                        </span>
                        {lineup.length ? (
                          <span className="font-sans text-md text-slate-500">
                            with {lineup}
                          </span>
                        ) : null}
                      </div>
                      {show.offers[0] ? (
                        <a
                          href={show.offers[0].url}
                          onClick={() => logTicketClickEvent(show)}
                          target="_blank"
                          rel="noreferrer"
                          // passHref={true}
                          className="rounded-md bg-sicard-blue-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-sicard-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sicard-blue-600"
                        >
                          Tickets
                        </a>
                      ) : (
                        <div className="rounded-md bg-sicard-blue-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-sicard-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sicard-blue-600">
                          Free show!
                        </div>
                      )}
                    </li>
                  );
                })}
          </ul>
          <Copyright
            legalEntity={config.legalEntity}
            textColor="text-sicard-blue-700"
          />
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps(context) {
  return {
    props: {
      config: data,
    },
  };
}
