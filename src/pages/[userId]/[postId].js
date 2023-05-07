import { withAuthUser, withAuthUserTokenSSR } from 'next-firebase-auth';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useUserProfile from 'hooks/useUserProfile';
import Meta from 'components/common/partials/Metadata';
import Layout from 'components/common/layout/LayoutLoggedIn';
import PostContainer from 'components/modules/post/Container';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';
import { RiEmotionSadLine } from 'react-icons/ri';

const Project = () => {
  const router = useRouter();
  const { postId, userId } = router.query;
  const [user, getUser] = useUserProfile();

  let url = `${process.env.BASEURL}/api/posts/getPost?postId=${postId}&authorId=${userId}`;
  const { data: project } = useSWR(url, fetcher);

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <Meta
        title={`${project?.projectName} - by ${project?.projectCreator?.displayName}`}
        description={`${project?.projectName} - by ${project?.projectCreator?.displayName}`}
        keywords=""
      />

      {user && project && (
        <Layout user={user}>
          <PostContainer project={project} user={user} />
        </Layout>
      )}

      {user && !project && (
        <Layout user={user}>
          <div className="mt-20 md:mt-40 flex relative">
            <div className="relative w-full md:max-w-3xl mx-auto flex flex-col text-center px-4">
              <RiEmotionSadLine className="h-20 w-20 mx-auto mb-8" />
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

export default withAuthUser()(Project);

export const getServerSideProps = withAuthUserTokenSSR()();
