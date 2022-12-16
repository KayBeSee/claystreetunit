import { data } from 'data';

export const GA_MEASUREMENT_ID = data.analytics.googleAnalyticsCode;

export const pageview = (url) => {
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
  });
};

// log specific events happening.
export const event = ({ action, params }) => {
  window.gtag('event', action, params);
};
