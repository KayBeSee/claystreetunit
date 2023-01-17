import { Prisma, Show } from "@prisma/client";

export type ShowWithSetlist = Prisma.ShowGetPayload<{
  include: {
    setlist: {
      include: {
        tracks: { include: { song: { select: { id: true; name: true } } } };
      };
    };
    venue: true;
  };
}>;

export type TrackWithSong = Prisma.TrackGetPayload<{
  include: {
    song: true;
  };
}>;

export type SetFormInput = {
  id?: string;
  name: string;
  tracks: TrackFormInput[];
};

export type TrackFormInput = Prisma.TrackGetPayload<{
  select: {
    id?: true;
    notes: true;
    segue: true;
    song: {
      select: {
        id?: true;
        name: true;
        originalArtist: true;
        notes: true;
      };
    };
  };
}>;

export type VenueFormInput = Prisma.VenueGetPayload<{
  select: {
    id?: true;
    name: true;
    city: true;
    state: true;
  };
}>;

export type CreateShowFormInput = {
  eventName: string;
  date: string;
  notes: string;
  venue: VenueFormInput;
  setlist: SetFormInput[];
};

export interface UpdateShowFormInput extends CreateShowFormInput {
  id: string;
}
