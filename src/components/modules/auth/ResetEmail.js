import Link from 'next/link';

const ResetEmail = () => {
  return (
    <>
      <div>
        <h3 className="flex items-center mt-10 font-mono text-lg sm:text-xl tracking-tighter text-gray-800 dark:text-gray-100">
          Check Your Email
        </h3>
        Please check the email address for instructions reset your password.
        <div>
          <Link href="/fbAuthDemo/passwordreset">
            <button
              type="button"
              className="font-mono rounded-md py-3 px-4 inline-flex text-white bg-gray-800 hover:bg-gray-700 hover:text-white hover:border-transparent duration-200 focus:outline-none"
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
