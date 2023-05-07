import { withAuthUserTokenAPI } from '../../../api/auth/withAuthUserTokenAPI';
import initAuth from '../../../../firebase/initFirebaseApp';

initAuth();
const handler = async (req, res, AuthUser) => {
  const accessToken = await AuthUser.getIdToken();
  try {
    if (
      !req.query.userId ||
      req.query.userId == undefined ||
      req.query.userId.length < 1
    ) {
      throw 'Invalid userId to unfollow';
    }

    const result = await fetch(
      `${process.env.API_CONNECTIONS_URL}/users/${req.query.userId}/follow`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    res.status(200).json({ success: 'true' });
  } catch (error) {
    console.log(error);
    res.status(200).json({ success: 'false' });
  }
};

export default withAuthUserTokenAPI(handler);
// export default handler;
