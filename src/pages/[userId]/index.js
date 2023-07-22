import { withAuthUserTokenSSR } from 'next-firebase-auth';
import { getUserProfile } from 'pages/api/auth/userProfile';
import Meta from 'components/common/partials/Metadata';
import Layout from 'components/common/layout/Layout';
import Profile from 'components/modules/profile/Main';
import fetcher from 'utils/fetcher';

const UserProfile = ({ user, profile }) => {
  console.log(profile);
  if (!profile) {
    return (
      <>
        <Meta title="The Full Stack" description="" keywords="" />
        <Layout user={user}>
          <div>User does not exist</div>
        </Layout>
      </>
    );
  }
  return (
    <>
      <Meta
        title={`${profile.name} - ${profile.currentTitle}`}
        description={
          profile.bio.aboutUser ||
          `Check out my developer profile on The Full Stack`
        }
        keywords=""
      />
      <Layout user={user}>
        <Profile profile={profile} myProfile={user} />
      </Layout>
    </>
  );
};

export default UserProfile;

export const getServerSideProps = withAuthUserTokenSSR()(
  async ({ AuthUser, req, res, params }) => {
    const accessToken = await AuthUser.getIdToken();
    const userProfile = await getUserProfile(accessToken, null, req, res);

    const profile = await fetcher(
      `${process.env.API_PROFILE_URL}/profile/user/${encodeURIComponent(
        params.userId
      )}`
    );

    if (profile.error) {
      return {
        redirect: {
          destination: '/404',
          permanent: false,
        },
      };
    }

    if (userProfile?.redirect) {
      return {
        redirect: {
          destination: userProfile.redirect,
          permanent: false,
        },
      };
    }

    return {
      props: {
        user: userProfile || null,
        profile: profile,
      },
    };
  }
);
