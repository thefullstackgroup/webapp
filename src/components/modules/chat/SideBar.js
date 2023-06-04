import { useRouter } from 'next/router';
import { firebase } from 'firebase/firebaseApp';
import { useCollection } from 'react-firebase-hooks/firestore';
import Profile from 'components/modules/chat/Profile';
import { IoChatbubblesOutline } from 'react-icons/io5';
import { getChatNotificationsPerChannel } from 'components/modules/chat/Notifications';
import Moment from 'moment';
import { useMemo } from 'react';
import Loader from 'components/common/elements/Loader';
import Icon from 'components/common/elements/Icon';

const SideBar = ({ user, chatId }) => {
  const router = useRouter();

  const [chatValues, chatsLoading, chatsError] = useCollection(
    firebase
      .firestore()
      .collection('chats')
      .where('users', 'array-contains', user.userId)
      .orderBy('lastMessageTimestamp', 'desc'),
    {}
  );

  const chats = chatValues?.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  const chatNotifications = getChatNotificationsPerChannel(user.userId);

  const chatsList = useMemo(() => {
    return chats
      ?.filter((chat) => chat.users.includes(user.userId))
      .map((chat) => (
        <button
          key={chat.id}
          className={
            `relative flex w-full items-start justify-between border-b border-base-200 p-4 outline-none duration-200 dark:border-base-700 sm:border-r sm:border-b-0  ` +
            (chat.id === chatId
              ? 'border-primary-500 bg-base-200 dark:bg-base-800'
              : chatNotifications[chat.id]?.unreadMessages === 1
              ? 'border-transparent bg-highlight-alert'
              : 'border-transparent hover:bg-base-200 dark:hover:bg-base-800')
          }
          onClick={() => redirect(chat.id)}
        >
          <Profile
            user={user}
            users={chat.users}
            lastChatMessage={
              chatNotifications[chat.id]?.lastMessage?.messageDetails.text
            }
            unRead={chatNotifications[chat.id]?.unreadMessages === 1}
          />

          {chatNotifications[chat.id]?.unreadMessages === 1 ? (
            <div className="h-3 w-3 rounded-full bg-purple-500 text-xs font-medium text-white"></div>
          ) : (
            <div className="mt-1 flex flex-shrink-0 text-sm">
              {Moment(new Date(chat?.timestamp?.seconds * 1000)).format(
                'MMM DD'
              )}
            </div>
          )}
        </button>
      ));
  }, [chats]);

  const redirect = (id) => {
    router.push(`/chat/${id}`);
  };

  return (
    <div className="flex h-full w-full flex-col items-start pt-0 sm:w-full sm:pt-0">
      <div className="no-scrollbar h-full w-full overflow-scroll sm:h-[75vh]">
        {chatsLoading && (
          <div className="mt-10 flex items-center justify-center align-middle">
            <Loader />
          </div>
        )}
        {!chatsLoading && chatsList}

        {!chatsLoading && !chats?.length > 0 && (
          <div className="mt-20 flex flex-1 flex-col items-center justify-center space-y-4 sm:hidden">
            <p className="text-2xl font-medium tracking-tight text-gray-300">
              Start a conversation.
            </p>
            <Icon
              name={'FiMessageSquare'}
              className="h-24 w-24 text-gray-300"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SideBar;
