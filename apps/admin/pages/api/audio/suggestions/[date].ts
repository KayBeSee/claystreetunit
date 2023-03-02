import type { NextApiRequest, NextApiResponse } from 'next';

import { ontour } from '@ontour/archive';
import { AudioSuggestion } from '@ontour/types';
import { format } from 'date-fns';

const getArchiveOrgSuggestions = async (
  date: string
): Promise<AudioSuggestion[]> => {
  // TODO: dynamic creator field to scale to other artists
  const formattedDate = format(new Date(date), 'yyyy-LL-dd'); // date: 2022-10-08
  const url = `https://archive.org/advancedsearch.php?q=creator%3A%28airshow%29+AND+date%3A${formattedDate}&fl%5B%5D=creator&fl%5B%5D=date&fl%5B%5D=identifier&fl%5B%5D=publisher&fl%5B%5D=source&fl%5B%5D=title&sort%5B%5D=&sort%5B%5D=&sort%5B%5D=&rows=50&page=1&output=json`;
  const {
    response: { docs },
  } = await fetch(url).then((resp) => resp.json());

  const suggestions: AudioSuggestion[] = docs.map((item) => ({
    name: item.title,
    provider: 'archive',
    identifier: item.identifier,
  }));

  return suggestions;
};

export default async function audioSourceHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    query: { date },
  } = req;

  const singleDate = Array.isArray(date) ? date[0] : date;

  switch (method) {
    case 'GET': {
      const suggestions = await getArchiveOrgSuggestions(singleDate);
      const suggestionIdentifiers = suggestions.map((item) => item.identifier);
      const audioSources = await ontour.audioSource.findMany({
        where: { identifier: { in: suggestionIdentifiers } },
      });

      const duplicateIdentifiers = audioSources.map(
        (source) => source.identifier
      );

      const filteredSuggestions = suggestions.filter(
        (item) => !duplicateIdentifiers.includes(item.identifier)
      );

      return res.json(filteredSuggestions);
    }
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
