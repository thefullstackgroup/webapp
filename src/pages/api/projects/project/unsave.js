import { withAuthUserTokenAPI } from '../../auth/withAuthUserTokenAPI';
import initAuth from '../../../../firebase/initFirebaseApp';

initAuth();

const handler = async (req, res, AuthUser) => {
  const accessToken = await AuthUser.getIdToken();

  const response = await fetch(
    `${process.env.API_PROJECTS_URL}/saved/${req.body.projectId}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  res.status(response.status).json(response.statusText);
};

export default withAuthUserTokenAPI(handler);
// export default handler;
