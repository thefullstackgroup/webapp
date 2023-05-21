import { withAuthUser, withAuthUserTokenSSR } from 'next-firebase-auth';
import { getUserProfile } from 'pages/api/auth/userProfile';
import useUserProfile from 'hooks/useUserProfile';
import { useEffect } from 'react';
import Meta from 'components/common/partials/Metadata';
import Layout from 'components/common/layout/LayoutLoggedIn';
import Main from 'components/modules/projects/Main';

const Projects = () => {
  const [user, getUser] = useUserProfile();

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <Meta
        title={`${process.env.brandName} | Developer Projects`}
        description="Explore the Developer Showcase and get inspiration for your next project"
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

export default withAuthUser()(Projects);

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
      props: {},
    };
  }
);
