import { withAuthUser, AuthAction } from 'next-firebase-auth';
import Page from 'components/modules/auth/ForgotPassword';
import Loader from 'components/common/elements/Loader';

const Loading = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-base-800">
      <Loader />
    </div>
  );
};

const Login = () => {
  return <Page />;
};

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenAuthedBeforeRedirect: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.RENDER,
  LoaderComponent: Loading,
})(Login);
