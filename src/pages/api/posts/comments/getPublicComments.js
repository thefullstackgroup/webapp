import axios from 'axios';

const handler = async (req, res) => {
  return axios
    .get(`${process.env.API_COMMENTS_URL}/comments/project/${req.query.postId}`)
    .then((response) => {
      res.status(response.status).json({
        success: response.statusText,
        comments: response.data,
      });
    })
    .catch((error) => {
      res
        .status(error.response.data.status)
        .json({ error: 'Something went wrong' });
    });
};

export default handler;
// export default handler;
