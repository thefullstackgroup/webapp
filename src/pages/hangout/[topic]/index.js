import { withAuthUserTokenSSR } from 'next-firebase-auth';
import { getUserProfile } from 'pages/api/auth/userProfile';
import Meta from 'components/common/partials/Metadata';
import Layout from 'components/common/layout/Layout';
import Main from 'components/modules/hangout/Main';

const HangoutTopic = ({ user, topic }) => {
  return (
    <>
      <Meta
        title={`${process.env.brandName} | Community`}
        description="The Developer network"
        keywords=""
      />

      <Layout user={user} headerFixed={true} hideFooter={true}>
        <Main user={user} topic={topic} />
      </Layout>
    </>
  );
};

export default HangoutTopic;

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
      props: { user: userProfile || null, topic: query.topic },
    };
  }
);
