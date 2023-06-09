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
          <PostCard project={project} user={user} key={project.projectId} />
        ))
    );
  }, [posts]);

  useEffect(() => {
    if (posts.length > PAGE_SIZE) setSize(1);
  }, []);

  if (topic === 'following' && !following) {
    return (
      <div className="w-full mt-20 flex flex-col text-center">
        <span className="font-bold text-lg">You are not following anyone.</span>
        <span>Find people to follow.</span>
      </div>
    );
  }

  return (
    <>
      {!topic && (
        <div className="relative sm:rounded-t-lg overflow-hidden">
          <PinnedPost user={user} />
        </div>
      )}

      <InfiniteScroll
        dataLength={posts?.length}
        next={() => {
          setSize(size + 1);
        }}
        hasMore={hasMore}
        loader={<div className="w-full py-20 flex justify-center"></div>}
        endMessage={<div className="text-center py-20 p-4">No more posts</div>}
        style={{ overflow: 'hidden' }}
      >
        <div className="overflow-hidden">
          {isEmpty && (
            <div className="w-full py-20 flex justify-center">
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
