import { withAuthUser, withAuthUserTokenSSR } from 'next-firebase-auth';
import { getUserProfile } from 'pages/api/auth/userProfile';
import Meta from 'components/common/partials/Metadata';
import Layout from 'components/common/layout/Layout';
import DangerZone from 'components/modules/account/settings/DangerZone';

const Danger = ({ user }) => {
  return (
    <div>
      <Meta
        title={`${process.env.brandName} | Danger Zone`}
        description="The developer network"
        keywords=""
      />
      {user && (
        <Layout user={user}>
          <DangerZone user={user} />
        </Layout>
      )}
    </div>
  );
};

export default withAuthUser()(Danger);

export const getServerSideProps = withAuthUserTokenSSR()(
  async ({ AuthUser, req, res }) => {
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
  }
);
