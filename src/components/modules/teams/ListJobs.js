import { useMemo } from 'react';
import useSWR from 'swr';
import Avatar from 'components/common/elements/Avatar';
import Link from 'next/link';
import fetcher from 'utils/fetcher';

const Card = ({ job, teamOwner }) => {
  const locations = job.location?.map((item) => item).join(', ') || null;
  return (
    <div className="flex items-center justify-between px-5 py-3">
      <div className="flex flex-col">
        <div className="font-semibold">{job.title}</div>
        <div className="text-base-400">
          {job.employmentType} &middot; {locations} &middot; EUR 80k - 120k
        </div>
      </div>
      <div className="flex space-x-20">
        <div>
          <Avatar
            href={`/${teamOwner.displayName}`}
            name={teamOwner.name}
            image={teamOwner.profilePicUrl}
            dimensions="h-12 w-12 sm:h-8 sm:w-8"
          />
        </div>
        <div>
          <Link href={`/teams/${job.teamId}/jobs/${job.id}`}>
            <button className="btn-primary text-sm">View role</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const ListJobs = ({ user, teamId, teamOwner }) => {
  const url = `${process.env.BASEURL}/api/jobs/getByTeam?teamId=${teamId}`;
  const { data: jobsData } = useSWR(url, fetcher);
  const jobs = jobsData ? jobsData.data : null;

  const jobsList = useMemo(() => {
    const jobsData = jobs?.map((job) => (
      <Card job={job} teamOwner={teamOwner} key={job.id} />
    ));
    return jobsData;
  }, [jobs]);

  if (!jobs) {
    return <></>;
  }

  if (!jobs.length > 0) return null;

  return (
    <>
      <div className="space-y-2">
        <p className="font-semibold text-white">Open roles</p>
        <div className="divide-y divide-base-600/50 rounded-md border border-base-600 bg-base-800 py-1">
          {jobsList}
        </div>
      </div>
    </>
  );
};

export default ListJobs;
