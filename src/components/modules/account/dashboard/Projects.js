import Loader from 'components/common/elements/Loader';
import Link from 'next/link';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';

const ProjectCard = ({ project }) => {
  return (
    <>
      <div className="grid sm:grid-cols-2 gap-4 w-full">
        <div className="flex col-span-1 items-center space-x-4">
          <Link href={`/post?ref=${project._id}`}>
            <div className="flex flex-shrink-0 w-24 h-20 rounded-md cursor-pointer overflow-hidden">
              <img
                src={project.projectImgURI}
                alt={project.projectName}
                className="w-full h-full object-cover"
              />
            </div>
          </Link>

          <div className="font-intertight font-medium text-xl">
            <Link
              href={`/${project.projectCreator.displayName}/project/${project.projectSlug}`}
            >
              {project.projectName}
            </Link>
          </div>
        </div>
        <div className="col-span-1 flex space-x-6 sm:space-x-10 justify-start sm:justify-end items-center">
          <div className="flex flex-col text-center rounded-md">
            <div className="flex items-center space-x-2 whitespace-nowrap text-slate-400">
              <span className="text-sm font-medium">Reactions</span>
            </div>
            <span className="text-xl font-medium">{project.numberOfLikes}</span>
          </div>
          <div className="flex flex-col text-center rounded-md">
            <div className="flex items-center space-x-2 whitespace-nowrap text-slate-400">
              <span className="text-sm font-medium">Comments</span>
            </div>
            <span className="text-xl font-medium">
              {project.numberOfComments}
            </span>
          </div>
          <div className="flex flex-col text-center rounded-md">
            <div className="flex items-center space-x-2 whitespace-nowrap text-slate-400">
              <span className="text-sm font-medium">Favorites</span>
            </div>
            <span className="text-xl font-medium">{project.numberOfSaves}</span>
          </div>
          <div className="flex flex-col text-center rounded-md">
            <div className="flex items-center space-x-2 whitespace-nowrap text-slate-400">
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
      <div className="mt-4 w-full flex flex-1 justify-center py-40">
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
              className="w-full flex justify-between items-center p-4 hover:bg-tfsdark-700/50 rounded-md border border-tfsdark-600"
              key={index}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      )}
      {!projects?.length > 0 && (
        <div className="mt-4 w-full rounded-md border border-tfsdark-600 flex flex-1 justify-center py-20">
          You have not posted any projects.
        </div>
      )}
    </>
  );
};

export default TabProjects;
