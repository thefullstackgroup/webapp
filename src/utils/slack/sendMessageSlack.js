import axios from 'axios';

const sendSlackMessage = (message) => {
  axios.post(`${process.env.BASEURL}/api/notifications/slack/postMessage`, {
    message: message,
  });
  return true;
};

export { sendSlackMessage };
