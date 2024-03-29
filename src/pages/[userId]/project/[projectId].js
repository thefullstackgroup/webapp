import { withAuthUserTokenSSR } from 'next-firebase-auth';
import { getUserProfile } from 'pages/api/auth/userProfile';
import Meta from 'components/common/partials/Metadata';
import Main from 'components/modules/project/Main';
import Layout from 'components/common/layout/Layout';
import fetcher from 'utils/fetcher';
import axios from 'axios';

const Project = ({ user, project, author }) => {
  return (
    <>
      <Meta
        title={`${project?.projectName} - by ${project?.projectCreator?.name}`}
        description={`${project?.projectBodyPreview.substr(
          0,
          Math.min(140, project?.projectBodyPreview.lastIndexOf(' '))
        )}`}
        keywords=""
        openGraphImage={project?.projectImgURI}
      />

      {project && (
        <Layout user={user} fullWidth hideFooter={false}>
          <Main project={project} user={user} author={author} />
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

    let headers = '';
    if (accessToken) {
      headers = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
    }

    const project = await axios
      .get(
        `${process.env.API_PROJECTS_URL}/project/${encodeURIComponent(
          params.projectId
        )}/user/${encodeURIComponent(params.userId)}`,
        headers
      )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error.status);
      });

    const author = await fetcher(
      `${process.env.API_PROFILE_URL}/profile/user/${encodeURIComponent(
        params.userId
      )}`
    );

    return {
      props: {
        user: userProfile || null,
        project: project,
        author: author,
      },
    };
  }
);
