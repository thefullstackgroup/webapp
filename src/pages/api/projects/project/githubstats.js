import axios from 'axios';
import { withAuthUserTokenAPI } from '../../auth/withAuthUserTokenAPI';
import initAuth from '../../../../firebase/initFirebaseApp';

initAuth();

const handler = async (req, res, AuthUser) => {
  const accessToken = await AuthUser?.getIdToken();
  const requestURL = `${process.env.API_PROJECTS_URL}/gitOps/${req.query.projectId}/stats`;

  if (accessToken) {
    return axios
      .get(requestURL, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        res.status(response.status).json({
          success: response.success,
          content: response.data,
        });
      })
      .catch((error) => {
        res
          .status(error.response.status)
          .json({ error: 'Something went wrong' });
      });
  } else {
    return axios
      .get(requestURL)
      .then((response) => {
        res.status(response.status).json({
          success: response.success,
          content: response.data,
        });
      })
      .catch((error) => {
        res
          .status(error.response.status)
          .json({ error: 'Something went wrong' });
      });
  }
};

export default handler;
