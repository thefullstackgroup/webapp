import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth';
import { getUserProfile } from 'pages/api/auth/userProfile';
import Meta from 'components/common/partials/Metadata';
import Main from 'components/modules/account/teams/CreateJob';
import Layout from 'components/common/layout/LayoutLoggedIn';

const CreateJob = ({ userProfile }) => {
  return (
    <div>
      <Meta
        title={`${process.env.brandName} | Create Job Post`}
        description="The developer network"
        keywords=""
      />
      {userProfile && (
        <Layout user={userProfile}>
          <Main user={userProfile} />
        </Layout>
      )}
    </div>
  );
};

export default withAuthUser()(CreateJob);

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
      userProfile: userProfile,
    },
  };
});
