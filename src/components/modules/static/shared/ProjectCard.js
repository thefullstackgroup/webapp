import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/future/image';
import { Transition } from '@headlessui/react';
import { IoChatboxOutline, IoLayersOutline } from 'react-icons/io5';
import Project from 'components/modules/project/Modal';
import Avatar from 'components/common/elements/Avatar';
import { BsGem } from 'react-icons/bs';
import { BiUpvote } from 'react-icons/bi';

const TechBadge = dynamic(() => import('components/common/tags/TagStack'));

const ProjectCard = (props) => {
  const [showProject, setShowProject] = useState(false);

  return (
    <>
      <div
        className="sm:hover:border-primary-500 group relative h-80 w-full cursor-pointer overflow-hidden rounded-2xl border-4 border-transparent bg-gradient-to-t from-black via-base-700 to-transparent duration-200 sm:hover:shadow-lg sm:hover:shadow-purple-900"
        onClick={() => setShowProject(!showProject)}
        key={props.project.id}
      >
        <div className="h-full w-full cursor-pointer overflow-hidden rounded-l-xl bg-gradient-to-b from-transparent to-purple-900/30">
          <Image
            src={props.project.projectImgURI}
            className="h-full w-full translate-x-40 translate-y-10 rounded-l-xl object-cover opacity-60 duration-200 group-hover:opacity-60"
            alt={props.project.projectName}
            width={1200}
            height={1200}
            layout="fill"
          />
        </div>

        <div className="absolute top-4 left-4 mb-6 w-min whitespace-nowrap rounded-full border border-base-400 bg-base-700/50 px-4 py-1 text-sm text-white">
          Featured
        </div>

        <div className="absolute left-0 bottom-0 w-full space-y-0 py-6 px-4 pr-10">
          <p className="font-intertight text-sm font-medium text-base-300">
            {props.project.projectCreator.name}
          </p>
          <h3 className="font-intertight text-xl font-medium md:text-2xl">
            {props.project.projectName}
          </h3>
        </div>
      </div>
      {/* <div
        className="flex flex-col w-full bg-base-700 hover:bg-base-800 border-2 border-base-800 hover:border-primary-500 duration-200 rounded-lg space-y-2 group cursor-pointer h-full hover:shadow-lg hover:shadow-purple-900 relative overflow-hidden pb-2"
        onClick={() => setShowProject(!showProject)}
      >
        <div className="w-full h-60 md:h-64 bg-base-900">
          {props.project.projectImgURI && (
            <Image
              src={props.project.projectImgURI}
              className="h-full w-full object-cover opacity-60 sm:opacity-60 sm:group-hover:opacity-90 duration-200"
              alt={props.project.projectName}
              width={400}
              height={400}
              layout="fill"
            />
          )}
        </div>

        <div className="absolute top-2 left-4 flex items-center space-x-2">
          <Avatar
            image={props.project.projectCreator.profilePicUrl}
            name={props.project.projectCreator.displayName}
            dimensions="h-10 w-10"
          />
          {props.project?.lookingForCollabs && (
            <div
              className="absolute -top-2 left-8 bg-purple-500 text-xs px-2 py-0.5 rounded-full font-semibold"
              title="Open to collaboration"
            >
              <span>Collab</span>
            </div>
          )}
        </div>

        {props.project.numberOfLikes > 0 && (
          <div className="flex space-x-4 px-3">
            <button className="flex items-center space-x-1 font-normal rounded-lg text-base-400">
              <BiUpvote className="w-auto h-6" />
              <span className="text-sm">
                {Math.abs(props.project?.numberOfLikes)}
              </span>
            </button>
            <button className="flex items-center space-x-1 font-normal rounded-lg text-base-400">
              <IoChatboxOutline className="w-6 h-auto" />
              <span className="text-sm">{props.project?.numberOfComments}</span>
            </button>

            <button className="flex items-center space-x-1 font-normal text-base-400">
              {props.project?.contentTotalDiamonds > 0 ? (
                <BsGem className="text-yellow-500 w-auto h-5" />
              ) : (
                <BsGem className="text-base-400 w-auto h-5" />
              )}
              <span className="text-sm">
                {props.project?.contentTotalDiamonds}
              </span>
            </button>
          </div>
        )}
        <p className="font-medium text-lg leading-6 truncate px-3">
          {props.project.projectName}
        </p>
        <div className="flex space-x-2 px-3">
          <IoLayersOutline className="h-5 w-5 mb-1 text-base-200" />
          {props.project?.projectTechStack.map((stack, index) => (
            <TechBadge
              tech={stack}
              size={'xs'}
              key={index}
              iconOnly={true}
              style="h-5 w-5 text-base-500 rounded"
            />
          ))}
        </div>
      </div> */}

      {/* Project Detail Modal */}
      <Transition
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
                projectId={props.project._id || props.project.projectId}
                projectSlug={props.project.projectSlug}
                projectUserId={props.project.projectCreator.displayName}
                user={props.user}
                setShowProject={setShowProject}
                public={true}
              />
            </div>
          </div>
        </div>
      </Transition>
    </>
  );
};

export default ProjectCard;
