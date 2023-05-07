import axios from 'axios';
import { withAuthUserTokenAPI } from '../../../api/auth/withAuthUserTokenAPI';
import initAuth from '../../../../firebase/initFirebaseApp';

initAuth();

const handler = async (req, res, AuthUser) => {
  const accessToken = await AuthUser.getIdToken();
  return axios
    .post(
      `${process.env.API_TRANSACTIONS_URL}/wallet/redeem?promo=${req.body.promo}&userId=${req.body.userId}&amount=${req.body.amount}`,
      req.body,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .then((response) => {
      res.status(response.status).json({ success: response.statusText });
    })
    .catch((error) => {
      res.status(error.response.status).json(error.response.data);
    });
};

export default withAuthUserTokenAPI(handler);
// export default handler;
