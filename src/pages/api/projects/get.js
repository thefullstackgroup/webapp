import axios from 'axios';
import { withAuthUserTokenAPI } from '../../api/auth/withAuthUserTokenAPI';
import initAuth from '../../../firebase/initFirebaseApp';

initAuth();

const handler = async (req, res, AuthUser) => {
  const accessToken = await AuthUser.getIdToken();
  let connectionUsersIds = '';
  if (req.query.connectionUsersIds) {
    connectionUsersIds = `&connectionUserIds=${req.query.connectionUsersIds}`;
  }

  return axios
    .get(
      `${process.env.API_SEARCH_URL}/search/showcase?page=${
        req.query.page
      }&size=${req.query.size}&projectType=${
        req.query.projectType || ''
      }&orderBy=${req.query.sort}${
        req.query?.tech && req.query?.tech !== undefined
          ? '&techStack=' + req.query.tech
          : ''
      }&userId=${req.query.userId}${connectionUsersIds}${
        req.query?.lookingForCollabs &&
        req.query?.lookingForCollabs !== undefined
          ? '&lookingForCollabs=' + req.query.lookingForCollabs
          : ''
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
