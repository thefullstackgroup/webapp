import React, { useEffect, useMemo, useState } from 'react';
import Markdown from 'markdown-to-jsx';
import Moment from 'moment';
import Link from 'next/link';
import TechBadge from 'components/common/tags/TagStack';
import ModalDialog from 'components/common/modals/ModalDialog';
import Actions from 'components/modules/post/Actions';
import PostInsights from 'components/modules/post/Insights';
import OpenGraphPreview from 'components/modules/post/OpenGraphPreview';
import Avatar from 'components/common/elements/Avatar';
import PostDetail from 'components/modules/post/Detail';
import extractUrls from 'extract-urls';
import TagPostType from 'components/common/tags/TagPostType';
import Icon from '../elements/Icon';
import PollCard from './PollCard';

const sparkCharCount = 250;

const ContentLink = ({ children, ...props }) => (
  <span {...props} className="text-link break-all text-left">
    {children}
  </span>
);

const Post = (props) => {
  const [showImageModal, setShowImageModal] = useState(false);
  const [showPost, setShowPost] = useState(false);
  const projectId = props.project.projectId || props.project._id;
  const shortPostPreview = props.project.projectBodyPreview.substr(
    0,
    sparkCharCount
  );

  const linkPreview = useMemo(() => {
    return props.project.projectBodyPreview
      ? extractUrls(props.project?.projectBodyPreview)
      : null;
  }, []);

  if (!props.project) return '...';

  return (
    <>
      <div className="w-full cursor-pointer border-t border-b bg-base-50 duration-200 dark:border-base-700 dark:bg-black lg:rounded-lg lg:border lg:border-base-200 lg:hover:border-base-300/50 dark:lg:hover:border-base-500">
        <article>
          <div className="space-y-4">
            <div className="flex items-start justify-between px-4 pt-3">
              {props.myProfile == null && (
                <div className="flex items-center space-x-3 pt-1">
                  <Avatar
                    userId={props.project?.userId}
                    image={
                      props.project?.projectCreator?.profilePicUrl ||
                      props.project?.projectCreator?.profilePicURL
                    }
                    name={props.project?.projectCreator?.displayName}
                    href={`/${props.project.projectCreator?.displayName}`}
                    dimensions="h-12 w-12"
                  />
                  <Link
                    href={`${process.env.BASEURL}/${props.project.projectCreator?.displayName}`}
                    passHref
                  >
                    <div>
                      <div className="group flex w-full flex-wrap items-center text-left text-sm">
                        <span className="font-semibold">
                          {props.project.projectCreator?.name}
                        </span>
                      </div>
                      <div className="text-xs dark:text-base-300 sm:mt-0">
                        {props.project.projectCreator?.currentTitle}
                      </div>
                      <div className="text-xs text-base-400 dark:text-base-400">
                        {Moment(props.project.createdDate).format('MMM Do')}
                      </div>
                    </div>
                  </Link>
                </div>
              )}
              <div className="pt-2">
                {props.project.projectType !== 'SPARK' && (
                  <TagPostType postType={props.project.projectType} />
                )}
              </div>
            </div>

            {/* Card Content */}

            <div className="group relative">
              <button
                className="w-full cursor-pointer px-4 text-left outline-none"
                onClick={() => setShowPost(true)}
              >
                {props.project?.projectBodyPreview?.length < sparkCharCount && (
                  <div className="prose-custom prose-sm w-full overflow-hidden dark:prose-dark sm:prose-base">
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
                              className: 'text-sm sm:text-base font-normal',
                            },
                          },
                        },
                      }}
                    >
                      {props.project.projectBodyPreview}
                    </Markdown>
                  </div>
                )}
                {props.project?.projectBodyPreview?.length > sparkCharCount && (
                  <div>
                    <div className="items-center overflow-hidden text-base">
                      <div className="prose-custom prose-sm w-full overflow-hidden dark:prose-dark sm:prose-base">
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
                          {`${shortPostPreview.substr(
                            0,
                            Math.min(
                              shortPostPreview.length,
                              shortPostPreview.lastIndexOf(' ')
                            )
                          )} <span className="text-base-300">...see more</span>`}
                        </Markdown>
                      </div>
                    </div>
                  </div>
                )}
              </button>

              <div className="mt-2 flex w-full flex-wrap px-4 pb-2">
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

              {/* DISPLAY POLL HERE */}
              {props.project.projectType === 'POLL' && (
                <PollCard user={props.user} postId={projectId} />
              )}

              {props.project.projectType !== 'POLL' &&
                props.project.projectType !== 'ARTICLE' &&
                props.project.projectImgURI != '' && (
                  <div
                    className="max-h-auto w-full overflow-hidden"
                    onClick={() => setShowImageModal(!showImageModal)}
                  >
                    <img
                      src={props.project.projectImgURI}
                      className="w-full object-contain"
                      alt={props.project.projectName}
                      title={props.project.projectName}
                    />
                  </div>
                )}

              {/* Special display for article */}
              {props.project.projectType === 'ARTICLE' &&
                props.project.projectLinkURI && (
                  <div>
                    <OpenGraphPreview link={props.project.projectLinkURI} />
                  </div>
                )}

              {/* URL PREVIEW CARD */}
              {props.project.projectType != 'POST' &&
                props.project?.projectBodyPreview?.length < sparkCharCount &&
                linkPreview && (
                  <div className="">
                    <OpenGraphPreview link={linkPreview[0]} />
                  </div>
                )}
              {/* END URL PREVIEW CARD */}
            </div>

            {props.user && props.project.numberOfLikes > 0 && (
              <div className="px-4 pb-3">
                <PostInsights
                  projectId={props.project.projectId || props.project._id}
                  showViews={false}
                />
              </div>
            )}
          </div>

          <Actions
            user={props.user}
            project={props.project}
            isLiked={props.isLiked}
            nComments={props.nComments}
            setShowPost={setShowPost}
          />
        </article>
      </div>

      <ModalDialog
        show={showPost}
        setShow={setShowPost}
        title={`${props.project.projectName}...`}
        dimensions={'sm:max-w-screen-md'}
      >
        <div>
          <div className="no-scrollbar relative z-20 flex h-screen w-full flex-col overflow-hidden overflow-y-scroll overscroll-contain">
            <div className="top-0 mx-auto w-full bg-transparent">
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
        <div className="fixed top-0 left-0 z-50 flex h-screen w-full flex-1">
          <div
            className="fixed inset-0 bg-base-900 bg-opacity-80"
            onClick={() => setShowImageModal(!showImageModal)}
          ></div>

          <div className="relative my-auto mx-auto flex max-h-screen w-auto max-w-5xl flex-col justify-center bg-transparent md:rounded-xl">
            <div className="no-scrollbar mx-auto h-full w-auto overflow-scroll text-right">
              <button
                className="btn btn-ghost z-50 px-0"
                onClick={() => setShowImageModal(!showImageModal)}
              >
                <Icon name="FiX" className="h-10 w-10" />
              </button>
              {props.project.projectImgURI !== ' ' && (
                <div className="h-full w-full overflow-hidden rounded">
                  <img
                    src={props.project.projectImgURI}
                    className="w-full object-cover"
                    alt={props.project.projectName}
                    title={props.project.projectName}
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
