import { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import Link from 'next/link';

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
      <div className="mx-auto my-12 w-full max-w-md lg:my-20">
        <div className="flex flex-col justify-center space-y-4 text-center sm:mb-6">
          <h2 className="font-manrope">Forgot your password?</h2>
          <div className="py-2 text-center text-sm text-base-600 dark:text-base-400">
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
                <div className="text-sm text-red-500">
                  Please enter your email address
                </div>
              )}
              {emailNotFound && (
                <div className="text-sm text-red-500">
                  Something went wrong please try again
                </div>
              )}

              {emailSuccess && (
                <div className="text-sm text-blue-500">
                  You will receive and email with instructions on how to reset
                  your password in a few minutes
                </div>
              )}

              <div className="flex">
                <button
                  type="submit"
                  className="btn btn-primary w-full py-2.5"
                  onClick={() => sendPasswordResetEmail(email)}
                >
                  Send password reset email
                </button>
              </div>
            </div>

            <div className="text-tfssecondary-500 flex items-center justify-center space-x-1 whitespace-nowrap pt-6 text-xs sm:space-x-2 sm:text-sm">
              <div className="text-center hover:text-white">
                <Link href="/login" passHref>
                  <a href="#">&larr; Back to login</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
