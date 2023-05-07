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
        <div className="bg-black max-w-2xl mx-auto rounded-md border border-tfsdark-700 px-0 sm:px-8">
          <div className="flex flex-col m-auto max-w-3xl px-4 text-center pb-20 space-y-8">
            <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4">
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
