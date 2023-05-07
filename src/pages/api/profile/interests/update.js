// api/profile/interests/update
import axios from 'axios';
import { withAuthUserTokenAPI } from '../../../api/auth/withAuthUserTokenAPI';
import initAuth from '../../../../firebase/initFirebaseApp';

initAuth();
const handler = async (req, res, AuthUser) => {
  const accessToken = await AuthUser.getIdToken();
  return axios
    .patch(`${process.env.API_PROFILE_URL}/profile/interests`, req.body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => {
      res.status(response.status).json({ success: response.statusText });
    })
    .catch((error) => {
      res.status(error.response.status).json(error.response.data);
    });
};

export default withAuthUserTokenAPI(handler);
// export default handler;
