import Link from 'next/link';
import ProjectCard from 'components/common/cards/ProjectCard';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';

const Projects = ({ profile, myProfile }) => {
  const url = `${process.env.BASEURL}/api/profile/posts/get?userId=${profile.displayName}&projectType=PROJECT&page=0&size=100`;
  const { data } = useSWR(url, fetcher);
  const projects = data ? data.content : null;
  let totalProjects = 3;
  if (projects?.length == 1) totalProjects = 2;
  if (projects?.length == 2) totalProjects = 1;
  if (projects?.length > 2) totalProjects = 0;

  return (
    <>
      {!projects?.length > 0 && (
        <div className="mt-8 flex flex-col items-center w-full px-2 md:px-8">
          <div className="py-10 md:py-36 text-zinc-400 flex flex-col items-center w-full justify-evenly">
            <span>No projects posted yet.</span>
            {profile?.userId === myProfile.userId && (
              <div className="flex justify-center mt-4">
                <Link href="/post">
                  <button className="btn-secondary">Show off a project</button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
      {projects?.length > 0 && (
        <div className="mt-8 flex items-center w-full">
          <div className="w-full grid grid-cols-1 gap-4 px-4 md:px-0 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects?.map((project) => (
              <div className="col-span-1 h-80" key={project._id}>
                <ProjectCard project={project} user={myProfile} hideAuthor />
              </div>
            ))}
            {[...Array(totalProjects)].map((elementInArray, index) => (
              <div
                key={index}
                className="hidden md:block h-52 col-span-1 bg-tfsdark-700 rounded-md"
              ></div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Projects;
