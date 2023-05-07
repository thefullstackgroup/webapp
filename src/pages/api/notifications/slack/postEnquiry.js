import axios from 'axios';

const handler = async (req, res) => {
  await axios
    .post(
      process.env.SLACK_POST_MESSAGE_URL,
      JSON.stringify({
        text: req.body.message,
      }),
      {
        headers: {
          'content-type': 'application/json',
        },
      }
    )
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

export default handler;
