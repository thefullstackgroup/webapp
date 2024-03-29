import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth';
import { getUserProfile } from 'pages/api/auth/userProfile';
import useSWR from 'swr';
import Meta from 'components/common/partials/Metadata';
import Layout from 'components/common/layout/Layout';
import TeamProfile from 'components/modules/account/teams/TeamProfile';
import Loader from 'components/common/elements/Loader';
import fetcher from 'utils/fetcher';

const ManageTeamProfile = ({ user, teamId }) => {
  const teamsURL = `${process.env.BASEURL}/api/teams/getTeam?teamId=${teamId}`;
  const { data: team } = useSWR(teamsURL, fetcher);

  if (!team)
    return (
      <div className="flex h-96 flex-1 items-center justify-center">
        <Loader />
      </div>
    );

  return (
    <div>
      <Meta
        title={`${process.env.brandName} | Manage Teams`}
        description="The developer network"
        keywords=""
      />

      <Layout user={user}>
        <TeamProfile user={user} team={team} />
      </Layout>
    </div>
  );
};

export default withAuthUser()(ManageTeamProfile);

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
