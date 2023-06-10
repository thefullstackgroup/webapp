import { useEffect, useMemo, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import FollowingCard from 'components/common/cards/FollowingCard';
import PostCard from 'components/common/cards/PostCard';
import useSWRInfinite from 'swr/infinite';
import fetcher from 'utils/fetcher';
import PinnedPost from 'components/modules/hangout/PinnedPost';

const defaultTopics =
  'SPARK,POST,SHOWSTARTUP,LEARNING,ADVICE,MEME,VENT,NEWS,POLL,FRAMEWORKS,UTILITIES,TUTORIALS,CAREER_ADVICE,WORKING_REMOTELY,DESK_SETUP,DESIGN_TIPS,GOT_THE_JOB,PROJECT_IDEAS,COLLABS,WORKFLOWS';

const PAGE_SIZE = 10;

const Feed = ({ user, topic, following }) => {
  console.log(topic);
  const [hasMore, setHasMore] = useState(true);

  let url = '';
  let postType = topic;

  if (topic === 'following') {
    url = `${process.env.BASEURL}/api/explore/getActivity?range=100&size=10&following=${following}`;
  } else {
    url = `${
      process.env.BASEURL
    }/api/projects/get?size=${PAGE_SIZE}&sort=newest&projectType=${
      topic ? postType : defaultTopics
    }`;
  }

  const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
    (index) => `${url}&page=${index}`,
    fetcher
  );

  const posts = data ? [].concat(...data) : [];
  const isEmpty = data?.[0]?.length === 0;

  const postCards = useMemo(() => {
    const postList = posts;
    return postList.map(
      (project) =>
        project.projectSlug !== 'welcome-to-the-full-stack-' &&
        (topic === 'following' ? (
          <FollowingCard post={project} user={user} key={project.id} />
        ) : (
          <div className="mb-6">
            <PostCard project={project} user={user} key={project.projectId} />
          </div>
        ))
    );
  }, [posts]);

  useEffect(() => {
    if (posts.length > PAGE_SIZE) setSize(1);
  }, []);

  if (topic === 'following' && !following) {
    return (
      <div className="mt-20 flex w-full flex-col text-center">
        <span className="text-lg font-bold">You are not following anyone.</span>
        <span>Find people to follow.</span>
      </div>
    );
  }

  return (
    <>
      <InfiniteScroll
        dataLength={posts?.length}
        next={() => {
          setSize(size + 1);
        }}
        hasMore={hasMore}
        loader={<div className="flex w-full justify-center py-20"></div>}
        endMessage={<div className="p-4 py-20 text-center">No more posts</div>}
        style={{ overflow: 'hidden' }}
      >
        <div className="overflow-hidden">
          {isEmpty && (
            <div className="flex w-full justify-center py-20">
              No more posts
            </div>
          )}

          {posts && postCards}
        </div>
      </InfiniteScroll>
    </>
  );
};

export default Feed;
