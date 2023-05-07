const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase) => {
  let FIREBASE_KEY_LOCATION;
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    FIREBASE_KEY_LOCATION = '../src/pages/api/firebase/service-account.enc';
  } else {
    FIREBASE_KEY_LOCATION = '../src/pages/api/firebase/service-account.enc';
  }
  return {
    webpack: (config, { isServer }) => {
      if (!isServer) {
        // don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
        config.resolve.fallback = {
          fs: false,
        };
      }

      return config;
    },
    async redirects() {
      return [
        {
          source: '/legal/code-of-conduct',
          destination: '/code-of-conduct',
          permanent: true,
        },
        {
          source: '/legal/privacy-policy',
          destination: '/privacy-policy',
          permanent: true,
        },
        {
          source: '/legal/cookie-policy',
          destination: '/cookie-policy',
          permanent: true,
        },
        {
          source: '/welcome',
          destination:
            '/?utm_source=reddit&utm_medium=chat&utm_campaign=message1',
          permanent: true,
        },
        {
          source: '/showcase',
          destination:
            '/?utm_source=reddit&utm_medium=chat&utm_campaign=message2',
          permanent: true,
        },
        {
          source: '/discover',
          destination:
            '/?utm_source=reddit&utm_medium=chat&utm_campaign=message3',
          permanent: true,
        },
        {
          source: '/app',
          destination:
            '/?utm_source=reddit&utm_medium=chat&utm_campaign=message4',
          permanent: true,
        },
        {
          source: '/beta',
          destination:
            '/?utm_source=reddit&utm_medium=chat&utm_campaign=message5',
          permanent: true,
        },
      ];
    },
    env: {
      brandName: 'The Full Stack',
      BASEURL: process.env.BASEURL,
      GA_TRACKING_ID: 'G-5XMPSJ6DS5',
      FIREBASE_KEY: FIREBASE_KEY_LOCATION,
      KNOCK_API_KEY: process.env.KNOCK_API_KEY,
      KNOCK_API_PUBLIC_KEY: process.env.KNOCK_API_PUBLIC_KEY,
      SLACK_NOTIFICATIONS_ENABLED: process.env.SLACK_NOTIFICATIONS_ENABLED,
      ENABLE_EMAIL_PASS_SIGNUP: false,
    },
    i18n: {
      locales: ['en-US'],
      defaultLocale: 'en-US',
      localeDetection: false,
    },
    images: {
      domains: [
        'images.unsplash.com',
        'terrabyte.fra1.digitaloceanspaces.com',
        'terrabyte.fra1.cdn.digitaloceanspaces.com',
        'lh3.googleusercontent.com',
        'avatars.githubusercontent.com',
        's.gravatar.com',
        'image.mux.com',
        'media-exp1.licdn.com',
        'www.google.ie',
        'node.deso.org',
        'media-exp2.licdn.com',
        'res.cloudinary.com',
        'media.licdn.com',
        'www.example.com',
        'github.com',
        'unmaskcrypto.com',
      ],
    },

    async rewrites() {
      return [
        {
          source: '/firebase-messaging-sw.js',
          destination: '/api/firebase/firebase-messaging-sw',
        },
      ];
    },
    async headers() {
      return [
        {
          source: '/firebase-messaging-sw.js',
          headers: [
            {
              key: 'Content-Type',
              value: 'text/javascript',
            },
          ],
        },
      ];
    },
  };
};
