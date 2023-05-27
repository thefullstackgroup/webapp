import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/future/image';
import Icon from '../elements/Icon';

const ProjectCard = ({ project, user, type, hideAuthor }) => {
  const projectLink = `/${project.projectCreator.displayName}/project/${project.projectSlug}`;

  return (
    <>
      <Link href={projectLink} shallow={true}>
        <div className="group relative mb-6 h-64 w-full cursor-pointer">
          <div className="h-40 w-full cursor-pointer overflow-hidden rounded-md bg-black dark:bg-tfsdark-800">
            <Image
              src={project.projectImgURI}
              className="h-full w-full object-cover object-top opacity-90 duration-200 hover:opacity-100 group-hover:scale-105"
              alt={project.title}
              width={300}
              height={200}
              layout="fill"
            />
          </div>

          {project?.lookingForCollabs && (
            <div className="absolute top-2 right-2 mb-6 w-min whitespace-nowrap rounded-full bg-red-500 px-2 py-1 text-xs text-white">
              Collab
            </div>
          )}

          <div className="w-full space-y-0 py-2">
            <h3 className="truncate text-base font-semibold">
              {project.projectName}
            </h3>
            <p className="text-sm text-tfsdark-500 dark:text-tfsdark-200">
              {project.projectCreator.name}
            </p>
          </div>
          <div className="absolute bottom-4 flex space-x-4">
            <button className="flex items-center space-x-1 rounded-lg font-normal text-tfsdark-700 dark:text-tfsdark-100">
              <Icon name={'FiHeart'} className="h-4 w-auto" />
              <span className="text-sm">
                {Math.abs(project?.numberOfLikes)}
              </span>
            </button>
            <button className="flex items-center space-x-1 rounded-lg font-normal text-tfsdark-700 dark:text-tfsdark-100">
              <Icon name={'FiMessageSquare'} className="h-4 w-auto" />
              <span className="text-sm">{project?.numberOfComments}</span>
            </button>

            <button className="flex items-center space-x-1 font-normal text-tfsdark-700 dark:text-tfsdark-100">
              {project?.contentTotalDiamonds > 0 ? (
                <Icon name={'FiStar'} className="h-4 w-auto text-yellow-400" />
              ) : (
                <Icon name={'FiStar'} className="h-4 w-auto" />
              )}
              <span className="text-sm">{project?.contentTotalDiamonds}</span>
            </button>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ProjectCard;
