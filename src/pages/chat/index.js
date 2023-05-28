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
          <div className="mt-0 flex w-full justify-center lg:mt-10">
            <div className="w-full px-0 md:ml-6 lg:ml-20 lg:max-w-full xl:ml-52 xl:px-4 2xl:ml-56 2xl:px-0">
              <div className="relative mx-auto max-w-5xl">
                <div className="hidden w-full items-center space-x-2 p-4 text-xl font-bold tracking-tight sm:flex">
                  <IoChatbubblesOutline className="h-6 w-6" />
                  <span>Chat</span>
                </div>
                <div className="w-full overflow-hidden md:flex md:rounded-md">
                  <div className="w-full md:w-1/3">
                    <Sidebar user={userTFS} />
                  </div>
                  <div className="hidden w-2/3 bg-base-900 md:block">
                    <div className="flex h-[75vh] max-h-screen flex-1 flex-col items-center justify-center space-y-4">
                      <p className="text-2xl font-medium tracking-tight text-gray-300">
                        Select a conversation.
                      </p>
                      <IoChatbubblesOutline className="h-24 w-24 text-gray-300" />
                      <p className="text-lg font-medium tracking-tight text-gray-300">
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
