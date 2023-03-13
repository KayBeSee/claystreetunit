import {
  faInstagram,
  faSpotify,
  faFacebook,
  faYoutube,
  faItunesNote,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

import { music } from "./music";

import { DataConfig } from "@ontour/types";

const artistName = "Airshow";

export const data: DataConfig = {
  artistName: artistName,
  legalEntity: "Airshow, LLC",
  websiteUrl: "https://airshowband.com",
  admin: {
    logoUrl: "/logo-text.png",
  },
  openGraph: {
    textLogo: "/logo.png",
    imageLogo: "/logo-circle-black.png",
    backgroundImage: "/placeholder.png",
  },
  home: {
    logo: "/logo.png",
    ogImage: "/logo-circle-black.png",
    splashVideoUrl: "",
    menu: [
      {
        slug: "/tour",
        text: "Tour",
      },
      {
        slug: `/music/${Object.keys(music)[0]}`,
        text: "Music",
      },
      {
        slug: "/info",
        text: "Info",
      },
      {
        slug: "/blog",
        text: "Blog",
      },
    ],
    og: {
      title: `${artistName}`,
      description: `Official website for ${artistName}`,
    },
  },
  analytics: {
    googleAnalyticsCode: "",
  },
  error: {
    style: {
      background: "./page-backgrounds/tour.jpg",
    },
  },
  tour: {
    style: {
      backgroundImage: "/page-backgrounds/tour.jpg",
    },
    bandsInTownApiEndpoint:
      "https://rest.bandsintown.com/artists/Sicard%20Hollow/events/?app_id=97354cdc66f0eae293b7746bc4c4a070",
    og: {
      title: `Tour`,
      description: `${artistName} tour dates and shows`,
    },
  },
  music: {
    style: {
      leftSideBackground: "/placeholder.png",
    },
    items: {
      ...music,
    },
  },
  news: {
    style: {
      backgroundImage: "/page-backgrounds/news.jpg",
    },
    dbName: "airshow",
    og: {
      title: `News`,
      description: `${artistName} news, announcements, and more`,
    },
  },
  info: {
    og: {
      title: "About",
      description: `${artistName}'s biography, photos, and contact information `,
    },
    style: {
      backgroundImage: "/page-backgrounds/info.jpg",
    },
    contacts: [
      {
        title: "Booking",
        href: "mailto:cody.airshowband@gmail.com",
        company: "",
        contacts: [
          {
            name: "Cody Chelius",
            email: "cody.airshowband@gmail.com ",
          },
        ],
        icon: "/epk/brands/wasserman.png",
      },
      {
        title: "Management",
        href: "mailto:tim@flatrockmgmt.com",
        company: "Flat Rock Entertainment",
        contacts: [
          {
            name: "Tim Coughlin",
            email: "tim@flatrockmgmt.com",
          },
        ],
        icon: "/epk/brands/flatrock.png",
      },
    ],
    testimonials: [],
    social: [
      { icon: faInstagram, url: "https://www.instagram.com/airshowband/" },
      {
        icon: faYoutube,
        url: "https://www.youtube.com/channel/UCH0GV4YdDN__fjF_i_bpvSw",
      },
      { icon: faFacebook, url: "https://www.facebook.com/Airshowband" },
      {
        icon: faSpotify,
        url: "https://open.spotify.com/artist/2USLUiPGlv1amJy3gUszGw",
      },
      {
        icon: faItunesNote,
        url: "https://music.apple.com/us/artist/airshow/1235377961",
      },
      {
        icon: faTwitter,
        url: "http://%20https//twitter.com/airshowband",
      },
    ],
  },
  mailingList: {
    style: {
      backgroundImage: "/page-backgrounds/mailing-list.jpg",
    },
    og: {
      title: `Mailing List`,
      description: `Sign up for ${artistName}'s mailing list`,
    },
  },
  epk: {
    og: {
      title: `EPK`,
      description: `${artistName}'s electronic press kit and press materials`,
    },
    style: {
      background: "bg-[#F1F6FA]",
    },
    logo: "/logo-circle-black.png",
    description: `Airshow is a high-flying, bluegrass-influenced jamband that’s sure to soar to the top of every music fans priority list this year. Having originally formed in Reading, PA, childhood best friends, Steve Gallagher (guitar/vocals) and Cody Chelius (mandolin/vocals), spread their wings and migrated to Nashville, TN in 2015. There they met Bill Baker (bass/vocals) and John Rodrigue (drums/vocals) and immediately started their ascension towards the top of Nashville’s jamband scene— and they won’t be landing anytime soon.
      \nFlash forward to 2022 and Airshow is poised for liftoff. Having released two studio albums, ‘Shimmer’ (2021) and ‘Up in the Clouds’ (2019), as well as two EPs, ‘Anubis’ (2020) and ‘Lightbulb’ (2017), this fleet has enough studio material to keep your ears occupied for a 747 trip from JFK to O’Hare. After extensively touring the Northeast and Southeast, the band has their navigation set for everywhere in 2022. Keep your eyes peeled for the one and only Airshow in your town soon!`,
    videos: [
      {
        superTitle: "Pro Shot",
        title: '"Feel Like a Stranger" (Grateful Dead cover)',
        body: "March 1st, 2020 at Hidden River Brewing Company in Douglassville, PA",
        href: "https://www.youtube.com/watch?v=GK_Y2z95IaA",
        image: "https://img.youtube.com/vi/GK_Y2z95IaA/0.jpg",
        color: "text-sicard-gold-800",
      },
      {
        superTitle: "Cover Set",
        title: "Airshow - 9/24/21 - Phish Themed Second Set",
        body: "Airshow - September 24, 2021 at Fretboard Brewing (Cincinnati, OH)",
        href: "https://www.youtube.com/watch?v=AgLnKSSLjKw",
        image: "https://img.youtube.com/vi/AgLnKSSLjKw/0.jpg",
        color: "text-pink-500",
      },
      {
        superTitle: "Live",
        title: `Airshow - 4/24/2022 (Full Set)`,
        body: `Airshow's 4/24/22 performance at Brooklyn Bowl in Nashville, TN supporting Pigeons Playing Ping Pong.`,
        href: "https://www.youtube.com/watch?v=drCl8nTdSiY",
        image: "https://img.youtube.com/vi/drCl8nTdSiY/0.jpg",
        color: "text-indigo-500",
      },
    ],
    spotifyScreenshot: "/spotify.png",
    socialStats: [
      {
        stat: "350+",
        emphasis: "Monthly listeners",
        rest: "on Spotify",
      },
      {
        stat: "2.8K+",
        emphasis: "Followers",
        rest: "on Instagram",
      },
      {
        stat: "2.9K+",
        emphasis: "Fans",
        rest: "on Facebook",
      },
      {
        stat: "150+",
        emphasis: "Subscribers",
        rest: "on YouTube",
      },
    ],
    additionalResources: [
      {
        superTitle: "Photos",
        title: "Official photos",
        body: "Officially licensed photos of the band to be used in marketing content.",
        href: "https://drive.google.com/drive/u/1/folders/1b0M_p7Ma7_RwlqKIZzSiYJEYGHBGYeq9",
        image: "/epk/images/official-photos.jpeg",
        color: "text-indigo-500",
      },
      {
        superTitle: "Press",
        title: "Press releases and one-pagers",
        body: "Press releases and one-pagers related to album releases and tour anouncements.",
        href: "https://drive.google.com/drive/u/1/folders/1N98rtZOtRRleiFFPOW6FbO08z2SmgdQC",
        image: "/epk/images/press.png",
        color: "text-red-500",
      },
      {
        superTitle: "Live Performance",
        title: "Stage Plot, Rider, W-9",
        body: "Documents relevant to hosting a Sicard Hollow live performance at your venue.",
        href: "https://drive.google.com/drive/u/1/folders/1_a8Hlpv0GWl_XbSgVRC9nvlORAIimSCZ",
        image: "/epk/images/live-performance.jpg",
        color: "text-sicard-blue-300",
      },
    ],
    youtubeLink: "https://www.youtube.com/channel/UCH0GV4YdDN__fjF_i_bpvSw",
  },
  archive: {
    cloudinary_root_folder: "airshow",
    dbName: "airshow",
    archive_org_identifier: "TheTalismen",
    ogImageLogo: "logo-circle-white.png",
    vercelDeployHookUrl: "",
    navigation: [
      {
        name: "Setlists",
        href: `/archive`,
      },
      {
        name: "Songs",
        href: "#",
        comingSoon: true,
      },
      {
        name: "Videos",
        href: "#",
        comingSoon: true,
      },
    ],
  },
};

export default data;
