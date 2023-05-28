import React, { useMemo } from 'react';
import useSWRInfinite from 'swr/infinite';
import ProjectCard from 'components/common/cards/ProjectCard';
import Loader from 'components/common/elements/Loader';
import fetcher from 'utils/fetcher';

let PAGE_SIZE = 40;

const ProjectGallery = ({
  user,
  stack = false,
  category = false,
  sort,
  range,
  following,
  myTechStack,
  query,
  count = 40,
  cols = 5,
  feature = false,
}) => {
  let term = stack?.slug;

  if (stack?.slug === 'react') {
    term = 'react,reactjs';
  }

  if (stack?.slug === 'node') {
    term = 'nodejs';
  }
  if (stack?.slug === 'tailwindcss') {
    term = 'tailwind';
  }

  if (stack?.slug === 'opensource') {
    term = 'open source';
  }

  if (count !== null) PAGE_SIZE = count;

  let url = `${process.env.BASEURL}/api/projects/get?size=${PAGE_SIZE}&sort=${sort}&projectType=PROJECT&range=${range}`;

  if (category) {
    if (category?.slug === 'opentocollab') {
      url = `${process.env.BASEURL}/api/projects/get?size=${PAGE_SIZE}&sort=${sort}&projectType=PROJECT&lookingForCollabs=true`;
    } else {
      url = `${process.env.BASEURL}/api/projects/find?size=${PAGE_SIZE}&sort=${sort}&userId=&projectType=PROJECT&range=${range}&term=${category.term}`;
    }
  }

  if (stack) {
    url = `${process.env.BASEURL}/api/projects/find?size=${PAGE_SIZE}&sort=${sort}&userId=&projectType=PROJECT&range=${range}&term=${term}`;
  }

  if (stack?.slug === 'following') {
    url = `${process.env.BASEURL}/api/projects/get?size=${PAGE_SIZE}&sort=${sort}&connectionUsersIds=${following}&userId=${user.userId}&projectType=PROJECT&range=${range}`;
  }

  // if (stack?.slug === 'foryou') {
  //   url = `${process.env.BASEURL}/api/projects/get?size=${PAGE_SIZE}&sort=${sort}&projectType=PROJECT&tech=${myTechStack}&range=${range}`;
  // }

  if (stack?.slug === 'search' && query !== '') {
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
        <ProjectCard project={project} user={user} feature={feature} />
      </div>
    ));
  });

  return (
    <div>
      {posts && !isEmpty && (
        <div
          className={
            'relative grid grid-cols-1 gap-6 sm:mt-4 md:grid-cols-2 md:gap-4 lg:grid-cols-3 ' +
            (cols < 5 ? ` 2xl:grid-cols-${cols}` : `2xl:grid-cols-5`)
          }
        >
          {projectCards}
        </div>
      )}

      {isEmpty && (
        <div className="relative flex flex-col py-20 text-center sm:mt-4">
          {category.slug === 'following' ? (
            following ? (
              <>
                <span className="text-lg font-bold">
                  No projects posted by people you&apos;re following.
                </span>
                <span>Check back again soon.</span>
              </>
            ) : (
              <>
                <span className="text-lg font-bold">
                  You are not following anyone.
                </span>
                <span>Find people to follow.</span>
              </>
            )
          ) : (
            <span>
              No projects returned. Try different filters or a different search.
            </span>
          )}
        </div>
      )}

      {!isReachingEnd && (
        <div className="my-10 flex justify-center">
          {isLoadingMore && (
            <div className="py-1">
              <Loader />
            </div>
          )}
          {count == 40 && !isLoadingMore && (
            <button
              className="btn btn-secondary btn-with-icon"
              onClick={() => setSize(size + 1)}
            >
              <span>Load more</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectGallery;
