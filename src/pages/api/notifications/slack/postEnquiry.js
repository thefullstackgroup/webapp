import axios from 'axios';

const handler = async (req, res) => {
  await axios
    .post(
      'https://hooks.slack.com/services/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',
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
