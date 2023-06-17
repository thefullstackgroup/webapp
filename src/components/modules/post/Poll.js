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
import Icon from 'components/common/elements/Icon';
import TagPostType from 'components/common/tags/TagPostType';

const sparkCharCount = 300;

const Poll = ({
  post,
  user,
  isLiked,
  nComments,
  setShowNewComment,
  setShowEditPost,
}) => {
  const [linkPreview, setLinkPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const projectId = post?.projectId || post?._id;
  const title = post?.projectName;
  const postBody = post?.projectBody;
  const coverImage = post?.projectImgURI;
  const coverVideo = post?.projectVideoURI;
  const webLink = post?.projectLinkURI;
  const techStack = post?.projectTechStack;
  const authorName = post?.projectCreator?.name;
  const authorDisplayName = post?.projectCreator?.displayName;
  const profileLink = `/${authorDisplayName}`;
  const [pollData, setPollData] = useState([]);
  const [pollVotes, setPollVotes] = useState(0);
  const [pollUserHasVoted, setPollUserHasVoted] = useState(false);
  const [leadingVote, setLeadingVote] = useState({});

  const getPollData = () => {
    fetch(`${process.env.BASEURL}/api/posts/polls/getPoll?postId=${projectId}`)
      .then((response) => {
        if (response) return response.json();
      })
      .then((data) => {
        if (data) {
          setPollData(data);
          const result = data.pollOptions.reduce(
            (total, currentValue) => (total = total + currentValue.voteCount),
            0
          );
          const max = data.pollOptions.reduce(
            (prev, current) =>
              prev.voteCount > current.voteCount ? prev : current,
            0
          );
          setPollUserHasVoted(data.currentUserVoted);
          setLeadingVote(max);
          setPollVotes(result);
          setLoading(false);
        }
      });
  };

  const handleCastVote = (optionId) => {
    fetch(
      `${process.env.BASEURL}/api/posts/polls/castVote?postId=${pollData?._id}&optionId=${optionId}`
    )
      .then((response) => {
        if (response.status == 304) {
          setPollUserHasVoted(true);
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          setPollUserHasVoted(true);
        }
      });
  };

  // useEffect(() => {
  //   urlify(post?.projectBodyPreview);
  // }, [post?.projectName]);

  useEffect(() => {
    if (post?.projectType === 'POLL') {
      getPollData();
    }
  }, [pollUserHasVoted]);

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

            {/* {post?.projectType !== 'SPARK' &&
              post?.projectType !== 'ANNOUNCEMENT' && (
                <div className="">
                  <TagPostType postType={post?.projectType} />
                </div>
              )} */}
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
            {/* END URL PREVIEW CARD */}

            {/* DISPLAY POLL HERE */}
            {!pollUserHasVoted &&
              post?.projectType === 'POLL' &&
              (loading ? (
                <div className="mt-4 flex w-full flex-col items-center justify-center space-y-2 py-20 text-center">
                  <Icon name="FiLoader" className="mb-1 h-5 w-5 animate-spin" />
                </div>
              ) : (
                <div className="mt-4 flex w-full flex-col space-y-2 px-4 sm:px-0">
                  {pollData?.pollOptions?.map((option, index) => (
                    <button
                      className="hover:bg-primary-600 w-full rounded-full border border-base-700 bg-gray-800 py-3 px-4 text-base font-semibold"
                      key={index}
                      onClick={() => handleCastVote(option.pollOptionId)}
                    >
                      {option.optionText}
                    </button>
                  ))}

                  <div className="text-sm text-base-400">{pollVotes} votes</div>
                </div>
              ))}

            {pollUserHasVoted &&
              post?.projectType === 'POLL' &&
              (loading ? (
                <div className="mt-4 flex w-full flex-col items-center justify-center space-y-2 py-20 text-center">
                  <Icon name="FiLoader" className="mb-1 h-5 w-5 animate-spin" />
                </div>
              ) : (
                <div className="mt-4 flex w-full flex-col space-y-2 px-4 sm:px-0">
                  {pollData?.pollOptions?.map((option, index) => (
                    <div className="relative w-full text-sm" key={index}>
                      <div
                        className={
                          (leadingVote?.pollOptionId == option.pollOptionId
                            ? 'bg-cyan-default dark:bg-cyan-dark'
                            : 'bg-base-300/50 dark:bg-base-600') +
                          ' relative h-11 rounded-r-lg py-2 px-4'
                        }
                        style={{
                          width: `${
                            (option.voteCount / leadingVote.voteCount) * 100
                          }%`,
                        }}
                      ></div>
                      <div className="absolute top-0.5 flex w-full items-center space-x-4 py-2 px-4">
                        <span className="font-semibold">{`${(
                          (option.voteCount / pollVotes) *
                          100
                        ).toFixed(0)}%`}</span>
                        <span className="text-base">{option.optionText}</span>
                      </div>
                    </div>
                  ))}

                  <div className="text-sm text-base-400">
                    {pollVotes} {pollVotes == 1 ? 'vote' : 'votes'}
                  </div>
                </div>
              ))}
            {/* END DISPLAY POLL HERE */}

            <div className="mt-6 text-gray-500">
              <p className="flex space-x-3">
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

          <div className="my-4 flex w-auto justify-between border-t border-b border-base-200 py-2 dark:border-base-700 md:w-full">
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

export default Poll;