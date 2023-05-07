import { withAuthUserTokenAPI } from '../../../api/auth/withAuthUserTokenAPI';
import initAuth from '../../../../firebase/initFirebaseApp';

initAuth();
const handler = async (req, res, AuthUser) => {
  const accessToken = await AuthUser.getIdToken();
  const response = await fetch(
    `${process.env.API_PROJECTS_URL}/project/${req.body.projectId}`,
    {
      method: 'PATCH',
      body: JSON.stringify(req.body.projectData),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    }
  );
  const result = await response;

  res.status(result.status).json('success');
};

export default withAuthUserTokenAPI(handler);
// export default handler;
