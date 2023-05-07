import axios from 'axios';
import { withAuthUserTokenAPI } from '../auth/withAuthUserTokenAPI';
import initAuth from '../../../firebase/initFirebaseApp';

initAuth();

const handler = async (req, res, AuthUser) => {
  const accessToken = await AuthUser.getIdToken();

  return axios
    .get(
      `${process.env.API_SEARCH_URL}/search/projects?page=${
        req.query.page
      }&size=${req.query.size}&projectType=${
        req.query.projectType || ''
      }&orderBy=${req.query.sort}&q=${req.query.term}&userId=${
        req.query.userId
      }&${req.query.range !== undefined && `range=${req.query.range}`}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .then((response) => {
      res.status(response.status).json(response.data.content);
    })
    .catch((error) => {
      res.status(error.response.status).json(error.response.data);
    });
};

export default withAuthUserTokenAPI(handler);
// export default handler;
