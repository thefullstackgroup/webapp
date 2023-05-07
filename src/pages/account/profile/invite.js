import { withAuthUser, withAuthUserTokenSSR } from 'next-firebase-auth';
import { getUserProfile } from 'pages/api/auth/userProfile';
import Meta from 'components/common/partials/Metadata';
import Layout from 'components/common/layout/LayoutLoggedIn';
import InviteFriends from 'components/modules/account/profile/InviteFriends';

const Invite = ({ userProfile }) => {
  return (
    <div>
      <Meta
        title={`${process.env.brandName} | Invite friends`}
        description="The developer network"
        keywords=""
      />
      {userProfile && (
        <Layout user={userProfile}>
          <InviteFriends user={userProfile} />
        </Layout>
      )}
    </div>
  );
};

export default withAuthUser()(Invite);

export const getServerSideProps = withAuthUserTokenSSR()(
  async ({ AuthUser, req, res }) => {
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
        userProfile: userProfile,
      },
    };
  }
);
