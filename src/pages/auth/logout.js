import {
  useAuthUser,
  withAuthUserTokenSSR,
  withAuthUser,
} from 'next-firebase-auth';

const Logout = () => {
  const AuthUser = useAuthUser();
  return (
    <div>
      <p>Your email is {AuthUser.email ? AuthUser.email : 'unknown'}.</p>

      <button
        type="button"
        onClick={() => {
          AuthUser.signOut();
        }}
      >
        Sign out
      </button>
    </div>
  );
};

export default withAuthUser()(Logout);

export const getServerSideProps = withAuthUserTokenSSR()();
