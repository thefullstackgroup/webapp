import { withAuthUserTokenAPI } from '../../auth/withAuthUserTokenAPI';
import initAuth from '../../../../firebase/initFirebaseApp';

initAuth();
const handler = async (req, res, AuthUser) => {
  const accessToken = await AuthUser.getIdToken();

  const response = await fetch(
    `${process.env.API_PROJECTS_URL}/gitOps/import/project?gitUri=${req.query.gitHubURL}`,
    {
      method: 'POST',
      body: '',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    }
  );
  const result = await response.json();
  res.status(result?.error ? 500 : 200).json(result);
};

export default withAuthUserTokenAPI(handler);
// export default handler;
