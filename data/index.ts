import {
  faInstagram,
  faSpotify,
  faFacebook,
  faYoutube,
  faItunesNote,
} from "@fortawesome/free-brands-svg-icons";

import { music } from "./music";

import { DataConfig } from "@ontour/types";

export const data: DataConfig = {
  artistName: "Clay Street Unit",
  legalEntity: "Clay Street Records",
  websiteUrl: "https://claystreetunit.com",
  admin: {
    logoUrl: "/text-horizontal-black.png",
  },
  home: {
    logo: "/logo.png",
    ogImage: "/logo-circle-black.png",
    splashVideoUrl:
      "https://res.cloudinary.com/dyxybmew8/video/upload/q_auto,f_auto,c_fill/v1677278398/New_30_Second_Cut_2-24-_1_fd3o1k.mp4",
    menu: [
      { slug: "/tour", text: "Tour" },
      { slug: `/music/${Object.keys(music)[0]}`, text: "Music" },
      { slug: "/about", text: "About" },
      { slug: "/mailing-list", text: "Mailing List" },
      { slug: "#", text: "Store" },
    ],
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
      "https://cdn.seated.com/api/tour/752c8ceb-1eda-4c65-a012-59e95205ab45?include=tour-events",
  },
  music: {
    style: {
      leftSideBackground: "/road-bg.jpg",
    },
    items: {
      ...music,
    },
  },
  news: {
    style: {
      backgroundImage: "/page-backgrounds/news.jpg",
    },
    dbName: "claystreetunit",
  },
  info: {
    style: {
      backgroundImage: "/page-backgrounds/info.jpg",
    },
    contacts: [
      {
        title: "Booking",
        href: "mailto:harry@madison-house.com",
        company: "Madison House",
        contacts: [
          {
            name: "Harry Woosley",
            email: "harry@madison-house.com",
          },
        ],
        icon: "/epk/brands/madison-house.png",
      },
      {
        title: "Management",
        href: "mailto:josh@luckymanmgmt.com; andy@luckymanmgmt.com;",
        company: "Lucky Man Management",
        contacts: [
          {
            name: "Josh Nicotra",
            email: "josh@luckymanmgmt.com",
          },
          {
            name: "Andy Mertz",
            email: "andy@luckymanmgmt.com",
          },
        ],
        icon: "/epk/brands/lucky-man.png",
      },
    ],
    testimonials: [],
    social: [
      { icon: faInstagram, url: "https://www.instagram.com/claystreetunit/" },
      {
        icon: faYoutube,
        url: "https://www.youtube.com/channel/UCQIU7lpzgyAx3e3LLmvQwKw",
      },
      {
        icon: faFacebook,
        url: "https://www.facebook.com/profile.php?id=100063863959988",
      },
      {
        icon: faSpotify,
        url: "https://open.spotify.com/artist/0HmpQ609wnu7isR6i96CWb",
      },
      {
        icon: faItunesNote,
        url: "https://music.apple.com/us/artist/clay-street-unit/1648140695",
      },
    ],
  },
  mailingList: {
    style: {
      backgroundImage: "/page-backgrounds/mailing-list.jpg",
    },
  },
  epk: {
    style: {
      background: "bg-[#F1F6FA]",
    },
    logo: "/logo-circle-black.png",
    subtitle:
      "Anything and everything there is to know about the high-flying, bluegrass-influenced jamband from Nashville, TN.",
    description: `Based out of Denver, CO, Clay Street Unit is a seven piece group rooted deep in homegrown southern folk/country and branches into the bluegrass sound that’s heard throughout the Appalachian hills.
    \nForming in early 2021, the band just recently released their first EP and is working on developing and pushing their own unique sound, with a high energy, fresh take on the tradition of American folk and country music that is sure to keep you moving.`,
    videos: [
      {
        superTitle: "Pro Shot",
        title: "Engine Trouble - Live From The Bluebird Theater",
        body: "October 29th, 2021 at The Bluebird Theater in Denver, CO ft. Jon Neimann",
        href: "https://www.youtube.com/watch?v=SGHUtYwPR88",
        image: "https://img.youtube.com/vi/SGHUtYwPR88/0.jpg",
        color: "text-sicard-gold-800",
      },
      // {
      //   superTitle: "Cover Set",
      //   title: "Airshow - 9/24/21 - Phish Themed Second Set",
      //   body: "Airshow - September 24, 2021 at Fretboard Brewing (Cincinnati, OH)",
      //   href: "https://www.youtube.com/watch?v=AgLnKSSLjKw",
      //   image: "https://img.youtube.com/vi/AgLnKSSLjKw/0.jpg",
      //   color: "text-pink-500",
      // },
      // {
      //   superTitle: "Live",
      //   title: `Airshow - 4/24/2022 (Full Set)`,
      //   body: `Airshow's 4/24/22 performance at Brooklyn Bowl in Nashville, TN supporting Pigeons Playing Ping Pong.`,
      //   href: "https://www.youtube.com/watch?v=drCl8nTdSiY",
      //   image: "https://img.youtube.com/vi/drCl8nTdSiY/0.jpg",
      //   color: "text-indigo-500",
      // },
    ],
    spotifyScreenshot: "/spotify.png",
    socialStats: [
      {
        stat: "9.1k+",
        emphasis: "Monthly listeners",
        rest: "on Spotify",
      },
      {
        stat: "2K+",
        emphasis: "Followers",
        rest: "on Instagram",
      },
      {
        stat: "150+",
        emphasis: "Fans",
        rest: "on Facebook",
      },
    ],
    additionalResources: [
      {
        superTitle: "Photos",
        title: "Official photos",
        body: "Officially licensed photos of the band to be used in marketing content.",
        href: "#",
        image: "/epk/images/official-photos.jpeg",
        color: "text-indigo-500",
      },
      {
        superTitle: "Press",
        title: "Press releases and one-pagers",
        body: "Press releases and one-pagers related to album releases and tour announcements.",
        href: "#",
        image: "/epk/images/press.jpg",
        color: "text-red-500",
      },
      {
        superTitle: "Live Performance",
        title: "Stage Plot, Rider, W-9",
        body: "Documents relevant to hosting a Clay Street Unit live performance at your venue.",
        href: "#",
        image: "/epk/images/live-performance.jpg",
        color: "text-sicard-blue-300",
      },
    ],
    youtubeLink: "https://www.youtube.com/channel/UCQIU7lpzgyAx3e3LLmvQwKw",
  },
  archive: {
    cloudinary_root_folder: "claystreetunit",
    dbName: "claystreetunit",
    ogImageLogo: "logo-circle-white.png",
  },
};

export default data;
