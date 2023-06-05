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
      {gitHubStats && (
        <div className="gap-2 divide-y divide-base-700">
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-2">
              <HiOutlineStar className="h-5 w-auto text-yellow-500" />
              <span>Stars</span>
            </div>
            <div className="font-semibold">{gitHubStats.starCount}</div>
          </div>
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-2">
              <IoGitCommitOutline className="h-5 w-auto text-red-500" />
              <span>Commits</span>
            </div>
            <div className="font-semibold">{gitHubStats.numberOfCommits}</div>
          </div>
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-2">
              <IoStopCircle className="h-5 w-auto text-orange-500" />
              <span>Issues</span>
            </div>
            <div className="font-semibold">{gitHubStats.numberOfIssues}</div>
          </div>
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-2">
              <BiGitRepoForked className="h-5 w-auto text-fuchsia-500" />
              <span>Forks</span>
            </div>
            <div className="font-semibold">{gitHubStats.numberOfForks}</div>
          </div>
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-2">
              <IoPeopleOutline className="h-5 w-auto text-blue-500" />
              <span>Contributors</span>
            </div>
            <div className="font-semibold">
              {gitHubStats.numberOfContributors}
            </div>
          </div>
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-2">
              <IoGitPullRequestOutline className="text-tfstertiary-500 h-5 w-auto" />
              <span>Pull Requests</span>
            </div>
            <div className="font-semibold">
              {gitHubStats.numberOfPullRequests}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GitHubStats;
