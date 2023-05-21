import { ThemeProvider } from 'next-themes';
import { UserStateProvider } from '../context/user';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Analytics } from '@vercel/analytics/react';
import { initFirebasePresence } from '../firebase/firebasePresence';
import initAuth from '../firebase/initFirebaseApp';
import NextProgress from 'next-progress';
import * as ga from '../lib/ga';
import 'styles/globals.css';
import 'react-mde/lib/styles/css/react-mde-all.css';
import 'styles/mde-editor.css';

initAuth();

function App({ Component, pageProps }) {
  initFirebasePresence();

  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <ThemeProvider attribute="class">
      <UserStateProvider>
        <NextProgress
          color="#EEEEEE"
          delay={500}
          options={{ showSpinner: false }}
        />
        <Component {...pageProps} />
        <Analytics />
      </UserStateProvider>
    </ThemeProvider>
  );
}

export default App;
