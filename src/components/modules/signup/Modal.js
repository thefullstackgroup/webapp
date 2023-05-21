import { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { IoCloseOutline, IoLogoGithub, IoLogoLinkedin } from 'react-icons/io5';
import { withAuthUser, AuthAction } from 'next-firebase-auth';
import { CgSpinner } from 'react-icons/cg';
import ModalDialog from 'components/common/modals/ModalDialog';

const Loader = () => {
  return (
    <div className="flex w-full items-center justify-center bg-tfsdark-800">
      <CgSpinner className="h-14 w-14 animate-spin text-white" />
    </div>
  );
};

function SignUpModal({ show, setShow }) {
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
    <ModalDialog show={show} setShow={setShow}>
      <div className="pt-2">
        <button
          className="z-50 flex w-full justify-end text-white"
          onClick={() => setShow(!show)}
        >
          <IoCloseOutline className="h-8 w-8" />
        </button>
        <div className="w-full">
          <div className="flex items-center">
            <div className="mx-auto w-full max-w-md">
              <div className="mb-2 flex flex-col justify-center space-y-6 text-center md:mb-0">
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
                <div className="mt-2 text-2xl font-bold">
                  Sign up to The Full Stack
                </div>
              </div>
              <div className="p-4 md:p-8">
                <div className="space-y-4">
                  <button
                    className="btn-secondary flex w-full items-center justify-center space-x-2 px-3 py-3 text-sm md:py-4 md:text-base"
                    onClick={signInWithGoogle}
                  >
                    <FcGoogle className="h-6 w-6" />
                    <span>Continue with Google</span>
                  </button>
                  <button
                    className="btn-secondary flex w-full items-center justify-center space-x-2 px-3 py-3 text-sm md:py-4 md:text-base"
                    onClick={signInWithGitHub}
                  >
                    <IoLogoGithub className="h-6 w-6" />
                    <span>Continue with GitHub</span>
                  </button>
                  <button
                    className="btn-secondary flex w-full items-center justify-center space-x-2 px-3 py-3 text-sm md:py-4 md:text-base"
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

                  {/* <div className="text-center text-slate-400 text-sm py-2">
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
                    <div className="text-red-500 text-sm">{signUpMessage}</div>
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
                  </div> */}

                  <div className="text-xs text-slate-200">
                    By continuing, you agree to our{' '}
                    <Link href="/code-of-conduct" passHref>
                      <a className="font-bold">Code of Conduct</a>
                    </Link>{' '}
                    and confirm that you have read our{' '}
                    <Link href="/privacy-policy" passHref>
                      <a className="font-bold">Privacy Policy</a>
                    </Link>{' '}
                    .
                  </div>
                  <div className="flex justify-center pt-4 md:pt-6">
                    <div className="text-center text-sm text-tfssecondary-500">
                      <Link href="/login" passHref>
                        <a href="#">Already have an account?</a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModalDialog>
  );
}

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenAuthedBeforeRedirect: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.RENDER,
  LoaderComponent: Loader,
})(SignUpModal);
