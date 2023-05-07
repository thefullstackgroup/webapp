import { useState, useRef, useEffect } from 'react';
import {
  KnockFeedProvider,
  NotificationIconButton,
  NotificationFeedPopover,
} from '@knocklabs/react-notification-feed';
import { useAuthUser } from 'next-firebase-auth';

// Required CSS import, unless you're overriding the styling
import '@knocklabs/react-notification-feed/dist/index.css';

const KNOCK_FEED_ID = '0790851e-ba77-4863-b919-c45f384ef8ad';

const NotificationsPanel = ({ userId }) => {
  const [isVisible, setIsVisible] = useState(false);
  const notifButtonRef = useRef(null);
  const [token, setToken] = useState('');
  const [loadingToken, setLoadingToken] = useState(false);
  const AuthUser = useAuthUser();

  const getKnockToken = async () => {
    const accessToken = await AuthUser.getIdToken();
    fetch(`${process.env.BASEURL}/api/notifications/getKnockJwt`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
    })
      .then((response) =>
        response.json().then((result) => {
          setToken(result);
          setLoadingToken(false);
        })
      )
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    if (token.length < 1 && !loadingToken) {
      setLoadingToken(true);
      getKnockToken();
    }
  }, [token]);

  return (
    <>
      {token && (
        <KnockFeedProvider
          apiKey={process.env.KNOCK_API_PUBLIC_KEY}
          feedId={KNOCK_FEED_ID}
          userToken={token}
          userId={userId}
          colorMode="dark"
        >
          <>
            <NotificationIconButton
              ref={notifButtonRef}
              onClick={(e) => setIsVisible(!isVisible)}
            />
            <NotificationFeedPopover
              buttonRef={notifButtonRef}
              isVisible={isVisible}
              onClose={() => setIsVisible(false)}
            />
          </>
        </KnockFeedProvider>
      )}
    </>
  );
};

export default NotificationsPanel;
