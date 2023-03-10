import { data } from '@ontour/data';

export const GA_MEASUREMENT_ID = data.analytics.googleAnalyticsCode;

declare global {
  interface Window {
    gtag: any;
  }
}

export const pageview = (url) => {
  if (process.env.NODE_ENV === 'production') {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

// log specific events happening.
export const event = ({ action, params }) => {
  if (process.env.NODE_ENV === 'production') {
    window.gtag('event', action, params);
  }
};
