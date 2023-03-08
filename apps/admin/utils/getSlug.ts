import { Show, Prisma } from '@prisma/client';
import { format } from 'date-fns';

type ShowWithVenue = Prisma.ShowGetPayload<{
  include: {
    venue: true;
  };
}>;

export const getSlug = (show: ShowWithVenue) => {
  console.log('show: ', show);
  return `${format(new Date(show.date), 'MMMM-LL-yyyy')}-${show.venue.name
    .replace(/\s+/g, '-')
    .toLowerCase()}-${show.venue.city
    .replace(/\s+/g, '-')
    .toLowerCase()}-${show.venue.state.replace(/\s+/g, '-').toLowerCase()}`;
};
