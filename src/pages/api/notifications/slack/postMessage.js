import axios from 'axios';
import { withAuthUserTokenAPI } from '../../auth/withAuthUserTokenAPI';
import initAuth from '../../../../firebase/initFirebaseApp';

initAuth();

const handler = async (req, res, AuthUser) => {
  let environment = '';
  let actor = AuthUser.email + ` [${AuthUser.id}]`;

  if (process.env.SLACK_NOTIFICATIONS_ENABLED === 'FALSE') return;

  if (process.env.NODE_ENV === 'development') {
    environment = 'Development';
  } else {
    environment = 'Production';
  }

  const message = `ENV: ${environment} \nUSER: ${actor} \nACTION: ${req.body.message} \n------------------------`;

  await axios
    .post(
      process.env.SLACK_POST_MESSAGE_URL,
      JSON.stringify({
        text: message,
      }),
      {
        headers: {
          'content-type': 'application/json',
        },
      }
    )
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

export default withAuthUserTokenAPI(handler);
