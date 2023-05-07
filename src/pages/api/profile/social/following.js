import { withAuthUserTokenAPI } from '../../../api/auth/withAuthUserTokenAPI';
import initAuth from '../../../../firebase/initFirebaseApp';

initAuth();
const handler = async (req, res, AuthUser) => {
  const accessToken = await AuthUser.getIdToken();

  try {
    const response = await fetch(
      `${process.env.API_CONNECTIONS_URL}/users/${AuthUser.id}/following`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const result = await response.json();
    if (result.status != 'success') {
      throw 'Error getting followings';
    }

    res.status(200).json(result.data);
  } catch (error) {
    res.status(200).json({ success: 'false' });
  }
};

export default withAuthUserTokenAPI(handler);
// export default handler;
