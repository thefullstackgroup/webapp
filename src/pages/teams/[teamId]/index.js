import { withAuthUser, withAuthUserTokenSSR } from 'next-firebase-auth';
import { getUserProfile } from 'pages/api/auth/userProfile';
import Meta from 'components/common/partials/Metadata';
import Layout from 'components/common/layout/Layout';
import Profile from 'components/modules/teams/TeamProfile';

const TeamProfile = ({ user, teamId }) => {
  return (
    <>
      <Meta
        title={`${process.env.brandName} | Teams`}
        description={`Team profile`}
        keywords=""
      />
      <Layout user={user} headerFixed={true}>
        <Profile slug={teamId} user={user} />
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
          user: userProfile,
          teamId: params.teamId,
        },
      };
    }
    return { props: {} };
  }
);
