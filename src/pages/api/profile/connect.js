import { withAuthUserTokenAPI } from '../../api/auth/withAuthUserTokenAPI';
import initAuth from '../../../firebase/initFirebaseApp';

initAuth();

const handler = async (req, res, AuthUser) => {
  const accessToken = await AuthUser.getIdToken();

  const companyId = req.body.company?.companyId || null;
  let request_body = {
    requester_user_id: req.body.requester_user_id,
    company_id: companyId,
  };

  //change this to handle errors
  await fetch(
    `${process.env.API_CONNECTIONS_URL}/connection/${req.body.connectTo}/connect`,
    {
      method: 'POST',
      body: JSON.stringify(request_body),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  res.status(200).json({ success: 'true' });
};

export default withAuthUserTokenAPI(handler);
// export default handler;
