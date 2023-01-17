import {
  CreateShowFormInput,
  ontour,
  Prisma,
  SetFormInput,
  VenueFormInput,
  TrackFormInput,
} from '@ontour/archive';

export function exclude<T, Key extends keyof T>(
  item: T,
  keys: Key[]
): Omit<T, Key> {
  for (let key of keys) {
    delete item[key];
  }
  return item;
}

export const getVenueQuery = (
  venue: VenueFormInput
): Prisma.VenueCreateNestedOneWithoutShowsInput => {
  if (venue.id) {
    return {
      connect: {
        id: venue.id,
      },
    };
  } else {
    return {
      create: {
        ...venue,
      },
    };
  }
};

export const getSetlistQuery = (setlist: SetFormInput[]) => {
  const update: Array<Prisma.SetUpdateWithWhereUniqueWithoutShowInput> = [];
  const create: Array<Prisma.SetCreateWithoutShowInput> = [];

  for (let i = 0; i < setlist.length; i++) {
    const { id, ...currentSet } = setlist[i];
    const tracksQuery = getTracksQuery(currentSet.tracks);

    if (id) {
      update.push({
        where: {
          id: id,
        },
        data: {
          ...currentSet,
          position: i,
          tracks: tracksQuery,
        },
      });
    } else {
      create.push({
        ...currentSet,
        position: i,
        tracks: tracksQuery,
      });
    }
  }

  const setlistQuery: Prisma.SetUpdateManyWithoutShowNestedInput = {
    create: !!create.length ? create : undefined,
    update: !!update.length ? update : undefined,
  };

  return setlistQuery;
};

const getSongQuery = (song) => {
  let songQuery: Prisma.SongUpdateOneRequiredWithoutTracksNestedInput;

  if (song.id) {
    songQuery = {
      connect: {
        id: song.id,
      },
    };
  } else {
    songQuery = {
      create: {
        ...song,
      },
    };
  }

  return songQuery;
};

const getTracksQuery = (tracks: TrackFormInput[]) => {
  const update: Array<Prisma.TrackUpdateWithWhereUniqueWithoutSetInput> = [];
  const create: Array<Prisma.TrackCreateWithoutSetInput> = [];

  for (let i = 0; i < tracks.length; i++) {
    const { id, ...currentTrack } = tracks[i];
    const songQuery = getSongQuery(currentTrack.song);

    if (id) {
      update.push({
        where: { id: id },
        data: {
          ...currentTrack,
          position: i,
          song: songQuery,
        },
      });
    } else {
      create.push({
        ...currentTrack,
        position: i,
        song: songQuery,
      });
    }
  }

  const tracksQuery: Prisma.TrackUpdateManyWithoutSetNestedInput = {
    create: !!create.length ? create : undefined,
    update: !!update.length ? update : undefined,
  };

  return tracksQuery;
};
