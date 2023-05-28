import axios from 'axios';
import { useEffect } from 'react';
import useSWR, { mutate } from 'swr';
import Link from 'next/link';
import { IoArrowUndoOutline, IoHeart, IoHeartOutline } from 'react-icons/io5';
import Markdown from 'markdown-to-jsx';
import CodeBlock from 'components/common/elements/CodeBlock';
import Avatar from 'components/common/elements/Avatar';
import fetcher from 'utils/fetcher';

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
                <div className="min-w-0 rounded-md bg-base-700/70 px-3 pt-1 pb-2 sm:px-3">
                  <div>
                    <div className="text-base">
                      <Link href={`/${comment.authorName}`} passHref>
                        <a
                          href="#"
                          className="text-base font-medium text-slate-200"
                        >
                          {comment.authorName}
                        </a>
                      </Link>
                    </div>
                  </div>
                  <div className="prose-comments no-scrollbar prose prose-dark max-w-full overflow-x-scroll text-base-100">
                    <Markdown
                      options={{
                        overrides: {
                          pre: {
                            component: CodeBlock,
                          },
                          a: {
                            props: { target: '_blank' },
                          },
                        },
                        disableParsingRawHTML: true,
                      }}
                    >
                      {comment.commentText}
                    </Markdown>
                  </div>
                </div>
              </div>

              {user && (
                <div className="mt-2 ml-10 flex items-center space-x-6">
                  <div className="text-xs">
                    <button className="flex items-center text-gray-400 hover:text-gray-500 focus:outline-none">
                      {comment.likedByYou ? (
                        <IoHeart
                          className="mr-1 h-4 w-4 text-red-500"
                          onClick={() => performLike(comment)}
                        />
                      ) : (
                        <IoHeartOutline
                          className="mr-1 h-4 w-4"
                          onClick={() => performLike(comment)}
                        />
                      )}

                      <span className="">{comment.commentLikeCount}</span>
                    </button>
                  </div>
                  <div className="text-xs">
                    <button
                      className="flex items-center text-gray-400 hover:text-gray-500 focus:outline-none"
                      onClick={() => {
                        setCommentReplyTo(comment);
                        setPostCommentOpen(true);
                      }}
                    >
                      <IoArrowUndoOutline className="mr-1 h-4 w-4" />
                      <span className="">Reply</span>
                    </button>
                  </div>
                  {comment.authorProfileID === user?.userId && (
                    <>
                      <div className="text-xs">
                        <button
                          className={`flex items-center text-gray-400 hover:text-gray-500 focus:outline-none`}
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
