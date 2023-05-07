import useSWR, { mutate } from 'swr';
import Menu from 'components/modules/account/teams/Menu';
import { useEffect, useMemo, useState } from 'react';
import ModalDialog from 'components/common/modals/ModalDialog';
import JobListing from 'components/modules/teams/JobDetails';
import CreateListing from 'components/modules/account/teams/CreateJob';
import EditListing from 'components/modules/account/teams/EditJob';
import Subscribe from 'components/modules/account/settings/subscriptions/Modal';
import fetcher from 'utils/fetcher';

const Plan = ({ user }) => {
  let planName = '';
  let planNumberOfRoles = '';

  if (
    user.userAttributes.accountType === 'TEAM_PLAN_STARTER_MONTHLY' ||
    user.userAttributes.accountType === 'TEAM_PLAN_STARTER_YEARLY'
  ) {
    planName = 'Starter';
    planNumberOfRoles = '2';
  }

  if (
    user.userAttributes.accountType === 'TEAM_PLAN_SCALE_MONTHLY' ||
    user.userAttributes.accountType === 'TEAM_PLAN_SCALE_YEARLY'
  ) {
    planName = 'Scale';
    planNumberOfRoles = '5';
  }

  if (
    user.userAttributes.accountType === 'TEAM_PLAN_GROWTH_MONTHLY' ||
    user.userAttributes.accountType === 'TEAM_PLAN_GROWTH_YEARLY'
  ) {
    planName = 'Growth';
    planNumberOfRoles = 'Unlimited';
  }

  return (
    user.userAttributes.accountType !== 'FREE' && (
      <div className="text-sm text-slate-400">
        <p>
          Your team subscription plan{' '}
          <span className="font-bold">{planName}</span> allows you to post{' '}
          {planNumberOfRoles} open roles
        </p>
      </div>
    )
  );
};

const Card = ({ job, setJobSelected, setViewJob, setEditJob }) => {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex flex-col">
        <div className="font-semibold">{job.title}</div>
        <div className="text-slate-400">
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
  const [subscribePanel, setSubscribePanel] = useState(false);
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

  const postRoleLimit = () => {
    if (
      (user.userAttributes.accountType === 'TEAM_PLAN_STARTER_MONTHLY' ||
        user.userAttributes.accountType === 'TEAM_PLAN_STARTER_YEARLY') &&
      jobs?.length > 1
    ) {
      return true;
    }

    if (
      user.userAttributes.accountType === 'TEAM_PLAN_SCALE_MONTHLY' &&
      user.userAttributes.accountType === 'TEAM_PLAN_SCALE_YEARLY' &&
      jobs?.length > 4
    ) {
      return true;
    }

    if (user.userAttributes.accountType === 'FREE') {
      return true;
    }

    return false;
  };

  useEffect(() => {
    mutate(jobsURL);
  });

  useEffect(() => {}, [jobs]);

  if (team?.ownerId !== user.userId) {
    return (
      <div className="h-screen flex flex-1 justify-center items-center">
        You are not the owner of this team.
      </div>
    );
  }

  return (
    <>
      <div className="mt-0 lg:mt-12 w-full flex justify-center">
        <div className="w-full lg:max-w-full px-0 xl:px-4 2xl:px-0 md:ml-6 lg:ml-20 xl:ml-52 2xl:ml-56">
          <div className="relative max-w-4xl mx-auto">
            <div className="mx-4 md:mx-0 mb-20">
              <Menu team={team} user={user} />
              <div className="space-y-4">
                <div className="w-full rounded-lg bg-tfsdark-700 px-4 sm:px-6 py-4">
                  {user.userAttributes.accountType !== 'FREE' && (
                    <>
                      {jobs && !jobs.length > 0 && (
                        <div className="text-center py-10 space-y-16">
                          <div className="space-y-6">
                            <div className="w-2/3 mx-auto font-semibold text-lg">
                              You have no open roles listed.
                            </div>
                          </div>
                        </div>
                      )}

                      {jobs && jobs.length > 0 && (
                        <>
                          <div className="divide-y divide-tfsdark-600/50">
                            {jobsList}
                          </div>
                        </>
                      )}
                    </>
                  )}
                  {user.userAttributes.accountType === 'FREE' && (
                    <div className="text-center py-10 space-y-16">
                      <div className="space-y-6">
                        <div className="w-2/3 mx-auto font-semibold text-lg">
                          Have you got open roles on your team?
                        </div>
                        <div className="w-2/3 mx-auto text-slate-300">
                          Post open positions on your Team profile. We send
                          developers an email when a job matches their
                          preferences, including tech stack, years of
                          experience, and salary expectations.
                        </div>
                        <div>
                          <button
                            className="btn-primary"
                            onClick={() => setSubscribePanel(true)}
                          >
                            Post roles from &euro;175 per month
                          </button>
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-white">
                        Reach the fastest growing dev community on the web
                      </h3>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <Plan user={user} />

                  {!postRoleLimit() && (
                    <button
                      className="btn-primary"
                      onClick={() => setNewJob(true)}
                    >
                      Post open role
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {subscribePanel && (
        <Subscribe
          user={user}
          show={subscribePanel}
          setShow={setSubscribePanel}
        />
      )}

      <ModalDialog
        show={viewJob}
        setShow={setViewJob}
        title="Job listing preview"
        dimensions={'max-w-screen-2xl'}
      >
        <div className="overflow-y-scroll h-[90vh] overscroll-contain no-scrollbar">
          <JobListing jobId={jobSelected?.id} teamId={team.id} />
        </div>
      </ModalDialog>

      <ModalDialog
        show={newJob}
        setShow={setNewJob}
        title="Post open role"
        dimensions={'max-w-4xl'}
        disabled
      >
        <div className="h-[80vh]">
          <CreateListing teamId={team.id} setShow={setNewJob} />
        </div>
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
