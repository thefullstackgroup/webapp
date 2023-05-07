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
          <div className="mt-0 lg:mt-10 w-full flex justify-center">
            <div className="w-full lg:max-w-full px-0 xl:px-4 2xl:px-0 md:ml-6 lg:ml-20 xl:ml-52 2xl:ml-56">
              <div className="fixed top-0 left-0 w-full h-full sm:h-auto sm:relative max-w-5xl mx-auto">
                <div className="hidden sm:flex items-center space-x-2 p-4 font-bold w-full text-xl tracking-tight">
                  <IoChatbubblesOutline className="w-6 h-6" />
                  <span>Chat</span>
                </div>
                <div className="md:flex w-full md:rounded-md overflow-hidden">
                  <div className="hidden md:block w-1/3">
                    {!isMobile && <Sidebar user={userTFS} chatId={id} />}
                  </div>
                  <div className="pt-14 sm:pt-0 left-0 w-full md:w-2/3 bg-tfsdark-900">
                    <Topbar chatUserInfo={chatUserInfo} user={userTFS} />

                    <div className="flex w-full pt-4 px-4 sm:px-6">
                      <div className="flex flex-col h-[65vh] md:h-[65vh] w-full overflow-hidden overflow-y-scroll overscroll-contain no-scrollbar">
                        {loading && (
                          <div className="flex flex-1 justify-center items-center">
                            <Loader />
                          </div>
                        )}
                        {!messages?.docs?.length > 0 && !loading && (
                          <div className="flex mt-40 flex-col justify-center items-center space-y-4">
                            <IoChatbubblesOutline className="h-24 w-24 text-gray-300 dark:text-gray-600" />
                            <p className="text-2xl tracking-tight text-gray-300 dark:text-gray-600 font-medium">
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
                <div className="absolute bottom-0 right-0 w-full max-w-2xl h-auto sm:h-20 bg-tfsdark-900">
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
