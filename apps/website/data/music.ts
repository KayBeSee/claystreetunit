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
      spotify: 'https://open.spotify.com/album/0NkeS2vYYXpm0iU2ecNXJA',
      apple: 'https://music.apple.com/us/album/brightest-of-days/1648494974',
      amazon: 'https://music.apple.com/us/album/brightest-of-days/1648494974',
      youtube: 'https://www.youtube.com/watch?v=pPKujjf7bDQ',
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
      spotify: 'https://open.spotify.com/album/5M9CuVu051FU2OB9yNJKTV',
      apple: 'https://music.apple.com/us/artist/sicard-hollow/1501501722',
      amazon: 'https://music.amazon.com/albums/B0BJP77GPS',
      youtube: 'https://music.youtube.com/watch?v=5KIM30M0K_o',
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
      spotify: 'https://open.spotify.com/album/5NG6LepwVxFtLQtZtCe6qh',
      apple: 'http://itunes.apple.com/album/id/1647043238',
      amazon: 'https://www.amazon.com/music/player/albums/B0BGJRR1DG',
      youtube: 'https://www.youtube.com/watch?v=78y8yWWxyg8',
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
      spotify: 'https://open.spotify.com/track/4WTKeiDj3ZnQzpOGEIL3V6',
      apple:
        'https://music.apple.com/us/album/mary-anne-and-conway-single/1641873316',
      amazon: 'https://music.amazon.com/albums/B0BC21S1LT',
      youtube: 'https://www.youtube.com/watch?v=syL1LY1aMuo',
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
