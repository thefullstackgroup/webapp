import axios from 'axios';
import { withAuthUserTokenAPI } from '../auth/withAuthUserTokenAPI';
import initAuth from '../../../firebase/initFirebaseApp';

initAuth();

const handler = async (req, res, AuthUser) => {
  const accessToken = await AuthUser?.getIdToken();
  const requestURL = `${
    process.env.API_PROFILE_URL
  }/profile/user?userId=${encodeURIComponent(req.query.userId)}`;

  return axios
    .get(requestURL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => {
      const obj = {
        name: response.data.name,
        displayName: response.data.displayName,
        profilePicUrl: response.data.profilePicUrl,
        currentTitle: response.data.currentTitle,
      };
      res.status(response.status).json(obj);
    })
    .catch((error) => {
      res.status(error.response.status).json(error.response.data);
    });
};

export default withAuthUserTokenAPI(handler, true);
