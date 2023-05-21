import useSWR from 'swr';
import { useMemo } from 'react';
import ProjectCard from 'components/common/cards/ProjectCard';
import Loader from 'components/common/elements/Loader';
import fetcher from 'utils/fetcher';

const PAGE_SIZE = 28;
const sort = 'mostpopular';

const categories = [
  'apps',
  'games',
  'opensource',
  'tools',
  'infrastructure',
  'databases',
  'data science',
  'frontend',
  'backend',
  'fullstack',
  'cloud',
  'AI',
  'machine learning',
  'components',
  'libraries',
  'automation',
  'devops',
  'security',
];

const Showcase = ({ category }) => {
  let term = category.filter;
  if (category.filter === 'opensource') {
    term = 'open source';
  }

  let url = `${process.env.BASEURL}/api/projects/showcase?page=0&size=${PAGE_SIZE}&sort=${sort}&projectType=PROJECT`;

  if (category.filter === 'opentocollab') {
    url = `${process.env.BASEURL}/api/projects/showcase?page=0&size=${PAGE_SIZE}&sort=${sort}&projectType=PROJECT&lookingForCollabs=true`;
  }
  if (categories.includes(category.filter)) {
    url = `${process.env.BASEURL}/api/projects/showcase?size=${PAGE_SIZE}&sort=${category.sort}&category=${term}`;
  }

  const { data } = useSWR(url, fetcher);

  const projectCards = useMemo(() => {
    const projectList = data ? data : [];
    return projectList.map((project) => (
      <div key={project.projectId}>
        <div className="w-80 sm:w-full">
          <ProjectCard project={project} />
        </div>
      </div>
    ));
  }, [data]);

  return (
    <div className="sm:min-h-screen md:mx-auto">
      {!data && (
        <div className="flex justify-center">
          <Loader />
        </div>
      )}

      {data && (
        <div className="no-scrollbar z-50 flex gap-6 overflow-x-scroll sm:float-none sm:mt-4 sm:grid sm:grid-cols-1 md:grid-cols-2 md:gap-8 lg:grid-cols-3 2xl:grid-cols-4">
          {projectCards}
        </div>
      )}
    </div>
  );
};

export default Showcase;
