let output = `importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts( 'https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

firebase.initializeApp({
  apiKey: '${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}',
  authDomain: '${process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN}',
  projectId: '${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}',
  messagingSenderId: '${process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID}',
  appId: '${process.env.NEXT_PUBLIC_FIREBASE_APP_ID}',
  measurementId: '${process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID}',
});

const messaging = firebase.messaging();
// console.log('Service worker ready');
`;
const handler = async (req, res) => {
  res.status(200).send(output);
};

export default handler;
