import { IconDefinition } from "@fortawesome/free-brands-svg-icons";

export * from "./external";

interface BaseConfig {
  og: OpenGraphConfig;
}

export interface ShowResponse {
  id: string;
  title: string;
  datetime: string;
  venue: {
    name: string;
    location: string; // city, state
  };
  lineup: string[];
  tickets: {
    text: string;
    url: string;
  };
}

interface StyleProps {
  backgroundImage?: string;
}

export interface TestimonialConfig {
  quote: string;
  author: string;
}

export interface Album {
  name: string;
  slug: string;
  year: number;
  type: "album" | "single";
  albumCoverUrl: string;
  trackList: {
    name: string;
    url: string;
  }[];
  description: string;
  otherImages: string[];
  youtubeVideoId?: string;
  streamingLinks: {
    spotify?: string;
    apple?: string;
    amazon?: string;
    youtube?: string;
  };
  pageStyle: {
    streamServiceColor: string;
    albumCoverBorderColor: string;
    backgroundColor: string;
    primaryText: string;
    secondaryText: string;
    listenNowBorder: string;
  };
}

export interface TourConfig extends BaseConfig {
  style: {
    backgroundImage: string;
  };
  bandsInTownApiEndpoint: string;
}

export interface NewsConfig extends BaseConfig {
  style: {
    backgroundImage: string;
  };
  dbName: string;
}

export interface Agency {
  title: string;
  href: string;
  company: string;
  contacts: {
    name: string;
    email: string;
  }[];
  icon: string;
}

interface Contact {
  name: string;
  email: string;
}

interface ErrorConfig {
  style: {
    background: string;
  };
}

export interface SocialMediaItem {
  icon: IconDefinition;
  url: string;
}
export interface AudioSuggestion {
  identifier: string;
  name: string;
  provider: string;
  imageUrl: string;
}

export interface InfoConfig extends BaseConfig {
  contacts: Agency[];
  social: SocialMediaItem[];
  style: {
    backgroundImage: string;
  };
  testimonials: TestimonialConfig[];
}

export interface MailingListConfig extends BaseConfig {
  style: StyleProps;
}

interface VideoItem {
  title: any;
  superTitle: string;
  href: string;
  color: string;
  body: string;
  image: string;
}

interface SocialStat {
  stat: string;
  emphasis: string;
  rest: string;
}

interface EpkAdditionalResource {
  superTitle: string;
  title: string;
  body: string;
  href: string;
  image: string;
  color: string;
}

export interface EpkConfig extends BaseConfig {
  style: {
    background: string;
  };
  logo: string;
  description: string;
  videos: VideoItem[];
  spotifyScreenshot: string;
  socialStats: SocialStat[];
  additionalResources: EpkAdditionalResource[];
  youtubeLink: string;
}

interface MenuItem {
  slug: string;
  text: string;
}

interface HomeConfig extends BaseConfig {
  logo: string;
  ogImage: string;
  splashVideoUrl: string;
  menu: MenuItem[];
}

interface AdminConfig {
  logoUrl: string;
}

interface OpenGraphConfig {
  title: string;
  description: string;
}

interface ArchiveConfig {
  cloudinary_root_folder: string;
  dbName: string;
  ogImageLogo: string;
  vercelDeployHookUrl: string;
  navigation: {
    name: string;
    href: string;
    comingSoon?: boolean;
  }[];
}

export interface DataConfig {
  artistName: string;
  legalEntity: string;
  websiteUrl: string;
  analytics: {
    googleAnalyticsCode: string;
  };
  openGraph: {
    textLogo: string;
    imageLogo: string;
    backgroundImage?: string;
  };
  home: HomeConfig;
  tour: TourConfig;
  music: {
    style: {
      leftSideBackground: string;
    };
    items: {
      [key: string]: Album;
    };
  };
  news: NewsConfig;
  info: InfoConfig;
  mailingList: MailingListConfig;
  epk: EpkConfig;
  archive: ArchiveConfig;
  admin: AdminConfig;
  error: ErrorConfig;
}
