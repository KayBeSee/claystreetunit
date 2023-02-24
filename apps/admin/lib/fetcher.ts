import useSWR from 'swr';
import { PublicConfiguration } from 'swr/dist/types';

// @ts-ignore
const thisFetcher = (...args) => fetch(...args).then((res) => res.json());

export const fetcher = <T>(route: string, options?) => {
  return useSWR<T>(route, thisFetcher, options);
};
