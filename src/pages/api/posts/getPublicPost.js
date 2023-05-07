import axios from 'axios';

const handler = async (req, res) => {
  return axios
    .get(
      `${process.env.API_PROJECTS_URL}/project/${encodeURIComponent(
        req.query.postId
      )}/user/${encodeURIComponent(req.query.authorId)}`
    )
    .then((response) => {
      res.status(response.status).json(response.data);
    })
    .catch((error) => {
      res.status(error.response.status).json(error.response.data);
    });
};

export default handler;
