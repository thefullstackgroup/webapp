import { withAuthUser, withAuthUserTokenSSR } from 'next-firebase-auth';
import { getUserProfile } from 'pages/api/auth/userProfile';
import Meta from 'components/common/partials/Metadata';
import Layout from 'components/common/layout/LayoutLoggedIn';
import JobDetails from 'components/modules/teams/JobDetails';

const Job = ({ userTFS, teamId, jobId }) => {
  return (
    <>
      <Meta
        title={`${process.env.brandName} | Jobs`}
        description={`Job description`}
        keywords=""
      />
      <Layout user={userTFS}>
        <JobDetails teamId={teamId} jobId={jobId} user={userTFS} />
      </Layout>
    </>
  );
};

export default withAuthUser()(Job);

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
          jobId: params.jobId,
        },
      };
    }
    return { props: {} };
  }
);
