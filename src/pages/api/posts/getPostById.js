import axios from "axios";
import { withAuthUserTokenAPI } from "../auth/withAuthUserTokenAPI";
import initAuth from "../../../firebase/initFirebaseApp";

initAuth();

const handler = async (req, res, AuthUser) => {
  const accessToken = await AuthUser?.getIdToken();
  const requestURL = `${process.env.API_PROJECTS_URL}/project/${req.query.postId}/view`;

  if (accessToken && accessToken != undefined) {
    return axios
      .get(requestURL, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        res.status(response.status).json(response.data);
      })
      .catch((error) => {
        res.status(error.response.status).json(error.response.data);
      });
  }
};

export default withAuthUserTokenAPI(handler);
// export default handler;
