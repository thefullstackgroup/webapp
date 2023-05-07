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
      <div className="bg-tfsdark-800 h-screen max-w-screen-xl mx-auto flex flex-1 justify-center items-center">
        <Loader />
      </div>
    );

  return (
    <>
      <div className="h-screen overflow-y-scroll overflow-hidden overscroll-contain no-scrollbar bg-tfsdark-900 pb-28">
        {project?.isDraft && project?.projectCreator?.userId === user?.userId && (
          <Link href={`/post?ref=${project?._id}`} passHref>
            <div className="py-3 w-full bg-red-500/40 cursor-pointer font-normal px-4 md:px-8">
              This project is{' '}
              <span className="font-bold text-slate-200">unpublished</span> and
              not visible to anyone. Click to edit.
            </div>
          </Link>
        )}

        {project?.projectCreator?.userId === user?.userId && (
          <div className="sticky z-50 bg-tfsdark-700 w-full top-0 left-0 px-4 md:px-8 py-4">
            <div className="sticky top-0 flex space-x-8 justify-end mx-auto max-w-screen-2xl items-center">
              <Link href={`/post?ref=${project?._id}`} passHref>
                <button className="btn-secondary">
                  <span>Edit Project</span>
                </button>
              </Link>
            </div>
          </div>
        )}

        {project?.projectVideoURI ? (
          <div className="h-[58vh] md:h-[64vh] w-full overflow-hidden bg-black">
            <VideoPlayer
              src={project?.projectVideoURI}
              poster={`${project?.projectImgURI}?width=640`}
            />
          </div>
        ) : youTubeEmbedID.id ? (
          <div className="relative h-[32vh] md:h-[60vh] w-auto bg-tfsdark-800 overflow-hidden cursor-pointer">
            <div className="w-full h-full overflow-hidden">
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
              className="relative h-52 md:h-[50vh] w-auto bg-slate-800 overflow-hidden cursor-pointer"
              onClick={() => setShowImageModal(!showImageModal)}
            >
              <Image
                src={project?.projectImgURI}
                className="w-full h-full object-cover opacity-90"
                alt={project?.projectName}
                width={900}
                height={900}
                layout="fill"
                priority={true}
              />
              <button className="hidden lg:block p-2 rounded-lg absolute top-4 right-6 bg-black bg-opacity-40">
                <BiExpandAlt className="text-white h-6 w-6" />
              </button>
            </div>
          )
        )}

        <div className="p-4 md:pb-8 xl:px-8">
          <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:space-x-6 justify-between items-start sm:items-start lg:sticky lg:top-0 pt-2 pb-4 bg-tfsdark-900 z-10">
            <Link
              href={`/${project?.projectCreator?.displayName}/project/${project?.projectSlug}`}
            >
              <h2 className="text-2xl md:text-2xl font-semibold tracking-tight text-slate-100 cursor-pointer">
                {project?.projectName}
              </h2>
            </Link>

            <div className="flex flex-row-reverse sm:flex-row items-center sm:space-x-2 w-full sm:w-auto">
              {project?.sourceControlLink !== '' && (
                <a
                  href={project?.sourceControlLink}
                  target="_blank"
                  rel="noreferrer"
                  className="relative group btn-ghost text-base btn-with-icon pl-2 pr-4 py-2"
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
                  className="relative group btn-primary text-base btn-with-icon whitespace-nowrap w-full sm:w-auto justify-center px-4 py-2"
                >
                  <span className="">View project</span>
                </a>
              )}
            </div>
          </div>

          <div className="block md:hidden">
            <Insights projectId={project?._id} />
          </div>

          <div className="mt-4 flex xl:hidden items-center space-x-3">
            <Avatar
              href={`/${project?.projectCreator?.displayName}`}
              image={project?.projectCreator?.profilePicUrl}
              name={project?.projectCreator?.displayName}
              dimensions="h-8 w-8"
            />
            <Link href={`/${project?.projectCreator?.displayName}`}>
              <div className="flex flex-col cursor-pointer">
                <p className="text-xs font-normal text-slate-400 tracking-tight">
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
            <div className="my-2 w-auto flex overflow-hidden overflow-x-scroll no-scrollbar items-center">
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
                  <div className="bg-tfsdark-700 duration-200 rounded-md p-4 flex flex-col sm:flex-row sm:justify-between space-y-2 sm:space-y-0 sm:items-center">
                    <div>
                      <span className="text-slate-200">
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
                    className="bg-tfsdark-700 duration-200 rounded-md p-4 flex flex-col sm:flex-row sm:justify-between space-y-2 sm:space-y-0 sm:items-center"
                    // onClick={() => {
                    //   // setDisplayConnection(true);
                    //   sendSlackMessage(
                    //     `Clicked on the connect to collaborate button on the project '${project?.projectName}'`
                    //   );
                    // }}
                  >
                    <div>
                      <span className="text-slate-200">
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

          <div className="mt-4 prose prose-dark max-w-full">
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
        <div className="top-0 left-0 fixed z-50 w-full mx-auto h-screen flex items-center">
          <div
            className="fixed inset-0 bg-tfsdark-900 bg-opacity-90"
            onClick={() => setShowImageModal(!showImageModal)}
          ></div>
          <div className="absolute z-50 top-4 right-2 md:right-4">
            <button
              className="relative group bg-black/40 rounded-xl h-10 w-10"
              onClick={() => setShowImageModal(!showImageModal)}
            >
              <ToolTip message="Close" position="bottom" />
              <IoCloseOutline className="h-10 w-10" />
            </button>
          </div>
          <div className="flex justify-center my-auto mx-auto max-w-7xl max-h-screen relative bg-transparent md:rounded-xl h-[90vh] bg-black">
            <div className="relative flex flex-1 max-w-7xl rounded-xl">
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
