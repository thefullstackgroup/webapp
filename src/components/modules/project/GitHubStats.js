import useSWR from 'swr';
import { HiOutlineStar } from 'react-icons/hi';
import { BiGitRepoForked } from 'react-icons/bi';
import {
  IoGitCommitOutline,
  IoGitPullRequestOutline,
  IoPeopleOutline,
  IoStopCircle,
} from 'react-icons/io5';
import fetcher from 'utils/fetcher';

const GitHubStats = ({ project }) => {
  const url = `${process.env.BASEURL}/api/projects/project/githubstats?projectId=${project._id}`;
  const { data } = useSWR(url, fetcher);
  const gitHubStats = data ? data.content : null;

  if (!gitHubStats) return null;

  return (
    <>
      {gitHubStats && gitHubStats.starCount > 0 && (
        <div className="rounded-md py-4">
          <div className="flex items-center gap-4 text-base">
            <div className="col-span-1 flex items-center space-x-2 rounded-md border-base-300 p-2 dark:border-base-700">
              <div className="flex items-center space-x-1">
                <HiOutlineStar className="h-5 w-auto text-yellow-500" />
                <span>{gitHubStats.starCount} stars</span>
              </div>
            </div>
            <div className="col-span-1 flex items-center space-x-2 rounded-md border-base-300 p-2 dark:border-base-700">
              <div className="flex items-center space-x-1">
                <IoGitCommitOutline className="h-5 w-auto text-red-500" />
                <span>{gitHubStats.numberOfCommits} commits</span>
              </div>
            </div>
            <div className="col-span-1 flex items-center space-x-2 rounded-md border-base-300 p-2 dark:border-base-700">
              <div className="flex items-center space-x-1">
                <IoStopCircle className="h-5 w-auto text-orange-500" />
                <span>{gitHubStats.numberOfIssues} issues</span>
              </div>
            </div>
            <div className="col-span-1 flex items-center space-x-2 rounded-md border-base-300 p-2 dark:border-base-700">
              <div className="flex items-center space-x-1">
                <BiGitRepoForked className="h-5 w-auto text-fuchsia-500" />
                <span>{gitHubStats.numberOfForks} forks</span>
              </div>
            </div>
            <div className="col-span-1 flex items-center space-x-2 rounded-md border-base-300 p-2 dark:border-base-700">
              <div className="flex items-center space-x-1">
                <IoPeopleOutline className="h-5 w-auto text-blue-500" />
                <span>{gitHubStats.numberOfContributors} contributors</span>
              </div>
            </div>
            <div className="col-span-1 flex items-center space-x-2 rounded-md border-base-300 p-2 dark:border-base-700">
              <div className="flex items-center space-x-1">
                <IoGitPullRequestOutline className="text-tfstertiary-500 h-5 w-auto" />
                <span>{gitHubStats.numberOfPullRequests} PRs</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GitHubStats;
