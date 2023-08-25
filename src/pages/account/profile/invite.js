import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth';
import { getUserProfile } from 'pages/api/auth/userProfile';
import Meta from 'components/common/partials/Metadata';
import Layout from 'components/common/layout/Layout';
import InviteFriends from 'components/modules/account/profile/InviteFriends';

const Invite = ({ user }) => {
  return (
    <div>
      <Meta
        title={`${user.name} | Invite your friends`}
        description="The developer network"
        keywords=""
      />

      <Layout user={user}>
        <InviteFriends user={user} />
      </Layout>
    </div>
  );
};

export default withAuthUser()(Invite);

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ AuthUser, req, res }) => {
  const accessToken = await AuthUser.getIdToken();
  const userProfile = await getUserProfile(accessToken, AuthUser, req, res);

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
      user: userProfile || null,
    },
  };
});
