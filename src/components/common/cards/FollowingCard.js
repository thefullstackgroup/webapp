import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Avatar from 'components/common/elements/Avatar';
import Markdown from 'markdown-to-jsx';
import Moment from 'moment';
import useSWR from 'swr';
import Image from 'next/future/image';
import axios from 'axios';
import CodeBlock from 'components/common/elements/CodeBlock';
import { useRouter } from 'next/router';
import fetcher from 'utils/fetcher';

const ContentLink = ({ children, ...props }) => (
  <span {...props} className="text-link break-all text-left">
    {children}
  </span>
);

const getDaysAgo = (date) => {
  const currentDate = new Date();
  const commentDate = new Date(date);
  const diffTime = Math.abs(currentDate - commentDate);

  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

const Following = ({ post, user }) => {
  const router = useRouter();
  const [parentComment, setParentComment] = useState('');

  const postDataURL = `${process.env.BASEURL}/api/posts/getPostById?postId=${post?.content?.projectId}`;
  const { data: postData } = useSWR(postDataURL, fetcher);

  const handleGoToPost = (type, displayName, slug) => {
    if (type === 'PROJECT') router.push(`/${displayName}/project/${slug}`);
    else router.push(`/${displayName}/${slug}`);
  };

  const getPostComments = async (postId, commentId) => {
    const requestUrl = `${process.env.BASEURL}/api/posts/comments/getComments?postId=${postId}`;

    await axios
      .get(requestUrl)
      .then((response) => {
        const comments = response.data.comments.content;
        comments.filter(function (item) {
          if (item.id === commentId) setParentComment(item);
        });
      })
      .catch((error) => {
        // console.log(error.status);
      });
  };

  let actionMessage = '';

  if (post.eventTypes === 'CONTENT_LIKED') {
    actionMessage = 'liked this';
  }

  if (post.eventTypes === 'COMMENT_LIKED') {
    actionMessage = '&hearts; liked a comment';
  }

  if (post.eventTypes === 'COMMENT_CREATED') {
    actionMessage = 'commented on this';
  }

  if (post.eventTypes === 'COMMENT_RESPONDED_TO') {
    actionMessage = 'replied to a comment on this';
  }

  useEffect(() => {
    if (post.commentParentId) {
      getPostComments(post.content.projectId, post.commentParentId);
    }
  }, [post]);

  if (post.eventTypes == 'COMMENT_LIKED') return '';

  return (
    <>
      <div className="w-full cursor-pointer sm:bg-tfsdark-700 sm:hover:bg-tfsdark-600/50 md:rounded-md overflow-hidden mb-6 border-b md:border-b-0 border-tfsdark-600">
        <article className="pt-4 pb-6 md:pb-4 border-tfsdark-600 sm:border-tfsdark-900">
          <div className="mx-4 mb-0">
            <div className="flex items-center md:space-x-2 w-full md:border-b border-tfsdark-600 pb-3 mb-3">
              {post.triggeredByUser?.profilePicUrl && (
                <Avatar
                  href={`/${post.triggeredByUser?.displayName}`}
                  image={post.triggeredByUser?.profilePicUrl}
                  dimensions="hidden md:block h-6 w-6"
                />
              )}
              <div className="text-sm md:text-base text-slate-300 space-x-1 flex justify-between w-full items-start">
                <div>
                  <span className="font-medium text-slate-100">
                    {post.triggeredByUser?.name}
                  </span>{' '}
                  {actionMessage}
                </div>
                <span className="mt-0 ml-2 text-gray-400">
                  {getDaysAgo(post.timestamp)}d
                </span>
              </div>
            </div>
            <div className="flex items-start">
              <div className="">
                <Avatar
                  userId={post.triggerByUser?.userId}
                  image={
                    postData?.projectCreator?.profilePicUrl ||
                    postData?.projectCreator?.profilePicURL
                  }
                  name={postData?.projectCreator?.displayName}
                  href={`/${postData?.projectCreator?.displayName}`}
                />
              </div>

              <div className="w-full ml-4 sm:mr-4">
                <div className="flex-1">
                  <div className="space-y-0 mb-2">
                    <Link
                      href={`${process.env.BASEURL}/${postData?.projectCreator?.displayName}`}
                      passHref
                    >
                      <button className="w-full text-left flex flex-wrap items-center group text-sm sm:text-base">
                        <span className="tracking-tight font-semibold text-white group-hover:text-link">
                          {postData?.projectCreator.name}
                        </span>
                        <span className="ml-1 sm:mt-0 text-slate-500">
                          · @{postData?.projectCreator?.displayName}
                        </span>
                      </button>
                    </Link>

                    <div className="text-xs text-slate-500">
                      {Moment(postData?.createdDate).format('MMM Do')}
                    </div>
                  </div>

                  {postData && postData.projectType === 'PROJECT' && (
                    <div
                      className="md:flex items-start w-full gap-6 md:bg-tfsdark-800 md:p-4 md:rounded-md"
                      onClick={() =>
                        handleGoToPost(
                          postData?.projectType,
                          postData?.projectCreator?.displayName,
                          postData?.projectSlug
                        )
                      }
                    >
                      <div className="w-full md:w-1/2">
                        <Image
                          src={postData.projectImgURI}
                          className="mt-1 h-48 w-full object-cover rounded-md"
                          alt={postData.projectName}
                          width={100}
                          height={100}
                          layout="fill"
                        />
                      </div>
                      <div className="mt-2 md:mt-0 w-full md:w-1/2">
                        <div className="text-2xl font-bold">
                          {postData?.projectName}
                        </div>
                        <div className="hidden md:block">
                          <Markdown
                            options={{
                              overrides: {
                                img: {
                                  component: '',
                                  props: { className: 'hidden' },
                                },
                                a: {
                                  component: ContentLink,
                                  props: {
                                    className: 'hidden',
                                  },
                                },
                                p: {
                                  props: {
                                    className: 'inline-block',
                                  },
                                },
                                h1: {
                                  props: {
                                    className: 'inline-block',
                                  },
                                },
                                h2: {
                                  props: {
                                    className: 'inline-block',
                                  },
                                },
                                h3: {
                                  props: {
                                    className: 'inline-block',
                                  },
                                },
                                li: {
                                  props: {
                                    className: 'inline-block',
                                  },
                                },
                                ul: {
                                  props: {
                                    className: 'space-x-1 inline-block',
                                  },
                                },
                                hr: {
                                  props: {
                                    className: 'hidden',
                                  },
                                },
                                div: {
                                  props: {
                                    className: 'space-x-1',
                                  },
                                },
                              },
                            }}
                          >
                            {postData?.projectBodyPreview
                              ?.substring(0, 250)
                              .substring(
                                0,
                                postData.projectBodyPreview
                                  .substring(0, 150)
                                  .lastIndexOf(' ')
                              ) + '...'}
                          </Markdown>
                        </div>
                      </div>
                    </div>
                  )}

                  {postData && postData.projectType !== 'PROJECT' && (
                    <div
                      className="relative space-y-4 group"
                      onClick={() =>
                        handleGoToPost(
                          postData?.projectType,
                          postData?.projectCreator?.displayName,
                          postData?.projectSlug
                        )
                      }
                    >
                      <button className="outline-none w-full text-left text-sm cursor-pointer">
                        <div>
                          <div className="items-center text-base overflow-hidden">
                            <div className="w-full prose-sm sm:prose-base prose-dark text-white prose-custom overflow-hidden">
                              <Markdown
                                options={{
                                  overrides: {
                                    img: {
                                      component: '',
                                      props: { className: 'hidden' },
                                    },
                                    a: {
                                      component: ContentLink,
                                      props: {
                                        className: 'hidden sm:block',
                                      },
                                    },
                                  },
                                }}
                              >
                                {`${postData?.projectBodyPreview?.substr(
                                  0,
                                  300
                                )} ...`}
                              </Markdown>
                            </div>
                          </div>
                        </div>
                      </button>
                    </div>
                  )}
                </div>

                <div className="mt-4">
                  {post.eventTypes === 'COMMENT_CREATED' && (
                    <div className="space-y-4">
                      <div className="mt-2 flex items-start space-x-2">
                        <Avatar
                          href={`/${post.triggeredByUser?.displayName}`}
                          image={post.triggeredByUser?.profilePicUrl}
                          dimensions="mt-1 h-5 w-5 md:h-7 md:w-7"
                        />

                        <div className="text-sm md:text-base bg-tfsdark-600 rounded-md px-2.5 py-2">
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
                            {post.content.commentText}
                          </Markdown>
                        </div>
                      </div>
                    </div>
                  )}

                  {post.eventTypes === 'COMMENT_RESPONDED_TO' && (
                    <div className="-ml-8 md:ml-0 space-y-4">
                      {parentComment && (
                        <div className="mt-2 flex items-start space-x-2">
                          <Avatar
                            href={`/${parentComment?.authorName}`}
                            image={parentComment?.authorProfileImageURL}
                            dimensions="mt-1 h-5 w-5 md:h-7 md:w-7"
                          />

                          <div className="text-sm md:text-base bg-tfsdark-600 rounded-md px-2.5 py-2">
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
                              {parentComment?.commentText}
                            </Markdown>
                          </div>
                        </div>
                      )}
                      <div className="ml-8 mt-2 flex items-start space-x-2">
                        <Avatar
                          href={`/${post.triggeredByUser?.displayName}`}
                          image={post.triggeredByUser?.profilePicUrl}
                          dimensions="mt-1 h-5 w-5 md:h-7 md:w-7"
                        />

                        <div className="text-sm md:text-base bg-tfsdark-600 rounded-md px-2.5 py-2">
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
                            {post.content.commentText}
                          </Markdown>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </>
  );
};

export default Following;
