import { Db } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
export interface BandsInTownApiResponse {
  offers: [
    {
      type: string;
      url: string;
      status: string;
    }
  ];
  venue: {
    street_address: string;
    country: string;
    city: string;
    latitude: string;
    name: string;
    location: string;
    postal_code: string;
    region: string;
    longitude: string;
  };
  starts_at: string;
  artist: {
    thumb_url: string;
    mbid: string;
    facebook_page_url: string;
    image_url: string;
    tracker_count: number;
    tracking: string[];
    upcoming_event_count: number;
    url: string;
    support_url: string;
    show_multi_ticket: boolean;
    name: string;
    options: {
      display_listen_unit: boolean;
    };
    links: string;
    artist_optin_show_phone_number: boolean;
    id: string;
  };
  festival_datetime_display_rule: string;
  description: string;
  lineup: string[];
  festival_start_date: string;
  bandsintown_plus: boolean;
  title: string;
  artist_id: string;
  url: string;
  datetime_display_rule: string;
  datetime: string;
  on_sale_datetime: string;
  id: string;
  ends_at: string;
  festival_end_date: string;
}

export interface SeatedApiResponse {
  included: SeatedShowApiResponse[];
}

interface SeatedShowApiResponse {
  attributes: {
    details: null;
    "ends-at": null;
    "ends-at-date-local": string;
    "ends-at-short": string;
    "formatted-address": string;
    "is-collecting-waitlist": boolean;
    "is-seated-primary-link": null;
    "is-seated-promoted-link": null;
    "is-sold-out": false;
    "link-text1": null;
    "link-text2": null;
    "link-url1": null;
    "link-url2": null;
    "on-sale-date-name": string;
    "promoted-on-sale-date-name": null;
    "starts-at": string;
    "starts-at-date-local": string;
    "starts-at-short": string;
    "venue-name": string;
  };
  id: string;
  type: string;
}

export interface ApiRequest extends NextApiRequest {
  db: Db;
}

export type ApiResponse = NextApiResponse;
