import './firebaseApp';
import { init } from 'next-firebase-auth';
import absoluteUrl from 'next-absolute-url';
import * as ga from 'lib/ga';

const initAuth = () => {
  init({
    debug: false,
    authPageURL: ({ ctx }) => {
      const isServerSide = typeof window === 'undefined';
      const origin = isServerSide
        ? absoluteUrl(ctx.req).origin
        : window.location.origin;
      const destPath =
        typeof window === 'undefined' ? ctx.resolvedUrl : window.location.href;
      const destURL = new URL(destPath, origin);

      return `/login?destination=${encodeURIComponent(destURL)}`;
    },

    appPageURL: ({ ctx }) => {
      const isServerSide = typeof window === 'undefined';

      const origin = isServerSide
        ? absoluteUrl(ctx.req).origin
        : window.location.origin;

      const params = isServerSide
        ? new URL(ctx.req.url, origin).searchParams
        : new URLSearchParams(window.location.search);

      const destinationParamVal = params.get('destination')
        ? decodeURIComponent(params.get('destination'))
        : undefined;

      // By default, go to the index page if the destination URL
      // is invalid or unspecified.
      let destURL = '/explore';

      if (destinationParamVal) {
        const allowedHosts = ['localhost:3000', `${process.env.BASEURL}`];

        const allowed =
          allowedHosts.indexOf(new URL(destinationParamVal).host) > -1;

        if (allowed) {
          destURL = destinationParamVal;
        } else {
          console.warn(
            `Redirect destination host must be one of ${allowedHosts.join(
              ', '
            )}.`
          );
        }
      }

      if (!isServerSide) {
        ga.event({
          action: 'user_loggedin',
        });
      }

      return destURL;
    },
    loginAPIEndpoint: '/api/auth/login',
    logoutAPIEndpoint: '/api/auth/logout',
    // firebaseAuthEmulatorHost: 'localhost:9099',
    // Required in most cases.
    firebaseAdminInitConfig: {
      credential: {
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.NEXT_PUBLIC_FIREBASE_EMAIL_CLIENT,
        // The private key must not be accessible on the client side.
        privateKey: process.env.FIREBASE_PRIVATE_KEY
          ? JSON.parse(process.env.FIREBASE_PRIVATE_KEY)
          : undefined,
      },
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    },
    // Use application default credentials (takes precedence over fireaseAdminInitConfig if set)
    // useFirebaseAdminDefaultCredential: true,
    firebaseClientInitConfig: {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    },
    cookies: {
      name: 'TheFullStack', // required
      // Keys are required unless you set `signed` to `false`.
      // The keys cannot be accessible on the client side.
      keys: [
        process.env.COOKIE_SECRET_CURRENT,
        process.env.COOKIE_SECRET_PREVIOUS,
      ],
      httpOnly: true,
      maxAge: 12 * 60 * 60 * 24 * 1000, // twelve days
      overwrite: true,
      path: '/',
      sameSite: 'strict',
      secure: process.env.FB_COOKIE_SECURE, // set this to false in local (non-HTTPS) development
      signed: true,
    },
  });
};

export default initAuth;
