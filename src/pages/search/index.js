import { withAuthUser, withAuthUserTokenSSR } from 'next-firebase-auth';
import { getUserProfile } from 'pages/api/auth/userProfile';
import useUserProfile from 'hooks/useUserProfile';
import { useEffect } from 'react';
import Meta from 'components/common/partials/Metadata';
import Layout from 'components/common/layout/LayoutLoggedIn';
import SearchResults from 'components/modules/explore/SearchResults';

const Search = () => {
  const [user, getUser] = useUserProfile();

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <Meta
        title={`${process.env.brandName} | Search showcase`}
        description="Search the Developer Showcase and get inspiration for your next project"
        keywords=""
      />

      {user && (
        <Layout user={user}>
          <SearchResults user={user} />
        </Layout>
      )}
    </>
  );
};

export default withAuthUser()(Search);

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
