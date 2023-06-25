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
import Icon from 'components/common/elements/Icon';

const GitHubStats = ({ project }) => {
  const url = `${process.env.BASEURL}/api/projects/project/githubstats?projectId=${project._id}`;
  const { data } = useSWR(url, fetcher);
  const gitHubStats = data ? data.content : null;

  if (!gitHubStats) return null;

  return (
    <>
      {gitHubStats && gitHubStats.starCount > 0 && (
        <div className="my-6 space-y-4 border-t border-base-200 pt-6 dark:border-base-700">
          <div className="rounded-md">
            <div className="grid gap-2 text-base sm:grid-cols-2">
              <div className="col-span-1 flex items-center space-x-2">
                <HiOutlineStar className="h-5 w-auto text-yellow-500" />
                <span>{gitHubStats.starCount} stars</span>
              </div>
              <div className="col-span-1 flex items-center space-x-2">
                <IoGitCommitOutline className="h-5 w-auto text-red-500" />
                <span>{gitHubStats.numberOfCommits} commits</span>
              </div>
              <div className="col-span-1 flex items-center space-x-2">
                <IoStopCircle className="h-5 w-auto text-orange-500" />
                <span>{gitHubStats.numberOfIssues} issues</span>
              </div>
              <div className="col-span-1 flex items-center space-x-2">
                <BiGitRepoForked className="h-5 w-auto text-fuchsia-500" />
                <span>{gitHubStats.numberOfForks} forks</span>
              </div>
              <div className="col-span-1 flex items-center space-x-2">
                <IoPeopleOutline className="h-5 w-auto text-blue-500" />
                <span>{gitHubStats.numberOfContributors} contributors</span>
              </div>
              <div className="col-span-1 flex items-center space-x-2">
                <IoGitPullRequestOutline className="h-5 w-auto text-base-300" />
                <span>{gitHubStats.numberOfPullRequests} pull requests</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-1 text-base-400">
            <Icon name="FiGithub" className="h-3 w-3" />
            <span className="text-xs">GitHub repo stats</span>
          </div>
        </div>
      )}
    </>
  );
};

export default GitHubStats;
