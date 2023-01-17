import { Prisma, CreateShowFormInput } from '@ontour/archive';

export const ShowGetToShowInput = (
  show: CreateShowFormInput
): Prisma.ShowCreateInput => {
  return {
    ...show,
    venue: {
      connectOrCreate: {
        where: {
          id: show.venue.id,
        },
        create: {
          name: show.venue.name,
          city: show.venue.city,
          state: show.venue.state,
        },
      },
    },
    setlist: {
      create: show.setlist,
    },
  };
};
