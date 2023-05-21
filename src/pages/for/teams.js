import Meta from 'components/common/partials/Metadata';
import Layout from 'components/common/layout/Layout';
import Page from 'components/modules/static/ForTeams';

const ForTeams = () => {
  return (
    <>
      <Meta
        title="The Full Stack | For Teams | Create your team profile."
        description="A community and network to discover and connect with developers around the globe."
        keywords="developer, social network, developers, software engineering, full stack, software engineering network, tech community, tech companies, best tech companies, developer portfolio, developer network, professional network, professional community"
      />
      <Layout>
        <Page />
      </Layout>
    </>
  );
};

export default ForTeams;
