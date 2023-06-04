import { isMobile } from 'react-device-detect';
import { updateChatNotifications } from 'components/modules/chat/Notifications';
import { firebase } from 'firebase/firebaseApp';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import SideBar from './SideBar';
import TopBar from './TopBar';
import Loader from 'components/common/elements/Loader';
import Icon from 'components/common/elements/Icon';
import Message from './Message';
import BottomBar from './BottomBar';

const Main = ({ user, chatId }) => {
  const bottomOfChat = useRef(null);
  const [chatUser, setChatUser] = useState();
  const [chatUserInfo, setChatUserInfo] = useState(null);

  const firestoreDB = firebase.firestore();
  const router = useRouter();
  const { id } = router.query;
  const docRef = firestoreDB.collection('chats').doc(id);

  const getChatDoc = () => {
    docRef.get().then((doc) => {
      if (doc.exists) {
        setChatUser(
          doc.data().users?.filter((otherUser) => otherUser !== user?.userId)[0]
        );
      }
    });
  };

  // get messages for chat ID
  const [messages, loading] = useCollection(
    firestoreDB.collection(`chats/${id}/messages`).orderBy('timestamp', 'asc'),
    {}
  );

  // Update chat notifications as Read
  if (!loading && messages?.docs?.length > 0) {
    updateChatNotifications(user.userId, id);
  }

  const getChatUserProfile = () => {
    if (chatUser != undefined) {
      axios
        .get(`${process.env.BASEURL}/api/profile/getUser?userId=${chatUser}`)
        .then((res) => {
          setChatUserInfo(res.data);
        })
        .catch((error) => console.log(error));
    }
  };

  useEffect(() => {
    if (id) getChatDoc();
  }, [id]);

  useEffect(() => {
    if (id) getChatUserProfile();
  }, [chatUser]);

  useEffect(() => {
    setTimeout(
      bottomOfChat?.current?.scrollIntoView({
        behavior: 'auto',
        block: 'start',
      }),
      10
    );
  }, [messages]);

  return (
    <div className="mx-auto mt-0 w-full max-w-5xl justify-center lg:mt-6">
      <div className="hidden w-full py-4 text-4xl font-medium tracking-tight sm:block">
        Messages
      </div>
      <div className="w-full overflow-hidden border border-base-200 dark:border-base-700 md:flex md:rounded-lg">
        <div className="hidden w-1/3 md:block">
          {!isMobile && <SideBar user={user} chatId={chatId} />}
        </div>
        <div className="relative left-0 flex w-full flex-col justify-between bg-base-50 dark:bg-base-900 sm:pt-0 md:w-2/3">
          <div>
            {!loading && chatId && (
              <TopBar chatUserInfo={chatUserInfo} user={user} />
            )}

            <div className="flex w-full px-4 pt-4 sm:px-6">
              <div className="no-scrollbar flex h-[60vh] w-full flex-col overflow-hidden overflow-y-scroll overscroll-contain md:h-[60vh]">
                {loading && (
                  <div className="mt-40 flex flex-col items-center justify-center space-y-4">
                    <Loader />
                  </div>
                )}
                {!messages?.docs?.length > 0 && !loading && (
                  <div className="mt-40 flex flex-col items-center justify-center space-y-4">
                    <Icon
                      name={'FiMessageSquare'}
                      className="h-24 w-24 text-base-200 dark:text-base-500"
                    />
                    <p className="text-2xl font-medium tracking-tight text-base-200 dark:text-base-500">
                      Select conversation
                    </p>
                  </div>
                )}
                {messages?.docs?.map((msg, index) => (
                  <Message
                    user={user}
                    message={msg.data()}
                    key={index}
                    numberOfMessages={messages?.docs?.length}
                    currentMessageIndex={index}
                  />
                ))}
                <div ref={bottomOfChat} className="py-10 md:py-8"></div>
              </div>
            </div>
          </div>
          {chatId && (
            <div className="h-auto w-full bg-base-800">
              <BottomBar user={user} id={chatId} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;
