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
      <div className="flex justify-center items-center min-h-screen">
        <Loader />
      </div>
    );
  }

  if (team && !team.id) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        This team does not exist.
        <Link href="/teams">
          <button className="hidden sm:block text-primary-500 hover:text-white mt-6">
            &larr; Back
          </button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="mt-0 md:mt-4 w-full overflow-hidden flex justify-center">
        <div className="min-h-screen w-full lg:max-w-full px-0 xl:px-4 2xl:px-0 md:ml-6 lg:ml-20 xl:ml-52 2xl:ml-56">
          <div className="relative max-w-6xl mx-auto">
            {job && team && (
              <div className="mt-0 md:mt-0 flex justify-between items-start w-full pb-20 min-h-screen gap-12 px-4 md:px-0">
                <div className="relative w-full lg:w-8/12 space-y-6">
                  <button
                    className="hidden sm:block text-primary-500 hover:text-white mt-6"
                    onClick={() => router.back()}
                  >
                    &larr; Back
                  </button>

                  <div className="flex items-start justify-between space-y-2">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <div className="flex relative w-8 h-8 overflow-hidden rounded-lg">
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
                          <h2 className="text-2xl md:text-xl font-semibold text-slate-400">
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
                        className="btn-primary cursor-pointer block"
                        rel="noreferrer"
                      >
                        Apply for position
                      </a>
                    </div>
                  </div>
                  <div className="space-y-10">
                    <div className="flex sm:flex-wrap overflow-x-scroll no-scrollbar items-center">
                      {job.techStack?.map((stack, index) => (
                        <TechBadge tech={stack} key={index} size={'sm'} />
                      ))}
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-white font-semibold">Locations(s)</h3>
                      <p className="text-slate-300 prose-sm prose-dark">
                        {job.location.map((place, index) => (
                          <span className="" key={index}>
                            {index > 0 && ', '}
                            {place}
                          </span>
                        ))}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-white font-semibold">
                        Job description
                      </h3>
                      <p className="text-slate-300 prose-sm prose-dark">
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
                      <h3 className="text-white font-semibold">
                        How does the development process work?
                      </h3>
                      <p className="text-slate-300">
                        {team.businessDetails?.devProcess}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-white font-semibold">
                        What tools do developers use?
                      </h3>
                      <p className="text-slate-300">
                        {team.businessDetails?.devTools}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-white font-semibold">
                        What does your hiring process look like?
                      </h3>
                      <p className="text-slate-300">
                        {team.businessDetails?.hiringProcess}
                      </p>
                    </div>

                    <div className="border-t border-tfsdark-700"></div>

                    {team && teamOwner && (
                      <OpenRoles teamId={team.id} teamOwner={teamOwner} />
                    )}
                  </div>
                </div>
                <div className="hidden lg:block sticky top-20 w-3/12">
                  <div className="fixed w-72 top-24">
                    <div className="relative ml-6 w-28 h-28 overflow-hidden rounded-xl">
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
                    <div className="-mt-14 pt-20 grid grid-cols-5 gap-3 pb-10 pl-8 pr-10 w-full bg-tfsdark-800 rounded-md border border-tfsdark-600/50 text-slate-400 text-sm mb-6">
                      <div className="col-span-2 text-white font-medium">
                        Founded:
                      </div>
                      <div className="col-span-3">
                        {team.businessDetails?.founded}
                      </div>

                      <div className="col-span-2 text-white font-medium">
                        Stage:
                      </div>
                      <div className="col-span-3">
                        {team.businessDetails?.stage}
                      </div>

                      <div className="col-span-2 text-white font-medium">
                        Members:
                      </div>
                      <div className="col-span-3">
                        {team.businessDetails?.nrEmployees}
                      </div>

                      <div className="col-span-2 text-white font-medium">
                        Team lead:
                      </div>
                      <div className="col-span-3">{teamOwner?.name}</div>

                      <div className="col-span-2 text-white font-medium">
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
                          <div className="col-span-2 text-white font-medium">
                            Links:
                          </div>
                          <div className="col-span-3">
                            <a
                              href={
                                team.businessDetails?.socialMediaLinks?.github
                              }
                              target="_blank"
                              rel="noreferrer"
                              className="relative group"
                            >
                              <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-tfsdark-600 px-2 py-1 text-white opacity-0 transition before:absolute before:left-1/2 before:top-full before:-translate-x-1/2 before:border-4 before:border-transparent before:border-t-tfsdark-600 before:content-[''] group-hover:opacity-100">
                                {team.businessDetails?.socialMediaLinks?.github}
                              </span>
                              <IoLogoGithub className="w-5 h-5 hover:text-white" />
                            </a>
                          </div>
                        </>
                      )}

                      <div className="mt-2 col-span-5 flex space-x-2">
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
                    <div className="w-full flex flex-col space-y-4">
                      <a
                        href={job.applyURL}
                        target="_blank"
                        className="btn-primary cursor-pointer w-full block text-center"
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
          <div className="mt-4 p-2 text-center shadow-xl sm:max-w-xl mx-auto">
            <div className="space-y-3 text-left max-w-xs md:max-w-full">
              <h4 className="text-sm font-semibold">Copy link</h4>
              <div
                className="text-input flex items-center justify-between space-x-2 cursor-pointer"
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${process.env.BASEURL}${router.asPath}`
                  );
                  setIsCopied(true);
                  sendSlackMessage();
                }}
              >
                <span className="w-11/12 overflow-hidden overflow-x-scroll no-scrollbar whitespace-nowrap ">
                  {`${process.env.BASEURL}${router.asPath}`}
                </span>
                <IoCopyOutline className="h-6 w-6 text-slate-400" />
              </div>
              {isCopied && (
                <span className="text-xs font-semibold text-tfstertiary-500">
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
