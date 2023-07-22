import { withAuthUserTokenSSR } from 'next-firebase-auth';
import { getUserProfile } from './api/auth/userProfile';
import Meta from 'components/common/partials/Metadata';
import Layout from 'components/common/layout/Layout';
import Page from 'components/modules/static/policies/PrivacyPolicy';

const PrivacyPolicy = ({ user }) => {
  return (
    <>
      <Meta
        title="The Full Stack - Privacy policy"
        description="Read the privacy policy for The Full Stack community platform for Developers"
        keywords="developer, social network, developers, software engineering, full stack, software engineering network, tech community, tech companies, best tech companies, developer portfolio, developer network, professional network, professional community"
      />
      <Layout user={user}>
        <div className="pt-10 sm:pt-28">
          <Page />
        </div>
      </Layout>
    </>
  );
};

export default PrivacyPolicy;

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
