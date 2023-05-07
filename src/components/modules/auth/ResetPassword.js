import Link from 'next/link';
import { React, useState } from 'react';

const ResetPassword = ({ hidePWReset, setShowEmailSend }) => {
  const [emailInput, setEmailInput] = useState(null);

  return (
    <>
      <div>
        <h3 className="flex items-center mt-10 font-mono text-lg sm:text-xl tracking-tighter text-gray-800 dark:text-gray-100">
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
            className="placeholder-gray-400 dark:bg-gray-800 mt-1 text-base block w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring-gray-500 focus:border-gray-500 dark:border-gray-700"
            value={emailInput || ''}
            onChange={(event) => setEmailInput(event.target.value)}
          />
        </div>

        {/* {emailValidation && <div>Email is not valid.</div>} */}

        <div>
          <button
            type="button"
            className="font-mono rounded-md py-3 px-4 inline-flex text-white bg-gray-800 hover:bg-gray-700 hover:text-white hover:border-transparent duration-200 focus:outline-none"
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
