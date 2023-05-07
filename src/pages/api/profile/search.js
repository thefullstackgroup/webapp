// pages/api/companies
import axios from 'axios';
import { withAuthUserTokenAPI } from '../../api/auth/withAuthUserTokenAPI';
import initAuth from '../../../firebase/initFirebaseApp';

initAuth();

const handler = async (req, res, AuthUser) => {
  const accessToken = await AuthUser.getIdToken();
  let term = req.body;
  if (term.length > 1) {
    await axios
      .get(
        `${process.env.API_SEARCH_URL}/search/profiles?q=${term}&offset=0&limit=10`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        res.status(200).json(response.data);
      })
      .catch((error) => {
        res.status(200).json(error);
      });
  }
};

export default withAuthUserTokenAPI(handler);
// export default handler;
