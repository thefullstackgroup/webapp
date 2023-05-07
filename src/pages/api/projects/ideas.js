import axios from 'axios';

const handler = async (req, res) => {
  return axios
    .get(
      `https://raw.githubusercontent.com/thefullstackgroup/greatest-developer-portfolio-ever/main/projects/data.json`
    )
    .then((response) => {
      res.status(response.status).json({ data: response.data });
    })
    .catch((error) => {
      res.status(error.response.status).json(error.response.data);
    });
};

export default handler;
