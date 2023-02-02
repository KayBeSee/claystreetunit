import { DecoratedAudioSource } from '@ontour/archive';

interface AddAudioSourceProps {
  identifier: string;
  provider: string;
  showId: string | string[];
}

export const createAudioSource = async ({
  identifier,
  provider,
  showId,
}: AddAudioSourceProps): Promise<DecoratedAudioSource> => {
  const response = await fetch(
    // @ts-ignore
    `${process.env.NEXT_PUBLIC_APP_URL}/api/shows/${showId}/audio`,
    {
      method: 'post',
      body: JSON.stringify({
        identifier,
        provider,
      }),
    }
  ).then((response) => response.json());
  return response;
};

export const parseSpotifyUrl = (url: string) => {
  // https://open.spotify.com/album/6hIXXfYPaU1YLPfmCOhHd3?si=_zDSGSJhT0mO_10L9YzDxw
  const startDelineator = 'spotify.com/album/';
  const endDelineator = '?';
  // 6hIXXfYPaU1YLPfmCOhHd3?si=_zDSGSJhT0mO_10L9YzDxw
  const beginTruncatedUrl = url.substring(
    url.indexOf(startDelineator) + startDelineator.length
  );
  // 6hIXXfYPaU1YLPfmCOhHd3
  const parsedIdentifier = beginTruncatedUrl.substring(
    0,
    beginTruncatedUrl.indexOf(endDelineator)
  );
  return parsedIdentifier;
};

export const parseArchiveUrl = (url: string) => {
  // https://archive.org/details/AIRSHOW2022-04-28/song-identifier
  const startDelineator = 'archive.org/details/';
  const endDelineator = '/';
  // AIRSHOW2022-04-28/song-identifier
  const beginTruncatedUrl = url.substring(
    url.indexOf(startDelineator) + startDelineator.length
  );
  // AIRSHOW2022-04-28
  const parsedIdentifier = beginTruncatedUrl.substring(
    0,
    beginTruncatedUrl.indexOf(endDelineator)
  );
  return parsedIdentifier;
};

export const parseAppleMusicUrl = (url: string) => {
  // https://music.apple.com/us/album/live-05-27-22-lone-goose-saloon-huntsville-al/1661879655
  const startDelineator = 'music.apple.com/us/album/';
  const endDelineator = '/';
  // live-05-27-22-lone-goose-saloon-huntsville-al/1661879655
  const beginTruncatedUrl = url.substring(
    url.indexOf(startDelineator) + startDelineator.length
  );
  // 1661879655
  const parsedIdentifier = beginTruncatedUrl.substring(
    beginTruncatedUrl.indexOf(endDelineator) + 1
  );
  return parsedIdentifier;
};

export const parseAmazonMusicUrl = (url: string) => {
  // https://music.amazon.com/albums/B0BR8QTT3P?foobar
  const startDelineator = 'music.amazon.com/albums/';
  const endDelineator = '?';

  //   B0BR8QTT3P?foobar
  const beginTruncatedUrl = url.substring(
    url.indexOf(startDelineator) + startDelineator.length
  );
  // B0BR8QTT3P
  const parsedIdentifier = beginTruncatedUrl.substring(
    0,
    beginTruncatedUrl.indexOf(endDelineator)
  );
  return parsedIdentifier;
};

export const parseYoutubeMusicUrl = (url: string) => {
  // https://music.youtube.com/playlist?list=OLAK5uy_lYBsocV7DZV_wb6byCGNwDoMleGhdTuXA&feature=share
  const startDelineator = 'music.youtube.com/playlist?list=';
  const endDelineator = '&';

  // OLAK5uy_lYBsocV7DZV_wb6byCGNwDoMleGhdTuXA&feature=share
  const beginTruncatedUrl = url.substring(
    url.indexOf(startDelineator) + startDelineator.length
  );
  // OLAK5uy_lYBsocV7DZV_wb6byCGNwDoMleGhdTuXA
  if (beginTruncatedUrl.includes(endDelineator)) {
    const parsedIdentifier = beginTruncatedUrl.substring(
      0,
      beginTruncatedUrl.indexOf(endDelineator)
    );
    return parsedIdentifier;
  } else {
    return beginTruncatedUrl;
  }
};

const validateIdentifier = (identifier: string) => {
  if (!identifier.length) {
    throw new Error('Invalid identifier');
  }
};
