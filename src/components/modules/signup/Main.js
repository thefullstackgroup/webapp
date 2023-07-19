import { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { CgSpinner } from 'react-icons/cg';
import Icon from 'components/common/elements/Icon';

const Loader = () => {
  return (
    <div className="flex w-full items-center justify-center bg-base-800">
      <CgSpinner className="h-14 w-14 animate-spin text-white" />
    </div>
  );
};

const Main = () => {
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
    <div className="mx-auto my-12 w-full max-w-md lg:my-20">
      <div className="mb-2 flex flex-col justify-center space-y-6 text-center md:mb-0">
        <h2 className="mt-2 font-manrope">Sign up to The Full Stack</h2>
      </div>
      <div className="p-4 md:p-8">
        <div className="space-y-4">
          <button
            className="btn btn-secondary btn-with-icon w-full justify-center py-3"
            onClick={signInWithGoogle}
          >
            <FcGoogle className="h-6 w-6" />
            <span>Continue with Google</span>
          </button>
          <button
            className="btn btn-secondary btn-with-icon w-full justify-center py-3"
            onClick={signInWithGitHub}
          >
            <Icon name="IoLogoGithub" pack="Io" className="h-6 w-6" />
            <span>Continue with GitHub</span>
          </button>
          <button
            className="btn btn-secondary btn-with-icon w-full justify-center py-3"
            onClick={function () {
              window.open(
                '/api/auth/linkedin/login',
                'LinkedInSignIn',
                'height=515,width=400'
              );
            }}
          >
            <Icon
              name="IoLogoLinkedin"
              pack="Io"
              className="h-6 w-6 text-[#0077B5]"
            />
            <span>Continue with LinkedIn</span>
          </button>

          {/* <div className="py-2 text-center text-sm text-base-600 dark:text-base-400">
            Or sign up using email
          </div>
          <input
            type="text"
            className="text-input"
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
              className="btn btn-primary w-full py-2"
              onClick={() =>
                signUpWithEmailAndPassword(email, password, repeatPassword)
              }
            >
              Continue
            </button>
          </div> */}

          <div className="pt-6 text-center text-xs">
            By continuing, you agree to the{' '}
            <Link href="/code-of-conduct" passHref>
              <a className="font-bold">Code of Conduct</a>
            </Link>{' '}
            and confirm that you have read the{' '}
            <Link href="/privacy-policy" passHref>
              <a className="font-bold">Privacy Policy</a>
            </Link>{' '}
            .
          </div>
          <div className="flex justify-center pt-4 md:pt-6">
            <div className="text-tfssecondary-500 text-center text-sm">
              <Link href="/login" passHref>
                <a href="#">Already have an account?</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
