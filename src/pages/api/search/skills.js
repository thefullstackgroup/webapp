// pages/api/search/skills
import { withAuthUserTokenAPI } from '../../api/auth/withAuthUserTokenAPI';
import initAuth from '../../../firebase/initFirebaseApp';

initAuth();

const handler = async (req, res, AuthUser) => {
  const accessToken = await AuthUser.getIdToken();
  let term = req.body;

  if (term.length > 1) {
    const response = await fetch(
      `${process.env.API_SEARCH_URL}/search/skills?q=${encodeURIComponent(
        term
      )}&offset=0&limit=10`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const data = await response.json();
    res.status(200).json(data);
  } else {
    res.status(200).json(null);
  }
};

export default withAuthUserTokenAPI(handler);
// export default handler;
