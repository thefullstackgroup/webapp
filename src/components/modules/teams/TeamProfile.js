import React, { useState } from 'react';
import useSWR from 'swr';
import Image from 'next/future/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import OpenRoles from 'components/modules/teams/ListJobs';
import TeamMembers from 'components/modules/teams/TeamMembers';
import Avatar from 'components/common/elements/Avatar';
import TechBadge from 'components/common/tags/TagStack';
import { IoLogoGithub, IoSettingsOutline } from 'react-icons/io5';
import { FiLink } from 'react-icons/fi';
import Subscribe from 'components/modules/account/settings/subscriptions/Modal';
import ModalDialog from 'components/common/modals/ModalDialog';
import Loader from 'components/common/elements/Loader';
import fetcher from 'utils/fetcher';

const TeamProfile = ({ user, slug }) => {
  const router = useRouter();
  const [subscribePanel, setSubscribePanel] = useState(false);
  const [showImageOne, setShowImageOne] = useState(false);
  const [showImageTwo, setShowImageTwo] = useState(false);
  const [showImageThree, setShowImageThree] = useState(false);

  const teamUrl = `${process.env.BASEURL}/api/teams/getTeam?teamId=${slug}`;
  const { data: team } = useSWR(teamUrl, fetcher);

  const teamOwnerUrl = `${process.env.BASEURL}/api/profile/getUser?userId=${team?.ownerId}`;
  const { data: teamOwner } = useSWR(teamOwnerUrl, fetcher);

  const membersIds = team
    ? team.membersIds?.map((membersIds) => membersIds).join(',') || null
    : null;

  const teamMembersUrl = `${process.env.BASEURL}/api/profile/getUsers?userIds=${membersIds}`;
  const { data: teamMembers } = useSWR(teamMembersUrl, fetcher);

  if (!team) {
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
            &larr; Back to Teams
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
            {team && (
              <div className="mt-0 md:mt-0 flex justify-between items-start w-full pb-20 min-h-screen gap-12 px-4 md:px-0">
                <div className="relative w-full lg:w-8/12 space-y-6 sm:space-y-8">
                  <Link href="/teams">
                    <button className="text-slate-400 hover:text-white mt-2 sm:mt-6 text-sm sm:text-base">
                      &larr; Back
                    </button>
                  </Link>
                  <div className="flex items-start justify-between space-y-2">
                    <div className="space-y-1">
                      <div className="flex items-start space-x-4">
                        <div className="block w-20 h-20 overflow-hidden rounded-lg">
                          <Image
                            src={team.image}
                            className="h-full w-full object-contain object-top"
                            alt={team.name || ''}
                            title={team.name}
                            referrerPolicy="no-referrer"
                            width={100}
                            height={100}
                            layout="fill"
                          />
                        </div>
                        <div>
                          <h2 className="text-2xl md:text-3xl font-semibold">
                            {team.name}
                          </h2>
                          <p className="text-sm md:text-base text-slate-400">
                            {team.description}
                          </p>
                          <a
                            href={team.url}
                            target="_blank"
                            className="flex text-sm md:text-base items-center space-x-2 text-slate-500 hover:text-white"
                            rel="noreferrer"
                          >
                            <span>{team.url.replace(/(^\w+:|^)\/\//, '')}</span>
                            <FiLink className="h-4 w-4" />
                          </a>
                        </div>
                      </div>
                    </div>
                    {team.ownerId === user?.userId && (
                      <div>
                        <button
                          className="btn-ghost"
                          onClick={() =>
                            router.push(`/account/teams/profile/${team.id}`)
                          }
                        >
                          <IoSettingsOutline className="h-6 w-6" />
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="space-y-10">
                    <div className="flex sm:flex-wrap overflow-x-scroll no-scrollbar items-center">
                      {team.techStack?.map((stack, index) => (
                        <TechBadge tech={stack} key={index} size={'sm'} />
                      ))}
                    </div>

                    {team && teamOwner && (
                      <OpenRoles teamId={team.id} teamOwner={teamOwner} />
                    )}

                    {team && teamMembers && (
                      <TeamMembers
                        teamMembers={teamMembers}
                        teamOwner={teamOwner}
                        title="Who's on the team?"
                      />
                    )}

                    <div className="space-y-2">
                      <h3 className="text-white font-semibold">
                        What is your team mission?
                      </h3>
                      <p className="text-slate-300">{team.mission}</p>
                    </div>

                    {team.businessDetails?.teamStructure !== '' && (
                      <div className="space-y-2">
                        <h3 className="text-white font-semibold">
                          How are the teams structured?
                        </h3>
                        <p className="text-slate-300">
                          {team.businessDetails?.teamStructure}
                        </p>
                      </div>
                    )}

                    {team?.imagesGallery[0] && (
                      <div className="flex space-x-4 sm:space-x-6 items-center">
                        <div
                          className="relative w-2/3 h-52 md:h-80 rounded-md overflow-hidden cursor-pointer"
                          onClick={() => setShowImageOne(true)}
                        >
                          {team?.imagesGallery[0] && (
                            <>
                              <Image
                                src={team?.imagesGallery[0]}
                                className="h-full w-full object-cover"
                                alt={team.name || ''}
                                title={team.name}
                                referrerPolicy="no-referrer"
                                width={400}
                                height={400}
                                layout="fill"
                              />
                            </>
                          )}
                        </div>
                        <div className="w-1/3">
                          <div className="flex flex-col items-start space-y-2 md:space-y-8">
                            <div
                              className="relative w-full h-24 md:h-36 rounded-md overflow-hidden cursor-pointer"
                              onClick={() => setShowImageTwo(true)}
                            >
                              {team?.imagesGallery[1] && (
                                <>
                                  <Image
                                    src={team?.imagesGallery[1]}
                                    className="h-full w-full object-cover"
                                    alt={team.name || ''}
                                    title={team.name}
                                    referrerPolicy="no-referrer"
                                    width={200}
                                    height={200}
                                    layout="fill"
                                  />
                                </>
                              )}
                            </div>
                            <div
                              className="relative w-full h-24 md:h-36 rounded-md overflow-hidden cursor-pointer"
                              onClick={() => setShowImageThree(true)}
                            >
                              {team?.imagesGallery[1] &&
                                team?.imagesGallery[2] && (
                                  <>
                                    <Image
                                      src={team?.imagesGallery[2]}
                                      className="h-full w-full object-cover"
                                      alt={team.name || ''}
                                      title={team.name}
                                      referrerPolicy="no-referrer"
                                      width={200}
                                      height={200}
                                      layout="fill"
                                    />
                                  </>
                                )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {team.businessDetails?.devProcess !== '' && (
                      <div className="space-y-2">
                        <h3 className="text-white font-semibold">
                          How does the development process work?
                        </h3>
                        <p className="text-slate-300">
                          {team.businessDetails?.devProcess}
                        </p>
                      </div>
                    )}

                    {team.businessDetails?.devTools !== '' && (
                      <div className="space-y-2">
                        <h3 className="text-white font-semibold">
                          What tools do developers use?
                        </h3>
                        <p className="text-slate-300">
                          {team.businessDetails?.devTools}
                        </p>
                      </div>
                    )}

                    {team.businessDetails?.hiringProcess !== '' && (
                      <div className="space-y-2">
                        <h3 className="text-white font-semibold">
                          What does your hiring process look like?
                        </h3>
                        <p className="text-slate-300">
                          {team.businessDetails?.hiringProcess}
                        </p>
                      </div>
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
                    <div className="-mt-14 pt-20 grid grid-cols-5 gap-3 pb-10 pl-8 pr-10 w-full bg-tfsdark-800 rounded-md border border-tfsdark-600/50 text-slate-400 text-sm">
                      <div className="col-span-2 text-white font-medium">
                        Founded:
                      </div>
                      <div className="col-span-3">
                        {team.businessDetails?.founded}
                      </div>

                      {team.businessDetails?.stage !== '' && (
                        <>
                          <div className="col-span-2 text-white font-medium">
                            Stage:
                          </div>
                          <div className="col-span-3">
                            {team.businessDetails?.stage}
                          </div>
                        </>
                      )}

                      <div className="col-span-2 text-white font-medium">
                        Members:
                      </div>
                      <div className="col-span-3">
                        {team?.businessDetails?.nrEmployees >
                        teamMembers?.length + 1
                          ? team.businessDetails.nrEmployees
                          : teamMembers?.length + 1}
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

                      {team && teamMembers && (
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
                      )}
                    </div>

                    {team.ownerId === user?.userId && (
                      <div className="space-y-2 my-6">
                        <Link href={`/account/teams/jobs/${team.id}`}>
                          <button className="btn-primary w-full">
                            Post a job
                          </button>
                        </Link>

                        <Link href={`/account/teams/profile/${team.id}`}>
                          <button className="btn-secondary w-full">
                            Manage team
                          </button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
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

      {showImageOne && (
        <ModalDialog
          show={showImageOne}
          setShow={setShowImageOne}
          title={team?.name}
          dimensions={'max-w-5xl'}
        >
          <Image
            src={team?.imagesGallery[0]}
            className="h-full w-full object-cover"
            alt={team.name || ''}
            title={team.name}
            referrerPolicy="no-referrer"
            width={1000}
            height={1000}
            layout="fill"
          />
        </ModalDialog>
      )}

      {showImageTwo && (
        <ModalDialog
          show={showImageTwo}
          setShow={setShowImageTwo}
          title={team?.name}
          dimensions={'max-w-5xl'}
        >
          <Image
            src={team?.imagesGallery[1]}
            className="h-full w-full object-cover"
            alt={team.name || ''}
            title={team.name}
            referrerPolicy="no-referrer"
            width={1000}
            height={1000}
            layout="fill"
          />
        </ModalDialog>
      )}

      {showImageThree && (
        <ModalDialog
          show={showImageThree}
          setShow={setShowImageThree}
          title={team?.name}
          dimensions={'max-w-5xl'}
        >
          <Image
            src={team?.imagesGallery[2]}
            className="h-full w-full object-cover"
            alt={team.name || ''}
            title={team.name}
            referrerPolicy="no-referrer"
            width={1000}
            height={1000}
            layout="fill"
          />
        </ModalDialog>
      )}
    </>
  );
};

export default TeamProfile;
