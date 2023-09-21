import axios from 'axios';
import { withAuthUserTokenAPI } from '../../api/auth/withAuthUserTokenAPI';
import initAuth from '../../../firebase/initFirebaseApp';

initAuth();

const handler = async (req, res, AuthUser) => {
  const accessToken = await AuthUser?.getIdToken();
  const requestURL = `${
    process.env.API_PROFILE_URL
  }/profile/user/${encodeURIComponent(req.query.userId)}`;

  let headers = '';
  if (accessToken) {
    headers = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
  }

  return axios
    .get(requestURL, headers)
    .then((response) => {
      res.status(response.status).json(response.data);
    })
    .catch((error) => {
      res.status(error.response.status).json(error.response.data);
    });
};

export default withAuthUserTokenAPI(handler, true);
