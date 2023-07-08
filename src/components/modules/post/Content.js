import { useEffect, useState } from 'react';
import Link from 'next/link';
import Markdown from 'markdown-to-jsx';
import CodeBlock from 'components/common/elements/CodeBlock';
import Moment from 'moment';
import TechBadge from 'components/common/tags/TagStack';
import VideoPlayer from 'components/common/elements/mux/VideoPlayer';
import Actions from 'components/modules/post/Actions';
import Insights from 'components/modules/post/Insights';
import OpenGraphPreview from 'components/modules/post/OpenGraphPreview';
import Avatar from 'components/common/elements/Avatar';
import TagPostType from 'components/common/tags/TagPostType';
import Poll from './Poll';

const sparkCharCount = 300;

const Content = ({
  post,
  user,
  isLiked,
  nComments,
  setShowNewComment,
  setShowEditPost,
}) => {
  const [linkPreview, setLinkPreview] = useState(null);
  const title = post?.projectName;
  const postBody = post?.projectBody;
  const coverImage = post?.projectImgURI;
  const coverVideo = post?.projectVideoURI;
  const webLink = post?.projectLinkURI;
  const techStack = post?.projectTechStack;
  const authorName = post?.projectCreator?.name;
  const authorDisplayName = post?.projectCreator?.displayName;
  const profileLink = `/${authorDisplayName}`;

  const urlify = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, (url) => {
      setLinkPreview(url);
    });
  };

  useEffect(() => {
    urlify(post?.projectBodyPreview);
  }, [post?.projectName]);

  return (
    <>
      <div className="mx-auto px-0">
        {user && post?.projectCreator?.userId === user.userId && (
          <button
            className="btn btn-secondary mb-4 w-full text-sm"
            onClick={() => setShowEditPost(true)}
          >
            Edit post
          </button>
        )}
        <div className="text-lg">
          <div className="flex items-start justify-between">
            <div className="mb-4 flex items-center space-x-3">
              <Avatar
                href={profileLink}
                image={
                  post?.projectCreator?.profilePicUrl ||
                  post?.projectCreator?.profilePicURL
                }
                name={post?.projectCreator?.displayName}
                userId={post?.userId}
              />

              <Link href={profileLink} passHref>
                <a href="#">
                  <div className="flex flex-col justify-between text-base">
                    <button className="group flex w-full flex-wrap items-center text-left text-base sm:text-lg">
                      <span className="group-hover:text-link font-semibold tracking-tight">
                        {authorName}
                      </span>
                      <span className="ml-1 text-base-500 sm:mt-0">
                        · @{authorDisplayName}
                      </span>
                    </button>
                    <div className="text-xs text-base-500">
                      {Moment(post?.createdDate).format('MMM Do')}
                    </div>
                  </div>
                </a>
              </Link>
            </div>

            {post?.projectType !== 'SPARK' &&
              post?.projectType !== 'ANNOUNCEMENT' && (
                <div className="">
                  <TagPostType postType={post?.projectType} />
                </div>
              )}
          </div>
          <div className="space-y-2">
            <article className="prose prose-lg mx-0 max-w-full overflow-x-hidden dark:prose-dark">
              <Markdown
                options={{
                  overrides: {
                    pre: {
                      component: CodeBlock,
                    },
                    a: {
                      props: {
                        className: 'break-all text-left',
                        target: '_blank',
                      },
                    },
                  },
                }}
              >
                {postBody}
              </Markdown>
            </article>

            {post?.projectType !== 'POLL' && (coverVideo || coverImage) && (
              <figure>
                {coverVideo ? (
                  <div className="relative mx-4 sm:mx-0 md:rounded-md">
                    <VideoPlayer src={coverVideo} poster={coverImage} />
                  </div>
                ) : (
                  <div className="relative mx-4 overflow-hidden rounded sm:mx-0">
                    <img
                      src={coverImage}
                      className="h-full w-full object-cover"
                      alt={title}
                    />
                  </div>
                )}
              </figure>
            )}

            {/* URL PREVIEW CARD */}
            {post?.projectType != 'POST' &&
              post?.projectBodyPreview?.length < sparkCharCount &&
              linkPreview != null && (
                <div className="mx-4 md:mx-0">
                  <OpenGraphPreview link={linkPreview} />
                </div>
              )}

            {/* DISPLAY POLL HERE */}
            {post?.projectType === 'POLL' && <Poll user={user} post={post} />}

            <div className="mt-6 text-gray-500">
              <p className="overflow-hidden rounded-md">
                {webLink && <OpenGraphPreview link={webLink} />}
              </p>
            </div>

            <div className="mt-4 flex items-center ">
              {techStack?.map(
                (stack, index) =>
                  stack !== 'Tech' &&
                  stack !== 'Intro' && (
                    <TechBadge size={'xs'} tech={stack} key={index} />
                  )
              )}
            </div>
          </div>

          <div className="mt-6">
            <Insights projectId={post?.projectId || post?._id} />
          </div>

          <div className="my-4 w-full border-b border-base-200 pt-2 dark:border-base-700 md:w-full">
            <Actions
              user={user}
              project={post}
              isLiked={isLiked}
              nComments={nComments}
              setNewCommentOpen={setShowNewComment}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Content;
