import { withAuthUser, withAuthUserTokenSSR } from 'next-firebase-auth';
import { getUserProfile } from 'pages/api/auth/userProfile';
import Meta from 'components/common/partials/Metadata';
import Layout from 'components/common/layout/LayoutLoggedIn';
import Sidebar from 'components/modules/chat/SideBar';
import { IoChatbubblesOutline } from 'react-icons/io5';

const Chats = ({ userTFS }) => {
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
              <div className="relative max-w-5xl mx-auto">
                <div className="hidden sm:flex items-center space-x-2 p-4 font-bold w-full text-xl tracking-tight">
                  <IoChatbubblesOutline className="w-6 h-6" />
                  <span>Chat</span>
                </div>
                <div className="md:flex w-full md:rounded-md overflow-hidden">
                  <div className="w-full md:w-1/3">
                    <Sidebar user={userTFS} />
                  </div>
                  <div className="hidden md:block w-2/3 bg-tfsdark-900">
                    <div className="max-h-screen h-[75vh] flex flex-1 flex-col justify-center items-center space-y-4">
                      <p className="text-2xl tracking-tight text-gray-300 font-medium">
                        Select a conversation.
                      </p>
                      <IoChatbubblesOutline className="h-24 w-24 text-gray-300" />
                      <p className="text-lg tracking-tight text-gray-300 font-medium">
                        Or start a new one.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      )}
    </>
  );
};

export default withAuthUser()(Chats);

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
