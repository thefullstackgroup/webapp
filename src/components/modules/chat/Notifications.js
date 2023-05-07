import { useCollection } from 'react-firebase-hooks/firestore';
import {
  firebase,
  firestoreCollection,
  FirestoreTimestamp,
} from 'firebase/firebaseApp';
const firestoreDB = firebase.firestore();

const getChatNotificationsTotal = (userId) => {
  let totalNotifications = 0;
  if (userId === undefined) {
    console.log('Not a valid userId to get chat notifications');
    return totalNotifications;
  }
  // Get chat notifications
  const [notifications, loading] = useCollection(
    firestoreDB.collection(firestoreCollection.CHAT_NOTIFICATIONS).doc(userId),
    {}
  );

  if (
    loading === false &&
    notifications !== undefined &&
    notifications.data() !== undefined
  ) {
    const allNotifications = notifications.data();

    if (allNotifications.channels === undefined) {
      return totalNotifications;
    }

    for (var key of Object.keys(allNotifications.channels)) {
      totalNotifications += allNotifications.channels[key].unreadMessages;
    }
  }

  return totalNotifications;
};

const getChatNotificationsPerChannel = (userId) => {
  let allNotifications = [];
  if (userId === undefined) {
    console.log('Not a valid userId to get chat notifications');
    return allNotifications;
  }
  // Get chat notifications
  const [notifications, loading] = useCollection(
    firestoreDB.collection(firestoreCollection.CHAT_NOTIFICATIONS).doc(userId),
    {}
  );

  if (
    loading === false &&
    notifications !== undefined &&
    notifications.data() !== undefined
  ) {
    const allChannelNotifications = notifications.data();

    if (allChannelNotifications.channels === undefined) {
      return allNotifications;
    }

    allNotifications = allChannelNotifications.channels;
  }

  return allNotifications;
};

const updateChatNotifications = async function (userId, chatId) {
  saveNotification(userId, {
    channels: {
      [chatId]: {
        unreadMessages: 0,
        notificationEmail: '0',
        updatedAt: FirestoreTimestamp.now(),
      },
    },
  });
};

const saveNotification = async function (userId, notification) {
  try {
    firestoreDB
      .collection(firestoreCollection.CHAT_NOTIFICATIONS)
      .doc(userId)
      .set(notification, { merge: true });
  } catch (error) {
    console.error(error);
  }
};

export {
  getChatNotificationsTotal,
  getChatNotificationsPerChannel,
  updateChatNotifications,
  saveNotification,
};
