import { withAuthUserTokenAPI } from '../../api/auth/withAuthUserTokenAPI';
import initAuth from '../../../firebase/initFirebaseApp';
import * as jwt from 'jsonwebtoken';

initAuth();

const handler = async (req, res, AuthUser) => {
  const userId = AuthUser.id;
  if (!userId || userId === undefined) {
    res.status(400).json('Missing userId');
  }
  const currentTime = Math.floor(Date.now() / 1000);
  const KEY = JSON.parse(process.env.KNOCK_API_SIGNING_KEY);

  const token = jwt.sign(
    { sub: userId, iat: currentTime, exp: currentTime + 60 * 60 },
    KEY,
    { algorithm: 'RS256' }
  );
  res.status(200).json(token);
};

export default withAuthUserTokenAPI(handler);
