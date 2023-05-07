import Link from 'next/link';
import useSWR from 'swr';
import Loader from 'components/common/elements/Loader';
import fetcher from 'utils/fetcher';

const ProjectCard = ({ project }) => {
  return (
    <Link
      href={`/${project.contentOwnerUserName}/project/${project.projectSlug}`}
    >
      <button className="w-full text-left p-4 hover:bg-tfsdark-700/50 flex items-center space-x-4">
        <div>
          <div className="w-20 h-16 rounded-md cursor-pointer overflow-hidden">
            <img
              src={project.projectImageURI}
              alt={project.projectName}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col text-slate-400">
          <p className="font-semibold text-white text-lg">
            {project.projectName}
          </p>
          <p className="text-sm">Posted by @{project.contentOwnerUserName}</p>
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
      <div className="mt-4 w-full flex flex-1 justify-center py-40">
        <Loader />
      </div>
    );
  }

  return (
    <>
      {projects?.content?.length > 0 && (
        <div className="mt-4 w-full divide-y divide-tfsdark-800 rounded-md border border-tfsdark-600">
          {projects?.content?.map((project, index) => (
            <ProjectCard project={project} key={index} />
          ))}
        </div>
      )}

      {projects?.content?.length == 0 && (
        <div className="mt-4 w-full rounded-md border border-tfsdark-600 flex flex-1 justify-center py-20">
          You have not saved any projects.
        </div>
      )}
    </>
  );
};

export default Saved;
