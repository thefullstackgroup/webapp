import React, { useMemo } from 'react';
import useSWRInfinite from 'swr/infinite';
import ProjectCard from 'components/common/cards/ProjectCard';
import { IoChevronDown } from 'react-icons/io5';
import Loader from 'components/common/elements/Loader';
import fetcher from 'utils/fetcher';

const PAGE_SIZE = 24;

const ProjectGallery = ({
  user,
  category,
  sort,
  range,
  following,
  myTechStack,
  viewType,
  query,
}) => {
  let term = category.filter;

  if (category.filter === 'react') {
    term = 'react,reactjs';
  }

  if (category.filter === 'node') {
    term = 'nodejs';
  }
  if (category.filter === 'tailwind css') {
    term = 'tailwind';
  }

  if (category.filter === 'opensource') {
    term = 'open source';
  }

  let url = `${process.env.BASEURL}/api/search/showcase?size=${PAGE_SIZE}&sort=${sort}&projectType=PROJECT&range=${range}&category=${term}`;

  if (category.filter === 'following') {
    url = `${process.env.BASEURL}/api/search/showcase?size=${PAGE_SIZE}&sort=${sort}&connectionUsersIds=${following}&userId=${user.userId}&projectType=PROJECT&range=${range}`;
  }

  if (category.filter === 'foryou') {
    url = `${process.env.BASEURL}/api/search/showcase?size=${PAGE_SIZE}&sort=${sort}&projectType=PROJECT&tech=${myTechStack}&range=${range}`;
  }

  if (category.filter === 'opentocollab') {
    url = `${process.env.BASEURL}/api/search/showcase?size=${PAGE_SIZE}&sort=${sort}&projectType=PROJECT&lookingForCollabs=true`;
  }

  if (category.filter === 'search' && query !== '') {
    url = `${process.env.BASEURL}/api/search/projects?size=${PAGE_SIZE}&sort=${sort}&userId=${user.userId}&projectType=PROJECT&range=${range}&term=${query}`;
  }

  const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
    (index) => `${url}&page=${index}`,
    fetcher
  );

  const posts = data ? [].concat(...data) : [];
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);
  const isRefreshing = isValidating && data && data.length === size;

  const projectCards = useMemo(() => {
    const projectList = posts;
    return projectList.map((project) => (
      <div key={project.projectId}>
        <ProjectCard project={project} user={user} type={viewType} />
      </div>
    ));
  });

  return (
    <div>
      {viewType === 'list' && isRefreshing && (
        <div className="relative gap-6 md:gap-8 max-w-screen-lg mx-auto ">
          {[...Array(PAGE_SIZE)].map((elementInArray, index) => (
            <div className="relative w-full h-80" key={index}>
              <div className="w-full h-72 bg-tfsdark-700 animate-pulse">
                <span className="hidden">Loading</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {posts && viewType === 'list' && !isEmpty && (
        <div className="relative gap-6 md:gap-8 max-w-screen-lg mx-auto">
          {projectCards}
        </div>
      )}

      {posts && viewType === 'grid' && !isEmpty && (
        <div className="relative sm:mt-4 grid grid-cols-1 gap-6 md:gap-10 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {projectCards}
        </div>
      )}

      {isEmpty && (
        <div className="relative sm:mt-4 text-center py-20 flex flex-col">
          {category.filter === 'following' ? (
            following ? (
              <>
                <span className="font-bold text-lg">
                  No projects posted by people you&apos;re following.
                </span>
                <span>Check back again soon.</span>
              </>
            ) : (
              <>
                <span className="font-bold text-lg">
                  You are not following anyone.
                </span>
                <span>Find people to follow.</span>
              </>
            )
          ) : (
            <span>No projects to show here.</span>
          )}
        </div>
      )}

      {!isReachingEnd && (
        <div className="flex justify-center my-10">
          {isLoadingMore ? (
            <div className="min-h-screen">
              <Loader />
            </div>
          ) : (
            <button
              className="btn-secondary btn-with-icon px-4"
              disabled={isLoadingMore || isReachingEnd}
              onClick={() => setSize(size + 1)}
            >
              <IoChevronDown />
              <span>Load more</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectGallery;
