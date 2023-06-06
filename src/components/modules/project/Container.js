import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/future/image';
import Markdown from 'markdown-to-jsx';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import getVideoId from 'get-video-id';
import VideoPlayer from 'components/common/elements/mux/VideoPlayer';
import TagStack from 'components/common/tags/TagStack';
import CodeBlock from 'components/common/elements/CodeBlock';
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
import ButtonConnect from 'components/common/buttons/Connect';
import ButtonChat from 'components/common/buttons/Chat';
import Icon from 'components/common/elements/Icon';

const Container = ({ project, isConnected, isConnectionPending, user }) => {
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
      <div className="no-scrollbar">
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
          <div className="sticky top-0 left-0 z-50 w-full bg-base-700 px-4 py-4 md:px-8">
            <div className="sticky top-0 mx-auto flex max-w-screen-2xl items-center justify-end space-x-8">
              <Link href={`/post?ref=${project?._id}`} passHref>
                <button className="btn-secondary">
                  <span>Edit Project</span>
                </button>
              </Link>
            </div>
          </div>
        )}

        <div className="bg-gradient-to-b from-base-50 to-base-200/50 py-14 dark:from-base-900 dark:to-base-800/90">
          <div className="relative z-10 mx-auto flex max-w-screen-2xl items-center gap-12 px-20">
            <div className="w-5/12 space-y-4">
              <div className="flex items-center space-x-3">
                <Avatar
                  href={`/${project?.projectCreator?.displayName}`}
                  image={project?.projectCreator?.profilePicUrl}
                  name={project?.projectCreator?.displayName}
                  dimensions="h-14 w-14"
                />
                <Link href={`/${project?.projectCreator?.displayName}`}>
                  <div className="flex cursor-pointer flex-col -space-y-1">
                    <span className="text-sm font-light text-base-300 dark:text-base-400">
                      Created by
                    </span>
                    <span className="text-lg font-medium">
                      {project?.projectCreator?.name}
                    </span>
                  </div>
                </Link>
              </div>
              <div className="space-y-1">
                <h2 className="text-5xl font-semibold tracking-tight">
                  {project?.projectName}
                </h2>
                <p className="px-0.5 text-sm font-light text-base-300 dark:text-base-400">
                  Posted {Moment(project?.createdDate).format('MMM Do, YYYY')}
                </p>
              </div>

              <div className="my-4 mt-6 flex flex-wrap items-center gap-0.5 ">
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

              <div className="flex w-56 pt-8">
                <Actions
                  user={user}
                  project={project}
                  isLiked={project?.likedByCurrentUser}
                  nComments={project?.numberOfComments}
                />
              </div>
            </div>

            <div className="w-7/12">
              {project?.projectVideoURI ? (
                <div className="h-[200px] w-full overflow-hidden rounded-xl border border-base-300 bg-black dark:border-base-700 md:h-[450px]">
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

        <div className="sticky top-0 z-50 border-b border-t bg-base-50 dark:border-base-700 dark:bg-base-900">
          <div className="mx-auto flex max-w-screen-2xl items-center justify-between px-20">
            <div className="flex space-x-10">
              <button className="border-b border-base-900 py-5 dark:border-base-50">
                Description
              </button>
              <button className="py-5">Contributors</button>
              <button className="py-5">Stats</button>
            </div>
            <div className="flex items-center space-x-4">
              <Avatar
                href={`/${project?.projectCreator?.displayName}`}
                image={project?.projectCreator?.profilePicUrl}
                name={project?.projectCreator?.displayName}
                dimensions="h-8 w-8"
              />
              {user && project?.userId !== user?.userId && (
                <FollowButton
                  followToUser={project?.projectCreator?.userId}
                  followFromUser={user?.userId}
                  followToName={project?.projectCreator?.displayName}
                />
              )}
              {project?.userId !== user?.userId && isConnected ? (
                <ButtonChat profile={project.projectCreator} myProfile={user} />
              ) : (
                <ButtonConnect
                  connectionPending={isConnectionPending}
                  connectFrom={user}
                  connectTo={project.projectCreator}
                />
              )}
            </div>
          </div>
        </div>

        <div className="relative z-10 mx-auto flex max-w-screen-2xl items-start gap-20 px-20">
          <div className="w-8/12 py-4">
            <div className="block md:hidden">
              <Insights projectId={project?._id} />
            </div>

            {/* {project?.lookingForCollabs &&
            project?.projectCreator?.userId !== user?.userId && (
              <>
                {isConnected ? (
                  <div className="flex flex-col space-y-2 rounded-md bg-base-700 p-4 duration-200 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                    <div>
                      <span className="text-base-200">
                        This project is{' '}
                        <span className="font-bold">open to contribution</span>{' '}
                        and you are both connected.
                      </span>
                    </div>
                    <ButtonChat
                      profile={project.projectCreator}
                      myProfile={user}
                    />
                  </div>
                ) : (
                  <div
                    className="flex flex-col space-y-2 rounded-md bg-base-700 p-4 duration-200 sm:flex-row sm:items-center sm:justify-between sm:space-y-0"
                    // onClick={() => {
                    //   // setDisplayConnection(true);
                    //   sendSlackMessage(
                    //     `Clicked on the connect to collaborate button on the project '${project?.projectName}'`
                    //   );
                    // }}
                  >
                    <div>
                      <span className="text-base-200">
                        This project is{' '}
                        <span className="font-bold">open to contribution</span>.
                        Connect with me to contribute.
                      </span>
                    </div>
                    <ButtonConnect
                      connectionPending={isConnectionPending}
                      connectFrom={user}
                      connectTo={project.projectCreator}
                    />
                  </div>
                )}
              </>
            )} */}

            <div className="prose mx-auto mt-4 max-w-4xl dark:prose-dark">
              {!project?.projectBody.includes('</img>') ? (
                project?.projectBody && (
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
                    }}
                  >
                    {project?.projectBody}
                  </Markdown>
                )
              ) : (
                <span className="italic">
                  The description for this project cannot be displayed as it
                  contains invalid markdown or HTML.
                </span>
              )}
            </div>
          </div>
          <div className="sticky top-20 w-4/12 space-y-6 pt-8 pl-10">
            {project?.lookingForCollabs &&
              project?.projectCreator?.userId !== user?.userId && (
                <>
                  {isConnected ? (
                    <div className="space-y-2 px-4 py-2">
                      <div>
                        <span className="text-base-200">
                          This project is{' '}
                          <span className="font-bold">
                            open to contribution
                          </span>{' '}
                          and you are both connected.
                        </span>
                      </div>
                      <ButtonChat
                        profile={project.projectCreator}
                        myProfile={user}
                      />
                    </div>
                  ) : (
                    <div
                      className="space-y-2 px-4 py-2"
                      // onClick={() => {
                      //   // setDisplayConnection(true);
                      //   sendSlackMessage(
                      //     `Clicked on the connect to collaborate button on the project '${project?.projectName}'`
                      //   );
                      // }}
                    >
                      <div>
                        <span className="text-base-200">
                          This project is{' '}
                          <span className="font-bold">
                            open to contribution
                          </span>
                          . Connect with me to contribute.
                        </span>
                      </div>
                      <ButtonConnect
                        connectionPending={isConnectionPending}
                        connectFrom={user}
                        connectTo={project.projectCreator}
                      />
                    </div>
                  )}
                </>
              )}
            {project?.hasGitHubReadMe && <GitHubStats project={project} />}
            {user && <Contributors project={project} />}
          </div>
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
