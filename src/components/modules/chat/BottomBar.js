import { useState } from 'react';
import { firebase } from 'firebase/firebaseApp';
import Textarea from 'react-expanding-textarea';
import * as ga from 'lib/ga';
import Icon from 'components/common/elements/Icon';
import { sendSlackMessage } from 'utils/slack/sendMessageSlack';

const BottomBar = ({ user, id }) => {
  const [input, setInput] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim().length > 0) return;

    firebase
      .firestore()
      .collection(`chats/${id}/messages`)
      .add({
        text: input,
        sender: user.userId,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((docRef) => {
        console.log('Message sent');
      })
      .catch((error) => {
        console.error('Error sending message');
      });
    setInput('');
    sendSlackMessage('Sent a message in chat');

    ga.event({
      action: 'user_sent_chat_message',
    });
  };

  return (
    <div className="relative flex w-full bg-base-900">
      <div className="absolute bottom-0 flex w-full items-center space-x-2 px-4 pb-4">
        <Textarea
          type="text"
          placeholder="Type your message ..."
          className="text-input bg-white text-base dark:bg-base-900"
          autoComplete="off"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage(e)}
        />
        <button
          className="btn btn-with-icon-only"
          type="submit"
          onClick={(e) => sendMessage(e)}
        >
          <Icon name={'FiSend'} className="h-7 w-7" />
        </button>
      </div>
    </div>
  );
};

export default BottomBar;
