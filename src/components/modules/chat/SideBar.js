import { useRouter } from 'next/router';
import { firebase } from 'firebase/firebaseApp';
import { useCollection } from 'react-firebase-hooks/firestore';
import Profile from 'components/modules/chat/Profile';
import { IoChatbubblesOutline } from 'react-icons/io5';
import { getChatNotificationsPerChannel } from 'components/modules/chat/Notifications';
import Moment from 'moment';
import { useMemo } from 'react';
import Loader from 'components/common/elements/Loader';

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
            `relative flex items-start justify-between w-full p-4 outline-none sm:border-r-4 border-b sm:border-b-0 border-tfsdark-700  ` +
            (chat.id === chatId
              ? 'border-primary-500 bg-tfsdark-600/50'
              : chatNotifications[chat.id]?.unreadMessages === 1
              ? 'border-transparent bg-purple-700/20'
              : 'border-transparent hover:bg-tfsdark-700')
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
            <div className="text-white h-3 w-3 font-medium text-xs rounded-full bg-purple-500"></div>
          ) : (
            <div className="flex flex-shrink-0 text-sm mt-1">
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
    <div className="flex flex-col w-full h-full sm:w-full items-start sm:bg-tfsdark-800 pt-0 sm:pt-0">
      <div className="w-full h-full sm:h-[75vh] overflow-scroll no-scrollbar">
        {chatsLoading && (
          <div className="flex align-middle items-center justify-center mt-10">
            <Loader />
          </div>
        )}
        {!chatsLoading && chatsList}

        {!chatsLoading && !chats?.length > 0 && (
          <div className="mt-20 sm:hidden flex flex-1 flex-col justify-center items-center space-y-4">
            <p className="text-2xl tracking-tight text-gray-300 font-medium">
              Start a conversation.
            </p>
            <IoChatbubblesOutline className="h-24 w-24 text-gray-300" />
          </div>
        )}
      </div>
    </div>
  );
};

export default SideBar;
