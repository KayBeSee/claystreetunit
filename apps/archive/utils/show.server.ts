import { Prisma } from "@prisma/client";

import { ontour } from "./prisma.server";

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
