import axios from 'axios';
import { withAuthUserTokenAPI } from '../../auth/withAuthUserTokenAPI';
import initAuth from '../../../../firebase/initFirebaseApp';

initAuth();

const handler = async (req, res, AuthUser) => {
  const accessToken = await AuthUser.getIdToken();

  return axios
    .get(
      `${process.env.API_COMMENTS_URL}/comments/project/${req.query.postId}?size=30`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
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

export default withAuthUserTokenAPI(handler);
// export default handler;
