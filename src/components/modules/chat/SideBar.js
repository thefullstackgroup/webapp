import { useRouter } from 'next/router';
import { firebase } from 'firebase/firebaseApp';
import { useCollection } from 'react-firebase-hooks/firestore';
import Profile from 'components/modules/chat/Profile';
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
            `relative grid w-full grid-cols-5 items-start border-b border-base-200 p-4 outline-none duration-200 dark:border-base-700 sm:rounded-md sm:border-b-0 ` +
            (chat.id === chatId
              ? 'border-primary-500 bg-base-200 dark:bg-base-800'
              : chatNotifications[chat.id]?.unreadMessages === 1
              ? 'border-transparent'
              : 'border-transparent sm:hover:bg-base-200 sm:dark:hover:bg-base-800')
          }
          onClick={() => redirect(chat.id)}
        >
          <div className="col-span-4">
            <Profile
              user={user}
              users={chat.users}
              lastChatMessage={
                chatNotifications[chat.id]?.lastMessage?.messageDetails.text
              }
              unRead={chatNotifications[chat.id]?.unreadMessages === 1}
            />
          </div>

          <div className="col-span-1 flex justify-end pl-4">
            {chatNotifications[chat.id]?.unreadMessages === 1 ? (
              <div className="mt-2 h-3 w-3 rounded-full bg-red-500 text-xs font-medium text-white"></div>
            ) : (
              <div className="mt-0.5 flex shrink-0 justify-end text-xs text-base-400 dark:text-base-500">
                {Moment(new Date(chat?.timestamp?.seconds * 1000)).format(
                  'MMM DD'
                )}
              </div>
            )}
          </div>
        </button>
      ));
  }, [chats]);

  const redirect = (id) => {
    router.push(`/chat/${id}`);
  };

  return (
    <div className="flex h-full w-full flex-col items-start pt-0 sm:w-full sm:pt-0">
      <div className="no-scrollbar h-full w-full overflow-scroll sm:h-[75vh] lg:px-2 lg:py-2">
        {chatsLoading && (
          <div className="mt-10 flex items-center justify-center align-middle">
            <Loader />
          </div>
        )}
        {!chatsLoading && <div className="space-y-1">{chatsList}</div>}

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
