// lib/gtag.js
// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) => {
  window.gtag('config', 'UA-192780985-1', {
    page_path: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
// User-id gtag('set', {'user_id': 'USER_ID'}); // Set the user ID using signed-in user_id.
export const event = ({ action, category, label, value }) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

export const set = ({ user_id }) => {
  window.gtag('set', { user_id: user_id });
};
