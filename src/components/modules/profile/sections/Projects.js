import Link from 'next/link';
import ProjectCard from 'components/common/cards/ProjectCard';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';
import CreatePostModal from 'components/modules/create/CreatePostModal';
import { useState } from 'react';

const Projects = ({ profile, myProfile }) => {
  const [showCreatePost, setShowCreatePost] = useState(false);
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
        <div className="mt-8 flex w-full flex-col items-center px-4 md:px-8">
          <div className="flex w-full flex-col items-center justify-evenly py-10 text-base-400 md:py-36">
            <span>No projects posted yet.</span>
            {profile?.userId === myProfile?.userId && (
              <div className="mt-4 flex justify-center">
                <button
                  className="btn btn-primary"
                  onClick={() => setShowCreatePost(!showCreatePost)}
                >
                  Show off a project
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      {projects?.length > 0 && (
        <div className="mt-8 flex w-full items-center px-4 lg:px-0">
          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {projects?.map((project) => (
              <div className="col-span-1" key={project._id}>
                <ProjectCard project={project} user={myProfile} hideAuthor />
              </div>
            ))}
            {[...Array(totalProjects)].map((elementInArray, index) => (
              <div
                key={index}
                className="col-span-1 hidden h-[240px] space-y-2 md:block"
              >
                <div className="h-full rounded-md bg-base-200 dark:bg-base-800"></div>
              </div>
            ))}
          </div>
        </div>
      )}

      <CreatePostModal
        user={myProfile}
        show={showCreatePost}
        setShow={setShowCreatePost}
      />
    </>
  );
};

export default Projects;
