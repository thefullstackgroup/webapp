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
import Loader from 'components/common/elements/Loader';
import ToolTip from 'components/common/elements/ToolTip';
import Insights from 'components/modules/post/Insights';
import ButtonConnect from 'components/common/buttons/Connect';
import ButtonChat from 'components/common/buttons/Chat';

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
      <div className="no-scrollbar py-6">
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

        <h2 className="mb-6 cursor-pointer text-2xl font-semibold tracking-tight text-base-100 md:text-4xl">
          {project?.projectName}
        </h2>

        {project?.projectVideoURI ? (
          <div className="h-[58vh] w-full overflow-hidden bg-black md:h-[64vh]">
            <VideoPlayer
              src={project?.projectVideoURI}
              poster={`${project?.projectImgURI}?width=640`}
            />
          </div>
        ) : youTubeEmbedID.id ? (
          <div className="relative h-[32vh] w-auto cursor-pointer overflow-hidden rounded-lg bg-base-800 md:h-[60vh]">
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
              className="relative h-52 w-auto cursor-pointer overflow-hidden rounded-lg bg-base-800 md:h-[50vh]"
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

        <div className="md:pb-8">
          <div className="z-10 flex flex-col items-start justify-between space-y-2 bg-base-900 pt-2 pb-4 sm:items-start md:flex-row md:space-y-0 md:space-x-6 lg:sticky lg:top-0">
            <div className="flex w-full flex-row-reverse items-center sm:w-auto sm:flex-row sm:space-x-2">
              {project?.sourceControlLink !== '' && (
                <a
                  href={project?.sourceControlLink}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost btn-with-icon group relative py-2 pl-2 pr-4 text-base"
                >
                  <ToolTip message="Browse GitHub repository" />
                  <IoLogoGithub className="h-auto w-7 " />
                  <span className="hidden sm:block">Source</span>
                </a>
              )}

              {project?.projectLinkURI !== '' && (
                <a
                  href={project?.projectLinkURI}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary btn-with-icon group relative w-full justify-center whitespace-nowrap px-4 py-2 text-base sm:w-auto"
                >
                  <span className="">View project</span>
                </a>
              )}
            </div>
          </div>

          <div className="block md:hidden">
            <Insights projectId={project?._id} />
          </div>

          <div className="mt-4 flex items-center space-x-3 xl:hidden">
            <Avatar
              href={`/${project?.projectCreator?.displayName}`}
              image={project?.projectCreator?.profilePicUrl}
              name={project?.projectCreator?.displayName}
              dimensions="h-8 w-8"
            />
            <Link href={`/${project?.projectCreator?.displayName}`}>
              <div className="flex cursor-pointer flex-col">
                <p className="text-xs font-normal tracking-tight text-base-400">
                  Created by
                </p>
                <div className="text-sm">
                  <p className="font-bold tracking-tight">
                    {project?.projectCreator?.name}
                  </p>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-span-4 flex">
            <div className="no-scrollbar my-2 flex w-auto items-center overflow-hidden overflow-x-scroll">
              {project?.projectTechStack?.map((stack, index) => (
                <TagStack tech={stack} key={index} size={'xs'} />
              ))}
            </div>
          </div>

          {project?.hasGitHubReadMe && <GitHubStats project={project} />}

          {project?.lookingForCollabs &&
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
            )}

          <div className="prose prose-dark mt-4 max-w-full">
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
          {user && <Contributors project={project} />}
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
