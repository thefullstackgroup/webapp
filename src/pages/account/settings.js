import { withAuthUser, withAuthUserTokenSSR } from "next-firebase-auth";
import { getUserProfile } from "pages/api/auth/userProfile";
import Meta from "components/common/partials/Metadata";
import Layout from "components/common/layout/Layout";
import Main from "components/modules/account/settings/Main";

const AccountSettings = ({ user }) => {
  return (
    <div>
      <Meta
        title={`${user?.name} | Account Settings`}
        description="The developer network"
        keywords=""
      />

      <Layout user={user}>{user && <Main user={user} />}</Layout>
    </div>
  );
};

export default withAuthUser()(AccountSettings);

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
        user: userProfile || null,
      },
    };
  }
);
