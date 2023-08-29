import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth';
import { getUserProfile } from 'pages/api/auth/userProfile';
import Meta from 'components/common/partials/Metadata';
import Layout from 'components/common/layout/LayoutLoggedIn';
import Page from 'components/modules/account/settings/NotificationsPreferences';

const DataArchive = ({ userProfile }) => {
  return (
    <div>
      <Meta
        title={`${process.env.brandName} | Request Data Archive`}
        description="The developer network"
        keywords=""
      />
      {userProfile && (
        <Layout user={userProfile}>
          <Page user={userProfile} />
        </Layout>
      )}
    </div>
  );
};

export default withAuthUser()(DataArchive);

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
      userProfile: userProfile,
    },
  };
});
