import { withAuthUser, withAuthUserTokenSSR } from 'next-firebase-auth';
import { getUserProfile } from 'pages/api/auth/userProfile';
import Meta from 'components/common/partials/Metadata';
import Layout from 'components/common/layout/Layout';
import Main from 'components/modules/chat/Main';

const Chats = ({ user }) => {
  return (
    <>
      <Meta
        title={`${process.env.brandName} | Chat`}
        description="The developer network"
        keywords=""
      />

      {user && (
        <Layout user={user} hideFooter={true}>
          <Main user={user} />
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
          user: userProfile,
        },
      };
    }
    return { props: {} };
  }
);
