import Link from 'next/link';
import { React, useState } from 'react';

const ResetPassword = ({ hidePWReset, setShowEmailSend }) => {
  const [emailInput, setEmailInput] = useState(null);

  return (
    <>
      <div>
        <h3 className="mt-10 flex items-center font-mono text-lg tracking-tighter text-gray-800 dark:text-gray-100 sm:text-xl">
          Forgot Your Password?
        </h3>

        <div>
          Enter your email address and we will send you instructions to reset
          your password
        </div>

        <div>
          Email address
          <input
            type="text"
            name="email"
            placeholder="Your email address"
            className="mt-1 block w-full rounded border border-gray-300 py-2 px-3 text-base placeholder-gray-400 focus:border-gray-500 focus:outline-none focus:ring-gray-500 dark:border-gray-700 dark:bg-gray-800"
            value={emailInput || ''}
            onChange={(event) => setEmailInput(event.target.value)}
          />
        </div>

        {/* {emailValidation && <div>Email is not valid.</div>} */}

        <div>
          <button
            type="button"
            className="inline-flex rounded-md bg-gray-800 py-3 px-4 font-mono text-white duration-200 hover:border-transparent hover:bg-gray-700 hover:text-white focus:outline-none"
          >
            Continue
          </button>
        </div>

        <Link href="/">Back to The Full Stack</Link>
      </div>
    </>
  );
};

export default ResetPassword;
