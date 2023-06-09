import { withAuthUser, withAuthUserTokenSSR } from 'next-firebase-auth';
import { useEffect } from 'react';
import { getUserProfile } from 'pages/api/auth/userProfile';
import useUserProfile from 'hooks/useUserProfile';
import Meta from 'components/common/partials/Metadata';
import Layout from 'components/common/layout/LayoutLoggedIn';
import Main from 'components/modules/teams/Main';

const Teams = () => {
  const [user, getUser] = useUserProfile();

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <Meta
        title={`${process.env.brandName} | Teams`}
        description="The Developer network"
        keywords=""
      />
      {user && (
        <Layout user={user}>
          <Main user={user} />
        </Layout>
      )}
    </>
  );
};

export default withAuthUser()(Teams);

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
      props: {},
    };
  }
);
