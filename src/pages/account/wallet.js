import { withAuthUser, withAuthUserTokenSSR } from 'next-firebase-auth';
import { getUserProfile } from 'pages/api/auth/userProfile';
import Meta from 'components/common/partials/Metadata';
import Layout from 'components/common/layout/Layout';
import Main from 'components/modules/account/wallet/Main';

const AccountWallet = ({ user, promo }) => {
  return (
    <>
      <Meta
        title={`${user.name} | Wallet`}
        description="The developer network"
        keywords=""
      />

      <Layout user={user}>
        <Main user={user} promo={promo} />
      </Layout>
    </>
  );
};

export default withAuthUser()(AccountWallet);

export const getServerSideProps = withAuthUserTokenSSR()(
  async ({ AuthUser, req, res }) => {
    const accessToken = await AuthUser.getIdToken();
    const userProfile = await getUserProfile(accessToken, null, req, res);

    return {
      props: {
        user: userProfile || null,
        promo: {
          code: 'EARLYADOPTER',
          value: 20,
        },
      },
    };
  }
);
