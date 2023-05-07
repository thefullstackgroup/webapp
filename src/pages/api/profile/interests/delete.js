import { withAuthUserTokenAPI } from '../../auth/withAuthUserTokenAPI';
import initAuth from '../../../../firebase/initFirebaseApp';

initAuth();

const handler = async (req, res, AuthUser) => {
  const accessToken = await AuthUser.getIdToken();
  await fetch(`${process.env.API_PROFILE_URL}/profile/interests`, {
    method: 'DELETE',
    body: JSON.stringify([req.body.interestId]),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  res.status(200).json({ success: 'true' });
};

export default withAuthUserTokenAPI(handler);
