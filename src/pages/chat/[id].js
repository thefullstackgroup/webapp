import { withAuthUser, withAuthUserTokenSSR } from 'next-firebase-auth';
import { getUserProfile } from 'pages/api/auth/userProfile';
import { useRouter } from 'next/router';
import Meta from 'components/common/partials/Metadata';
import Layout from 'components/common/layout/Layout';
import Main from 'components/modules/chat/Main';

const Chat = ({ user }) => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Meta
        title={`${process.env.brandName} | Chat`}
        description="The developer network"
        keywords=""
      />

      {user && (
        <Layout user={user} hideMobileNav={true} hideFooter={true}>
          <Main user={user} chatId={id} />
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
          user: userProfile,
        },
      };
    }
    return { props: {} };
  }
);
