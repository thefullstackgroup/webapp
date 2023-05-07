import { withAuthUserTokenAPI } from '../../api/auth/withAuthUserTokenAPI';
import initAuth from '../../../firebase/initFirebaseApp';

initAuth();
import axios from 'axios';

const handler = async (req, res, AuthUser) => {
  const accessToken = await AuthUser.getIdToken();
  try {
    const response = await axios.get(
      `${process.env.API_CONNECTIONS_URL}/users/${req.query.userId}/verify_connection/?connectedto=${req.query.connectedTo}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    res
      .status(200)
      .json({ success: response.data.status, message: response.data.message });
  } catch (error) {
    res
      .status(200)
      .json({ success: 'false', message: 'Something has gone wrong' });
  }
};

export default withAuthUserTokenAPI(handler);
// export default handler;
