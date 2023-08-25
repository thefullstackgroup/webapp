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
import Page from 'components/modules/signup/StepOne';
import Header from 'components/modules/signup/Header';

const SignUpStep1 = ({ referralCode, userData }) => {
  return (
    <>
      <Meta
        title={`${process.env.brandName} | Sign up`}
        description="The developer network"
        keywords=""
      />

      <main className="bg-base-100 dark:bg-base-900 pt-4 sm:pt-10">
        <Header />
        <div className="border-base-200 dark:border-base-700 mx-auto max-w-2xl rounded-md border px-0 sm:px-8">
          <Progress step={1} />
          {userData && <Page user={userData} referralCode={referralCode} />}
        </div>
        <Footer />
      </main>
    </>
  );
};

export default withAuthUser()(SignUpStep1);

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ AuthUser, req, res }) => {
  const cookies = nookies.get({ req });
  const accessToken = await AuthUser.getIdToken();

  if (process.env.ENABLE_EMAIL_PASS_SIGNUP && !AuthUser.emailVerified) {
    return {
      redirect: {
        destination: '/account/signup/verify-email',
        permanent: false,
      },
    };
  }

  const userProfile = await getUserProfile(accessToken, null, req, res, false);

  if (userProfile?.redirect) {
    return {
      redirect: {
        destination: userProfile.redirect,
        permanent: false,
      },
    };
  }

  const referralCode = cookies.referralCode || null;
  const typeformID = cookies.typeformID || null;

  if (userProfile) {
    return {
      props: {
        referralCode: referralCode,
        typeformID: typeformID,
        userData: userProfile,
        userAgentString: '',
      },
    };
  }
  return { props: {} };
});
