import nookies from 'nookies';
import { AuthAction, withAuthUserTokenSSR } from 'next-firebase-auth';

const ReferralCode = () => {
  return <></>;
};

export default ReferralCode;

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.RENDER,
})(async ({ params, res }) => {
  const referralCode = params.code;
  nookies.set({ res }, 'referralCode', referralCode, {
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
  });

  return {
    redirect: {
      destination: `${process.env.BASEURL}`,
      permanent: false,
    },
  };
});
