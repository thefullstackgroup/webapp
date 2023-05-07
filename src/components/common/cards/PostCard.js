import React, { useEffect, useMemo, useState } from 'react';
import Markdown from 'markdown-to-jsx';
import Moment from 'moment';
import Link from 'next/link';
import TechBadge from 'components/common/tags/TagStack';
import PostTypePill from 'components/common/tags/TagPostType';
import ModalDialog from 'components/common/modals/ModalDialog';
import Actions from 'components/modules/post/Actions';
import PostInsights from 'components/modules/post/Insights';
import OpenGraphPreview from 'components/modules/post/OpenGraphPreview';
import Avatar from 'components/common/elements/Avatar';
import PostDetail from 'components/modules/post/Detail';
import extractUrls from 'extract-urls';
import { IoCloseOutline } from 'react-icons/io5';
import { FiLoader } from 'react-icons/fi';

const sparkCharCount = 300;

const ContentLink = ({ children, ...props }) => (
  <span {...props} className="text-link break-all text-left">
    {children}
  </span>
);

const Post = (props) => {
  const [showImageModal, setShowImageModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showPost, setShowPost] = useState(false);
  const projectId = props.project.projectId || props.project._id;
  const [pollData, setPollData] = useState([]);
  const [pollVotes, setPollVotes] = useState(0);
  const [pollUserHasVoted, setPollUserHasVoted] = useState(false);
  const [leadingVote, setLeadingVote] = useState({});

  const linkPreview = useMemo(() => {
    return props.project.projectBodyPreview
      ? extractUrls(props.project?.projectBodyPreview)
      : null;
  }, []);

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

  useEffect(() => {
    if (props.project.projectType === 'POLL') {
      getPollData();
    }
  }, [pollUserHasVoted]);

  if (!props.project) return '...';

  return (
    <>
      <div className="w-full cursor-pointer sm:bg-tfsdark-700 sm:hover:bg-tfsdark-600/50">
        <article
          className={
            'pt-4 border-b pb-4 ' +
            (props.seperator
              ? 'border-transparent'
              : 'border-tfsdark-600 sm:border-tfsdark-900')
          }
        >
          <div className="mx-4 mb-0">
            {props.project.projectType !== 'SPARK' && !props.pinnedPost && (
              <div className="flex ml-14 md:ml-16 pl-1 md:pl-2 mb-2">
                <PostTypePill postType={props.project.projectType} />
              </div>
            )}

            <div className="flex items-start">
              {props.myProfile == null && (
                <div className="">
                  <Avatar
                    userId={props.project?.userId}
                    image={
                      props.project?.projectCreator?.profilePicUrl ||
                      props.project?.projectCreator?.profilePicURL
                    }
                    name={props.project?.projectCreator?.displayName}
                    href={`/${props.project.projectCreator?.displayName}`}
                  />
                </div>
              )}

              {/* Card Content */}

              <div className="w-full ml-4 sm:mr-4">
                <div className="flex-1">
                  {props.myProfile == null && (
                    <div className="space-y-0 mb-2">
                      <Link
                        href={`${process.env.BASEURL}/${props.project.projectCreator?.displayName}`}
                        passHref
                      >
                        <button className="w-full text-left flex flex-wrap items-center group text-sm sm:text-base">
                          <span className="tracking-tight font-semibold text-white group-hover:text-link">
                            {props.project.projectCreator?.name}
                          </span>
                          <span className="ml-1 sm:mt-0 text-slate-500">
                            · @{props.project.projectCreator?.displayName}
                          </span>
                        </button>
                      </Link>

                      {!props.pinnedPost && (
                        <div className="text-xs text-slate-500">
                          {Moment(props.project.createdDate).format('MMM Do')}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="relative space-y-2 group">
                    <button
                      className="outline-none w-full text-left text-sm cursor-pointer"
                      onClick={() => setShowPost(true)}
                    >
                      {props.project?.projectBodyPreview?.length <
                        sparkCharCount && (
                        <div className="w-full prose-sm sm:prose-base prose prose-dark text-white prose-custom overflow-hidden">
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
                                h1: {
                                  props: {
                                    className:
                                      'text-sm sm:text-base font-normal',
                                  },
                                },
                              },
                            }}
                          >
                            {props.project.projectBodyPreview}
                          </Markdown>
                        </div>
                      )}
                      {props.project?.projectBodyPreview?.length >
                        sparkCharCount && (
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
                                        // setShowPost: setShowPost,
                                      },
                                    },
                                  },
                                }}
                              >
                                {`${props.project.projectBodyPreview.substr(
                                  0,
                                  Math.min(
                                    props.project.projectBodyPreview.length,
                                    props.project.projectBodyPreview.lastIndexOf(
                                      ' '
                                    )
                                  )
                                )} ...`}
                              </Markdown>
                            </div>
                            <span className="mt-4 inline-flex items-center text-sm text-link font-semibold uppercase">
                              See more...
                            </span>
                          </div>
                        </div>
                      )}
                    </button>

                    {/* DISPLAY POLL HERE */}
                    {!pollUserHasVoted &&
                      props.project.projectType === 'POLL' &&
                      (loading ? (
                        <div className="w-full flex flex-col justify-center items-center space-y-2 py-20 text-center">
                          <FiLoader className="h-5 w-5 mb-1 animate-spin" />
                        </div>
                      ) : (
                        <div className="w-full flex flex-col space-y-2">
                          {pollData?.pollOptions?.map((option, index) => (
                            <button
                              className="bg-slate-700 w-full rounded-full py-3 px-4 hover:bg-primary-500 text-sm sm:text-base font-medium"
                              key={index}
                              onClick={() =>
                                handleCastVote(option.pollOptionId)
                              }
                            >
                              {option.optionText}
                            </button>
                          ))}

                          <div className="text-sm text-gray-400">
                            {pollVotes} {pollVotes == 1 ? 'vote' : 'votes'}
                          </div>
                        </div>
                      ))}

                    {pollUserHasVoted &&
                      props.project.projectType === 'POLL' &&
                      (loading ? (
                        <div className="w-full flex flex-col justify-center items-center space-y-2 py-20 text-center">
                          <FiLoader className="h-5 w-5 mb-1 animate-spin" />
                        </div>
                      ) : (
                        <div className="w-full flex flex-col space-y-2">
                          {pollData?.pollOptions?.map((option, index) => (
                            <div
                              className="relative w-full text-sm"
                              key={index}
                            >
                              <div
                                className={
                                  (leadingVote?.pollOptionId ==
                                  option.pollOptionId
                                    ? 'bg-primary-500'
                                    : 'bg-slate-700') +
                                  ' relative rounded-r-lg py-2 px-4 h-11'
                                }
                                style={{
                                  width: `${
                                    (option.voteCount / leadingVote.voteCount) *
                                    100
                                  }%`,
                                }}
                              ></div>
                              <div className="absolute top-0.5 flex w-full items-center py-2 px-4 space-x-4">
                                <span className="font-semibold">{`${(
                                  (option.voteCount / pollVotes) *
                                  100
                                ).toFixed(0)}%`}</span>
                                <span className="text-base truncate">
                                  {option.optionText}
                                </span>
                              </div>
                            </div>
                          ))}

                          <div className="text-sm text-gray-400">
                            {pollVotes} votes
                          </div>
                        </div>
                      ))}
                    {/* END DISPLAY POLL HERE */}

                    {props.project.projectType !== 'POLL' &&
                      props.project.projectImgURI != '' && (
                        <div
                          className="max-h-80 w-full rounded-md overflow-hidden bg-black"
                          onClick={() => setShowImageModal(!showImageModal)}
                        >
                          <img
                            src={props.project.projectImgURI}
                            className="w-full object-contain opacity-90"
                            alt=""
                          />
                        </div>
                      )}

                    {/* Special display for article */}
                    {props.project.projectType === 'ARTICLE' &&
                      props.project.projectLinkURI && (
                        <OpenGraphPreview link={props.project.projectLinkURI} />
                      )}

                    {/* URL PREVIEW CARD */}
                    {props.project.projectType != 'POST' &&
                      props.project?.projectBodyPreview?.length <
                        sparkCharCount &&
                      linkPreview && (
                        <div className="">
                          <OpenGraphPreview link={linkPreview[0]} />
                        </div>
                      )}
                    {/* END URL PREVIEW CARD */}

                    <div className="w-full flex flex-wrap pb-2">
                      {props.project?.projectTechStack?.map((stack, index) => (
                        <div key={index}>
                          {stack !== 'Tech' &&
                            stack !== 'tech' &&
                            stack !== 'Humour' && (
                              <TechBadge tech={stack} size={'xs'} />
                            )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {props.project.numberOfLikes > 0 && (
                    <div className="mb-1 mx-0">
                      <PostInsights
                        projectId={props.project.projectId || props.project._id}
                        showViews={false}
                        showAvatars={false}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div
            className={
              'pl-6 py-0 pr-8 w-full ' +
              (props.myProfile == null && 'ml-2 sm:ml-6 pl-14')
            }
          >
            <div className="flex justify-between pl-2 pr-5">
              <Actions
                user={props.user}
                project={props.project}
                isLiked={props.isLiked}
                nComments={props.nComments}
                setShowPost={setShowPost}
              />
            </div>
          </div>
        </article>
      </div>

      <ModalDialog
        show={showPost}
        setShow={setShowPost}
        title={`${props.project.projectName}...`}
        dimensions={'sm:max-w-screen-md'}
      >
        <div>
          <div className="relative z-20 w-full flex flex-col h-screen overflow-hidden overflow-y-scroll no-scrollbar overscroll-contain">
            <div className="top-0 w-full max-w-3xl mx-auto bg-transparent">
              <PostDetail
                postId={projectId}
                user={props.user}
                setShowPost={setShowPost}
              />
            </div>
          </div>
        </div>
      </ModalDialog>

      {/* Image Modal */}
      {showImageModal && (
        <div className="top-0 left-0 w-full fixed flex flex-1 z-50 h-screen">
          <div
            className="fixed inset-0 bg-tfsdark-900 bg-opacity-80"
            onClick={() => setShowImageModal(!showImageModal)}
          ></div>

          <div className="flex flex-col justify-center w-auto my-auto mx-auto max-w-5xl max-h-screen relative bg-transparent md:rounded-xl">
            <div className="w-auto h-full mx-auto overflow-scroll no-scrollbar">
              <button
                className="z-50 w-full items-center space-x-1 text-sm text-white flex justify-end"
                onClick={() => setShowImageModal(!showImageModal)}
              >
                <IoCloseOutline className="h-10 w-10" />
              </button>
              {props.project.projectImgURI !== ' ' && (
                <div className="h-full w-full rounded overflow-hidden">
                  <img
                    src={props.project.projectImgURI}
                    className="w-full object-cover"
                    alt=""
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Post;
