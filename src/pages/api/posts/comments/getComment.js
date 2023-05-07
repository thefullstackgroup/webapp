import axios from 'axios';
import { withAuthUserTokenAPI } from '../../auth/withAuthUserTokenAPI';
import initAuth from '../../../../firebase/initFirebaseApp';

initAuth();

const handler = async (req, res, AuthUser) => {
  const accessToken = await AuthUser.getIdToken();

  return axios
    .get(
      `${process.env.API_COMMENTS_URL}/comments/${req.query.commentId}/view`,
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
      res
        .status(error.response.data.status)
        .json({ error: 'Something went wrong' });
    });
};

export default withAuthUserTokenAPI(handler);
// export default handler;
