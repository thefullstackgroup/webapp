import { withAuthUser, withAuthUserTokenSSR } from 'next-firebase-auth';
import { getUserProfile } from 'pages/api/auth/userProfile';
import Meta from 'components/common/partials/Metadata';
import Layout from 'components/common/layout/LayoutLoggedIn';
import Main from 'components/modules/account/teams/Main';

const ManageTeam = ({ userProfile, teamId }) => {
  return (
    <div>
      <Meta
        title={`${process.env.brandName} | Manage Team`}
        description="The developer network"
        keywords=""
      />
      {userProfile && (
        <Layout user={userProfile}>
          <Main teamId={teamId} user={userProfile} />
        </Layout>
      )}
    </div>
  );
};

export default withAuthUser()(ManageTeam);

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
        userProfile: userProfile,
      },
    };
  }
);
