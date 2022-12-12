import { IconDefinition } from '@fortawesome/free-brands-svg-icons';

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
  type: 'album' | 'single';
  albumCoverUrl: string;
  trackList: string[];
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

export interface TourConfig {
  style: {
    backgroundImage: string;
  };
  bandsInTownApiEndpoint: string;
}

export interface NewsConfig {
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

export interface InfoConfig {
  contacts: Agency[];
  social: SocialMediaItem[];
  style: {
    backgroundImage: string;
  };
  testimonials: TestimonialConfig[];
}

export interface MailingListConfig {
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

export interface EpkConfig {
  style: {
    background: string;
  };
  logo: string;
  subtitle: string;
  description: string;
  videos: VideoItem[];
  spotifyScreenshot: string;
  socialStats: SocialStat[];
  additionalResources: EpkAdditionalResource[];
  youtubeLink: string;
}

interface HomeConfig {
  logo: string;
  ogImage: string;
  splashVideoUrl: string;
}

export interface DataConfig {
  artistName: string;
  artistDescription: string;
  legalEntity: string;
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
  error: ErrorConfig;
}
