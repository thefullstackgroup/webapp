import axios from 'axios';

const handler = (req, res) => {
  // https://europe-west1-thefullstack.cloudfunctions.net/tfs-openGraph-cf/openGraph?ogUrl=https://www.youtube.com/watch?v=URhmC865SGI

  return axios
    .get(
      `https://europe-west1-thefullstack.cloudfunctions.net/tfs-openGraph-cf/openGraph?ogUrl=${req.query.url}`
    )
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      res.status(404).json(error);
    });
};

export default handler;
