import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth';
import { getUserProfile } from 'pages/api/auth/userProfile';
import Meta from 'components/common/partials/Metadata';
import Layout from 'components/common/layout/Layout';
import Page from 'components/modules/account/settings/JobPreferences';

const JobPreferences = ({ user }) => {
  return (
    <div>
      <Meta
        title={`${process.env.brandName} | Danger Zone`}
        description="The developer network"
        keywords=""
      />
      {user && (
        <Layout user={user}>
          <Page user={user} />
        </Layout>
      )}
    </div>
  );
};

export default withAuthUser()(JobPreferences);

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ AuthUser, req, res }) => {
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
    },
  };
});
