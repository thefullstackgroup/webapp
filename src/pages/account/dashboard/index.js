import { withAuthUser, withAuthUserTokenSSR } from 'next-firebase-auth';
import { getUserProfile } from 'pages/api/auth/userProfile';
import Meta from 'components/common/partials/Metadata';
import Layout from 'components/common/layout/Layout';
import Page from 'components/modules/account/dashboard/Main';
import axios from 'axios';

const AccountDashboard = ({ user }) => {
  return (
    <>
      <div>
        <Meta
          title={`${process.env.brandName} | Dashboard`}
          description="The developer network"
          keywords=""
        />

        {user && (
          <Layout user={user}>
            <Page user={user} />
          </Layout>
        )}
      </div>
    </>
  );
};

export default withAuthUser()(AccountDashboard);

export const getServerSideProps = withAuthUserTokenSSR()(
  async ({ AuthUser, req, res }) => {
    const accessToken = await AuthUser.getIdToken();
    const userProfile = await getUserProfile(accessToken, null, req, res);

    if (userProfile?.redirect) {
      return {
        redirect: {
          destination: userProfile.redirect,
          permanent: false,
        },
      };
    }

    if (userProfile) {
      try {
        const connections = await axios.get(
          `${process.env.API_CONNECTIONS_URL}/users/${userProfile.userId}/connections`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        return {
          props: {
            user: userProfile,
            requestedPending: connections.data.data.requested_pending,
            receivedPending: connections.data.data.received_pending,
            connections: connections.data.data.connections,
          },
        };
      } catch (error) {
        return {
          props: {
            user: userProfile,
            requestedPending: [],
            receivedPending: [],
            connections: [],
          },
        };
      }
    }
    return { props: {} };
  }
);
