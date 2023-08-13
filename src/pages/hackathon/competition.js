import Meta from 'components/common/partials/Metadata';
import Layout from 'components/common/layout/Layout';
import Page from 'components/modules/static/hackathon/Page';
import { withAuthUserTokenSSR } from 'next-firebase-auth';
import { getUserProfile } from '../api/auth/userProfile';

const Competition = ({ user }) => {
  return (
    <>
      <Meta
        title="The Full Stack Hackathon"
        description="Announcing our first hackathon for you or your team to build an awesome project, get exposure and win awesome prizes."
        keywords="developer, social network, developers, software engineering, full stack, software engineering network, tech community, tech companies, best tech companies, developer portfolio, developer network, professional network, professional community"
        openGraphImage={'/assets/landing/hackathon/og.webp'}
      />
      <Layout user={user} fullWidth={true}>
        <Page />
      </Layout>
    </>
  );
};

export default Competition;

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
