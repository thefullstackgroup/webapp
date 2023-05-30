import { withAuthUserTokenSSR } from 'next-firebase-auth';
import { getUserProfile } from 'pages/api/auth/userProfile';
import Meta from 'components/common/partials/Metadata';
import Layout from 'components/common/layout/Layout';
import Profile from 'components/modules/profile/Main';

const UserProfile = ({ user, displayName }) => {
  return (
    <>
      <Meta
        title={`${displayName} on ${process.env.brandName}`}
        description={`${displayName}'s developer story on The Full Stack`}
        keywords=""
      />
      <Layout user={user}>
        <Profile displayName={displayName} myProfile={user} />
      </Layout>
    </>
  );
};

export default UserProfile;

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

    return {
      props: {
        user: userProfile || null,
        displayName: params.userId,
      },
    };
  }
);
