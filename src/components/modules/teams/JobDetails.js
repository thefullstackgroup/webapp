import React, { useState } from 'react';
import useSWR from 'swr';
import Image from 'next/future/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import OpenRoles from 'components/modules/teams/ListJobs';
import TeamMembers from 'components/modules/teams/TeamMembers';
import Avatar from 'components/common/elements/Avatar';
import TechBadge from 'components/common/tags/TagStack';
import { IoCopyOutline, IoLogoGithub } from 'react-icons/io5';
import { BiDollar, BiMap, BiTime } from 'react-icons/bi';
import SocialShareLinks from 'components/common/elements/SocialShareLinks';
import axios from 'axios';
import ModalDialog from 'components/common/modals/ModalDialog';
import Markdown from 'markdown-to-jsx';
import Loader from 'components/common/elements/Loader';
import fetcher from 'utils/fetcher';

const JobDetails = ({ user, teamId, jobId }) => {
  const router = useRouter();
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const jobUrl = `${process.env.BASEURL}/api/jobs/get?jobId=${jobId}`;
  const { data: job } = useSWR(jobUrl, fetcher);

  const teamUrl = `${process.env.BASEURL}/api/teams/getTeam?teamId=${teamId}`;
  const { data: team } = useSWR(teamUrl, fetcher);

  const teamOwnerUrl = `${process.env.BASEURL}/api/profile/getUser?userId=${team?.ownerId}`;
  const { data: teamOwner } = useSWR(teamOwnerUrl, fetcher);

  const membersIds = team
    ? team.membersIds?.map((membersIds) => membersIds).join(',') || null
    : null;

  const teamMembersUrl = `${process.env.BASEURL}/api/profile/getUsers?userIds=${membersIds}`;
  const { data: teamMembers } = useSWR(teamMembersUrl, fetcher);

  const sendSlackMessage = async () => {
    await axios.post(
      `${process.env.BASEURL}/api/notifications/slack/postMessage`,
      {
        message: `SHARE MODAL: A user has copied the job '${team.name} - ${job.title}' and might share or refer someone.`,
      }
    );
  };

  if (!job && !team) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (team && !team.id) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        This team does not exist.
        <Link href="/teams">
          <button className="text-primary-500 mt-6 hidden hover:text-white sm:block">
            &larr; Back
          </button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="mt-0 flex w-full justify-center overflow-hidden md:mt-4">
        <div className="min-h-screen w-full px-0 md:ml-6 lg:ml-20 lg:max-w-full xl:ml-52 xl:px-4 2xl:ml-56 2xl:px-0">
          <div className="relative mx-auto max-w-6xl">
            {job && team && (
              <div className="mt-0 flex min-h-screen w-full items-start justify-between gap-12 px-4 pb-20 md:mt-0 md:px-0">
                <div className="relative w-full space-y-6 lg:w-8/12">
                  <button
                    className="text-primary-500 mt-6 hidden hover:text-white sm:block"
                    onClick={() => router.back()}
                  >
                    &larr; Back
                  </button>

                  <div className="flex items-start justify-between space-y-2">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <div className="relative flex h-8 w-8 overflow-hidden rounded-lg">
                          <Image
                            src={team.image}
                            className="h-full w-full object-cover"
                            alt={team.name || ''}
                            title={team.name}
                            referrerPolicy="no-referrer"
                            width={100}
                            height={100}
                            layout="fill"
                          />
                        </div>
                        <div>
                          <h2 className="text-2xl font-semibold text-slate-400 md:text-xl">
                            {team.name}
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="text-3xl">{job.title}</div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1 text-sm">
                          <BiMap />
                          <span>{job.locationType}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-sm">
                          <BiTime />
                          <span>{job.employmentType} position</span>
                        </div>
                        <div className="flex items-center space-x-1 text-sm">
                          <BiDollar />
                          <span>EUR 100k - 120k position</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <a
                        href={job.applyURL}
                        target="_blank"
                        className="btn-primary block cursor-pointer"
                        rel="noreferrer"
                      >
                        Apply for position
                      </a>
                    </div>
                  </div>
                  <div className="space-y-10">
                    <div className="no-scrollbar flex items-center overflow-x-scroll sm:flex-wrap">
                      {job.techStack?.map((stack, index) => (
                        <TechBadge tech={stack} key={index} size={'sm'} />
                      ))}
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-semibold text-white">Locations(s)</h3>
                      <p className="prose-sm prose-dark text-slate-300">
                        {job.location.map((place, index) => (
                          <span className="" key={index}>
                            {index > 0 && ', '}
                            {place}
                          </span>
                        ))}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-semibold text-white">
                        Job description
                      </h3>
                      <p className="prose-sm prose-dark text-slate-300">
                        <Markdown
                          options={{
                            overrides: {
                              a: {
                                props: { target: '_blank' },
                              },
                            },
                          }}
                        >
                          {job.description}
                        </Markdown>
                      </p>
                    </div>

                    {teamMembers && (
                      <TeamMembers
                        teamMembers={teamMembers}
                        teamOwner={teamOwner}
                        title="Meet the team"
                      />
                    )}

                    <div className="space-y-2">
                      <h3 className="font-semibold text-white">
                        How does the development process work?
                      </h3>
                      <p className="text-slate-300">
                        {team.businessDetails?.devProcess}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-semibold text-white">
                        What tools do developers use?
                      </h3>
                      <p className="text-slate-300">
                        {team.businessDetails?.devTools}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-semibold text-white">
                        What does your hiring process look like?
                      </h3>
                      <p className="text-slate-300">
                        {team.businessDetails?.hiringProcess}
                      </p>
                    </div>

                    <div className="border-t border-base-700"></div>

                    {team && teamOwner && (
                      <OpenRoles teamId={team.id} teamOwner={teamOwner} />
                    )}
                  </div>
                </div>
                <div className="sticky top-20 hidden w-3/12 lg:block">
                  <div className="fixed top-24 w-72">
                    <div className="relative ml-6 h-28 w-28 overflow-hidden rounded-xl">
                      <Image
                        src={team.image}
                        className="h-full w-full object-cover"
                        alt={team.name || ''}
                        title={team.name}
                        referrerPolicy="no-referrer"
                        width={100}
                        height={100}
                        layout="fill"
                      />
                    </div>
                    <div className="-mt-14 mb-6 grid w-full grid-cols-5 gap-3 rounded-md border border-base-600/50 bg-base-800 pt-20 pb-10 pl-8 pr-10 text-sm text-slate-400">
                      <div className="col-span-2 font-medium text-white">
                        Founded:
                      </div>
                      <div className="col-span-3">
                        {team.businessDetails?.founded}
                      </div>

                      <div className="col-span-2 font-medium text-white">
                        Stage:
                      </div>
                      <div className="col-span-3">
                        {team.businessDetails?.stage}
                      </div>

                      <div className="col-span-2 font-medium text-white">
                        Members:
                      </div>
                      <div className="col-span-3">
                        {team.businessDetails?.nrEmployees}
                      </div>

                      <div className="col-span-2 font-medium text-white">
                        Team lead:
                      </div>
                      <div className="col-span-3">{teamOwner?.name}</div>

                      <div className="col-span-2 font-medium text-white">
                        Location(s):
                      </div>
                      <div className="col-span-3">
                        {team.businessDetails?.location.map((place, index) => (
                          <span className="" key={index}>
                            {index > 0 && ', '}
                            {place}
                          </span>
                        ))}
                      </div>

                      {team.businessDetails?.socialMediaLinks?.github && (
                        <>
                          <div className="col-span-2 font-medium text-white">
                            Links:
                          </div>
                          <div className="col-span-3">
                            <a
                              href={
                                team.businessDetails?.socialMediaLinks?.github
                              }
                              target="_blank"
                              rel="noreferrer"
                              className="group relative"
                            >
                              <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-base-600 px-2 py-1 text-white opacity-0 transition before:absolute before:left-1/2 before:top-full before:-translate-x-1/2 before:border-4 before:border-transparent before:border-t-base-600 before:content-[''] group-hover:opacity-100">
                                {team.businessDetails?.socialMediaLinks?.github}
                              </span>
                              <IoLogoGithub className="h-5 w-5 hover:text-white" />
                            </a>
                          </div>
                        </>
                      )}

                      <div className="col-span-5 mt-2 flex space-x-2">
                        <Avatar
                          href={`/${teamOwner?.displayName}`}
                          name={teamOwner?.name}
                          image={teamOwner?.profilePicUrl}
                          dimensions="h-12 w-12 sm:h-8 sm:w-8"
                        />
                        {teamMembers?.map((member) => (
                          <div key={member.id}>
                            <Avatar
                              image={member.profilePicUrl}
                              href={`/${member.displayName}`}
                              dimensions="h-12 w-12 sm:h-8 sm:w-8"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex w-full flex-col space-y-4">
                      <a
                        href={job.applyURL}
                        target="_blank"
                        className="btn-primary block w-full cursor-pointer text-center"
                        rel="noreferrer"
                      >
                        Apply for position
                      </a>
                      <button
                        className="btn-secondary"
                        onClick={() => setShowShareOptions(!showShareOptions)}
                      >
                        Refer someone
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showShareOptions && (
        <ModalDialog
          show={showShareOptions}
          setShow={setShowShareOptions}
          title="Share post"
        >
          <div className="mx-auto mt-4 p-2 text-center shadow-xl sm:max-w-xl">
            <div className="max-w-xs space-y-3 text-left md:max-w-full">
              <h4 className="text-sm font-semibold">Copy link</h4>
              <div
                className="text-input flex cursor-pointer items-center justify-between space-x-2"
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${process.env.BASEURL}${router.asPath}`
                  );
                  setIsCopied(true);
                  sendSlackMessage();
                }}
              >
                <span className="no-scrollbar w-11/12 overflow-hidden overflow-x-scroll whitespace-nowrap ">
                  {`${process.env.BASEURL}${router.asPath}`}
                </span>
                <IoCopyOutline className="h-6 w-6 text-slate-400" />
              </div>
              {isCopied && (
                <span className="text-tfstertiary-500 text-xs font-semibold">
                  Copied to clipboard!
                </span>
              )}
            </div>
            <div className="mt-8 space-y-3 text-left">
              <h4 className="text-sm font-semibold">Share via</h4>
              <SocialShareLinks
                link={`${process.env.BASEURL}${router.asPath}`}
                title={job.name}
              />
            </div>
          </div>
        </ModalDialog>
      )}
    </>
  );
};

export default JobDetails;
