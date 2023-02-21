import { AudioSource } from "@ontour/archive";

export const getAudioSourceLink = (source: AudioSource) => {
  const { provider, identifier } = source;
  switch (provider) {
    case "amazon":
      return getAmazonLink(identifier);

    case "apple":
      return getAppleLink(identifier);

    case "spotify":
      return getSpotifyLink(identifier);

    case "archive":
      return getArchiveLink(identifier);

    case "youtube":
      return getYoutubeLink(identifier);

    default:
      throw new Error(`Unknown audio source provider "${provider}" provided`);
  }
};

const getAmazonLink = (identifier: string) => {
  return `https://music.amazon.com/albums/${identifier}`;
};

const getAppleLink = (identifier: string) => {
  return `https://music.apple.com/us/album/${identifier}`;
};

const getSpotifyLink = (identifier: string) => {
  return `https://open.spotify.com/album/${identifier}`;
};

const getArchiveLink = (identifier: string) => {
  return `https://archive.org/details/${identifier}`;
};

const getYoutubeLink = (identifier: string) => {
  return `https://music.youtube.com/playlist?list=${identifier}`;
};
