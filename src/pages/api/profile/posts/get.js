import axios from 'axios';
import { withAuthUserTokenAPI } from '../../../api/auth/withAuthUserTokenAPI';
import initAuth from '../../../../firebase/initFirebaseApp';

initAuth();

const handler = async (req, res, AuthUser) => {
  const accessToken = await AuthUser.getIdToken();
  return axios
    .get(
      `${
        process.env.API_PROJECTS_URL
      }/projects/user?displayName=${encodeURIComponent(
        req.query.userId
      )}&projectType=${req.query.projectType}&page=0&size=${req.query.size}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .then((response) => {
      res.status(response.status).json(response.data);
    })
    .catch((error) => {
      console.log(error);
      res.status(error.response.status).json(error.response.data);
    });
};

export default withAuthUserTokenAPI(handler);
// export default handler;
