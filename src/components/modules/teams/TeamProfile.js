import React, { useState } from 'react';
import useSWR from 'swr';
import Image from 'next/future/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import OpenRoles from 'components/modules/teams/ListJobs';
import TeamMembers from 'components/modules/teams/TeamMembers';
import Avatar from 'components/common/elements/Avatar';
import TechBadge from 'components/common/tags/TagStack';
import ModalDialog from 'components/common/modals/ModalDialog';
import Loader from 'components/common/elements/Loader';
import fetcher from 'utils/fetcher';
import Icon from 'components/common/elements/Icon';

const TeamProfile = ({ user, slug }) => {
  const router = useRouter();
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
            &larr; Back to Teams
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
            {team && (
              <div className="mt-4 flex min-h-screen w-full items-start justify-between gap-12 px-4 pb-20 md:mt-0 md:px-0">
                <div className="relative w-full space-y-6 sm:space-y-8 lg:w-8/12">
                  <Link href="/teams">
                    <button className="btn btn-ghost px-0">&larr; Back</button>
                  </Link>

                  <div className="flex flex-col items-start space-y-2 lg:flex-row lg:space-y-0 lg:space-x-4">
                    <div className="block h-20 w-20 overflow-hidden rounded-lg">
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
                      <h2 className="mb-0">{team.name}</h2>
                      <p>{team.description}</p>
                      <a
                        href={team.url}
                        target="_blank"
                        className="flex items-center space-x-2 text-base-300 dark:text-base-400"
                        rel="noreferrer"
                      >
                        <span>{team.url.replace(/(^\w+:|^)\/\//, '')}</span>
                        <Icon name="FiExternalLink" className="h-4 w-4" />
                      </a>
                    </div>
                  </div>

                  <div className="space-y-10">
                    <div className="no-scrollbar flex items-center overflow-x-scroll sm:flex-wrap">
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
                      <h3 className="font-semibold">
                        What is your team mission?
                      </h3>
                      <p>{team.mission}</p>
                    </div>

                    {team.businessDetails?.teamStructure !== '' && (
                      <div className="space-y-2">
                        <h3 className="font-semibold">
                          How are the teams structured?
                        </h3>
                        <p>{team.businessDetails?.teamStructure}</p>
                      </div>
                    )}

                    {team?.imagesGallery[0] && (
                      <div className="flex items-center space-x-4 sm:space-x-6">
                        <div
                          className="relative h-52 w-2/3 cursor-pointer overflow-hidden rounded-md md:h-80"
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
                              className="relative h-24 w-full cursor-pointer overflow-hidden rounded-md md:h-36"
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
                              className="relative h-24 w-full cursor-pointer overflow-hidden rounded-md md:h-36"
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
                        <h3 className="font-semibold">
                          How does the development process work?
                        </h3>
                        <p>{team.businessDetails?.devProcess}</p>
                      </div>
                    )}

                    {team.businessDetails?.devTools !== '' && (
                      <div className="space-y-2">
                        <h3 className="font-semibold">
                          What tools do developers use?
                        </h3>
                        <p>{team.businessDetails?.devTools}</p>
                      </div>
                    )}

                    {team.businessDetails?.hiringProcess !== '' && (
                      <div className="space-y-2">
                        <h3 className="font-semibold">
                          What does your hiring process look like?
                        </h3>
                        <p>{team.businessDetails?.hiringProcess}</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="hidden w-3/12 lg:block">
                  <div className="fixed top-40 w-72">
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
                    <div className="-mt-14 grid w-full grid-cols-5 gap-3 rounded-md border bg-base-50 px-4 pt-20 pb-10 text-sm dark:border-base-700 dark:bg-base-800">
                      <div className="col-span-2 font-medium">Founded:</div>
                      <div className="col-span-3">
                        {team.businessDetails?.founded}
                      </div>

                      {team.businessDetails?.stage !== '' && (
                        <>
                          <div className="col-span-2 font-medium">Stage:</div>
                          <div className="col-span-3">
                            {team.businessDetails?.stage}
                          </div>
                        </>
                      )}

                      <div className="col-span-2 font-medium">Members:</div>
                      <div className="col-span-3">
                        {team?.businessDetails?.nrEmployees >
                        teamMembers?.length + 1
                          ? team.businessDetails.nrEmployees
                          : teamMembers?.length + 1}
                      </div>

                      <div className="col-span-2 font-medium">Team lead:</div>
                      <div className="col-span-3">
                        {/* {teamOwner?.name} */}
                      </div>

                      <div className="col-span-2 font-medium">Location(s):</div>
                      <div className="col-span-3">
                        {team.businessDetails?.location.map((place, index) => (
                          <span className="" key={index}>
                            {index > 0 && ', '}
                            {place}
                          </span>
                        ))}
                      </div>

                      {team.url && (
                        <>
                          <div className="col-span-5 space-y-2">
                            <div className="truncate">
                              <a
                                href={team.url}
                                target="_blank"
                                rel="noreferrer"
                                className="btn btn-sm btn-ghost px-0"
                              >
                                {team.url}
                              </a>
                            </div>
                            <div className="truncate">
                              <a
                                href={
                                  team.businessDetails?.socialMediaLinks?.github
                                }
                                target="_blank"
                                rel="noreferrer"
                                className="btn btn-sm btn-ghost truncate px-0"
                              >
                                {team.businessDetails?.socialMediaLinks?.github}
                              </a>
                            </div>
                          </div>
                        </>
                      )}

                      {team && teamMembers && (
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
                      )}
                    </div>

                    {team.ownerId === user?.userId && (
                      <div className="my-6 flex flex-col items-center space-y-2">
                        <button
                          className="btn btn-primary w-full"
                          onClick={() =>
                            router.push(`/account/teams/profile/${team.id}`)
                          }
                        >
                          Edit team profile
                        </button>
                        <Link href={`/account/teams/jobs/${team.id}`}>
                          <button className="btn btn-secondary w-full">
                            Post a job
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

      {showImageOne && (
        <ModalDialog
          show={showImageOne}
          setShow={setShowImageOne}
          title={team?.name}
          dimensions={'max-w-5xl'}
          edge={true}
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
          edge={true}
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
          edge={true}
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
