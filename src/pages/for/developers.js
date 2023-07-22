import Meta from 'components/common/partials/Metadata';
import Layout from 'components/common/layout/Layout';
import Page from 'components/modules/static/ForDevelopers';
import { withAuthUserTokenSSR } from 'next-firebase-auth';
import { getUserProfile } from 'pages/api/auth/userProfile';

const ForDevelopers = ({ user }) => {
  return (
    <>
      <Meta
        title="About"
        description="The Full Stack is an open source platform for developers, providing a supportive community to share projects and grow your network."
        keywords="developer, social network, developers, software engineering, full stack, software engineering network, tech community, tech companies, best tech companies, developer portfolio, developer network, professional network, professional community"
      />
      <Layout user={user}>
        <Page user={user} />
      </Layout>
    </>
  );
};

export default ForDevelopers;

export const getServerSideProps = withAuthUserTokenSSR()(
  async ({ AuthUser, req, res, query }) => {
    const accessToken = await AuthUser.getIdToken();

    // Careful - this gets a profile BUT will add a profile if does not already exist.
    const userProfile = await getUserProfile(
      accessToken,
      AuthUser,
      req,
      res,
      false //TRUE only used on this page
    );

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
