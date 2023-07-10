import axios from 'axios';
import useSWR, { mutate } from 'swr';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import * as ga from 'lib/ga';
import Markdown from 'markdown-to-jsx';
import CodeBlock from 'components/common/elements/CodeBlock';
import CommentReplies from 'components/modules/comments/CommentReplies';
import ReplyToComment from 'components/modules/comments/ReplyToComment';
import EditComment from 'components/modules/comments/EditComment';
import Avatar from 'components/common/elements/Avatar';
import Loader from 'components/common/elements/Loader';
import fetcher from 'utils/fetcher';
import Icon from 'components/common/elements/Icon';

const ListComments = ({ post, user }) => {
  const [postCommentOpen, setPostCommentOpen] = useState(false);
  const [editCommentOpen, setEditCommentOpen] = useState(false);
  const [commentReply, setCommentReply] = useState('');
  const [commentReplyTo, setCommentReplyTo] = useState(null);
  const [commentToUpdate, setCommentToUpdate] = useState(null);
  const postId = post._id || post.projectId;

  // get post comments
  let url = `${process.env.BASEURL}/api/posts/comments/getComments?postId=${postId}`;
  const { data } = useSWR(url, fetcher);

  // post reply
  const handlePostReply = async () => {
    if (!commentReply?.trim().length) {
      console.log('missing comment');
      return;
    }

    await axios.post(
      `${process.env.BASEURL}/api/posts/comments/postReply?commentId=${commentReplyTo.id}`,
      {
        projectId: postId,
        commentText: commentReply,
      }
    );
    setCommentReply('');
    mutate(url);
    setPostCommentOpen(false);
    ga.event({
      action: 'user_comment_reply',
    });
  };

  const handleDeleteComment = async (comment) => {
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

      ga.event({
        action: 'user_comment_unliked',
      });
    } else {
      await axios.post(
        `${process.env.BASEURL}/api/posts/comments/likeComment`,
        {
          commentId: comment.id,
        }
      );

      ga.event({
        action: 'user_comment_liked',
      });
    }
    mutate(url);
  };

  useEffect(() => {
    mutate(url);
  });

  return (
    <>
      <div className="relative mx-auto max-w-4xl px-0 md:px-0">
        <div className="relative max-w-4xl text-lg ">
          {!data && (
            <div className="mt-20 flex flex-1 items-center justify-center text-sm">
              <Loader />
            </div>
          )}
          {!data?.comments?.content?.length > 0 && (
            <p className="py-6 text-center text-sm text-base-400">
              Be the first to share a comment.
            </p>
          )}
          <ul className="mb-8 mt-0">
            {data?.comments?.content?.map((comment, index) => (
              <li className="py-2" key={index}>
                <div className="relative">
                  <div className="relative flex items-start space-x-2">
                    <div className="relative mt-1">
                      <Avatar
                        href={`/${comment.authorName}`}
                        image={comment.authorProfileImageURL}
                        name={comment.authorName}
                        dimensions="h-8 w-8 sm:h-10 sm:w-10"
                      />
                    </div>
                    <div className="w-full overflow-hidden rounded-md bg-base-200/70 px-3 py-2 dark:bg-base-600/50 sm:px-3">
                      <div>
                        <Link href={`/${comment.authorName}`} passHref>
                          <a href="#" className="text-sm font-medium">
                            {comment.authorName}
                          </a>
                        </Link>
                      </div>
                      <div className="prose-comments no-scrollbar prose overflow-x-scroll dark:prose-dark">
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
                    <div className="mt-2 ml-10 flex items-center space-x-6 sm:ml-12">
                      <div className="text-xs">
                        <button className="flex items-center text-base-400 hover:text-base-500 focus:outline-none">
                          {comment.likedByYou ? (
                            <Icon
                              name="FiHeart"
                              className="mr-1 h-4 w-4 text-red-500"
                              onClick={() => performLike(comment)}
                            />
                          ) : (
                            <Icon
                              name="FiHeart"
                              className="mr-1 h-4 w-4"
                              onClick={() => performLike(comment)}
                            />
                          )}

                          <span className="">{comment.commentLikeCount}</span>
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
                          <Icon
                            name="FiCornerUpLeft"
                            className="mr-1 h-4 w-4"
                          />
                          <span className="">Reply</span>
                        </button>
                      </div>
                      {comment.authorProfileID === user.userId && (
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
                              onClick={() => handleDeleteComment(comment)}
                            >
                              <span>Delete</span>
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                  {comment.commentResponseCount > 0 && (
                    <div className="ml-6 sm:ml-14">
                      <CommentReplies
                        commentId={comment.id}
                        setPostCommentOpen={setPostCommentOpen}
                        setEditCommentOpen={setEditCommentOpen}
                        setCommentReplyTo={setCommentReplyTo}
                        setCommentToUpdate={setCommentToUpdate}
                        user={user}
                        handleDeleteComment={handleDeleteComment}
                        performLike={performLike}
                        projectId={post._id}
                        handlePostReply={handlePostReply}
                        commentToUpdate={commentToUpdate}
                      />
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ReplyToComment
        user={user}
        commentReplyTo={commentReplyTo}
        postCommentOpen={postCommentOpen}
        setPostCommentOpen={setPostCommentOpen}
        projectId={post._id}
      />

      {editCommentOpen && (
        <EditComment
          user={user}
          commentToUpdate={commentToUpdate}
          editCommentOpen={editCommentOpen}
          setEditCommentOpen={setEditCommentOpen}
          projectId={post._id}
        />
      )}
    </>
  );
};

export default ListComments;
