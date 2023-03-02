import axios from 'axios';
import {
  BandsInTownApiResponse,
  SeatedApiResponse,
  ShowResponse,
} from '@ontour/types';

export const fetchShowData = async (
  apiEndpoint: string
): Promise<ShowResponse[]> => {
  const { data } = await axios.get(apiEndpoint);
  if (apiEndpoint.includes('bandsintown')) {
    return formatBandsInTownApiResponse(data);
  } else if (apiEndpoint.includes('seated')) {
    return formatSeatedApiResponse(data);
  } else {
    throw new Error(`The show api endpoint is not supported: ${apiEndpoint}`);
  }
};

const formatSeatedApiResponse = (
  response: SeatedApiResponse
): ShowResponse[] => {
  return response.included
    .map((item) => ({
      id: item.id,
      title: '',
      datetime: item.attributes['starts-at'],
      venue: {
        name: item.attributes['venue-name'],
        location: item.attributes['formatted-address'],
      },
      lineup: [],
      tickets: {
        text: item.attributes['on-sale-date-name'],
        url: `https://link.seated.com/${item.id}`,
      },
    }))
    .sort((a, b) => {
      return new Date(a.datetime).getTime() - new Date(b.datetime).getTime();
    });
};

const formatBandsInTownApiResponse = (
  response: BandsInTownApiResponse[]
): ShowResponse[] => {
  return response.map((item) => ({
    id: item.id,
    title: item.title,
    datetime: item.datetime,
    venue: {
      ...item.venue,
      location: `${item.venue.city}, ${item.venue.region}`,
    },
    lineup: item.lineup,
    tickets: item.offers.length
      ? {
          text: 'Tickets',
          url: item.offers[0].url,
        }
      : {
          text: 'Free show!',
          url: item.url,
        },
  }));
};
