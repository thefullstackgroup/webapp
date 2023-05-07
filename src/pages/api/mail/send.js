import { sendMail } from 'utils/mail/sendMail';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { email, name, subject, client_message } = req.body;

      const sendGridResponse = await sendMail(
        name,
        subject,
        client_message,
        email
      );

      return res.status(sendGridResponse.status).send({
        sg_response: sendGridResponse,
      });
    } catch (err) {
      console.log('ERROR WHILE SENDING MAIL >> ', err);

      return res.status(400).send({
        err_message: 'bad request',
      });
    }
  }

  res.status(400).send({ error: 'bad request' });
}
