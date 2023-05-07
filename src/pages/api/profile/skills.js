// pages/api/profile/update.js
import { withAuthUserTokenAPI } from '../../api/auth/withAuthUserTokenAPI';
import initAuth from '../../../firebase/initFirebaseApp';

initAuth();

const handler = async (req, res) => {
  // const accessToken = await AuthUser.getIdToken();

  await fetch(process.env.API_PROFILE_URL + '/user/profile/update');

  res.status(200).json({ success: 'true' });
};

export default withAuthUserTokenAPI(handler);
// export default handler;
