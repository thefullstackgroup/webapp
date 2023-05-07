import { withAuthUser, withAuthUserTokenSSR } from 'next-firebase-auth';
import { getUserProfile } from 'pages/api/auth/userProfile';
import Meta from 'components/common/partials/Metadata';
import Layout from 'components/common/layout/LayoutLoggedIn';
import Profile from 'components/modules/teams/TeamProfile';

const TeamProfile = ({ userTFS, teamId }) => {
  return (
    <>
      <Meta
        title={`${process.env.brandName} | Teams`}
        description={`Team profile`}
        keywords=""
      />
      <Layout user={userTFS}>
        <Profile slug={teamId} user={userTFS} />
      </Layout>
    </>
  );
};

export default withAuthUser()(TeamProfile);

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
          teamId: params.teamId,
        },
      };
    }
    return { props: {} };
  }
);
