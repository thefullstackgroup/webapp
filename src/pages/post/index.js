import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth';
import { getUserProfile } from 'pages/api/auth/userProfile';
import Meta from 'components/common/partials/Metadata';
import Main from 'components/modules/create/Main';

const CreatePost = ({ user }) => {
  return (
    <div>
      <Meta
        title={`${process.env.brandName} | Post`}
        description="The developer network"
        keywords=""
      />
      <Main user={user} />
    </div>
  );
};

export default withAuthUser()(CreatePost);

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ AuthUser, req, res, query }) => {
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
      user: userProfile,
    },
  };
});
