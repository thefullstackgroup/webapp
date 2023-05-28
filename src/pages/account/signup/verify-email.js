import { withAuthUser, withAuthUserTokenSSR } from 'next-firebase-auth';
import Meta from 'components/common/partials/Metadata';
import Footer from 'components/modules/signup/Footer';
import Header from 'components/modules/signup/Header';
import { sendSlackMessage } from 'utils/slack/sendMessageSlack';
import { useEffect } from 'react';

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
        <div className="mx-auto max-w-2xl rounded-md border border-base-700 bg-black px-0 sm:px-8">
          <div className="m-auto flex max-w-3xl flex-col space-y-8 px-4 pb-20 text-center">
            <h2 className="mt-10 mb-4 text-2xl font-bold tracking-tight">
              Please verify your email address
            </h2>
            <p className="text-lg text-gray-200">
              Thank you for signing up to The Full Stack. To continue, you need
              to verify your email address. Please check your inbox and click
              the link in the email to continue sign up.
            </p>
            <p className="text-lg text-gray-200">
              <a href="/signup">
                <button className="btn-primary">
                  Email verified? Continue
                </button>
              </a>
            </p>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default withAuthUser()(VerifyEmail);

export const getServerSideProps = withAuthUserTokenSSR()(
  async ({ AuthUser, req, res }) => {
    if (AuthUser.emailVerified) {
      return {
        redirect: {
          destination: '/account/signup/step1',
          permanent: false,
        },
      };
    }

    return { props: {} };
  }
);
