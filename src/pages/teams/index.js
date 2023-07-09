import { withAuthUserTokenSSR } from 'next-firebase-auth';
import { getUserProfile } from 'pages/api/auth/userProfile';
import Meta from 'components/common/partials/Metadata';
import Layout from 'components/common/layout/Layout';
import Main from 'components/modules/teams/Main';

const Teams = ({ user }) => {
  return (
    <>
      <Meta
        title={`${process.env.brandName} | Teams`}
        description="The Developer network"
        keywords=""
      />

      <Layout user={user} headerFixed={true}>
        <Main user={user} />
      </Layout>
    </>
  );
};

export default Teams;

export const getServerSideProps = withAuthUserTokenSSR()(
  async ({ AuthUser, req, res, query }) => {
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
      props: { user: userProfile || null },
    };
  }
);
