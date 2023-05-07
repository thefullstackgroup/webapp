import { withAuthUserTokenAPI } from '../auth/withAuthUserTokenAPI';
import initAuth from '../../../firebase/initFirebaseApp';

initAuth();

const handler = async (req, res, AuthUser) => {
  const accessToken = await AuthUser.getIdToken();
  const userIds = req.query.following.split(',');
  const data = userIds;

  const response = await fetch(
    `${process.env.API_STATS_URL}/feed?range=${req.query.range}&page=${req.query.page}&size=${req.query.size}`,
    {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    }
  );
  const result = await response.json();
  res.status(result?.error ? 500 : 200).json(result.content);
};

export default withAuthUserTokenAPI(handler);
// export default handler;
