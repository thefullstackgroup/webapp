import { withAuthUserTokenAPI } from '../../api/auth/withAuthUserTokenAPI';
import initAuth from '../../../firebase/initFirebaseApp';

initAuth();

const handler = async (req, res, AuthUser) => {
  const accessToken = await AuthUser.getIdToken();
  // const accessToken = 'fdsfsdfsd';
  res.status('200').json({ token: accessToken });
};

export default withAuthUserTokenAPI(handler);
// export default handler;
