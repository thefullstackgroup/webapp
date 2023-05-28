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
      <div className="mb-6 w-full cursor-pointer overflow-hidden border-b border-base-600 sm:bg-base-800 sm:hover:bg-base-600/50 md:rounded-md md:border-b-0">
        <article className="border-base-600 pt-4 pb-6 sm:border-base-900 md:pb-4">
          <div className="mx-4 mb-0">
            <div className="mb-3 flex w-full items-center border-base-600 pb-3 md:space-x-2 md:border-b">
              {post.triggeredByUser?.profilePicUrl && (
                <Avatar
                  href={`/${post.triggeredByUser?.displayName}`}
                  image={post.triggeredByUser?.profilePicUrl}
                  dimensions="hidden md:block h-6 w-6"
                />
              )}
              <div className="flex w-full items-start justify-between space-x-1 text-sm text-base-300 md:text-base">
                <div>
                  <span className="font-medium text-base-100">
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

              <div className="ml-4 w-full sm:mr-4">
                <div className="flex-1">
                  <div className="mb-2 space-y-0">
                    <Link
                      href={`${process.env.BASEURL}/${postData?.projectCreator?.displayName}`}
                      passHref
                    >
                      <button className="group flex w-full flex-wrap items-center text-left text-sm sm:text-base">
                        <span className="group-hover:text-link font-semibold tracking-tight text-white">
                          {postData?.projectCreator.name}
                        </span>
                        <span className="ml-1 text-base-500 sm:mt-0">
                          · @{postData?.projectCreator?.displayName}
                        </span>
                      </button>
                    </Link>

                    <div className="text-xs text-base-500">
                      {Moment(postData?.createdDate).format('MMM Do')}
                    </div>
                  </div>

                  {postData && postData.projectType === 'PROJECT' && (
                    <div
                      className="w-full items-start gap-6 md:flex md:rounded-md md:bg-base-800 md:p-4"
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
                          className="mt-1 h-48 w-full rounded-md object-cover"
                          alt={postData.projectName}
                          width={100}
                          height={100}
                          layout="fill"
                        />
                      </div>
                      <div className="mt-2 w-full md:mt-0 md:w-1/2">
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
                      className="group relative space-y-4"
                      onClick={() =>
                        handleGoToPost(
                          postData?.projectType,
                          postData?.projectCreator?.displayName,
                          postData?.projectSlug
                        )
                      }
                    >
                      <button className="w-full cursor-pointer text-left text-sm outline-none">
                        <div>
                          <div className="items-center overflow-hidden text-base">
                            <div className="prose-custom prose-sm prose-dark w-full overflow-hidden text-white sm:prose-base">
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

                        <div className="rounded-md bg-base-600 px-2.5 py-2 text-sm md:text-base">
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
                    <div className="-ml-8 space-y-4 md:ml-0">
                      {parentComment && (
                        <div className="mt-2 flex items-start space-x-2">
                          <Avatar
                            href={`/${parentComment?.authorName}`}
                            image={parentComment?.authorProfileImageURL}
                            dimensions="mt-1 h-5 w-5 md:h-7 md:w-7"
                          />

                          <div className="rounded-md bg-base-600 px-2.5 py-2 text-sm md:text-base">
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

                        <div className="rounded-md bg-base-600 px-2.5 py-2 text-sm md:text-base">
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
