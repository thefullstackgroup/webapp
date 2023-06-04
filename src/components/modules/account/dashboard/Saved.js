import Link from 'next/link';
import useSWR from 'swr';
import Loader from 'components/common/elements/Loader';
import fetcher from 'utils/fetcher';

const ProjectCard = ({ project }) => {
  return (
    <Link
      href={`/${project.contentOwnerUserName}/project/${project.projectSlug}`}
    >
      <button className="flex w-full items-center space-x-4 p-4 text-left duration-200 hover:bg-base-200/50 dark:hover:bg-base-800">
        <div>
          <div className="h-16 w-20 cursor-pointer overflow-hidden rounded-md">
            <img
              src={project.projectImageURI}
              alt={project.projectName}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col text-base-400">
          <p className="text-lg font-semibold">{project.projectName}</p>
          <p className="text-sm text-base-400">
            Posted by @{project.contentOwnerUserName}
          </p>
        </div>
      </button>
    </Link>
  );
};

const Saved = ({ user }) => {
  const url = `${process.env.BASEURL}/api/projects/saved/get`;
  const { data } = useSWR(url, fetcher);
  const projects = data ? data.projects : null;

  if (!data) {
    return (
      <div className="mt-4 flex w-full flex-1 justify-center py-40">
        <Loader />
      </div>
    );
  }

  return (
    <>
      {projects?.content?.length > 0 && (
        <div className="mt-4 w-full rounded-md border border-base-200 dark:border-base-700">
          {projects?.content?.map((project, index) => (
            <ProjectCard project={project} key={index} />
          ))}
        </div>
      )}

      {projects?.content?.length == 0 && (
        <div className="mt-4 flex w-full flex-1 justify-center rounded-md border border-base-200 py-20 dark:border-base-700">
          You have not saved any projects.
        </div>
      )}
    </>
  );
};

export default Saved;
