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
          <div className="grid gap-2 text-base sm:grid-cols-2">
            <div className="col-span-1 flex items-center justify-between rounded-md bg-base-600/40 p-2 px-4">
              <div className="flex items-center space-x-2">
                <HiOutlineStar className="h-5 w-auto text-yellow-500" />
                <span className="text-base-200">Stars</span>
              </div>
              <div className="font-semibold">{gitHubStats.starCount}</div>
            </div>
            <div className="col-span-1 flex items-center justify-between rounded-md bg-base-600/40 p-2 px-4">
              <div className="flex items-center space-x-2">
                <IoGitCommitOutline className="h-5 w-auto text-red-500" />
                <span className="text-base-200">Commits</span>
              </div>
              <div className="font-semibold">{gitHubStats.numberOfCommits}</div>
            </div>
            <div className="col-span-1 flex items-center justify-between rounded-md bg-base-600/40 p-2 px-4">
              <div className="flex items-center space-x-2">
                <IoStopCircle className="h-5 w-auto text-orange-500" />
                <span className="text-base-200">Issues</span>
              </div>
              <div className="font-semibold">{gitHubStats.numberOfIssues}</div>
            </div>
            <div className="col-span-1 flex items-center justify-between rounded-md bg-base-600/40 p-2 px-4">
              <div className="flex items-center space-x-2">
                <BiGitRepoForked className="h-5 w-auto text-fuchsia-500" />
                <span className="text-base-200">Forks</span>
              </div>
              <div className="font-semibold">{gitHubStats.numberOfForks}</div>
            </div>
            <div className="col-span-1 flex items-center justify-between rounded-md bg-base-600/40 p-2 px-4">
              <div className="flex items-center space-x-2">
                <IoPeopleOutline className="h-5 w-auto text-blue-500" />
                <span className="text-base-200">Contributors</span>
              </div>
              <div className="font-semibold">
                {gitHubStats.numberOfContributors}
              </div>
            </div>
            <div className="col-span-1 flex items-center justify-between rounded-md bg-base-600/40 p-2 px-4">
              <div className="flex items-center space-x-2">
                <IoGitPullRequestOutline className="text-tfstertiary-500 h-5 w-auto" />
                <span className="text-base-200">Pull Requests</span>
              </div>
              <div className="font-semibold">
                {gitHubStats.numberOfPullRequests}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GitHubStats;
