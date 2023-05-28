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
      <div
        className="group relative h-full cursor-pointer space-y-2 overflow-hidden pb-4 duration-200"
        onClick={() => setShowProject(!showProject)}
      >
        <div className="h-72 w-full overflow-hidden rounded-md bg-base-900">
          {project.projectImgURI && (
            <Image
              src={project.projectImgURI}
              className="h-full w-full object-cover duration-200 sm:group-hover:scale-110"
              alt={title}
              width={400}
              height={400}
              layout="fill"
            />
          )}
        </div>
        {project?.lookingForCollabs && (
          <div
            className="absolute top-0 right-4 rounded-full border border-slate-400 bg-base-900/40 px-2 py-0.5 text-xs font-semibold"
            title="Open to collaboration"
          >
            <span>Collab</span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex w-64 items-center gap-2">
            <Avatar
              image={project.projectCreator.profilePicUrl}
              name={project.projectCreator.displayName}
              dimensions="h-7 w-7"
            />
            <p className="truncate px-0 text-sm font-medium">
              {project.projectName}
            </p>
          </div>

          <div className="flex space-x-2 px-0">
            <button className="flex items-center space-x-0 rounded-lg font-normal text-slate-700 dark:text-slate-300">
              <IoHeart className="h-4 w-auto" />
              <span className="text-sm">
                {Math.abs(project?.numberOfLikes)}
              </span>
            </button>
            <button className="flex items-center space-x-0.5 rounded-lg font-normal text-slate-700 dark:text-slate-300">
              <IoChatbox className="h-4 w-auto" />
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
        {/* <div className="flex space-x-2 px-0">
          {project?.projectTechStack.map((stack, index) => (
            <TechBadge
              tech={stack}
              size={'xs'}
              key={index}
              iconOnly={true}
              style="h-4 w-4 text-slate-400 rounded"
            />
          ))}
        </div> */}
      </div>

      {/* Project Detail Modal */}
      {/* <Transition
        show={showProject}
        enter=""
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave=""
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="fixed top-0 left-0 z-50 h-screen w-full overscroll-contain bg-base-800/70 backdrop-blur-md"
      >
        <div
          className="fixed inset-0 h-screen w-full"
          onClick={() => setShowProject(false)}
        ></div>
        <div>
          <div className="no-scrollbar relative mx-auto flex h-screen w-full max-w-screen-2xl flex-col overflow-hidden overflow-y-scroll overscroll-contain 2xl:px-10">
            <div className="top-0 mx-auto w-full max-w-full bg-base-900">
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
      </Transition> */}
    </>
  );
};

export default ProjectCard;
