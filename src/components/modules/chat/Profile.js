import Avatar from 'components/common/elements/Avatar';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';

const Profile = ({ users, user, lastChatMessage, unRead }) => {
  const userToDisplay = users?.filter(
    (otherUser) => otherUser !== user.userId
  )[0];

  const url = `${process.env.BASEURL}/api/profile/getUser?userId=${userToDisplay}`;
  const { data: chatUser } = useSWR(url, fetcher);

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
