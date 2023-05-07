import axios from 'axios';
import { withAuthUserTokenAPI } from '../../api/auth/withAuthUserTokenAPI';
import initAuth from '../../../firebase/initFirebaseApp';

initAuth();

const handler = async (req, res, AuthUser) => {
  const accessToken = await AuthUser.getIdToken();

  return axios
    .get(
      `${process.env.API_PROJECTS_URL}/project/${encodeURIComponent(
        req.query.postId
      )}/user/${encodeURIComponent(req.query.authorId)}`,
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
      res.status(error.response.status).json(error.response.data);
    });
};

export default withAuthUserTokenAPI(handler);
// export default handler;
