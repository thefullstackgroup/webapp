import React from 'react';
import { useRouter } from 'next/router';
import { firebase } from 'firebase/firebaseApp';
import { useCollection } from 'react-firebase-hooks/firestore';
import { sendSlackMessage } from 'utils/slack/sendMessageSlack';
import Icon from '../elements/Icon';

const ChatButton = ({ profile, myProfile }) => {
  const router = useRouter();

  const [chatValues, chatsLoading, chatsError] = useCollection(
    firebase
      .firestore()
      .collection('chats')
      .where('users', 'array-contains', myProfile.userId)
  );
  const chats = chatValues?.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  const chatExists = (userId) =>
    chats?.find(
      (chat) =>
        chat.users.includes(myProfile.userId) && chat.users.includes(userId)
    );

  const newChat = async () => {
    if (!chatExists(profile.userId) && profile.userId != myProfile.userId) {
      firebase
        .firestore()
        .collection('chats')
        .add({
          lastMessageTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
          users: [myProfile.userId, profile.userId],
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then((docRef) => {
          router.push(`/chat/${docRef.id}`);
        })
        .catch((error) => {
          console.error('Error adding document: ', error);
        });
      sendSlackMessage(`Initiated a chat with @${profile.displayName}`);
    } else {
      router.push(`/chat`);
    }
  };

  return (
    <div className="relative">
      <button
        className="btn btn-primary btn-with-icon w-full justify-center"
        onClick={newChat}
      >
        <Icon name={'FiMessageSquare'} className="h-5 w-5" />
        <span>Message</span>
      </button>
    </div>
  );
};

export default ChatButton;
