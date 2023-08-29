import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth';
import { getUserProfile } from 'pages/api/auth/userProfile';
import Meta from 'components/common/partials/Metadata';
import Layout from 'components/common/layout/Layout';
import JobListings from 'components/modules/account/teams/Jobs';

const TeamJobs = ({ user, teamId }) => {
  return (
    <div>
      <Meta
        title={`${process.env.brandName} | Manage Team Jobs`}
        description="The developer network"
        keywords=""
      />
      {user && (
        <Layout user={user}>
          <JobListings teamId={teamId} user={user} />
        </Layout>
      )}
    </div>
  );
};

export default withAuthUser()(TeamJobs);

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ AuthUser, req, res, params }) => {
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
      teamId: params.teamId,
    },
  };
});
