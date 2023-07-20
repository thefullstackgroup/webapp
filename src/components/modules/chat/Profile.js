import axios from 'axios';
import Avatar from 'components/common/elements/Avatar';
import { useEffect, useState } from 'react';

const Profile = ({ users, user, lastChatMessage, unRead }) => {
  const [chatUser, setChatUser] = useState();
  const userToDisplay = users?.filter(
    (otherUser) => otherUser !== user.userId
  )[0];

  useEffect(() => {
    axios
      .get(`${process.env.BASEURL}/api/profile/getUser?userId=${userToDisplay}`)
      .then((res) => {
        setChatUser(res.data);
      })
      .catch((error) => setChatUser(null));
  }, [userToDisplay]);

  if (!chatUser) return null;

  return (
    <div className="flex items-start space-x-3">
      <div className="relative">
        <Avatar
          image={chatUser?.profilePicUrl}
          name={chatUser?.name}
          dimensions="h-11 w-11"
        />
      </div>
      <div className="overflow-hidden text-left">
        <p
          className={
            'items-center space-x-2 truncate text-left text-base font-medium ' +
            (unRead
              ? 'text-base-900 dark:text-white'
              : 'text-base-900 dark:text-base-200')
          }
        >
          {chatUser?.name}
        </p>
        <p
          className={
            'truncate text-sm font-normal ' +
            (unRead ? 'dark:text-white' : 'dark:text-base-400')
          }
        >
          {lastChatMessage
            ? lastChatMessage.replace(/(.{29})..+/, '$1…')
            : 'Start a conversation…'}
        </p>
      </div>
    </div>
  );
};

export default Profile;
