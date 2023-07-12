import { useMemo, useState } from 'react';
import useSWRInfinite from 'swr/infinite';
import TeamCard from 'components/common/cards/TeamCard';
import Loader from 'components/common/elements/Loader';
import fetcher from 'utils/fetcher';

const ListTeams = () => {
  const [page, setPage] = useState(0);
  const url = `${process.env.BASEURL}/api/teams/getAllTeams`;
  const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
    (index) => `${url}?page=${index + 1}`,
    fetcher
  );

  const teams = useMemo(() => {
    const teamsData = data ? [].concat(...data) : [];
    return teamsData;
  }, [data]);

  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = teams.length == 0;
  const isReachingEnd =
    isEmpty || data[size - 1]?.pagination?.totalPages == size;

  const teamCards = useMemo(() => {
    const teamList = teams.map((teamPage) =>
      teamPage?.data?.map((team) => <TeamCard team={team} key={team.id} />)
    );
    return teamList;
  }, [teams]);

  return (
    <div className="mb-20 space-y-6 xl:max-w-3xl 2xl:xl:max-w-full">
      {!teams && (
        <div className="grid grid-cols-4 gap-6">
          {[...Array(16)].map((elementInArray, index) => (
            <div className="h-[350px] w-full" key={index}>
              <div className="h-full w-full animate-pulse rounded-md bg-base-300/20 dark:bg-base-700/50"></div>
            </div>
          ))}
        </div>
      )}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">{teamCards}</div>

      {!isReachingEnd && (
        <div className="my-10 flex justify-center">
          {isLoadingMore ? (
            <Loader />
          ) : (
            <button
              className="btn btn-secondary btn-with-icon px-4"
              disabled={isLoadingMore || isReachingEnd}
              onClick={() => {
                setSize(size + 1);
                setPage(page + 1);
              }}
            >
              <span>Load more</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ListTeams;
