import axios from 'axios';
import { withAuthUserTokenAPI } from '../../auth/withAuthUserTokenAPI';
import initAuth from '../../../../firebase/initFirebaseApp';

initAuth();

const handler = async (req, res, AuthUser) => {
  const accessToken = await AuthUser?.getIdToken();
  const requestURL = `${process.env.API_COMMENTS_URL}/comments/project/${req.query.postId}?size=30`;

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
      res.status(response.status).json({
        success: response.statusText,
        comments: response.data,
      });
    })
    .catch((error) => {
      res
        .status(error.response.data.status)
        .json({ error: 'Something went wrong' });
    });
};

export default withAuthUserTokenAPI(handler, true);
