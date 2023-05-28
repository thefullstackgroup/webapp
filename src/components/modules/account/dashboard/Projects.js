import Loader from 'components/common/elements/Loader';
import Link from 'next/link';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';

const ProjectCard = ({ project }) => {
  return (
    <>
      <div className="grid w-full gap-4 sm:grid-cols-2">
        <div className="col-span-1 flex items-center space-x-4">
          <Link href={`/post?ref=${project._id}`}>
            <div className="flex h-20 w-24 flex-shrink-0 cursor-pointer overflow-hidden rounded-md">
              <img
                src={project.projectImgURI}
                alt={project.projectName}
                className="h-full w-full object-cover"
              />
            </div>
          </Link>

          <div className="font-intertight text-xl font-medium">
            <Link
              href={`/${project.projectCreator.displayName}/project/${project.projectSlug}`}
            >
              {project.projectName}
            </Link>
          </div>
        </div>
        <div className="col-span-1 flex items-center justify-start space-x-6 sm:justify-end sm:space-x-10">
          <div className="flex flex-col rounded-md text-center">
            <div className="flex items-center space-x-2 whitespace-nowrap text-base-400">
              <span className="text-sm font-medium">Reactions</span>
            </div>
            <span className="text-xl font-medium">{project.numberOfLikes}</span>
          </div>
          <div className="flex flex-col rounded-md text-center">
            <div className="flex items-center space-x-2 whitespace-nowrap text-base-400">
              <span className="text-sm font-medium">Comments</span>
            </div>
            <span className="text-xl font-medium">
              {project.numberOfComments}
            </span>
          </div>
          <div className="flex flex-col rounded-md text-center">
            <div className="flex items-center space-x-2 whitespace-nowrap text-base-400">
              <span className="text-sm font-medium">Favorites</span>
            </div>
            <span className="text-xl font-medium">{project.numberOfSaves}</span>
          </div>
          <div className="flex flex-col rounded-md text-center">
            <div className="flex items-center space-x-2 whitespace-nowrap text-base-400">
              <span className="text-sm font-medium">Shares</span>
            </div>
            <span className="text-xl font-medium">--</span>
          </div>
        </div>
      </div>
    </>
  );
};

const TabProjects = ({ user }) => {
  const url = `${process.env.BASEURL}/api/profile/posts/get?userId=${user.displayName}&projectType=PROJECT&page=0&size=100`;
  const { data } = useSWR(url, fetcher);
  const projects = data ? data.content : null;

  if (!data) {
    return (
      <div className="mt-4 flex w-full flex-1 justify-center py-40">
        <Loader />
      </div>
    );
  }

  return (
    <>
      {projects?.length > 0 && (
        <div className="mt-4 w-full space-y-4">
          {projects?.map((project, index) => (
            <div
              className="flex w-full items-center justify-between rounded-md border border-base-600 p-4 hover:bg-base-700/50"
              key={index}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      )}
      {!projects?.length > 0 && (
        <div className="mt-4 flex w-full flex-1 justify-center rounded-md border border-base-600 py-20">
          You have not posted any projects.
        </div>
      )}
    </>
  );
};

export default TabProjects;
