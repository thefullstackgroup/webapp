import Link from 'next/link';
import Image from 'next/future/image';
import Icon from '../elements/Icon';
import Avatar from '../elements/Avatar';

const ProjectCard = ({ project }) => {
  const projectLink = `/${project?.projectCreator?.displayName}/project/${project.projectSlug}`;

  return (
    <>
      <Link href={projectLink} shallow={true}>
        <div className="group relative flex h-[350px] w-full grow cursor-pointer flex-col overflow-hidden duration-200 xl:h-[334px]">
          <div className="relative h-[280px] w-full cursor-pointer overflow-hidden rounded-md bg-base-200 dark:bg-base-800 xl:h-[240px]">
            {project.projectImgURI && (
              <Image
                src={project.projectImgURI}
                blurDataURL={project.projectImgURI}
                className="h-full w-full object-cover object-center duration-200 hover:opacity-100 group-hover:shadow-xl dark:opacity-90 xl:group-hover:scale-105"
                alt={project.projectName}
                title={project.projectName}
                width={400}
                height={400}
              />
            )}
          </div>

          {project?.lookingForCollabs && (
            <div className="absolute bottom-20 right-2 rounded-lg bg-base-200 px-2 py-0.5 text-xs font-medium dark:bg-base-600 xl:bottom-28">
              Collab
            </div>
          )}

          {project.isDraft && (
            <div className="group absolute top-0 flex h-[280px] w-full flex-col items-center justify-center overflow-hidden rounded bg-base-800/70 xl:h-[240px]">
              <p className="font-semibold text-white">Draft</p>
              <p className="px-8 text-center text-sm text-white">
                This project is unpublished and not visible to anyone.
              </p>
            </div>
          )}

          <div className="space-y-1 py-2">
            <div className="flex items-center space-x-2">
              <Avatar
                image={project.projectCreator?.profilePicUrl}
                name={project.projectCreator?.displayName}
                dimensions="h-5 w-5"
              />
              <h3 className="pr-4 text-base font-medium line-clamp-1">
                {project.projectName}
              </h3>
            </div>

            <div className="flex space-x-4">
              <button className="flex items-center space-x-1 rounded-lg font-normal text-base-700 dark:text-base-100">
                <Icon name={'FiTriangle'} className="h-4 w-auto" />
                <span className="text-sm">
                  {Math.abs(project?.numberOfLikes)}
                </span>
              </button>
              <button className="flex items-center space-x-1 rounded-lg font-normal text-base-700 dark:text-base-100">
                <Icon name={'FiMessageSquare'} className="h-4 w-auto" />
                <span className="text-sm">{project?.numberOfComments}</span>
              </button>

              <button className="flex items-center space-x-1 font-normal text-base-700 dark:text-base-100">
                {project?.contentTotalDiamonds > 0 ? (
                  <Icon name={'FiStar'} className="h-4 w-auto" />
                ) : (
                  <Icon name={'FiStar'} className="h-4 w-auto" />
                )}
                <span className="text-sm">{project?.contentTotalDiamonds}</span>
              </button>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ProjectCard;
