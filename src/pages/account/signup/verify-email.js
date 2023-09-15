import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth';
import Meta from 'components/common/partials/Metadata';
import Footer from 'components/modules/signup/Footer';
import Header from 'components/modules/signup/Header';
import { sendSlackMessage } from 'utils/slack/sendMessageSlack';
import { useEffect } from 'react';
import Link from 'next/link';

const VerifyEmail = () => {
  useEffect(() => {
    sendSlackMessage(`User has been displayed the verify email screen.`);
  }, []);

  return (
    <>
      <Meta
        title="thefullstack - Page Not Found"
        description="Oops"
        keywords=""
      />
      <main className="pt-4 sm:pt-10">
        <Header />
        <div className="border-base-700 mx-auto max-w-2xl rounded-md border bg-black px-0 sm:px-8">
          <div className="m-auto flex max-w-3xl flex-col space-y-8 px-4 pb-20 text-center">
            <h2 className="mb-4 mt-10 text-2xl font-bold tracking-tight">
              Please verify your email address
            </h2>
            <p className="text-lg text-gray-200">
              Thank you for signing up to The Full Stack. To continue, you need
              to verify your email address. Please check your inbox and click
              the link in the email to continue sign up.
            </p>
            <p className="text-lg text-gray-200">
              <Link href="/signup">
                <button className="btn-primary">
                  Email verified? Continue
                </button>
              </Link>
            </p>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default withAuthUser()(VerifyEmail);

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ AuthUser, req, res }) => {
  if (AuthUser.emailVerified) {
    return {
      redirect: {
        destination: '/account/signup/step1',
        permanent: false,
      },
    };
  }

  return { props: {} };
});
