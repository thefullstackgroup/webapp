import axios from 'axios';
import initAuth from '../../../firebase/initFirebaseApp';

initAuth();

const handler = async (req, res, AuthUser) => {
  const accessToken = await AuthUser?.getIdToken();
  let connectionUsersIds = '';
  if (req.query.connectionUsersIds) {
    connectionUsersIds = `&connectionUserIds=${req.query.connectionUsersIds}`;
  }
  const requestURL = `${process.env.API_SEARCH_URL}/search/showcase?page=${
    req.query.page
  }&size=${req.query.size}&projectType=${req.query.projectType || ''}&orderBy=${
    req.query.sort
  }${
    req.query?.tech && req.query?.tech !== undefined
      ? '&techStack=' + req.query.tech
      : ''
  }&userId=${req.query.userId}${connectionUsersIds}${
    req.query?.lookingForCollabs && req.query?.lookingForCollabs !== undefined
      ? '&lookingForCollabs=' + req.query.lookingForCollabs
      : ''
  }&${req.query.range !== undefined && `range=${req.query.range}`}`;

  if (accessToken) {
    return axios
      .get(requestURL, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        res.status(response.status).json(response.data.content);
      })
      .catch((error) => {
        res.status(error.response.status).json(error.response.data);
      });
  } else {
    return axios
      .get(requestURL)
      .then((response) => {
        res.status(response.status).json(response.data.content);
      })
      .catch((error) => {
        res.status(error.response.status).json(error.response.data);
      });
  }
};

export default handler;
