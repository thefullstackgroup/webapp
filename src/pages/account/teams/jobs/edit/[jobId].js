import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth';
import { getUserProfile } from 'pages/api/auth/userProfile';
import Meta from 'components/common/partials/Metadata';
import Main from 'components/modules/account/teams/EditJob';
import Layout from 'components/common/layout/LayoutLoggedIn';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from 'components/common/elements/Loader';

const EditJob = ({ userProfile, jobId }) => {
  const [job, setJob] = useState();

  const getJob = async () => {
    await axios
      .get(`${process.env.BASEURL}/api/jobs/get?jobId=${jobId}`)
      .then((response) => {
        setJob(response.data);
      })
      .catch((error) => {
        console.log(error.status);
      });
  };

  useEffect(() => {
    getJob();
  }, []);

  if (!job) {
    return (
      <div className="mt-4 flex w-full flex-1 justify-center py-40">
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <Meta
        title={`${process.env.brandName} | Tools`}
        description="The developer network"
        keywords=""
      />
      {userProfile && (
        <Layout user={userProfile}>
          <Main user={userProfile} job={job} />
        </Layout>
      )}
    </div>
  );
};

export default withAuthUser()(EditJob);

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ AuthUser, req, res, params }) => {
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

  return {
    props: {
      userProfile: userProfile,
      jobId: params.jobId,
    },
  };
});
