import { withAuthUserTokenAPI } from '../auth/withAuthUserTokenAPI';
import initAuth from '../../../firebase/initFirebaseApp';
const { Knock } = require('@knocklabs/node');
const knock = new Knock(process.env.KNOCK_API_KEY);

initAuth();

const handler = async (req, res, AuthUser) => {
  const userId = AuthUser.id;

  if (!userId || userId === undefined) {
    res.status(400).json('Missing userId');
  }

  await knock.users.identify(AuthUser.id, {
    name: AuthUser.displayName,
    email: AuthUser.email,
    avatar: AuthUser.photoURL,
  });

  await knock.users.setPreferences(AuthUser.id, {
    channel_types: { email: true, sms: false },
    workflows: {
      'chat-new-message': {
        channel_types: {
          email: true,
          in_app_feed: true,
          sms: true,
        },
      },
      'connection-request': {
        channel_types: {
          email: true,
          in_app_feed: true,
          sms: true,
        },
      },
      'connection-approval': {
        channel_types: {
          email: true,
          in_app_feed: true,
          sms: true,
        },
      },
      'project-comment': {
        channel_types: {
          email: true,
          in_app_feed: true,
          sms: true,
        },
      },
      'project-comment-comment': {
        channel_types: {
          email: true,
          in_app_feed: true,
          sms: true,
        },
      },
      'project-create': {
        channel_types: {
          email: true,
          in_app_feed: true,
          sms: true,
        },
      },
      'project-like': {
        channel_types: {
          email: true,
          in_app_feed: true,
          sms: true,
        },
      },
      'project-project-mention': {
        channel_types: {
          email: true,
          in_app_feed: true,
          sms: true,
        },
      },
    },
  });

  res.status(200).json('success');
};

export default withAuthUserTokenAPI(handler);
