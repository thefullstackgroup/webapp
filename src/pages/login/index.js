import {
  withAuthUser,
  AuthAction,
  withAuthUserTokenSSR,
} from 'next-firebase-auth';
import Page from 'components/modules/auth/Login';
import Loader from 'components/common/elements/Loader';
import Layout from 'components/common/layout/Layout';
import Metadata from 'components/common/partials/Metadata';
import { getUserProfile } from 'pages/api/auth/userProfile';

const Loading = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-base-800">
      <Loader />
    </div>
  );
};

const Login = () => {
  return (
    <>
      <Metadata
        title={`${process.env.brandName} | Sign in`}
        description="The Developer network"
        keywords=""
      />
      <Layout>
        <Page />
      </Layout>
    </>
  );
};

// export default Login;

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenAuthedBeforeRedirect: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.RENDER,
  LoaderComponent: Loading,
})(Login);

// export const getServerSideProps = withAuthUserTokenSSR()(
//   async ({ AuthUser, req, res }) => {
//     const accessToken = await AuthUser.getIdToken();
//     const userProfile = await getUserProfile(accessToken, null, req, res);

//     if (userProfile) {
//       return {
//         redirect: {
//           destination: '/',
//           permanent: false,
//         },
//       };
//     }

//     return {
//       props: {},
//     };
//   }
// );
