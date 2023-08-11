import { withAuthUserTokenSSR } from "next-firebase-auth";
import Meta from "components/common/partials/Metadata";
import Layout from "components/common/layout/Layout";
import PostContainer from "components/modules/post/Container";
import fetcher from "utils/fetcher";
import { RiEmotionSadLine } from "react-icons/ri";
import { getUserProfile } from "pages/api/auth/userProfile";
import axios from "axios";

const Post = ({ user, project }) => {
  return (
    <>
      <Meta
        title={`${project?.projectName} - by ${project?.projectCreator?.displayName}`}
        description={`${project?.projectName} - by ${project?.projectCreator?.displayName}`}
        keywords=""
      />

      <Layout user={user}>
        <PostContainer project={project} user={user} />
      </Layout>

      {user && !project && (
        <Layout user={user}>
          <div className="relative mt-20 flex md:mt-40">
            <div className="relative mx-auto flex w-full flex-col px-4 text-center md:max-w-3xl">
              <RiEmotionSadLine className="mx-auto mb-8 h-20 w-20" />
              <div className="text-lg">
                This post has been removed by the author.
              </div>
            </div>
          </div>
        </Layout>
      )}
    </>
  );
};

export default Post;

export const getServerSideProps = withAuthUserTokenSSR()(
  async ({ AuthUser, req, res, params }) => {
    const accessToken = await AuthUser.getIdToken();
    const userProfile = await getUserProfile(accessToken, null, req, res);

    let headers = "";
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
          params.postId
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
      },
    };
  }
);
