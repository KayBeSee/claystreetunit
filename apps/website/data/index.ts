import {
  faInstagram,
  faSpotify,
  faFacebook,
  faYoutube,
  faItunesNote,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';

import { music } from './music';

import { DataConfig } from 'types';

export const data: DataConfig = {
  artistName: 'Sicard Hollow',
  artistDescription: 'bluegrass band from Nashville, TN',
  legalEntity: 'Sicard Hollow, LLC',
  home: {
    logo: '/logo.png',
    ogImage: '/logo-circle-black.png',
    splashVideoUrl:
      'https://res.cloudinary.com/dyxybmew8/video/upload/v1669093366/sicard/bg_ui3bem.mp4',
  },
  tour: {
    style: {
      backgroundImage: '/resonance.jpg',
    },
    bandsInTownApiEndpoint:
      'https://rest.bandsintown.com/artists/Sicard%20Hollow/events/?app_id=97354cdc66f0eae293b7746bc4c4a070',
  },
  music: {
    style: {
      leftSideBackground: '/tree-texture-bg.jpg',
    },
    items: {
      ...music,
    },
  },
  news: {
    style: {
      backgroundImage: '/page-backgrounds/news.jpg',
    },
    dbName: 'sicard',
  },
  info: {
    style: {
      backgroundImage: '/page-backgrounds/info.jpg',
    },
    contacts: [
      {
        title: 'Booking',
        href: 'mailto:lmcdowell@teamwass.com; lhandelsman@teamwass.com;',
        company: 'Wasserman Media Group',
        contacts: [
          {
            name: 'Lindsay McDowell',
            email: 'lmcdowell@teamwass.com',
          },
          {
            name: 'Logan Handelsman',
            email: 'lhandelsman@teamwass.com',
          },
        ],
        icon: '/epk/brands/wasserman.png',
      },
      {
        title: 'Management',
        href: 'mailto:tim@flatrockmgmt.com',
        company: 'Flat Rock Entertainment',
        contacts: [
          {
            name: 'Tim Coughlin',
            email: 'tim@flatrockmgmt.com',
          },
        ],
        icon: '/epk/brands/flatrock.png',
      },
    ],
    social: [
      { icon: faInstagram, url: 'https://www.instagram.com/sicardhollowband/' },
      {
        icon: faYoutube,
        url: 'https://www.youtube.com/channel/UCWnrFMwnaqiO8XQ0ABVQm1g',
      },
      { icon: faFacebook, url: 'https://www.facebook.com/SicardHollow/' },
      {
        icon: faSpotify,
        url: 'https://open.spotify.com/album/6XAbKyGSuva1dtXhLIxMpH',
      },
      {
        icon: faItunesNote,
        url: 'https://music.apple.com/us/album/secret-of-the-breeze/1501501721',
      },
      {
        icon: faTwitter,
        url: 'https://twitter.com/sicardhollow',
      },
    ],
  },
  mailingList: {
    style: {
      backgroundImage: '/page-backgrounds/info.jpg',
    },
  },
  epk: {
    logo: '/logo-circle-black.png',
    subtitle:
      'Anything and everything there is to know about the up and coming four piece progressive bluegrass band from Nashville, TN.',
    description:
      'Sicard Hollow is a four-piece progressive bluegrass band who formed with a mutual passion for pushing the boundaries of genre. Heavily influenced by the Grateful Dead and New Grass Revival, these young pickers bring new energy to a timeless style with a combination of fearless improvisation and instrumental prowess. \nThe band formed through mutual connections within the Nashville music scene who all wanted to play something different. They were all simultaneously discovering bluegrass while existing in their other scenes. Once they got together, the rest was history. Having toured extensively around the Southeast for the last year, this group of players continues to grow their sound with every performance. Having always thought of themselves as a live band, producer, Dan Davis, had his work cut out for him while producing their debut album, Secret of the Breeze, at Zac Brown and Oliver Wood&apos;s Southern Ground Nashville. The result was a perfect encapsulation of the band&apos;s genre-kicking tenacity. There is no slowing down for Sicard Hollow.',
    videos: [
      {
        superTitle: 'Live Show',
        title: '"Diggin\' Holes"/"Troll\'s Paradise"/"Open Road"',
        body: 'Sicard Hollow - October 9th, 2021 at Brooklyn Bowl Nashville',
        href: 'https://www.youtube.com/watch?v=h4ICEjZ3mKY',
        image: 'https://img.youtube.com/vi/h4ICEjZ3mKY/0.jpg',
        color: 'text-sicard-gold-800',
      },
      {
        superTitle: 'Festival',
        title: 'Sicard Hollow - 8/19/21 - Summer Camp Music Festival',
        body: 'Sicard Hollow - August 19, 2021 at Summer Camp Music Festival (Chillicothe, IL)',
        href: 'https://www.youtube.com/watch?v=ruzr1q6ioFg',
        image: 'https://img.youtube.com/vi/ruzr1q6ioFg/0.jpg',
        color: 'text-pink-500',
      },
      {
        superTitle: 'Television',
        title: 'Motivation',
        body: 'Sicard Hollow performs "Motivation" during Today in Nashville airing weekdays at 11am on WSMV-TV',
        href: 'https://www.youtube.com/watch?v=ezspv4BLZoU',
        image: 'https://img.youtube.com/vi/ezspv4BLZoU/0.jpg',
        color: 'text-indigo-500',
      },
    ],
    spotifyScreenshot: '/spotify.png',
    socialStats: [
      {
        stat: '2.4K+',
        emphasis: 'Monthly listeners',
        rest: 'on Spotify',
      },
      {
        stat: '3.3K+',
        emphasis: 'Followers',
        rest: 'on Instagram',
      },
      {
        stat: '3.3K+',
        emphasis: 'Fans',
        rest: 'on Facebook',
      },
      {
        stat: '200+',
        emphasis: 'Subscribers',
        rest: 'on YouTube',
      },
    ],
    additionalResources: [
      {
        superTitle: 'Photos',
        title: 'Official photos',
        body: 'Officially licensed photos of the band to be used in marketing content.',
        href: 'https://drive.google.com/drive/u/1/folders/1b0M_p7Ma7_RwlqKIZzSiYJEYGHBGYeq9',
        image: '/epk/images/official-photos.jpeg',
        color: 'text-indigo-500',
      },
      {
        superTitle: 'Press',
        title: 'Press releases and one-pagers',
        body: 'Press releases and one-pagers related to album releases and tour anouncements.',
        href: 'https://drive.google.com/drive/u/1/folders/1N98rtZOtRRleiFFPOW6FbO08z2SmgdQC',
        image: '/epk/images/press.jpeg',
        color: 'text-red-500',
      },
      {
        superTitle: 'Live Performance',
        title: 'Stage Plot, Rider, W-9',
        body: 'Documents relevant to hosting a Sicard Hollow live performance at your venue.',
        href: 'https://drive.google.com/drive/u/1/folders/1_a8Hlpv0GWl_XbSgVRC9nvlORAIimSCZ',
        image: '/epk/images/live-performance.jpg',
        color: 'text-sicard-blue-300',
      },
    ],
    youtubeLink: 'https://www.youtube.com/channel/UCWnrFMwnaqiO8XQ0ABVQm1g',
  },
};

export default data;
