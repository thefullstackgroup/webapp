import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth';
import { getUserProfile } from 'pages/api/auth/userProfile';
import nookies from 'nookies';
import dynamic from 'next/dynamic';
const Meta = dynamic(() => import('components/common/partials/Metadata'));
import Progress from 'components/modules/signup/ProgressBar';
import Footer from 'components/modules/signup/Footer';
import Page from 'components/modules/signup/StepTwo';
import Header from 'components/modules/signup/Header';

const SignUpStep2 = ({ userData }) => {
  return (
    <>
      <Meta
        title={`${process.env.brandName} | Getting started`}
        description="The developer network"
        keywords=""
      />

      <main className="pt-4 sm:pt-10">
        <Header />
        <div className="mx-auto max-w-2xl rounded-md border border-base-200 px-0 dark:border-base-700 sm:px-8">
          <Progress step={2} />
          {userData && <Page user={userData} />}
        </div>
        <Footer />
      </main>
    </>
  );
};

export default withAuthUser()(SignUpStep2);

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ AuthUser, req, res }) => {
  const cookies = nookies.get({ req });
  const accessToken = await AuthUser.getIdToken();
  const userProfile = await getUserProfile(accessToken, null, req, res, false);

  if (process.env.ENABLE_EMAIL_PASS_SIGNUP && !AuthUser.emailVerified) {
    return {
      redirect: {
        destination: '/account/signup/verify-email',
        permanent: false,
      },
    };
  }

  if (userProfile?.redirect) {
    return {
      redirect: {
        destination: userProfile.redirect,
        permanent: false,
      },
    };
  }

  const referralCode = cookies.referralCode || null;
  if (userProfile) {
    return {
      props: {
        referralCode: referralCode,
        userData: userProfile,
        userAgentString: '',
      },
    };
  }
  return { props: {} };
});
