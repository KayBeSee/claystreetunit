import { useEffect, useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

import { data } from '@ontour/data';
import { DataConfig } from '@ontour/types';

import { getDate } from 'pages/tour';

import { Button, Contact, Copyright } from 'components';
import { Title, Description } from 'utils/Meta';
import { fetchShowData } from 'utils/fetchShowData';

interface CardGroupProps {
  children: any;
  className?: string;
}

function CardGroup({ children, className }: CardGroupProps) {
  return (
    <ul
      className={clsx(
        'grid grid-cols-1 xl:grid-cols-3 gap-y-10 gap-x-6 items-start',
        className
      )}
    >
      {children}
    </ul>
  );
}

interface CardProps {
  title: any;
  superTitle: string;
  href: string;
  color: string;
  body: string;
  image: string;
  button?: JSX.Element;
}

function Card({
  title,
  superTitle,
  href,
  color,
  body,
  image,
  button,
}: CardProps) {
  return (
    <li className="relative flex flex-col sm:flex-row xl:flex-col items-start hover:bg-slate-200 active:bg-slate-300 rounded-lg h-full">
      <div className="order-1 sm:ml-6 xl:ml-0 px-4 py-2">
        <h3 className="font-serif mb-1 text-slate-900 font-semibold">
          {button ? (
            <>
              <span
                className={clsx(
                  'font-sans mb-1 block text-sm leading-6',
                  color
                )}
              >
                {superTitle}
              </span>
              {title}
            </>
          ) : (
            <a
              href={href}
              target="_blank"
              className={clsx(
                'before:absolute before:inset-0',
                !button && 'hover:text-slate-600'
              )}
            >
              <span
                className={clsx(
                  'font-sans mb-1 block text-sm leading-6',
                  color
                )}
              >
                {superTitle}
              </span>
              {title}
            </a>
          )}
        </h3>
        <div className="prose prose-slate prose-sm text-slate-600">
          <p>{body}</p>
        </div>
        {button && (
          <Button href={href} className="mt-6">
            {button}
          </Button>
        )}
      </div>
      <img
        src={image}
        alt=""
        className="mb-6 shadow-md rounded-lg bg-slate-50 w-full sm:w-[17rem] sm:mb-0 xl:mb-6 xl:w-full aspect-video object-cover"
      />
    </li>
  );
}

function ResourceCard({
  title,
  superTitle,
  href,
  color,
  body,
  image,
  button,
}: CardProps) {
  return (
    <li className="relative flex flex-col sm:flex-row items-start">
      <div className="order-1 sm:ml-6 ml-0">
        <h3 className="font-serif mb-1 text-slate-900 font-semibold">
          {button ? (
            <>
              <span
                className={clsx(
                  'font-sans mb-1 block text-sm leading-6',
                  color
                )}
              >
                {superTitle}
              </span>
              {title}
            </>
          ) : (
            <a
              href={href}
              target="_blank"
              className={clsx(
                'before:absolute before:inset-0',
                !button && 'hover:text-slate-600'
              )}
            >
              <span
                className={clsx(
                  'font-sans mb-1 block text-sm leading-6',
                  color
                )}
              >
                {superTitle}
              </span>
              {title}
            </a>
          )}
        </h3>
        <div className="prose prose-slate prose-sm text-slate-600">
          <p>{body}</p>
        </div>
        {button && (
          <Button href={href} className="mt-6">
            {button}
          </Button>
        )}
      </div>
      <img
        src={image}
        alt=""
        className="mb-6 shadow-md rounded-lg bg-slate-50 w-full sm:w-[17rem] sm:mb-0 xl:mb-6 aspect-video object-cover"
      />
    </li>
  );
}

interface Props {
  config: DataConfig;
}

export default function PressKit({ config }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchTourDates = async () => {
      try {
        const data = await fetchShowData(config.tour.bandsInTownApiEndpoint);
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
      <Title>EPK</Title>
      <Description>
        {`The electronic press kit (EPK) for ${config.artistName}.`}
      </Description>
      <div
        className={`${config.epk.style.background} pt-10 pb-12 overflow-y-scroll bg-fixed bg-no-repeat bg-cover bg-center h-screen w-screen relative px-0 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8`}
      >
        <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="max-w-4xl flex flex-col mx-auto justify-center pt-10">
            <header className="flex flex-col sm:flex-row">
              <div className="flex items-center space-between max-w-3xl w-full">
                <div className="flex flex-col flex-1 flex-wrap">
                  <p className="mb-4 text-sm leading-6 font-semibold text-sicard-blue-400">
                    Press Kit
                  </p>
                  <h1 className="font-serif mb-8 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 whitespace-nowrap">
                    {config.artistName}
                  </h1>
                </div>
                {config.epk.logo ? (
                  <div className="py-0 px-2">
                    <div className="relative h-40 w-40">
                      <Image src={config.epk.logo} layout="fill" priority />
                    </div>
                  </div>
                ) : null}
              </div>
            </header>

            <div className="space-y-16">
              <section>
                <h2 className="font-serif mb-2 text-2xl leading-7 tracking-tight text-slate-900 font-bold">
                  Bio
                </h2>
                <div className="mb-10 font-sans prose prose-slate text-slate-600 max-w-3xl">
                  {config.epk.description.split('\n').map((section, index) => (
                    <p key={index}>{section}</p>
                  ))}
                </div>
              </section>

              <section>
                <div className="-mx-4 sm:mx-0 flex flex-col sm:rounded-lg bg-white px-4 sm:px-8 py-8 shadow-none sm:shadow-md">
                  <h3 className="mb-0 text-sm leading-6 font-semibold text-sicard-blue-500">
                    Tour
                  </h3>
                  <h2 className="font-serif mb-2 text-xl tracking-tight text-slate-900 font-bold">
                    Upcoming shows
                  </h2>
                  <ul className="pb-4">
                    {!isLoading
                      ? shows
                          .filter((_, i) => i < 5)
                          .map((show) => (
                            <li
                              className="flex justify-between py-4 items-center"
                              key={show.id}
                            >
                              <div className="flex flex-col">
                                <time className="font-sans text-xs text-slate-600">
                                  {getDate(show.datetime)}
                                </time>
                                <span className="block sm:hidden text-xl font-serif text-slate-700">
                                  {show.venue.location}
                                </span>
                                <span className="font-sans text-sm sm:text-xl text-slate-700">
                                  {show.venue.name}
                                </span>
                              </div>
                              <span className="hidden sm:block text-md font-serif text-slate-700">
                                {show.venue.location}
                              </span>
                            </li>
                          ))
                      : Array.from(Array(5).keys()).map((item) => (
                          <li
                            className="grid grid-cols-6 gap-2 py-4"
                            key={item}
                          >
                            <div className="grid grid-cols-3 space-y-2 col-span-2">
                              <div className="h-3 bg-slate-200 rounded col-span-1"></div>
                              <div className="h-6 bg-slate-200 rounded col-span-3"></div>
                            </div>
                            <div className="h-0 bg-slate-200 rounded col-span-3"></div>
                            <div className="h-4 bg-slate-200 rounded col-span-1"></div>
                          </li>
                        ))}
                  </ul>
                  <Button
                    // @ts-ignore
                    color={[
                      'bg-slate-700 text-white hover:bg-slate-800 focus:ring-offset-2 focus:ring-offset-slate-50 focus:ring-slate-400',
                      'text-slate-300 group-hover:text-slate-200',
                    ]}
                    darkColor="gray"
                    href="/tour"
                    className="-mx-2 self-start md:self-end md:-mb-4"
                  >
                    View all upcoming shows
                  </Button>
                </div>
              </section>

              <section>
                <h2 className="font-serif mb-2 text-2xl leading-7 tracking-tight text-slate-900 font-bold">
                  Videos
                </h2>
                <div className="font-sans mb-10 prose prose-slate text-slate-600 max-w-3xl">
                  <p>
                    We try to record and publish as much of our music as
                    possible. Here is a curated sample of recent videos. Head
                    over to our YouTube channel and dive into even more content.
                  </p>
                </div>

                <CardGroup className="mb-10">
                  {config.epk.videos.map((card) => (
                    <Card key={card.title} {...card} />
                  ))}
                </CardGroup>

                <Button href={config.epk.youtubeLink}>
                  See all our videos
                </Button>
              </section>

              <section className="relative bg-gray-900 -mx-4 p-4 pb-10 flex flex-col-reverse items-start sm:mx-0 sm:p-10 sm:rounded-lg sm:flex-row overflow-hidden">
                <div className="w-full absolute inset-0">
                  <div className="h-full w-full grid grid-cols-2">
                    <div className="h-full relative col-start-2">
                      <Image
                        className="h-full w-full object-cover opacity-25 absolute inset-0"
                        src={config.epk.spotifyScreenshot}
                        alt={`${config.artistName} Spotify Stats`}
                        layout="fill"
                      />
                      <div
                        aria-hidden="true"
                        className="absolute inset-x-0 top-0 from-gray-900 inset-y-0 left-0 h-full w-32 bg-gradient-to-r"
                      />
                    </div>
                  </div>
                </div>
                <div className="px-4 sm:px-0 max-w-7xl">
                  <div className="relative pt-12 pb-0 sm:pt-0 sm:pb-0 xl:col-start-1">
                    <h2 className="text-sm font-semibold text-sicard-blue-300 tracking-wide uppercase">
                      Social Metrics
                    </h2>
                    <div className="mt-4 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2">
                      {config.epk.socialStats.map((item, i) => (
                        <p key={i}>
                          <span className="block text-2xl font-bold text-white">
                            {item.stat}
                          </span>
                          <span className="mt-1 block text-base text-gray-300">
                            <span className="font-medium text-white">
                              {item.emphasis}
                            </span>{' '}
                            {item.rest}
                          </span>
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              <section className="border-t border-sicard-gold-500 pt-16">
                <h2 className="font-serif mb-2 text-xl tracking-tight text-slate-900 font-bold">
                  Additional resources
                </h2>
                <div className="font-sans mb-10 prose prose-slate text-slate-600 max-w-3xl">
                  <p>
                    Here are some other resources promoters, press journalists,
                    and booking prospects frequently request from management.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-y-10 gap-x-6 items-start">
                  {config.epk.additionalResources.map((card) => (
                    <ResourceCard
                      key={card.title}
                      button={
                        <>
                          View resource
                          <span className="sr-only">, {card.title}</span>
                        </>
                      }
                      {...card}
                    />
                  ))}
                </div>
              </section>

              <div className="border-t border-sicard-gold-500">
                <Contact
                  contacts={config.info.contacts}
                  socialLinks={config.info.social}
                />
              </div>
            </div>
            <Copyright
              legalEntity={config.legalEntity}
              textColor="text-slate-600"
            />
          </div>
        </div>
      </div>
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
