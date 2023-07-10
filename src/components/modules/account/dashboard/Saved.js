import Link from 'next/link';
import useSWR from 'swr';
import Loader from 'components/common/elements/Loader';
import fetcher from 'utils/fetcher';
import ShareButton from 'components/common/buttons/Share';

const ProjectCard = ({ project }) => {
  return (
    <button className="box box-link relative flex w-full items-start space-x-4 text-left">
      <Link
        href={`/${project.contentOwnerUserName}/project/${project.projectSlug}`}
      >
        <div className="h-32 w-36 shrink-0 cursor-pointer overflow-hidden rounded-md">
          <img
            src={project.projectImageURI}
            alt={project.projectName}
            className="h-full w-full object-cover"
          />
        </div>
      </Link>
      <div>
        <Link
          href={`/${project.contentOwnerUserName}/project/${project.projectSlug}`}
        >
          <h3>{project.projectName}</h3>
        </Link>
        <p className="text-sm text-base-300 dark:text-base-400">
          Posted by @{project.contentOwnerUserName}
        </p>
      </div>
      <div className="absolute bottom-2 right-2">
        <ShareButton
          url={`${process.env.BASEURL}/u/${project?.contentOwnerUserName}/${project?.projectSlug}`}
          message={project?.projectName}
          showLabel={false}
        />
      </div>
    </button>
  );
};

const Saved = () => {
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
        <div className="grid grid-cols-2 gap-4">
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
