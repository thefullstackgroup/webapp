import { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { IoLogoGithub, IoLogoLinkedin } from 'react-icons/io5';
import ModalAlert from 'components/common/modals/ModalAlert';
import { useRouter } from 'next/router';

const LoginModal = ({ show, setShow }) => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);

  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const gitHubProvider = new firebase.auth.GithubAuthProvider();

  const signInWithGoogle = async () => {
    try {
      const res = await firebase.auth().signInWithPopup(googleProvider);
      if (res.user.email)
        router.push(
          `/login?destination=${process.env.BASEURL}${router.asPath}`
        );
    } catch (err) {
      console.error(err);
    }
  };

  const signInWithGitHub = async () => {
    try {
      const res = await firebase.auth().signInWithPopup(gitHubProvider);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = (event) => {
    // Prevent page reload
    event.preventDefault();
    signInWithEmailAndPassword(email, password);
  };

  const signInWithEmailAndPassword = async (email, password) => {
    if (email != '') {
      try {
        setEmailError(false);
        await firebase.auth().signInWithEmailAndPassword(email, password);
      } catch (err) {
        setEmailError(true);
      }
    }
  };

  return (
    <ModalAlert show={show} setShow={setShow} title="Login">
      <div className="my-10 flex items-center">
        <div className="mx-auto w-full max-w-md">
          <div className="flex flex-col justify-center space-y-4 text-center">
            <div className="mt-2 text-lg font-semibold sm:text-2xl">
              Welcome back, sign in
            </div>
          </div>
          <div className="p-8">
            <div className="space-y-4">
              <button
                className="btn btn-secondary btn-with-icon flex w-full justify-center px-3 py-3 text-base"
                onClick={signInWithGoogle}
              >
                <FcGoogle className="h-6 w-6" />
                <span>Continue with Google</span>
              </button>
              <button
                className="btn btn-secondary btn-with-icon flex w-full justify-center px-3 py-3 text-base"
                onClick={signInWithGitHub}
              >
                <IoLogoGithub className="h-6 w-6" />
                <span>Continue with GitHub</span>
              </button>
              <button
                className="btn btn-secondary btn-with-icon flex w-full justify-center px-3 py-3 text-base"
                onClick={function () {
                  window.open(
                    '/api/auth/linkedin/login',
                    'LinkedInSignIn',
                    'height=515,width=400'
                  );
                }}
              >
                <IoLogoLinkedin className="h-6 w-6 text-[#0077B5]" />
                <span>Continue with LinkedIn</span>
              </button>
              <div className="py-2 text-center text-sm">
                Or sign in using email
              </div>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <input
                    type="text"
                    className="text-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                  />
                  {email != '' && (
                    <input
                      type="password"
                      className="text-input"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                    />
                  )}
                  {email != '' && emailError && (
                    <div className="text-sm text-red-500">
                      Sorry, wrong email or password. Try again.
                    </div>
                  )}
                  <div className="flex">
                    <button
                      type="submit"
                      className="btn btn-primary w-full py-2.5"
                    >
                      Continue with email
                    </button>
                  </div>
                </div>
              </form>
              <div className="flex items-center justify-center space-x-1 whitespace-nowrap pt-6 text-sm sm:space-x-2 sm:text-sm">
                {/* <div className="text-center">
                  <Link href="/login/forgotpassword" passHref>
                    <a href="#">Forgot your password?</a>
                  </Link>
                </div>
                <span>&middot;</span> */}
                <div className="text-center">
                  <Link href="/signup" passHref>
                    <a href="#">Need an account?</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModalAlert>
  );
};

export default LoginModal;
