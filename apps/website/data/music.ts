import { Album } from 'types';

type Props = {
  [key: string]: Album;
};

export const music: Props = {
  ['brightest-of-days']: {
    name: 'Brightest of Days',
    slug: 'brightest-of-days',
    year: 2022,
    type: 'album',
    albumCoverUrl: '/album-covers/brightest-of-days.jpeg',
    trackList: [
      'Brightest of Days',
      "Where I'm At",
      'This I Know',
      'Escape the Unknown',
      'Metamorphic Prophecy',
      'Face the Wreckage',
      'Bound to Die',
      'Forecast of Life',
    ],
    description: `Nashville’s psychedelic punk-grass rockers, Sicard Hollow, grew up sick of any existing institution telling them who and what to be. Now, as they navigate adulthood, they’re equally tired of the music institutions telling them what their music should sound like— so they dunked it in patchouli and a skate-and-destroy ethos that brings an enduring sound into the modern age. 
  \n
  Whether it was skateboarding or chasing jam bands, singer/guitar-player Alex King always had a fierce desire to succeed on his own terms. He spent years as an artist without an art-form, searching for a home by pouring every bit of his sweat and heart into anything he was doing. “It took years for me to land on music,” King says, referencing “This I Know” from the album, “but when I found that fire inside my heart, I found my home.” 
  \n
  It just so happened that finding that home coincided with the shutdown of live music due to the pandemic that canceled the entire release tour supporting their debut studio record, ‘Secret of the Breeze.’ During that time, the band turned inward to reflect on their identity and how they could add their generation’s voice to a timeless genre of music. The result, with the help of producer John Mailander (Billy Strings, Bruce Hornsby) and Recording/mixing engineer Dan Davis (Billy Strings, Zac Brown Band, Dierks Bentley), was a combination of pop-punk melodies, psychedelic instrumental breaks, and existential song-writing all packaged as a bluegrass quartet dressed in tattoos and tie-dyes.
  \n
  Tracks like Herrin’s “Escape the Unknown,” wrestle with staying true to yourself in a world seemingly fueled by mob-mentality. This positive skepticism toward the main-stream permeates the entire record. Songs like “Forecast of Life” and “Where I’m At” impress a new-American-Zen that dances through the chaos with a smile on your face. If unapologetically being yourself is the key to finding the “Brightest of Days” ahead, then you’ll hear it here first from Sicard Hollow.`,
    otherImages: [],
    streamingLinks: {
      spotify: 'https://open.spotify.com/album/0NkeS2vYYXpm0iU2ecNXJA',
      apple: 'https://music.apple.com/us/album/brightest-of-days/1648494974',
      amazon: 'https://music.apple.com/us/album/brightest-of-days/1648494974',
      youtube: 'https://www.youtube.com/watch?v=pPKujjf7bDQ',
    },
    pageStyle: {
      streamServiceColor: 'fill-sicard-blue-800',
      albumCoverBorderColor: 'bg-sicard-gold-500',
      backgroundColor: 'bg-slate-500',
      primaryText: 'text-sicard-gold-300',
      secondaryText: 'text-sicard-gold-300',
      listenNowBorder: 'border-sicard-gold-300',
    },
  },
  ['forecast-of-life']: {
    name: 'Forecast of Life',
    slug: 'forecast-of-life',
    year: 2022,
    type: 'single',
    albumCoverUrl: '/album-covers/forecast-of-life.jpeg',
    trackList: [],
    description: `A positive skepticism toward the mainstream permeates ‘Brightest Of Days,’ the new record from the Nashville-based progressive bluegrass outfit Sicard Hollow, out 11/11. \n The album’s second single “Forecast of Life,” for example, premiered this week by Jam Band News, impresses a new-American-Zen that dances through the chaos with a smile on your face. \n “Forecast of Life" is a song about making the most of situations that are out of your control,” comments guitarist and vocalist Alex King. “It’s all in our perspective— you can’t change the weather, but you can dance in the rain.”`,
    otherImages: [],
    youtubeVideoId: '8hD2Xa-hGMc',
    streamingLinks: {
      spotify: 'https://open.spotify.com/album/5M9CuVu051FU2OB9yNJKTV',
      apple: 'https://music.apple.com/us/artist/sicard-hollow/1501501722',
      amazon: 'https://music.amazon.com/albums/B0BJP77GPS',
      youtube: 'https://music.youtube.com/watch?v=5KIM30M0K_o',
    },
    pageStyle: {
      streamServiceColor: 'fill-slate-200',
      albumCoverBorderColor: 'bg-sicard-gold-400',
      backgroundColor: 'bg-slate-500',
      primaryText: 'text-sicard-gold-400',
      secondaryText: 'text-sicard-gold-400',
      listenNowBorder: 'border-sicard-gold-400',
    },
  },
  ['face-the-wreckage']: {
    name: 'Face the Wreckage',
    slug: 'face-the-wreckage',
    year: 2022,
    type: 'single',
    albumCoverUrl: '/album-covers/face-the-wreckage.png',
    trackList: [],
    description:
      "On the heels of a string of tour dates across the US, the four-piece, Nashville-based progressive bluegrass band Sicard Hollow has announced their new, full-length album ‘Brightest Of Days,’ out November 11th. \n Merging pop-punk melodies, psychedelic instrumental breaks, and existential songwriting — performed by a bluegrass quartet dressed in tattoos and tie-dyes — the band’s sophomore full-length brings new energy to a timeless style, with a combination of fearless improvisation and instrumental prowess. \n To celebrate the announcement, Sicard Hollow has released the album’s first single “Face The Wreckage” alongside exclusive footage from the recording of 'Brightest Of Days.' Check it out here.",
    otherImages: [],
    youtubeVideoId: 'qB5oFWDS8OU',
    streamingLinks: {
      spotify: 'https://open.spotify.com/album/5NG6LepwVxFtLQtZtCe6qh',
      apple: 'http://itunes.apple.com/album/id/1647043238',
      amazon: 'https://www.amazon.com/music/player/albums/B0BGJRR1DG',
      youtube: 'https://www.youtube.com/watch?v=78y8yWWxyg8',
    },
    pageStyle: {
      streamServiceColor: 'fill-slate-300',
      albumCoverBorderColor: 'bg-amber-100',
      backgroundColor: 'bg-slate-500',
      primaryText: 'text-sicard-gold-300',
      secondaryText: 'text-sicard-gold-300',
      listenNowBorder: 'border-sicard-gold-300',
    },
  },
  ['mary-anne-and-conway']: {
    name: 'Mary Anne and Conway',
    slug: 'mary-anne-and-conway',
    year: 2022,
    type: 'single',
    albumCoverUrl: '/album-covers/mary-anne-and-conway.jpg',
    trackList: [],
    description:
      'Stream the last tune from our Summer Single Series, “Mary Anne and Conway” now on all major streaming services.',
    otherImages: [],
    streamingLinks: {
      spotify: 'https://open.spotify.com/track/4WTKeiDj3ZnQzpOGEIL3V6',
      apple:
        'https://music.apple.com/us/album/mary-anne-and-conway-single/1641873316',
      amazon: 'https://music.amazon.com/albums/B0BC21S1LT',
      youtube: 'https://www.youtube.com/watch?v=syL1LY1aMuo',
    },
    pageStyle: {
      streamServiceColor: 'fill-sicard-blue-700',
      albumCoverBorderColor: 'bg-red-500',
      backgroundColor: 'bg-sicard-blue-300',
      primaryText: 'text-sicard-gold-300',
      secondaryText: 'text-sicard-blue-700',
      listenNowBorder: 'border-sicard-gold-300',
    },
  },
  ['mighty-fine-day']: {
    name: 'Mighty Fine Day',
    slug: 'mighty-fine-day',
    year: 2022,
    type: 'single',
    albumCoverUrl: '/album-covers/mighty-fine-day.jpg',
    trackList: [],
    description:
      'Today the band released the next tune, “Mighty Fine Day,” which is a fun, upbeat, summer-time river anthem about getting all your buds together on anything you can find that floats and hitting the water. The band appropriately releases the lazy-river-themed jam in time for their return to The Peach Music Festival, which takes place at Montage Mountain Waterpark & Ski Resort in Scranton, PA on Sunday July 3rd, 2022.',
    otherImages: [],
    streamingLinks: {
      spotify:
        'https://open.spotify.com/track/2OEBcXAfguuRpF1x9SEkWc?si=647aa9e9f2044b82',
      apple:
        'https://music.apple.com/us/album/little-miss-typsy-single/1625033259',
      amazon: 'https://music.amazon.com/albums/B0B1PVNFP2',
      youtube: 'https://music.youtube.com/watch?v=krGmO80i33A',
    },
    pageStyle: {
      streamServiceColor: 'fill-sicard-blue-700',
      albumCoverBorderColor: 'bg-red-500',
      backgroundColor: 'bg-sicard-blue-300',
      primaryText: 'text-sicard-gold-300',
      secondaryText: 'text-sicard-blue-700',
      listenNowBorder: 'border-sicard-gold-300',
    },
  },
  ['little-miss-tipsy']: {
    name: 'Little Miss Tipsy',
    slug: 'little-miss-tipsy',
    year: 2022,
    type: 'single',
    albumCoverUrl: '/album-covers/little-miss-tipsy.jpg',
    trackList: [],
    description:
      'After the band finished recording their upcoming studio album, ‘Brightest of Days,’ they were frustrated to find out how long the post-production and marketing process was going to take and how long it would be before their fans could hear what they’ve been working on. After about a week of decompropressing from a long week in the studio, “We wanted to head back in,” says Alex King, vocalist and guitar player for the band. The result was three road-tested, crowd favorites finally getting the studio intention they deserved. The band opted for releasing them as singles over grouping them together on an EP in an effort to let the songs tell three separate stories before they’re grouped into a single project. Cover artist, Brandon Trammel, also tried to illustrate this idea by creating a separate image for each single that will eventually make up a triptych once all three singles are released. The band released the first single, “Little Miss Tipsy,” at the beginning of June as they hit the road for their summer tour. “It’s a phat festival banger,” says Parrish Gabriel, bassist. The release was accompanied by a beer from New Heights Brewing Company (Nashville, TN) called, “Little Miss Tipsy,” which can still be found in liquor stores all over the Greater Nashville area.',
    otherImages: [],
    streamingLinks: {
      spotify:
        'https://open.spotify.com/album/1TWEiDDsksxPHgRwCUVoXJ?si=rttLXneRRbGgO2oXt9ZezQ',
      apple:
        'https://music.apple.com/us/album/little-miss-typsy-single/1625033259',
      amazon: 'https://music.amazon.com/albums/B0B1PVNFP2',
      youtube: 'https://music.youtube.com/watch?v=KVaFUREh4Ig',
    },
    pageStyle: {
      streamServiceColor: 'fill-sicard-blue-700',
      albumCoverBorderColor: 'bg-red-500',
      backgroundColor: 'bg-sicard-blue-300',
      primaryText: 'text-sicard-gold-300',
      secondaryText: 'text-sicard-blue-700',
      listenNowBorder: 'border-sicard-gold-300',
    },
  },
  ['live-at-brooklyn-bowl']: {
    name: 'Live at Brooklyn Bowl',
    slug: 'live-at-brooklyn-bowl',
    year: 2021,
    type: 'album',
    albumCoverUrl: '/album-covers/live-at-brooklyn-bowl.jpg',
    trackList: [
      'Grass is Greener',
      "Where I'm At",
      'Secret of the Breeze',
      "Diggin' Holes",
      "Troll's Paradise",
      'Open Road',
      'Soon to Come',
      "Foot's Touching Steel",
      'Escape the Unknown',
    ],
    description:
      "Sicard Hollow released their debut album, 'Secret of the Breeze,' in March 2020--just a few weeks before themusic world shut down. The next year was filled with plenty of uncertainty, but the band hit the road as soon as they were able. The next few months resulted in theirfirst nationwide tour and some truly great memories. One of the highlights of the year was a supporting slot for the Infamous Stringdusters at the new Brooklyn Bowl Nashville, which they're happy to offer as theirfirst live album.",
    otherImages: ['/album-covers/live-at-brooklyn-bowl-back.png'],
    streamingLinks: {
      spotify:
        'https://open.spotify.com/album/3ta65t7nBTspvizTePHkUK?si=4XAl-plORripo06YnTj4qA',
      apple:
        'https://music.apple.com/us/album/live-at-brooklyn-bowl-nashville/1602149024',
      amazon: 'https://music.amazon.com/albums/B09P7JPZ9F',
      youtube:
        'https://music.youtube.com/playlist?list=OLAK5uy_keCHgFfCCLybqLptejJK2_C3DusV2meA8',
    },
    pageStyle: {
      streamServiceColor: 'fill-sicard-blue-700',
      albumCoverBorderColor: 'bg-purple-200',
      backgroundColor: 'bg-purple-100',
      primaryText: 'text-cyan-500',
      secondaryText: 'text-sicard-blue-700',
      listenNowBorder: 'border-cyan-500',
    },
  },
  ['secret-of-the-breeze']: {
    name: 'Secret of the Breeze',
    slug: 'secret-of-the-breeze',
    year: 2020,
    type: 'album',
    albumCoverUrl: '/secret-of-the-breeze.jpg',
    trackList: [
      'Motivation',
      'Call for Help',
      'Live at Brooklyn Bowl',
      'Refuge',
      'Laugh & Laugh',
      "Foot's Touching Steel",
      'Open Road',
      "Diggin' Holes",
    ],
    description:
      'The Secret of the Breeze is the band’s first attempt to capture the energy they bring to a live performance on record. With the help of one of Nashville’s most promising sound engineers, and access to the best equipment available, Sicard Hollow is incredibly proud of what they’re finally able to offer their fans at home. \n The genre title “progressive bluegrass” is a bit of a misnomer. Sicard Hollow is equal parts rock/jam/jazz band, who happens to play bluegrass instruments. Secret of the Breeze is a perfect example of how the group can pay homage to their bluegrass roots, while blowing the door open on the expectations of the traditional folks.',
    otherImages: [],
    streamingLinks: {
      spotify:
        'https://open.spotify.com/album/6XAbKyGSuva1dtXhLIxMpH?si=dqH6SF4ZQpWdaya6BJsoMA',
      apple: 'https://music.apple.com/us/album/secret-of-the-breeze/1501501721',
      amazon: 'https://music.amazon.com/albums/B09P7JPZ9F',
      youtube:
        'https://music.youtube.com/playlist?list=OLAK5uy_lqj1uqEp8K1vEaF20uZkeDhUKczvUYmgk',
    },
    pageStyle: {
      streamServiceColor: 'fill-sicard-blue-700',
      albumCoverBorderColor: 'bg-sicard-blue-200',
      backgroundColor: 'bg-sicard-blue-50',
      primaryText: 'text-sicard-gold-300',
      secondaryText: 'text-sicard-blue-700',
      listenNowBorder: 'border- sicard-gold-300',
    },
  },
};
