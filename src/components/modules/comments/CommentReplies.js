import axios from 'axios';
import { useEffect } from 'react';
import useSWR, { mutate } from 'swr';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import '@uiw/react-markdown-preview/markdown.css';
const MarkdownPreview = dynamic(
  () => import('@uiw/react-markdown-preview').then((mod) => mod.default),
  { ssr: false }
);
import rehypeHighlight from 'rehype-highlight';
import Avatar from 'components/common/elements/Avatar';
import fetcher from 'utils/fetcher';
import Icon from 'components/common/elements/Icon';
import { useTheme } from 'next-themes';

const CommentReplies = ({
  commentId,
  user,
  projectId,
  setPostCommentOpen,
  setEditCommentOpen,
  setCommentReplyTo,
  setCommentToUpdate,
  commentToUpdate,
  handlePostReply,
}) => {
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  let url = `${process.env.BASEURL}/api/posts/comments/getReplies?commentId=${commentId}`;
  if (!user)
    url = `${process.env.BASEURL}/api/posts/comments/getPublicReplies?commentId=${commentId}`;
  const { data } = useSWR(url, fetcher);

  const handleDeleteReply = async (comment) => {
    await axios.post(
      `${process.env.BASEURL}/api/posts/comments/deleteComment`,
      {
        commentId: comment.id,
      }
    );
    mutate(url);
  };

  const performLike = async (comment) => {
    if (comment.likedByYou) {
      await axios.post(
        `${process.env.BASEURL}/api/posts/comments/unlikeComment`,
        {
          commentId: comment.id,
        }
      );
    } else {
      await axios.post(
        `${process.env.BASEURL}/api/posts/comments/likeComment`,
        {
          commentId: comment.id,
        }
      );
    }
    mutate(url);
  };

  useEffect(() => {
    mutate(url);
  });

  return (
    <>
      <ul>
        {data?.comments?.content?.map((comment, index) => (
          <li className="pt-4" key={index}>
            <div className="relative">
              <div className="relative flex items-start space-x-3">
                <div className="relative">
                  <Avatar
                    href={`/${comment.authorName}`}
                    image={comment.authorProfileImageURL}
                    name={comment.authorName}
                    dimensions="h-6 w-6"
                  />
                </div>
                <div className="min-w-0 rounded-md bg-base-200/70 px-3 pt-1 pb-2 dark:bg-base-700/70 sm:px-3">
                  <div>
                    <Link href={`/${comment.authorName}`} passHref>
                      <a href="#" className="text-sm font-medium">
                        {comment.authorName}
                      </a>
                    </Link>
                  </div>
                  <div className="prose-comments no-scrollbar prose max-w-full overflow-x-scroll dark:prose-dark">
                    <MarkdownPreview
                      source={comment.commentText}
                      remarkPlugins={[rehypeHighlight, { detect: true }]}
                      wrapperElement={{
                        'data-color-mode': currentTheme,
                      }}
                    />
                  </div>
                </div>
              </div>

              {user && (
                <div className="mt-2 ml-10 flex items-center space-x-6">
                  <div className="text-xs">
                    <button className="flex items-center text-base-400 hover:text-base-500 focus:outline-none">
                      {comment.likedByYou ? (
                        <>
                          <Icon
                            name="FiHeart"
                            className="mr-1 h-4 w-4 text-red-500"
                            onClick={() => performLike(comment)}
                          />
                          <span className="text-red-500">
                            {comment.commentLikeCount}
                          </span>
                        </>
                      ) : (
                        <>
                          <Icon
                            name="FiHeart"
                            className="mr-1 h-4 w-4"
                            onClick={() => performLike(comment)}
                          />
                          <span className="">{comment.commentLikeCount}</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="text-xs">
                    <button
                      className="flex items-center text-base-400 hover:text-base-500 focus:outline-none"
                      onClick={() => {
                        setCommentReplyTo(comment);
                        setPostCommentOpen(true);
                      }}
                    >
                      <Icon name="FiCornerUpLeft" className="mr-1 h-4 w-4" />
                      <span className="">Reply</span>
                    </button>
                  </div>
                  {comment.authorProfileID === user?.userId && (
                    <>
                      <div className="text-xs">
                        <button
                          className={`flex items-center text-base-400 hover:text-base-500 focus:outline-none`}
                          onClick={() => {
                            setCommentToUpdate(comment);
                            setEditCommentOpen(true);
                          }}
                        >
                          <span>Edit</span>
                        </button>
                      </div>
                      <div className="text-xs text-red-500">
                        <button
                          className={`flex items-center hover:text-red-400 focus:outline-none`}
                          onClick={() => handleDeleteReply(comment)}
                        >
                          <span>Delete</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}

              {comment?.commentResponseCount > 0 && (
                <CommentReplies
                  commentId={comment.id}
                  setCommentReplyTo={setCommentReplyTo}
                  setCommentToUpdate={setCommentToUpdate}
                  setPostCommentOpen={setPostCommentOpen}
                  setEditCommentOpen={setEditCommentOpen}
                  user={user}
                  handleDeleteComment={handleDeleteReply}
                  performLike={performLike}
                  projectId={projectId}
                  commentToUpdate={commentToUpdate}
                  handlePostReply={handlePostReply}
                />
              )}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default CommentReplies;
