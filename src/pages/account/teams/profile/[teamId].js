import { withAuthUser, withAuthUserTokenSSR } from 'next-firebase-auth';
import { getUserProfile } from 'pages/api/auth/userProfile';
import useSWR from 'swr';
import Meta from 'components/common/partials/Metadata';
import Layout from 'components/common/layout/LayoutLoggedIn';
import TeamProfile from 'components/modules/account/teams/TeamProfile';
import Loader from 'components/common/elements/Loader';
import fetcher from 'utils/fetcher';

const ManageTeamProfile = ({ userProfile, teamId }) => {
  const teamsURL = `${process.env.BASEURL}/api/teams/getTeam?teamId=${teamId}`;
  const { data: team } = useSWR(teamsURL, fetcher);

  if (!team)
    return (
      <div className="flex flex-1 justify-center items-center h-96">
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
      {userProfile && team && (
        <Layout user={userProfile}>
          <TeamProfile user={userProfile} team={team} />
        </Layout>
      )}
    </div>
  );
};

export default withAuthUser()(ManageTeamProfile);

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
        userProfile: userProfile,
        teamId: params.teamId,
      },
    };
  }
);
