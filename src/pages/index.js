import Meta from 'components/common/partials/Metadata';
import Layout from 'components/common/layout/Layout';
import Page from 'components/modules/static/Home';

const Home = () => {
  return (
    <>
      <Meta
        title="The Full Stack | Discover and connect with developers sharing their work."
        description="A community and network to discover and connect with developers around the globe."
        keywords="developer, social network, developers, software engineering, full stack, software engineering network, tech community, tech companies, best tech companies, developer portfolio, developer network, professional network, professional community"
      />
      <Layout>
        <Page />
      </Layout>
    </>
  );
};

export default Home;

// export default withAuthUser({
//   whenAuthed: AuthAction.REDIRECT_TO_APP,
//   whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
//   whenAuthedBeforeRedirect: AuthAction.SHOW_LOADER,
//   whenUnauthedAfterInit: AuthAction.RENDER,
//   LoaderComponent: Loader,
// })(Home);
