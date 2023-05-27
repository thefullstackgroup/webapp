import { withAuthUser, withAuthUserTokenSSR } from 'next-firebase-auth';
import { useEffect } from 'react';
import useUserProfile from 'hooks/useUserProfile';
import Meta from 'components/common/partials/Metadata';
import Main from 'components/modules/project/Main';
import Layout from 'components/common/layout/Layout';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';

const Project = (props) => {
  let { projectUserId, projectSlug } = props;
  const [user, getUser] = useUserProfile();

  let url = `${process.env.BASEURL}/api/posts/getPost?postId=${projectSlug}&authorId=${projectUserId}`;
  // if (!user)
  //   url = `${process.env.BASEURL}/api/posts/getPublicPost?postId=${projectSlug}&authorId=${projectUserId}`;
  const { data: project } = useSWR(url, fetcher);

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <Meta
        title={`${project?.projectName} - by ${project?.projectCreator?.name} on The Full Stack`}
        description="The developer network"
        keywords=""
      />

      {user && project && (
        <Layout user={user}>
          <Main project={project} user={user} standalone={true} />
        </Layout>
      )}
    </>
  );
};

export default withAuthUser()(Project);

export const getServerSideProps = withAuthUserTokenSSR()(
  async ({ AuthUser, params }) => {
    const userId = params.userId;
    const projectId = params.projectId;

    if (AuthUser.id === null) {
      return {
        redirect: {
          destination: `/u/${userId}/${projectId}`,
          permanent: false,
        },
      };
    }

    return {
      props: {
        projectUserId: userId,
        projectSlug: projectId,
      },
    };
  }
);
