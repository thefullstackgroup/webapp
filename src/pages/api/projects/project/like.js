import { withAuthUserTokenAPI } from '../../../api/auth/withAuthUserTokenAPI';
import initAuth from '../../../../firebase/initFirebaseApp';
import * as FormData from 'form-data';

initAuth();

const handler = async (req, res, AuthUser) => {
  const accessToken = await AuthUser.getIdToken();

  const response = await fetch(
    `${process.env.API_PROJECTS_URL}/project/${req.body.projectId}/like`,
    {
      method: 'PATCH',
      body: {},
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  res.status(response.status).json(response.statusText);
};

export default withAuthUserTokenAPI(handler);
// export default handler;
