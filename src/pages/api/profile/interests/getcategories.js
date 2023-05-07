import axios from 'axios';
import { withAuthUserTokenAPI } from 'pages/api/auth/withAuthUserTokenAPI';
import initAuth from 'firebase/initFirebaseApp';

initAuth();

const handler = async (req, res, AuthUser) => {
  const accessToken = await AuthUser.getIdToken();
  return axios
    .get(
      `${process.env.API_PROFILE_URL}/interests?page=${req.query.page}&size=${req.query.size}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .then((response) => {
      res.status(response.status).json({ categories: response.data.content });
    })
    .catch((error) => {
      console.log(error);
      res.status(error.response.status).json(error.response.data);
    });
};

export default withAuthUserTokenAPI(handler);
