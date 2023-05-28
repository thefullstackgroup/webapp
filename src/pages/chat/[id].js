import { withAuthUser, withAuthUserTokenSSR } from 'next-firebase-auth';
import { firebase } from 'firebase/firebaseApp';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useEffect, useState, useRef } from 'react';
import { getUserProfile } from 'pages/api/auth/userProfile';
import { useRouter } from 'next/router';
import { IoChatbubblesOutline } from 'react-icons/io5';
import Meta from 'components/common/partials/Metadata';
import Layout from 'components/common/layout/LayoutLoggedIn';
import Sidebar from 'components/modules/chat/SideBar';
import Bottombar from 'components/modules/chat/BottomBar';
import Topbar from 'components/modules/chat/TopBar';
import Message from 'components/modules/chat/Message';
import axios from 'axios';
import { updateChatNotifications } from 'components/modules/chat/Notifications';
import { isMobile } from 'react-device-detect';
import Loader from 'components/common/elements/Loader';

const Chat = ({ userTFS }) => {
  const [chatUser, setChatUser] = useState();
  const [chatUserInfo, setChatUserInfo] = useState(null);

  const firestoreDB = firebase.firestore();
  const router = useRouter();
  const { id } = router.query;
  const bottomOfChat = useRef(null);
  const docRef = firestoreDB.collection('chats').doc(id);

  const getChatDoc = () => {
    docRef.get().then((doc) => {
      if (doc.exists) {
        setChatUser(
          doc
            .data()
            .users?.filter((otherUser) => otherUser !== userTFS?.userId)[0]
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
    updateChatNotifications(userTFS.userId, id);
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
    getChatDoc();
  }, [id]);

  useEffect(() => {
    getChatUserProfile();
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
    <>
      <Meta
        title={`${process.env.brandName} | Chat`}
        description="The developer network"
        keywords=""
      />

      {userTFS && (
        <Layout user={userTFS} hideMobileNav={true}>
          <div className="mt-0 flex w-full justify-center lg:mt-10">
            <div className="w-full px-0 md:ml-6 lg:ml-20 lg:max-w-full xl:ml-52 xl:px-4 2xl:ml-56 2xl:px-0">
              <div className="fixed top-0 left-0 mx-auto h-full w-full max-w-5xl sm:relative sm:h-auto">
                <div className="hidden w-full items-center space-x-2 p-4 text-xl font-bold tracking-tight sm:flex">
                  <IoChatbubblesOutline className="h-6 w-6" />
                  <span>Chat</span>
                </div>
                <div className="w-full overflow-hidden md:flex md:rounded-md">
                  <div className="hidden w-1/3 md:block">
                    {!isMobile && <Sidebar user={userTFS} chatId={id} />}
                  </div>
                  <div className="left-0 w-full bg-base-900 pt-14 sm:pt-0 md:w-2/3">
                    <Topbar chatUserInfo={chatUserInfo} user={userTFS} />

                    <div className="flex w-full px-4 pt-4 sm:px-6">
                      <div className="no-scrollbar flex h-[65vh] w-full flex-col overflow-hidden overflow-y-scroll overscroll-contain md:h-[65vh]">
                        {loading && (
                          <div className="flex flex-1 items-center justify-center">
                            <Loader />
                          </div>
                        )}
                        {!messages?.docs?.length > 0 && !loading && (
                          <div className="mt-40 flex flex-col items-center justify-center space-y-4">
                            <IoChatbubblesOutline className="h-24 w-24 text-gray-300 dark:text-gray-600" />
                            <p className="text-2xl font-medium tracking-tight text-gray-300 dark:text-gray-600">
                              Start the conversation
                            </p>
                          </div>
                        )}
                        {messages?.docs?.map((msg, index) => (
                          <Message
                            user={userTFS}
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
                </div>
                <div className="absolute bottom-0 right-0 h-auto w-full max-w-2xl bg-base-900 sm:h-20">
                  <Bottombar user={userTFS} id={id} />
                </div>
              </div>
            </div>
          </div>
        </Layout>
      )}
    </>
  );
};

export default withAuthUser()(Chat);

export const getServerSideProps = withAuthUserTokenSSR()(
  async ({ AuthUser, req, res }) => {
    const accessToken = await AuthUser.getIdToken();
    const userProfile = await getUserProfile(accessToken, null, req, res);

    if (userProfile?.redirect) {
      return {
        redirect: {
          destination: userProfile.redirect,
          permanent: false,
        },
      };
    }
    if (userProfile) {
      return {
        props: {
          userTFS: userProfile,
        },
      };
    }
    return { props: {} };
  }
);
