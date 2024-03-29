import { withAuthUserTokenSSR } from 'next-firebase-auth';
import { getUserProfile } from 'pages/api/auth/userProfile';
import Meta from 'components/common/partials/Metadata';
import Layout from 'components/common/layout/Layout';
import Page from 'components/modules/home/Main';

const Home = ({ user }) => {
  return (
    <>
      <Meta
        title="The Full Stack - Discover and connect with developers sharing projects"
        description="A open source platform for developers to share projects and grow a developer network around the globe."
        keywords="developer, social network, developers, software engineering, full stack, software engineering network, tech community, tech companies, best tech companies, developer portfolio, developer network, professional network, professional community"
      />

      <Layout user={user} fullWidth={true} headerAutoHide={true}>
        <Page user={user} />
      </Layout>
    </>
  );
};

export default Home;

// export default withAuthUser({
//   whenAuthed: AuthAction.RENDER,
//   whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
//   whenAuthedBeforeRedirect: AuthAction.SHOW_LOADER,
//   whenUnauthedAfterInit: AuthAction.SHOW_LOADER,
//   LoaderComponent: Loader,
// })(Home);

export const getServerSideProps = withAuthUserTokenSSR()(
  async ({ AuthUser, req, res, query }) => {
    const accessToken = await AuthUser.getIdToken();

    // Careful - this gets a profile BUT will add a profile if does not already exist.
    const userProfile = await getUserProfile(
      accessToken,
      AuthUser,
      req,
      res,
      true //TRUE only used on this page
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
