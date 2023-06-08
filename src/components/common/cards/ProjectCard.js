import Link from 'next/link';
import Image from 'next/future/image';
import Icon from '../elements/Icon';
import Avatar from '../elements/Avatar';

const ProjectCard = ({ project, feature = false, user, type, hideAuthor }) => {
  const projectLink = `/${project?.projectCreator?.displayName}/project/${project.projectSlug}`;

  return (
    <>
      <Link href={projectLink} shallow={true}>
        <div
          className={
            'group relative w-full cursor-pointer duration-200  ' +
            (feature ? 'h-80' : 'h-64')
          }
        >
          <div
            className={
              'w-full cursor-pointer overflow-hidden rounded bg-base-200 dark:bg-base-800 ' +
              (feature ? 'h-56' : 'h-40')
            }
          >
            <Image
              src={project.projectImgURI}
              className="h-full w-full object-cover object-top duration-200 hover:opacity-100 group-hover:scale-105 group-hover:shadow-xl dark:opacity-90"
              alt={project.title}
              width={300}
              height={200}
              layout="fill"
            />
          </div>

          {project?.lookingForCollabs && (
            <div className="absolute top-2 right-2 mb-6 w-min whitespace-nowrap rounded-full bg-highlight-megenta px-2 py-1 text-xs text-white">
              Collab
            </div>
          )}

          <div className="w-full space-y-0 py-2">
            <h3 className="truncate pr-4 text-base font-semibold">
              {project.projectName}
            </h3>
            <div className="flex items-center space-x-2">
              <Avatar
                image={project.projectCreator?.profilePicUrl}
                name={project.projectCreator?.displayName}
                dimensions="h-5 w-5"
              />
              <p className="text-sm text-base-400 dark:text-base-300">
                {project.projectCreator?.name}
              </p>
            </div>
          </div>
          <div className="absolute bottom-4 flex space-x-4">
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
      </Link>
    </>
  );
};

export default ProjectCard;
