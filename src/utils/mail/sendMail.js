import fetch from 'node-fetch';

const sendMail = async (name, subject, client_message, recepient_email) => {
  const sgResponse = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
    },
    body: JSON.stringify({
      personalizations: [
        {
          to: [
            {
              email: recepient_email,
            },
          ],
          subject: subject,
        },
      ],
      from: {
        email: 'no-reply@em5863.thefullstack.network',
        name: 'The Full Stack',
      },
      content: [
        {
          type: 'text/html',
          value: `<div>${client_message}</div>`,
        },
      ],
    }),
  });
  return sgResponse;
};

export { sendMail };
