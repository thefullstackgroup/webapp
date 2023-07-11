import { withAuthUser, withAuthUserTokenSSR } from 'next-firebase-auth';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useUserProfile from 'hooks/useUserProfile';
import Meta from 'components/common/partials/Metadata';
import Layout from 'components/common/layout/Layout';
import PostContainer from 'components/modules/post/Container';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';
import { RiEmotionSadLine } from 'react-icons/ri';

const Project = ({ user }) => {
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

export default withAuthUser()(Project);

export const getServerSideProps = withAuthUserTokenSSR()();
