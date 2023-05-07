import { withAuthUser, withAuthUserTokenSSR } from 'next-firebase-auth';
import { getUserProfile } from 'pages/api/auth/userProfile';
import Meta from 'components/common/partials/Metadata';
import Layout from 'components/common/layout/LayoutLoggedIn';
import Main from 'components/modules/account/wallet/Main';

const AccountWallet = ({ userProfile, promo }) => {
  return (
    <>
      <Meta
        title={`${process.env.brandName} | Wallet`}
        description="The developer network"
        keywords=""
      />

      {userProfile && (
        <Layout user={userProfile}>
          <Main user={userProfile} promo={promo} />
        </Layout>
      )}
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
        userProfile: userProfile,
        promo: {
          code: 'EARLYADOPTER',
          value: 20,
        },
      },
    };
  }
);
