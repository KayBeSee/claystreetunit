import useSWR from 'swr';

const thisFetcher = (...args) => fetch(...args).then((res) => res.json());

export const fetcher = <T>(route: string) => {
  return useSWR<T>(route, thisFetcher);
};
