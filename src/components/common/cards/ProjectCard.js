import React, { useState } from 'react';
import { Transition } from '@headlessui/react';
import Markdown from 'markdown-to-jsx';
import Link from 'next/link';
import Project from 'components/modules/project/Modal';
import Image from 'next/future/image';
import TechBadge from 'components/common/tags/TagStack';
import Avatar from 'components/common/elements/Avatar';
import { BiUpvote } from 'react-icons/bi';
import {
  IoArrowUp,
  IoChatbox,
  IoChatboxOutline,
  IoDiamondOutline,
  IoHeart,
} from 'react-icons/io5';
import { BsGem } from 'react-icons/bs';
import ToolTip from '../elements/ToolTip';

const ContentLink = ({ children, ...props }) => (
  <button
    {...props}
    onClick={() => props.setShowPost(true)}
    className="text-link break-all text-left"
  >
    {children}
  </button>
);

const ProjectCard = ({ project, user, type, hideAuthor }) => {
  const [showProject, setShowProject] = useState(false);
  const title = project.projectName;

  return (
    <>
      {type === 'list' ? (
        <div className="group border-b sm:border-b-0 border-tfsdark-600 sm:bg-tfsdark-700/50 sm:hover:bg-tfsdark-700 pt-0 sm:pt-4 p-4 mb-6 sm:rounded-lg">
          <div className="flex flex-col md:flex-row justify-between md:px-4 mb-0 md:mb-0">
            <div className="flex items-center md:mx-0 mb-4 space-x-2">
              <Avatar
                href={`/${project?.projectCreator.displayName}`}
                image={
                  project?.projectCreator.profilePicUrl ||
                  project?.projectCreator.profilePicURL
                }
                name={project?.projectCreator.displayName}
                userId={project?.userId}
                dimensions="h-9 w-9 sm:h-14 sm:w-14"
              />

              <Link href={`/${project?.projectCreator.displayName}`}>
                <div className="w-full cursor-pointer group">
                  <div className="flex flex-col justify-between ml-0 sm:ml-2 text-sm sm:text-lg leading-4">
                    <p className="text-slate-200  group-hover:text-white font-semibold">
                      {project?.projectCreator.name}
                    </p>
                    <p className="text-slate-400 text-xs">
                      {project?.projectCreator.currentTitle}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <div
            className="flex flex-col-reverse md:flex-row items-start md:space-x-12 cursor-pointer md:px-4 justify-between overflow-hidden pb-4"
            onClick={() => setShowProject(!showProject)}
          >
            <div className="md:w-2/3 space-y-2">
              <div className="font-medium text-base md:text-2xl group-hover:text-white">
                {project.projectName}
              </div>
              <div className="flex-wrap font-medium text-slate-400 hidden sm:flex text-sm md:text-base">
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
                          setShowPost: setShowProject,
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
                  {project?.projectBodyPreview
                    ?.substring(0, 250)
                    .substring(
                      0,
                      project.projectBodyPreview
                        .substring(0, 250)
                        .lastIndexOf(' ')
                    ) + '...'}
                </Markdown>
              </div>
              <div className="w-full hidden sm:flex flex-wrap my-2">
                {project.projectTechStack.map((stack, index) => (
                  <div key={index}>
                    {stack !== 'Tech' &&
                      stack !== 'tech' &&
                      stack !== 'Humour' && (
                        <TechBadge tech={stack} size={'xs'} />
                      )}
                  </div>
                ))}
              </div>
              {/* {project.numberOfLikes > 0 && ( */}
              <div className="flex items-center space-x-4 md:space-x-6">
                <button className="flex items-center space-x-1 font-medium rounded-lg">
                  <BiUpvote className="text-white w-5 h-auto" />
                  <span className="text-sm">
                    {Math.abs(project?.numberOfLikes)}
                    <span className="hidden sm:inline-flex ml-1">
                      {project?.numberOfLikes == 1 ? 'vote' : 'votes'}
                    </span>
                  </span>
                </button>
                <button className="flex items-center space-x-1 font-medium rounded-lg">
                  <IoChatboxOutline className="text-white w-5 h-auto" />
                  <span className="text-sm">
                    {Math.abs(project?.numberOfComments)}
                    <span className="hidden sm:inline-flex ml-1">
                      {project?.numberOfComments == 1 ? 'comment' : 'comments'}
                    </span>
                  </span>
                </button>
                {project?.contentTotalDiamonds > 0 ? (
                  <button className="flex items-center space-x-1 font-medium">
                    <IoDiamondOutline className="text-yellow-500 w-5 h-auto" />
                    <span className="text-sm">
                      {project?.contentTotalDiamonds}{' '}
                      <span className="hidden sm:inline-flex ml-1">
                        {project?.contentTotalDiamonds == 1
                          ? 'award'
                          : 'awards'}
                      </span>
                    </span>
                    <span className="text-sm"></span>
                  </button>
                ) : (
                  <button className="flex items-center space-x-2 font-medium">
                    <IoDiamondOutline className="text-slate-400 w-5 h-auto" />
                    <span className="text-sm">0 awards</span>
                  </button>
                )}
              </div>
              {/* )} */}
            </div>
            <div className="relative w-full md:w-1/3">
              <div className="w-full h-56 mb-2 md:mb-0 overflow-hidden rounded">
                {project.projectImgURI && (
                  <Image
                    src={project.projectImgURI}
                    className="h-full w-full object-cover duration-200"
                    alt={title}
                    width={200}
                    height={200}
                    layout="fill"
                  />
                )}
              </div>
              {project?.lookingForCollabs && (
                <div className="absolute top-2 right-2 mb-4">
                  <div
                    className="bg-purple-500/90 rounded-full py-1.5 flex items-center space-x-1 text-xs font-bold px-2 sm:h-7"
                    title="Open to collaboration"
                  >
                    <span>Collab</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div
          className="duration-200 space-y-2 group cursor-pointer h-full relative overflow-hidden pb-4"
          onClick={() => setShowProject(!showProject)}
        >
          <div className="w-full h-52 bg-tfsdark-900 overflow-hidden rounded-md">
            {project.projectImgURI && (
              <Image
                src={project.projectImgURI}
                className="h-full w-full object-cover opacity-60 sm:opacity-80 sm:group-hover:opacity-90 duration-200 sm:group-hover:scale-110"
                alt={title}
                width={400}
                height={400}
                layout="fill"
              />
            )}
          </div>

          {!hideAuthor && (
            <>
              <div className="absolute top-2 left-4 flex items-center space-x-2">
                <Avatar
                  image={project.projectCreator.profilePicUrl}
                  name={project.projectCreator.displayName}
                  dimensions="h-10 w-10"
                />
              </div>
              {project?.lookingForCollabs && (
                <div
                  className="absolute top-0 right-4 bg-tfsdark-900/40 border border-slate-400 text-xs px-2 py-0.5 rounded-full font-semibold"
                  title="Open to collaboration"
                >
                  <span>Collab</span>
                </div>
              )}
            </>
          )}

          <div className="flex items-center justify-between">
            <p className="font-normal text-base truncate px-0">
              {project.projectName}
            </p>

            <div className="flex space-x-3 px-0">
              <button className="flex items-center space-x-1 font-normal rounded-lg text-slate-300">
                <IoHeart className="w-auto h-4" />
                <span className="text-sm">
                  {Math.abs(project?.numberOfLikes)}
                </span>
              </button>
              <button className="flex items-center space-x-1 font-normal rounded-lg text-slate-300">
                <IoChatbox className="w-auto h-4" />
                <span className="text-sm">{project?.numberOfComments}</span>
              </button>

              {/* <button className="flex items-center space-x-1 font-normal text-slate-400">
                {project?.contentTotalDiamonds > 0 ? (
                  <BsGem className="text-yellow-500 w-auto h-3" />
                ) : (
                  <BsGem className="text-slate-300 w-auto h-3" />
                )}
                <span className="text-sm">{project?.contentTotalDiamonds}</span>
              </button> */}
            </div>
          </div>
          <div className="flex space-x-2 px-0">
            {project?.projectTechStack.map((stack, index) => (
              <TechBadge
                tech={stack}
                size={'xs'}
                key={index}
                iconOnly={true}
                style="h-4 w-4 text-slate-400 rounded"
              />
            ))}
          </div>
        </div>
      )}

      {/* Project Detail Modal */}
      <Transition
        show={showProject}
        enter=""
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave=""
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="fixed z-50 top-0 left-0 w-full h-screen bg-tfsdark-800/70 backdrop-blur-md overscroll-contain"
      >
        <div
          className="fixed inset-0 h-screen w-full"
          onClick={() => setShowProject(false)}
        ></div>
        <div>
          <div className="relative w-full max-w-screen-2xl mx-auto 2xl:px-10 flex flex-col h-screen overflow-hidden overflow-y-scroll no-scrollbar overscroll-contain">
            <div className="top-0 w-full max-w-full mx-auto bg-tfsdark-900">
              <Project
                projectId={project._id || project.projectId}
                projectSlug={project.projectSlug}
                projectUserId={project.projectCreator.displayName}
                user={user}
                setShowProject={setShowProject}
              />
            </div>
          </div>
        </div>
      </Transition>
    </>
  );
};

export default ProjectCard;
