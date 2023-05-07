import { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import Link from 'next/link';
import Meta from 'components/common/partials/Metadata';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [emailNotFound, setEmailNotFound] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const sendPasswordResetEmail = async (email) => {
    if (email == '') {
      setEmailError(true);
      return;
    }
    try {
      setEmailError(false);
      await firebase.auth().sendPasswordResetEmail(email);
      setEmailSuccess(true);
      setEmailNotFound(false);
    } catch (err) {
      var errorCode = err.code;
      var errorMessage = err.message;
      console.log(err, errorMessage);
      setEmailError(false);

      setEmailSuccess(false);
      setEmailNotFound(true);
    }
  };

  return (
    <>
      <Meta
        title="The Full Stack | Forgot password"
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
              Forgot your password?
            </div>
            <div className="text-center text-slate-500 text-sm py-2">
              Don&apos;t panic! We will send you a link to reset your password.
            </div>
          </div>
          <div className="p-8">
            <div className="space-y-4">
              <div className="space-y-4">
                <input
                  type="text"
                  className="text-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                />

                {email == '' && emailError && (
                  <div className="text-red-500 text-sm">
                    Please enter your email address
                  </div>
                )}
                {emailNotFound && (
                  <div className="text-red-500 text-sm">
                    Something went wrong please try again
                  </div>
                )}

                {emailSuccess && (
                  <div className="text-blue-500 text-sm">
                    You will receive and email with instructions on how to reset
                    your password in a few minutes
                  </div>
                )}

                <div className="flex">
                  <button
                    type="submit"
                    className="btn-primary w-full py-3 text-lg"
                    onClick={() => sendPasswordResetEmail(email)}
                  >
                    Send password reset email
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-1 sm:space-x-2 pt-6 text-tfssecondary-500 whitespace-nowrap text-xs sm:text-sm">
                <div className="text-center hover:text-white">
                  <Link href="/login" passHref>
                    <a href="#">&larr; Back to login</a>
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

export default ForgotPassword;
