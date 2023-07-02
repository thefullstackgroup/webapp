import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/future/image';
import dynamic from 'next/dynamic';
import '@uiw/react-markdown-preview/markdown.css';
const MarkdownPreview = dynamic(
  () => import('@uiw/react-markdown-preview').then((mod) => mod.default),
  { ssr: false }
);
import rehypeHighlight from 'rehype-highlight';
import { useTheme } from 'next-themes';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import getVideoId from 'get-video-id';
import VideoPlayer from 'components/common/elements/mux/VideoPlayer';
import TagStack from 'components/common/tags/TagStack';
import Avatar from 'components/common/elements/Avatar';
import GitHubStats from 'components/modules/project/GitHubStats';
import Contributors from 'components/modules/project/Contributors';
import { BiExpandAlt } from 'react-icons/bi';
import { IoCloseOutline, IoLogoGithub } from 'react-icons/io5';
import Moment from 'moment';
import Loader from 'components/common/elements/Loader';
import ToolTip from 'components/common/elements/ToolTip';
import Actions from 'components/modules/project/Actions';
import FollowButton from 'components/common/buttons/Follow';
import Insights from 'components/modules/post/Insights';
import Icon from 'components/common/elements/Icon';

const Container = ({ project, author, user, setShowComments }) => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  const [showImageModal, setShowImageModal] = useState(false);
  const [youTubeEmbedID, setYouTubeEmbedID] = useState(
    project?.projectLinkURI ? getVideoId(project?.projectLinkURI) : ''
  );

  if (!project)
    return (
      <div className="mx-auto flex h-screen max-w-screen-xl flex-1 items-center justify-center bg-base-800">
        <Loader />
      </div>
    );

  return (
    <>
      <div className="">
        {project?.isDraft &&
          project?.projectCreator?.userId === user?.userId && (
            <Link href={`/post?ref=${project?._id}`} passHref>
              <div className="w-full cursor-pointer bg-red-500/40 py-3 px-4 font-normal md:px-8">
                This project is{' '}
                <span className="font-bold text-base-200">unpublished</span> and
                not visible to anyone. Click to edit.
              </div>
            </Link>
          )}

        {project?.projectCreator?.userId === user?.userId && (
          <div className="mx-auto mt-8 flex max-w-screen-2xl space-x-8 px-20">
            <Link href={`/post?ref=${project?._id}`} passHref>
              <button className="btn btn-secondary">
                <span>Edit Project</span>
              </button>
            </Link>
          </div>
        )}

        <div className="bg-gradient-to-b from-base-50 to-base-200/50 pt-10 pb-8 dark:from-base-900 dark:to-base-800/90">
          <div className="relative z-10 mx-auto flex max-w-screen-xl items-center gap-12 pb-10">
            <div className="w-5/12 space-y-4">
              <div className="flex items-center space-x-3">
                <Avatar
                  href={`/${project?.projectCreator?.displayName}`}
                  image={project?.projectCreator?.profilePicUrl}
                  name={project?.projectCreator?.displayName}
                  dimensions="h-16 w-16"
                />
                <Link href={`/${project?.projectCreator?.displayName}`}>
                  <div className="flex cursor-pointer flex-col">
                    <span className="text-sm font-light text-base-300 dark:text-base-400">
                      Created by
                    </span>
                    <span className="text-lg font-medium">
                      {project?.projectCreator?.name}
                    </span>
                    <p className="px-0.5 text-xs font-light text-base-300 dark:text-base-400">
                      Posted{' '}
                      {Moment(project?.createdDate).format('MMM Do, YYYY')}
                    </p>
                  </div>
                </Link>
              </div>
              <div className="space-y-1">
                <h2 className="text-5xl font-semibold tracking-tight">
                  {project?.projectName}
                </h2>

                {project?.lookingForCollabs && (
                  <div className="py-2">
                    <div className="w-min whitespace-nowrap rounded-full border border-cyan-default px-2 py-1 text-xs font-normal tracking-normal text-cyan-dark dark:border-cyan-dark/40 dark:bg-base-900 dark:text-cyan-default">
                      Open to collab
                    </div>
                  </div>
                )}
              </div>

              <div>
                <div className="mt-6 flex flex-wrap items-center gap-0.5">
                  {project?.projectTechStack?.map((stack, index) => (
                    <TagStack tech={stack} key={index} />
                  ))}
                </div>

                <div className="flex w-full flex-row-reverse items-center pt-4 sm:w-auto sm:flex-row sm:space-x-2">
                  {project?.projectLinkURI !== '' && (
                    <a
                      href={project?.projectLinkURI}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-primary btn-with-icon"
                    >
                      <span className="">View project</span>
                      <Icon name={'FiExternalLink'} className="h-auto w-5" />
                    </a>
                  )}

                  {project?.sourceControlLink !== '' && (
                    <a
                      href={project?.sourceControlLink}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-secondary btn-with-icon"
                    >
                      <span className="hidden sm:block">Code</span>
                      <IoLogoGithub className="h-auto w-5" />
                    </a>
                  )}
                </div>
              </div>

              {user && (
                <div className="pt-6">
                  <Insights projectId={project?._id} />
                </div>
              )}
            </div>

            <div className="w-7/12">
              {project?.projectVideoURI ? (
                <div className="h-[200px] w-full overflow-hidden rounded-xl border border-base-300 bg-black dark:border-base-700 md:h-[430px]">
                  <VideoPlayer
                    src={project?.projectVideoURI}
                    poster={`${project?.projectImgURI}?width=640`}
                  />
                </div>
              ) : youTubeEmbedID.id ? (
                <div className="relative h-[200px] w-auto cursor-pointer overflow-hidden rounded-xl border border-base-300 bg-base-800 dark:border-base-700 md:h-[450px]">
                  <div className="h-full w-full overflow-hidden">
                    <LiteYouTubeEmbed
                      id={youTubeEmbedID.id}
                      title={project?.projectName}
                      aspectHeight={4}
                      aspectWidth={3}
                      autoplay={1}
                    />
                  </div>
                </div>
              ) : (
                project?.projectImgURI && (
                  <div
                    className="relative h-52 w-auto cursor-pointer overflow-hidden rounded-lg border border-base-300 bg-base-800 dark:border-base-700 md:h-[450px]"
                    onClick={() => setShowImageModal(!showImageModal)}
                  >
                    <Image
                      src={project?.projectImgURI}
                      className="h-full w-full object-cover opacity-90"
                      alt={project?.projectName}
                      width={900}
                      height={900}
                      layout="fill"
                      priority={true}
                    />
                    <button className="absolute top-4 right-6 hidden rounded-lg bg-black bg-opacity-40 p-2 lg:block">
                      <BiExpandAlt className="h-6 w-6 text-white" />
                    </button>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* <div className="sticky top-0 z-50 border-b border-t bg-[#F5F5F5] dark:border-base-700 dark:bg-base-900">
          <div className="mx-auto flex max-w-screen-2xl items-center justify-center px-20 py-3.5">
            <div>
              <Actions
                user={user}
                project={project}
                isLiked={project?.likedByCurrentUser}
                nComments={project?.numberOfComments}
                setShowComments={setShowComments}
                showLabel={false}
                toolTipPosition={'bottom'}
              />
            </div>
          </div>
        </div> */}

        <div className="relative z-10 mx-auto grid h-full max-w-screen-xl grid-cols-3 items-start gap-20">
          <div className="col-span-2 space-y-6 py-4">
            {/* {user && project?.hasGitHubReadMe && (
              <div className="space-y-8">
                <GitHubStats project={project} />
              </div>
            )} */}

            {/* {project?.lookingForCollabs && (
              <div className="pb-4">
                <div className="flex items-center justify-between rounded-xl border border-base-300 bg-base-50 px-3.5 py-3 text-sm text-base-800 dark:border-cyan-dark/40 dark:bg-base-900 dark:text-cyan-default">
                  <div className="flex items-center space-x-2">
                    <Icon name="FiInfo" />
                    <span>Actively seeking contributors</span>
                  </div>
                  <div>
                    <ButtonConnect
                      connectionPending={isConnectionPending}
                      connectFrom={user}
                      connectTo={project.projectCreator}
                      size="btn-sm btn-ghost dark:text-cyan-default"
                      label="&rarr; Lets connect"
                    />
                  </div>
                </div>
              </div>
            )} */}

            <div className="wmde-markdown-var mt-4 mb-20 max-w-4xl">
              {project?.projectBody && (
                <MarkdownPreview
                  source={project?.projectBody}
                  remarkPlugins={[rehypeHighlight, { detect: true }]}
                  wrapperElement={{
                    'data-color-mode': currentTheme,
                  }}
                />
              )}
            </div>
          </div>
          <div className="h-full w-full space-y-8 border-l border-base-200/70 dark:border-base-700">
            {/* Profile Card */}
            <div className="sticky top-4 mb-8 space-y-5 py-4 pt-8 pl-12">
              <div className="flex items-center space-x-3">
                <Avatar
                  href={`/${author?.displayName}`}
                  image={author?.profilePicUrl}
                  name={author?.displayName}
                  dimensions="h-16 w-16"
                />

                <div className="flex cursor-pointer flex-col">
                  <Link href={`/${author?.displayName}`}>
                    <h4 className="text-lg font-medium">{author?.name}</h4>
                  </Link>
                  <p className="text-sm font-light text-base-300 dark:text-base-400">
                    {author?.currentTitle}
                  </p>
                  <p className="text-sm font-light text-base-300 dark:text-base-400">
                    Joined {Moment(author?.createdDate).format('MMMM YYYY')}
                  </p>
                </div>
              </div>

              {user && project?.userId !== user?.userId && (
                <FollowButton
                  followToUser={project?.projectCreator?.userId}
                  followFromUser={user?.userId}
                  followToName={project?.projectCreator?.displayName}
                  size={'sm:w-11/12'}
                />
              )}
              {!user && (
                <Link href="/signup">
                  <button className="btn btn-secondary sm:w-11/12">
                    Follow
                  </button>
                </Link>
              )}

              <div className="line-clamp-6">
                {author?.bio?.aboutUser !== ''
                  ? author?.bio?.aboutUser
                  : 'No bio added'}
              </div>
              <div className="flex flex-wrap">
                {author?.userTechStacks?.map(
                  (stack, index) =>
                    stack != null &&
                    index < 8 && <TagStack tech={stack} key={index} size="xs" />
                )}
                <span>...</span>
              </div>

              <GitHubStats project={project} />
              {user && <Contributors project={project} />}
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-14 left-0 z-50 w-full">
        <div className="mx-auto max-w-sm rounded-full border border-base-300 bg-base-50 px-6 py-3 shadow-lg dark:border-base-600 dark:bg-base-800/95 dark:shadow-purple-500/20">
          <Actions
            user={user}
            project={project}
            isLiked={project?.likedByCurrentUser}
            nComments={project?.numberOfComments}
            setShowComments={setShowComments}
            showLabel={false}
          />
        </div>
      </div>

      {/* Image Modal */}
      {showImageModal && (
        <div className="fixed top-0 left-0 z-50 mx-auto flex h-screen w-full items-center">
          <div
            className="fixed inset-0 bg-base-900 bg-opacity-90"
            onClick={() => setShowImageModal(!showImageModal)}
          ></div>
          <div className="absolute top-4 right-2 z-50 md:right-4">
            <button
              className="group relative h-10 w-10 rounded-xl bg-black/40"
              onClick={() => setShowImageModal(!showImageModal)}
            >
              <ToolTip message="Close" position="bottom" />
              <IoCloseOutline className="h-10 w-10" />
            </button>
          </div>
          <div className="relative my-auto mx-auto flex h-[90vh] max-h-screen max-w-7xl justify-center bg-transparent bg-black md:rounded-xl">
            <div className="relative flex max-w-7xl flex-1 rounded-xl">
              <img
                src={project?.projectImgURI}
                className="h-full w-full object-contain object-center"
                alt={project?.projectName}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Container;
