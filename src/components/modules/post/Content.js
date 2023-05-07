import { useEffect, useState } from 'react';
import Link from 'next/link';
import Markdown from 'markdown-to-jsx';
import CodeBlock from 'components/common/elements/CodeBlock';
import Moment from 'moment';
import TechBadge from 'components/common/tags/TagStack';
import TagPost from 'components/common/tags/TagPostType';
import VideoPlayer from 'components/common/elements/mux/VideoPlayer';
import Actions from 'components/modules/post/Actions';
import Insights from 'components/modules/post/Insights';
import OpenGraphPreview from 'components/modules/post/OpenGraphPreview';
import { FiLoader } from 'react-icons/fi';
import Avatar from 'components/common/elements/Avatar';

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

  const urlify = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, (url) => {
      setLinkPreview(url);
    });
  };

  useEffect(() => {
    urlify(post?.projectBodyPreview);
  }, [post?.projectName]);

  useEffect(() => {
    if (post?.projectType === 'POLL') {
      getPollData();
    }
  }, [pollUserHasVoted]);

  return (
    <>
      <div className="px-0 md:px-4 mx-auto pb-2">
        <div className="text-lg">
          <div className="flex items-start justify-between">
            <div className="flex items-center mb-4 space-x-2">
              <Avatar
                href={profileLink}
                image={
                  post?.projectCreator.profilePicUrl ||
                  post?.projectCreator.profilePicURL
                }
                name={post?.projectCreator.displayName}
                userId={post?.userId}
              />

              <Link href={profileLink} passHref>
                <a href="#">
                  <div className="w-full">
                    <div className="flex flex-col justify-between ml-2 text-base">
                      <button className="w-full text-left flex flex-wrap items-center group text-base sm:text-lg">
                        <span className="tracking-tight font-semibold text-white group-hover:text-link">
                          {authorName}
                        </span>
                        <span className="ml-1 sm:mt-0 text-slate-500">
                          · @{authorDisplayName}
                        </span>
                      </button>
                      {/* <p className="text-slate-200 hover:text-primary-500 font-semibold">
                        {authorDisplayName}
                      </p> */}

                      <div className="text-xs text-slate-500">
                        {Moment(post?.createdDate).format('MMM Do')}
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            </div>
            {post?.projectCreator?.userId === user.userId && (
              <button
                className="btn-secondary text-sm"
                onClick={() => setShowEditPost(true)}
              >
                Edit
              </button>
            )}
          </div>
          <div className="space-y-2">
            {post?.projectType !== 'SPARK' &&
              post?.projectType !== 'ANNOUNCEMENT' && (
                <div className="">
                  <TagPost postType={post?.projectType} />
                </div>
              )}

            <article className="mx-0 prose prose-dark max-w-full text-slate-100 prose-lg overflow-x-hidden">
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
                  <div className="mx-4 sm:mx-0 relative md:rounded-md">
                    <VideoPlayer src={coverVideo} poster={coverImage} />
                  </div>
                ) : (
                  <div className="mx-4 sm:mx-0 relative rounded overflow-hidden">
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
                <div className="w-full flex flex-col justify-center items-center space-y-2 mt-4 py-20 text-center">
                  <FiLoader className="h-5 w-5 mb-1 animate-spin" />
                </div>
              ) : (
                <div className="w-full px-4 sm:px-0 flex flex-col space-y-2 mt-4">
                  {pollData?.pollOptions?.map((option, index) => (
                    <button
                      className="bg-gray-800 w-full border border-tfsdark-700 rounded-full py-3 px-4 hover:bg-primary-600 text-base font-semibold"
                      key={index}
                      onClick={() => handleCastVote(option.pollOptionId)}
                    >
                      {option.optionText}
                    </button>
                  ))}

                  <div className="text-sm text-slate-400">
                    {pollVotes} votes
                  </div>
                </div>
              ))}

            {pollUserHasVoted &&
              post?.projectType === 'POLL' &&
              (loading ? (
                <div className="w-full flex flex-col justify-center items-center space-y-2 mt-4 py-20 text-center">
                  <FiLoader className="h-5 w-5 mb-1 animate-spin" />
                </div>
              ) : (
                <div className="w-full px-4 sm:px-0 flex flex-col space-y-2 mt-4">
                  {pollData?.pollOptions?.map((option, index) => (
                    <div className="relative w-full text-sm" key={index}>
                      <div
                        className={
                          (leadingVote?.pollOptionId == option.pollOptionId
                            ? 'bg-primary-500'
                            : 'bg-tfsdark-600') +
                          ' relative rounded-r-lg py-2 px-4 h-11'
                        }
                        style={{
                          width: `${
                            (option.voteCount / leadingVote.voteCount) * 100
                          }%`,
                        }}
                      ></div>
                      <div className="absolute top-0.5 flex w-full items-center py-2 px-4 space-x-4">
                        <span className="font-semibold">{`${(
                          (option.voteCount / pollVotes) *
                          100
                        ).toFixed(0)}%`}</span>
                        <span className="text-base">{option.optionText}</span>
                      </div>
                    </div>
                  ))}

                  <div className="text-sm text-slate-400">
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

            <div className="flex mt-4 items-center ">
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

          <div className="my-4 flex justify-between w-auto md:w-full border-t border-b border-tfsdark-600 py-2">
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
