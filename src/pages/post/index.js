import { withAuthUser, withAuthUserTokenSSR } from 'next-firebase-auth';
import { getUserProfile } from 'pages/api/auth/userProfile';
import Meta from 'components/common/partials/Metadata';
import Main from 'components/modules/create/Main';

const CreatePost = ({ userTFS }) => {
  return (
    <div>
      <Meta
        title={`${process.env.brandName} | Create Post`}
        description="The developer network"
        keywords=""
      />
      <Main user={userTFS} />
    </div>
  );
};

export default withAuthUser()(CreatePost);

export const getServerSideProps = withAuthUserTokenSSR()(
  async ({ AuthUser, req, res, query }) => {
    const accessToken = await AuthUser.getIdToken();
    const userProfile = await getUserProfile(accessToken, null, req, res);

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
        userTFS: userProfile,
      },
    };
  }
);
