import { withAuthUser, withAuthUserTokenSSR } from 'next-firebase-auth';
import { getUserProfile } from 'pages/api/auth/userProfile';
import Meta from 'components/common/partials/Metadata';
import Layout from 'components/common/layout/Layout';
import Page from 'components/modules/account/settings/SignOut';

const SignOut = ({ user }) => {
  return (
    <div>
      <Meta
        title={`${process.env.brandName} | Sign Out`}
        description="The developer network"
        keywords=""
      />
      {user && (
        <Layout user={user}>
          <Page user={user} />
        </Layout>
      )}
    </div>
  );
};

export default withAuthUser()(SignOut);

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

    return {
      props: {
        user: userProfile,
      },
    };
  }
);
