import { withAuthUser, withAuthUserTokenSSR } from 'next-firebase-auth';
import axios from 'axios';

const AccountSubscriptionSuccess = () => {
  return <div></div>;
};

export default withAuthUser()(AccountSubscriptionSuccess);

export const getServerSideProps = withAuthUserTokenSSR()(
  async ({ AuthUser, req, res, query }) => {
    const accessToken = await AuthUser.getIdToken();
    const sessionId = query.session_id;
    const refPlan = query.ref_plan;

    if (!sessionId?.startsWith('cs_')) {
      throw Error('Incorrect CheckoutSession ID');
    }

    const data = {
      userAttributes: {
        accountType: refPlan,
      },
    };

    if (sessionId) {
      axios
        .patch(`${process.env.API_PROFILE_URL}/user/profile`, data, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          console.log('success');
        })
        .catch((error) => {
          console.log(error.status);
          console.log(error);
        });

      return {
        redirect: {
          destination: `${process.env.BASEURL}/account/settings/subscriptions/confirmation`,
          permanent: false,
        },
      };
    }

    return {
      props: {},
    };
  }
);
