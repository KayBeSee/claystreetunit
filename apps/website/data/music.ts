import { Album } from 'types';

type Props = {
  [key: string]: Album;
};

export const music: Props = {
  ['shimmer']: {
    name: 'Shimmer',
    slug: 'shimmer',
    year: 2021,
    type: 'album',
    albumCoverUrl: '/album-covers/shimmer.jpeg',
    trackList: [
      'Fly Away',
      'Another Time',
      'Skydiver',
      'Western Song',
      'Taking Over',
      'Crosstie Serenade',
      'Burning the Hardwood Floor',
    ],
    description: `Airshow recorded ‘Shimmer’ at The Studio Nashville in Nashville, TN at a two-day recording session in November of 2020. The band worked closely with engineer Dan Davis to finish the seven-song album, Airshow’s longest studio effort to date.
\n
    As an album Shimmer highlights the individual members of Airshow like never before while simultaneously showcasing the bands ability to groove and improvise as a unit through different genres. All four members switch between lead and harmony vocals as well as lead and rhythm instruments to really showcase everyones talents.`,
    otherImages: [],
    streamingLinks: {
      spotify: 'https://open.spotify.com/album/6VQ4Y7U4KOqcU1l0wQ5WDe',
      apple: 'https://music.apple.com/us/album/shimmer/1570183012?app=music',
      amazon: 'https://music.amazon.com/albums/B0969456MR',
      youtube: 'https://music.youtube.com/browse/MPREb_e0MbYmOxLuA',
    },
    pageStyle: {
      streamServiceColor: 'fill-sicard-blue-800',
      albumCoverBorderColor: 'bg-[#A3C78B]',
      backgroundColor: 'bg-[#F1F6FA]',
      primaryText: 'text-[#284D54]',
      secondaryText: 'text-[#284D54]',
      listenNowBorder: 'border-[#D9C5C6]',
    },
  },
  ['anubis']: {
    name: 'Anubis',
    slug: 'anubis',
    year: 2020,
    type: 'album',
    albumCoverUrl: '/album-covers/anubis.jpeg',
    trackList: [
      'Coming Home',
      'Ruby',
      'Dirt Devil',
      'The Riddle of the Sphinx',
    ],
    description: ``,
    otherImages: [],
    streamingLinks: {
      spotify: 'https://open.spotify.com/album/2tlVOad1zJLRU7wpGbToXf',
      apple: 'https://music.apple.com/us/album/anubis-ep/1536838376?app=music',
      amazon: 'https://music.amazon.com/albums/B08LMH7S6B',
      youtube: 'https://music.youtube.com/browse/MPREb_KmafcKHKEUW',
    },
    pageStyle: {
      streamServiceColor: 'fill-[#E2E8F0]',
      albumCoverBorderColor: 'bg-[#6084B4]',
      backgroundColor: 'bg-[#628FC7]',
      primaryText: 'text-[#FED7AA]',
      secondaryText: 'text-sicard-gold-400',
      listenNowBorder: 'border-[#FDBA74]',
    },
  },
  ['up-in-the-clouds']: {
    name: 'Up in the Clouds',
    slug: 'up-in-the-clouds',
    year: 2019,
    type: 'album',
    albumCoverUrl: '/album-covers/up-in-the-clouds.jpeg',
    trackList: [
      'Up in the Clouds',
      'Spider Bite',
      'Edge of Silence',
      'Rising Sun',
      'Fear',
      'Secret Place',
    ],
    description: '',
    otherImages: [],
    streamingLinks: {
      spotify: 'https://open.spotify.com/album/0tmFc4yiSGO819x4WMWDsk',
      apple:
        'https://music.apple.com/us/album/up-in-the-clouds/1451537937?app=music',
      amazon: 'https://music.amazon.com/albums/B07ND5SK4J',
      youtube: 'https://music.youtube.com/browse/MPREb_553fPZmn4tZ',
    },
    pageStyle: {
      streamServiceColor: 'fill-[#F2E7DB]',
      albumCoverBorderColor: 'bg-[#383041]',
      backgroundColor: 'bg-[#75738D]',
      primaryText: 'text-sicard-gold-300',
      secondaryText: 'text-sicard-gold-300',
      listenNowBorder: 'border-sicard-gold-300',
    },
  },
  ['lightbulb']: {
    name: 'Lightbulb',
    slug: 'lightbulb',
    year: 2017,
    type: 'album',
    albumCoverUrl: '/album-covers/lightbulb.jpeg',
    trackList: [
      'Lightbulb',
      'Hurts Me Too',
      'Traveling Through',
      'Nursery Rhyme',
      'Oh King',
    ],
    description: '',
    otherImages: [],
    streamingLinks: {
      spotify: 'https://open.spotify.com/album/02gd38SsTK9ouujUXmpTsm',
      apple:
        'https://music.apple.com/us/album/lightbulb-ep/1235377323?app=music',
      amazon: 'https://music.amazon.com/albums/B0719CC4N2',
      youtube: 'https://music.youtube.com/browse/MPREb_ZU4Kc11dRcU',
    },
    pageStyle: {
      streamServiceColor: 'fill-[#F2E2D5]',
      albumCoverBorderColor: 'bg-[#AB4846]',
      backgroundColor: 'bg-[#6E707E]',
      primaryText: 'text-[#F2E2D1]',
      secondaryText: 'text-sicard-blue-700',
      listenNowBorder: 'border-sicard-gold-300',
    },
  },
};
