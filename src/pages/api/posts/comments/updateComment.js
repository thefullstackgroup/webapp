import axios from 'axios';
import { withAuthUserTokenAPI } from '../../auth/withAuthUserTokenAPI';
import initAuth from '../../../../firebase/initFirebaseApp';

initAuth();

const handler = async (req, res, AuthUser) => {
  const accessToken = await AuthUser.getIdToken();
  return axios
    .patch(
      `${process.env.API_COMMENTS_URL}/comments/${req.query.commentId}`,
      req.body,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .then((response) => {
      res
        .status(response.status)
        .json({ success: response.statusText, comment: response.data });
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
};

export default withAuthUserTokenAPI(handler);
