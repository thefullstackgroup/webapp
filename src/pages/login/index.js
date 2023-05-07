import { withAuthUser, AuthAction } from 'next-firebase-auth';
import Page from 'components/modules/auth/Login';
import Loader from 'components/common/elements/Loader';

const Loading = () => {
  return (
    <div className="bg-tfsdark-800 min-h-screen w-full flex justify-center items-center">
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
