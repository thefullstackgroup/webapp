import React from 'react';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';
import PostCard from 'components/common/cards/PostCard';
import { BsPinAngle } from 'react-icons/bs';

const PinnedPost = ({ user }) => {
  const url = `${
    process.env.BASEURL
  }/api/posts/getPost?postId=${'welcome-to-the-full-stack-'}&authorId=${'danoely'}`;
  const { data } = useSWR(url, fetcher);
  const post = data ? data : null;

  if (!post) return null;

  return (
    <>
      <BsPinAngle className="absolute right-2 top-2 h-5 w-5 sm:h-6 sm:w-6" />
      <PostCard project={post} user={user} key={post.projectId} pinnedPost />
    </>
  );
};

export default PinnedPost;
