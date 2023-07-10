import useSWR, { mutate } from 'swr';
import Menu from 'components/modules/account/teams/Menu';
import { useEffect, useMemo, useState } from 'react';
import ModalDialog from 'components/common/modals/ModalDialog';
import JobListing from 'components/modules/teams/JobDetails';
import CreateListing from 'components/modules/account/teams/CreateJob';
import EditListing from 'components/modules/account/teams/EditJob';
import fetcher from 'utils/fetcher';

const Card = ({ job, setJobSelected, setViewJob, setEditJob }) => {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex flex-col">
        <div className="font-semibold">{job.title}</div>
        <div className="text-base-400">
          {job.employmentType} &middot; {job.locationType} &middot;{' '}
          {job.salaryRange.currency}{' '}
          {(job.salaryRange.min / 1000).toFixed(1).replace(/\.0$/, '') + 'k'} -{' '}
          {(job.salaryRange.max / 1000).toFixed(1).replace(/\.0$/, '') + 'k'}
        </div>
      </div>
      <div className="flex space-x-2">
        <button
          className="btn-secondary text-sm"
          onClick={() => {
            setJobSelected(job);
            setViewJob(true);
          }}
        >
          Preview
        </button>

        <button
          className="btn-secondary text-sm"
          onClick={() => {
            setJobSelected(job);
            setEditJob(true);
          }}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

const Page = ({ user, teamId }) => {
  const [newJob, setNewJob] = useState(false);
  const [editJob, setEditJob] = useState(false);
  const [viewJob, setViewJob] = useState(false);
  const [jobSelected, setJobSelected] = useState();

  const teamURL = `${process.env.BASEURL}/api/teams/getTeam?teamId=${teamId}`;
  const { data: team } = useSWR(teamURL, fetcher);

  const jobsURL = `${process.env.BASEURL}/api/jobs/getByTeam?teamId=${teamId}`;
  const { data: jobsData } = useSWR(jobsURL, fetcher);
  const jobs = jobsData ? jobsData.data : null;

  const jobsList = useMemo(() => {
    const jobsData = jobs?.map((job) => (
      <Card
        job={job}
        setJobSelected={setJobSelected}
        setViewJob={setViewJob}
        setEditJob={setEditJob}
        key={job.id}
      />
    ));
    return jobsData;
  }, [jobs]);

  useEffect(() => {
    mutate(jobsURL);
  });

  useEffect(() => {}, [jobs]);

  if (team?.ownerId !== user.userId) {
    return (
      <div className="flex h-screen flex-1 items-center justify-center">
        You are not the owner of this team.
      </div>
    );
  }

  return (
    <>
      <div className="page page-4xl">
        <div className="mx-4 mb-20 md:mx-0">
          <Menu team={team} user={user} />
          <div className="space-y-4">
            <div className="box">
              {jobs && !jobs.length > 0 && (
                <div className="space-y-16 py-10 text-center">
                  <div className="space-y-6">
                    <div className="mx-auto w-2/3 text-lg">
                      You have no open roles listed.
                    </div>
                  </div>
                </div>
              )}

              {jobs && jobs.length > 0 && (
                <>
                  <div className="divide-y divide-base-600/50">{jobsList}</div>
                </>
              )}
            </div>

            <div className="flex items-center justify-end">
              <button
                className="btn btn-primary"
                onClick={() => setNewJob(true)}
              >
                Post open role
              </button>
            </div>
          </div>
        </div>
      </div>

      <ModalDialog
        show={viewJob}
        setShow={setViewJob}
        title="Job listing preview"
        dimensions={'max-w-screen-2xl'}
      >
        <div className="no-scrollbar h-[90vh] overflow-y-scroll overscroll-contain">
          <JobListing jobId={jobSelected?.id} teamId={team.id} />
        </div>
      </ModalDialog>

      <ModalDialog
        show={newJob}
        setShow={setNewJob}
        title="Post open role"
        dimensions={'max-w-4xl'}
      >
        <CreateListing teamId={team.id} setShow={setNewJob} />
      </ModalDialog>

      <ModalDialog
        show={editJob}
        setShow={setEditJob}
        title="Edit open role"
        dimensions={'max-w-4xl'}
        disabled
      >
        <div className="h-[80vh]">
          <EditListing
            job={jobSelected}
            teamId={team.id}
            setShow={setEditJob}
          />
        </div>
      </ModalDialog>
    </>
  );
};

export default Page;
