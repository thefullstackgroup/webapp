import { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { IoLogoGithub, IoLogoLinkedin } from 'react-icons/io5';
import Meta from 'components/common/partials/Metadata';

const Page = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);

  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const gitHubProvider = new firebase.auth.GithubAuthProvider();

  const signInWithGoogle = async () => {
    try {
      const res = await firebase.auth().signInWithPopup(googleProvider);
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
    <>
      <Meta
        title="The Full Stack | Login"
        description="Discover and connect with developers sharing their work."
        keywords="developer, social network, developers, software engineering, full stack, software engineering network, tech community, tech companies, best tech companies, developer portfolio, developer network, professional network, professional community"
      />

      <div className="min-h-screen flex items-center">
        <div className="w-full max-w-md mx-auto">
          <div className="flex flex-col text-center justify-center space-y-4 sm:mb-6">
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
            <div className="mt-2 text-lg sm:text-2xl font-semibold">
              Welcome back, sign in
            </div>
          </div>
          <div className="p-8">
            <div className="space-y-4">
              <button
                className="btn-secondary btn-with-icon text-base flex justify-center px-3 py-4 w-full"
                onClick={signInWithGoogle}
              >
                <FcGoogle className="h-6 w-6" />
                <span>Continue with Google</span>
              </button>
              <button
                className="btn-secondary btn-with-icon text-base flex justify-center px-3 py-4 w-full"
                onClick={signInWithGitHub}
              >
                <IoLogoGithub className="h-6 w-6" />
                <span>Continue with GitHub</span>
              </button>
              <button
                className="btn-secondary btn-with-icon text-base flex justify-center px-3 py-4 w-full"
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
              <div className="text-center text-slate-500 text-sm py-2">
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
                    <div className="text-red-500 text-sm">
                      Sorry, wrong email or password. Try again.
                    </div>
                  )}
                  <div className="flex">
                    <button
                      type="submit"
                      className="btn-primary w-full py-3 text-lg"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </form>
              <div className="flex items-center justify-center space-x-1 sm:space-x-2 pt-6 text-tfssecondary-500 whitespace-nowrap text-xs sm:text-sm">
                <div className="text-center hover:text-white">
                  <Link href="/" passHref>
                    <a href="#">Home</a>
                  </Link>
                </div>
                <span>&middot;</span>
                <div className="text-center hover:text-white">
                  <Link href="/login/forgotpassword" passHref>
                    <a href="#">Forgot your password?</a>
                  </Link>
                </div>
                <span>&middot;</span>
                <div className="text-center hover:text-white">
                  <Link href="/signup" passHref>
                    <a href="#">Need an account?</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
