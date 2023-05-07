import { withAuthUser, withAuthUserTokenSSR } from 'next-firebase-auth';
import { getUserProfile } from 'pages/api/auth/userProfile';
import Meta from 'components/common/partials/Metadata';
import Layout from 'components/common/layout/LayoutLoggedIn';
import Profile from 'components/modules/profile/Main';

const UserProfile = ({ userTFS, displayName }) => {
  return (
    <>
      <Meta
        title={`${process.env.brandName} | ${displayName}`}
        description={`${displayName}'s developer story on The Full Stack`}
        keywords=""
      />
      <Layout user={userTFS}>
        <Profile displayName={displayName} myProfile={userTFS} />
      </Layout>
    </>
  );
};

export default withAuthUser()(UserProfile);

export const getServerSideProps = withAuthUserTokenSSR()(
  async ({ AuthUser, req, res, params }) => {
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
          displayName: params.userId,
        },
      };
    }
    return { props: {} };
  }
);
