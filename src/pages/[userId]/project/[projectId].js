import { withAuthUserTokenSSR } from 'next-firebase-auth';
import { getUserProfile } from 'pages/api/auth/userProfile';
import Meta from 'components/common/partials/Metadata';
import Main from 'components/modules/project/Main';
import Layout from 'components/common/layout/Layout';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';

const Project = ({ user, project }) => {
  // let url = `${process.env.BASEURL}/api/posts/getPost?postId=${projectSlug}&authorId=${user.id}`;
  // // if (!user)
  // //   url = `${process.env.BASEURL}/api/posts/getPublicPost?postId=${projectSlug}&authorId=${projectUserId}`;
  // const { data: project } = useSWR(url, fetcher);

  return (
    <>
      <Meta
        title={`${project?.projectName} - by ${project?.projectCreator?.name} on The Full Stack`}
        description="The developer network"
        keywords=""
      />

      {project && (
        <Layout user={user} fullWidth>
          <Main project={project} user={user} standalone={true} />
        </Layout>
      )}
    </>
  );
};

export default Project;

export const getServerSideProps = withAuthUserTokenSSR()(
  async ({ AuthUser, req, res, params }) => {
    const accessToken = await AuthUser.getIdToken();
    const userProfile = await getUserProfile(accessToken, null, req, res);
    const project = await fetcher(
      `${process.env.API_PROJECTS_URL}/project/${encodeURIComponent(
        params.projectId
      )}/user/${encodeURIComponent(params.userId)}`
    );

    return {
      props: {
        user: userProfile || null,
        project: project,
      },
    };
  }
);
