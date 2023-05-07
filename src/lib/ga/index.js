export const pageview = (url) => {
  window?.gtag('config', process.env.GA_TRACKING_ID, {
    page_path: url,
  });
};

export const event = ({ action, params }) => {
  window?.gtag('event', action, params);
};
