import { withAuthUser, AuthAction } from 'next-firebase-auth';
import Page from 'components/modules/auth/Login';
import Loader from 'components/common/elements/Loader';
import Layout from 'components/common/layout/Layout';
import Metadata from 'components/common/partials/Metadata';

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

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenAuthedBeforeRedirect: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.RENDER,
  LoaderComponent: Loading,
})(Login);
