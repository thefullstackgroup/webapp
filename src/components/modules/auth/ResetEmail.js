import Link from 'next/link';

const ResetEmail = () => {
  return (
    <>
      <div>
        <h3 className="mt-10 flex items-center font-mono text-lg tracking-tighter text-gray-800 dark:text-gray-100 sm:text-xl">
          Check Your Email
        </h3>
        Please check the email address for instructions reset your password.
        <div>
          <Link href="/fbAuthDemo/passwordreset">
            <button
              type="button"
              className="inline-flex rounded-md bg-gray-800 py-3 px-4 font-mono text-white duration-200 hover:border-transparent hover:bg-gray-700 hover:text-white focus:outline-none"
            >
              Resend Email
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ResetEmail;
