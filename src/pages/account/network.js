import {
  withAuthUser,
  AuthAction,
  withAuthUserTokenSSR,
} from 'next-firebase-auth';
import { getUserProfile } from 'pages/api/auth/userProfile';
import Meta from 'components/common/partials/Metadata';
import Layout from 'components/common/layout/Layout';
import Main from 'components/modules/account/network/Main';

const AccountNetwork = ({ user }) => {
  return (
    <>
      <div>
        <Meta
          title={`${process.env.brandName} | My Network`}
          description="The developer network"
          keywords=""
        />

        <Layout user={user}>
          <Main user={user} />
        </Layout>
      </div>
    </>
  );
};

export default withAuthUser()(AccountNetwork);

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
      user: userProfile || null,
    },
  };
});
