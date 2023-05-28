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
    <div className="flex items-start space-x-2">
      <div className="group relative">
        <Avatar
          image={chatUser?.profilePicUrl}
          name={chatUser?.name}
          dimensions="h-11 w-11"
        />
      </div>
      <div className="flex flex-col text-left">
        <div
          className={
            'items-center space-x-2 text-left text-base font-medium ' +
            (unRead ? 'text-white' : 'text-base-300')
          }
        >
          {chatUser?.name}
        </div>
        <span
          className={
            'text-sm font-normal line-clamp-1 ' +
            (unRead ? 'text-white' : 'text-base-500')
          }
        >
          {lastChatMessage
            ? lastChatMessage.replace(/(.{29})..+/, '$1…')
            : 'Start a conversation…'}
        </span>
      </div>
    </div>
  );
};

export default Profile;
