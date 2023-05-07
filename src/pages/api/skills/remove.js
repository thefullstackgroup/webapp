import { withAuthUserTokenAPI } from '../../api/auth/withAuthUserTokenAPI';
import initAuth from '../../../firebase/initFirebaseApp';

initAuth();
const handler = async (req, res, AuthUser) => {
  const accessToken = await AuthUser.getIdToken();
  const response = await fetch(
    `${process.env.API_PROFILE_URL}/user/profile/skill?skillIds=${req.body}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const result = await response;

  res.status(result.status).json(result);
};

export default withAuthUserTokenAPI(handler);
// export default handler;
