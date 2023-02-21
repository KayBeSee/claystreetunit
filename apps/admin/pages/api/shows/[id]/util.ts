import { AudioSource } from '@ontour/archive';
import { getAppleMusicToken } from 'utils/appleMusic';

const getSpotifyAccessToken = async () => {
  var client_id = process.env.SPOTIFY_CLIENT_ID;
  var client_secret = process.env.SPOTIFY_CLIENT_SECRET;

  var authOptions = {
    method: 'POST',
    body:
      'grant_type=client_credentials&client_id=' +
      client_id +
      '&client_secret=' +
      client_secret,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  try {
    const { access_token } = await fetch(
      'https://accounts.spotify.com/api/token',
      authOptions
    ).then((resp) => resp.json());
    return { access_token };
  } catch (e) {
    console.log('error: ', e);
  }
};

const getSpotifyMetadata = async (item: AudioSource) => {
  try {
    const { access_token } = await getSpotifyAccessToken();

    const { name, images } = await fetch(
      `https://api.spotify.com/v1/albums/${item.identifier}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    ).then((resp) => resp.json());

    return {
      ...item,
      name: name,
      imageUrl: images[2].url,
    };
  } catch (e) {}
};

const getArchiveMetadata = async (item: AudioSource) => {
  try {
    const { metadata, dir, files, server } = await fetch(
      `https://archive.org/metadata/${item.identifier}`
    ).then((resp) => resp.json());

    const image = files
      ? files.find(
          (file) =>
            file.source === 'original' &&
            (file.format === 'JPEG' ||
              file.format === 'PNG' ||
              file.format === 'JPG')
        )
      : undefined;

    return {
      ...item,
      name: metadata.title,
      imageUrl: `https://${server}${dir}/${image.name}`,
    };
  } catch (e) {}
};

const getAmazonMusicMetadata = async (item: AudioSource) => {
  try {
  } catch (e) {}
};

interface Props {
  width: number;
  height: number;
  url: string;
}

const getAppleImageUrl = ({ width, height, url }: Props) => {
  return url.replace('{h}', `${height}`).replace('{w}', `${width}`);
};

const getAppleMusicMetadata = async (item: AudioSource) => {
  try {
    const url = `https://api.music.apple.com/v1/catalog/us/albums/${item.identifier}`;
    const { data } = await fetch(url, {
      headers: {
        Authorization: `Bearer ${getAppleMusicToken()}`,
      },
    }).then((resp) => {
      return resp.json();
    });

    const { artwork, name } = data[0].attributes;
    const imageUrl = getAppleImageUrl(artwork);

    return {
      ...item,
      imageUrl,
      name,
    };
  } catch (e) {
    console.log('e: ', e);
  }
};

const getYoutubeMusicMetadata = async (item: AudioSource) => {
  try {
    const url = `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&id=${item.identifier}&key=${process.env.GOOGLE_API_KEY}`;
    const { items } = await fetch(url, {}).then((resp) => {
      return resp.json();
    });

    const {
      snippet: { thumbnails, title },
    } = items[0];

    return {
      ...item,
      imageUrl: thumbnails.medium.url,
      name: title,
    };
  } catch (e) {
    console.log('e: ', e);
  }
};

export const getDecoratedAudioSource = async (item: AudioSource) => {
  if (item.provider === 'spotify') {
    return await getSpotifyMetadata(item);
  }

  if (item.provider === 'archive') {
    return await getArchiveMetadata(item);
  }

  if (item.provider === 'apple') {
    return await getAppleMusicMetadata(item);
  }

  if (item.provider === 'youtube') {
    return await getYoutubeMusicMetadata(item);
  }

  // TODO: add amazon amazon

  return item;
};
