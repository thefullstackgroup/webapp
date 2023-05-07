import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/messaging';
import 'firebase/analytics';
import 'firebase/performance';
import 'firebase/database';
if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  });
} else {
  // console.log('Firebase is already initialised');
}

const firestoreCollection = {
  NOTIFICATIONS: 'notifications',
  NOTIFICATIONS_STATUS_READ: 'READ',
  NOTIFICATIONS_STATUS_UNREAD: 'UNREAD',
  NOTIFICATIONS_QUERY_LIMIT: 40,
  MESSAGES: 'messages',
  CHAT_NOTIFICATIONS: 'chatNotifications',
  CHATS: 'chats',
};

// // Initialize Performance Monitoring and get a reference to the service
const firebasePerf = firebase.performance;
let analytics = null;

analytics = firebase.analytics;

const FirestoreTimestamp = firebase.firestore.Timestamp;

export {
  firebase,
  analytics,
  firestoreCollection,
  FirestoreTimestamp,
  firebasePerf,
};
