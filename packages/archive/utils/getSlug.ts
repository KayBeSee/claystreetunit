import { Show, Prisma } from "@prisma/client";
import { format } from "date-fns";

type ShowWithVenue = Prisma.ShowGetPayload<{
  include: {
    setlist: {
      include: {
        tracks: { include: { song: { select: { id: true; name: true } } } };
      };
    };
    venue: true;
    audioSources: true;
  };
}>;

export const getSlug = (show: ShowWithVenue) => {
  return `${format(show.date, "MMMM-LL-yyyy")}-${show.venue.name
    .replace(/\s+/g, "-")
    .toLowerCase()}-${show.venue.city
    .replace(/\s+/g, "-")
    .toLowerCase()}-${show.venue.state.replace(/\s+/g, "-").toLowerCase()}`;
};
