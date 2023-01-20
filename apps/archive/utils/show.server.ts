import { Prisma, ontour } from "@ontour/archive";

export const createShow = async (show: Prisma.ShowCreateInput) => {
  const newShow = ontour.show.create({ data: show });
  return newShow;
};

export const getShows = async () => {
  const shows = await ontour.show.findMany({
    include: {
      setlist: {
        include: {
          tracks: true,
        },
      },
      venue: true,
    },
  });
  return shows;
};

export const getSongs = async () => {
  const songs = await ontour.song.findMany();
  return songs;
};
