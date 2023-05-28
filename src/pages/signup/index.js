import { useState } from 'react';
import { withAuthUser, AuthAction } from 'next-firebase-auth';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import Link from 'next/link';
import Loader from 'components/common/elements/Loader';
import { FcGoogle } from 'react-icons/fc';
import { IoLogoGithub, IoLogoLinkedin } from 'react-icons/io5';

const Loading = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-base-800">
      <Loader />
    </div>
  );
};

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [signUpMessage, setSignUpMessage] = useState('');
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const gitHubProvider = new firebase.auth.GithubAuthProvider();

  const signInWithGoogle = async () => {
    try {
      const res = await firebase.auth().signInWithPopup(googleProvider);
    } catch (err) {
      console.error(err);
      setSignUpMessage(
        'An error has occured signing up with Google. Please try again '
      );
    }
  };

  const signInWithGitHub = async () => {
    try {
      const res = await firebase.auth().signInWithPopup(gitHubProvider);
    } catch (err) {
      console.error(err);
      setSignUpMessage(
        'An error has occured signing up with Github. Please try again '
      );
    }
  };

  const signUpWithEmailAndPassword = async (
    email,
    password,
    repeatPassword
  ) => {
    setSignUpMessage('');

    if (email === '') {
      setSignUpMessage('Please enter your email address');
      return;
    }
    if (password !== repeatPassword) {
      setSignUpMessage('Passwords must be identical');
      return;
    }
    if (password == '' || repeatPassword == '') {
      setSignUpMessage('Passwords fields are mandatory');
      return;
    }

    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      await firebase.auth().currentUser.sendEmailVerification();
    } catch (error) {
      setSignUpMessage(
        `Sorry, wrong email or password. Try again. ${error.message}`
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center">
      <div className="mx-auto w-full max-w-md">
        <div className="flex flex-col justify-center space-y-4 text-center sm:mb-6">
          <Link href="/" passHref>
            <a href="#" className="flex items-center justify-center">
              <span className="h-16 w-16 sm:h-20 sm:w-20">
                <img
                  src="/assets/icons/thefullstack-circle.webp"
                  className="object-contain"
                  alt={process.env.brandName}
                />
              </span>
            </a>
          </Link>
          <div className="mt-2 text-lg font-semibold sm:text-2xl">
            Sign up to The Full Stack
          </div>
        </div>
        <div className="p-8">
          <div className="space-y-4">
            <button
              className="btn-secondary flex w-full items-center justify-center space-x-2 px-3 py-4 text-base"
              onClick={signInWithGoogle}
            >
              <FcGoogle className="h-6 w-6" />
              <span>Sign up with Google</span>
            </button>
            <button
              className="btn-secondary flex w-full items-center justify-center space-x-2 px-3 py-4 text-base"
              onClick={signInWithGitHub}
            >
              <IoLogoGithub className="h-6 w-6" />
              <span>Sign up with GitHub</span>
            </button>
            <button
              className="btn-secondary flex w-full items-center justify-center space-x-2 px-3 py-4 text-base"
              onClick={function () {
                window.open(
                  '/api/auth/linkedin/login',
                  'LinkedInSignIn',
                  'height=515,width=400'
                );
              }}
            >
              <IoLogoLinkedin className="h-6 w-6 text-[#0077B5]" />
              <span>Sign up with LinkedIn</span>
            </button>

            {process.env.ENABLE_EMAIL_PASS_SIGNUP && (
              <>
                <div className="py-2 text-center text-sm text-slate-400">
                  Or sign up using email
                </div>
                <input
                  type="text"
                  className="text-input text-sm md:text-base"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                />
                {email && (
                  <>
                    <input
                      type="password"
                      className="text-input"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                    />
                    <input
                      type="password"
                      className="text-input"
                      value={repeatPassword}
                      onChange={(e) => setRepeatPassword(e.target.value)}
                      placeholder="Repeat password"
                    />
                  </>
                )}

                {signUpMessage && (
                  <div className="text-sm text-red-500">{signUpMessage}</div>
                )}

                <div className="flex">
                  <button
                    className="btn-primary w-full py-3"
                    onClick={() =>
                      signUpWithEmailAndPassword(
                        email,
                        password,
                        repeatPassword
                      )
                    }
                  >
                    Continue
                  </button>
                </div>
              </>
            )}
            <div className="flex justify-center pt-6">
              <div className="text-tfssecondary-500 text-center text-sm">
                <Link href="/login" passHref>
                  <a href="#">Already have an account?</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenAuthedBeforeRedirect: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.RENDER,
  LoaderComponent: Loading,
})(SignUp);
