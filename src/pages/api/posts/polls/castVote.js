import axios from 'axios';
import { withAuthUserTokenAPI } from '../../auth/withAuthUserTokenAPI';
import initAuth from '../../../../firebase/initFirebaseApp';

initAuth();

const handler = async (req, res, AuthUser) => {
  const accessToken = await AuthUser.getIdToken();

  return axios
    .patch(
      `${process.env.API_PROJECTS_URL}/poll/${req.query.postId}/vote/${req.query.optionId}`,
      { body: '' },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .then((response) => {
      console.log(response.data);
      res.status(response.status).json(response.data);
    })
    .catch((error) => {
      console.log(error.response);
      res.status(error.response.status).json(error.response.data);
    });
};

export default withAuthUserTokenAPI(handler);
