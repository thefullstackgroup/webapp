import useSWR from 'swr';
import Image from 'next/future/image';
import Link from 'next/link';
import TechBadge from 'components/common/tags/TagStack';
import Avatar from 'components/common/elements/Avatar';
import fetcher from 'utils/fetcher';

const TeamCard = ({ team }) => {
  const url = `${process.env.BASEURL}/api/profile/getUser?userId=${team.ownerId}`;
  const { data: teamOwner } = useSWR(url, fetcher);

  const jobsUrl = `${process.env.BASEURL}/api/jobs/getByTeam?teamId=${team.id}`;
  const { data: teamJobs } = useSWR(jobsUrl, fetcher);

  return (
    <div className="relative w-full px-4 sm:px-0">
      {team.status === 'ACTIVE' ? (
        <button className="sm:hover:border-primary-600/80 group relative w-full rounded-lg border-2 border-transparent bg-base-800 p-2 duration-300 sm:p-4">
          <Link href={`/teams/${team.id}`}>
            <div className="sm:space-y-6">
              <div className="hidden justify-between space-x-4 sm:flex">
                <div className="flex w-full space-x-4">
                  <div>
                    <div className="relative h-14 w-20 overflow-hidden rounded-lg sm:h-24 sm:w-24">
                      {team.image && (
                        <Image
                          src={team.image}
                          className="h-full w-full object-cover"
                          alt={team.name || ''}
                          title={team.name}
                          referrerPolicy="no-referrer"
                          width={100}
                          height={100}
                          layout="fill"
                          priority={true}
                        />
                      )}
                    </div>
                  </div>
                  <div className="block w-full overflow-hidden text-left">
                    <div className="flex items-center justify-between">
                      <p className="text-xl font-semibold sm:text-2xl">
                        {team.name}
                      </p>
                      {team.status !== 'ACTIVE' ? (
                        <div className="hidden h-5 items-center space-x-2 whitespace-nowrap text-right text-xs font-medium text-slate-400 sm:flex">
                          Coming soon
                        </div>
                      ) : (
                        <div className="mt-1 hidden items-end space-y-2 text-xs font-medium sm:flex sm:flex-col">
                          {teamJobs?.data?.length > 0 && (
                            <div className="badge badge-xs whitespace-nowrap bg-purple-600 font-medium">
                              Open roles
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <p className="text-sm text-slate-400 sm:text-base">
                      {team.description}
                    </p>
                    <div className="no-scrollbar flex flex-wrap items-center overflow-x-scroll py-2 text-xs sm:flex-nowrap">
                      {team.businessDetails?.location?.map((place, index) => (
                        <div
                          className="w-min whitespace-nowrap rounded-md border border-base-600 px-2 py-0.5"
                          key={index}
                        >
                          {place}
                        </div>
                      ))}
                    </div>
                    {teamOwner && (
                      <div className="my-1 flex items-center space-x-2 text-sm font-medium text-slate-400">
                        <Avatar
                          image={teamOwner?.profilePicUrl}
                          dimensions="h-6 w-6"
                        />

                        <p className="text-slate-200">
                          {teamOwner?.name}{' '}
                          {team?.membersIds.length > 0 && (
                            <span className="font-normal text-slate-400">
                              and {team?.membersIds.length} other{' '}
                              {team?.membersIds.length == 1
                                ? 'teammate'
                                : 'teammates'}
                            </span>
                          )}
                        </p>
                      </div>
                    )}
                    <div className="no-scrollbar flex flex-wrap items-center overflow-x-scroll py-2 sm:flex-nowrap">
                      {team.techStack?.map((stack, index) => (
                        <TechBadge tech={stack} key={index} size={'xs'} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="block space-y-2 sm:hidden">
                <div className="flex items-center space-x-4">
                  <div>
                    <div className="relative h-20 w-20 overflow-hidden rounded-lg">
                      {team.image && (
                        <Image
                          src={team.image}
                          className="h-full w-full object-cover"
                          alt={team.name || ''}
                          title={team.name}
                          referrerPolicy="no-referrer"
                          width={100}
                          height={100}
                          layout="fill"
                          priority={true}
                        />
                      )}
                    </div>
                  </div>

                  <div className="text-left">
                    <h4 className="text-xl font-semibold sm:text-2xl">
                      {team.name}
                    </h4>
                    <p className="text-sm text-slate-400 sm:text-base">
                      {team.description}
                    </p>
                  </div>
                </div>
                <div className="block overflow-hidden text-left">
                  <div className="no-scrollbar flex flex-wrap items-center overflow-x-scroll py-2 text-xs sm:flex-nowrap">
                    {team.businessDetails?.location?.map((place, index) => (
                      <div
                        className="w-min whitespace-nowrap rounded-md border border-base-600 px-2 py-0.5"
                        key={index}
                      >
                        {place}
                      </div>
                    ))}
                  </div>
                  {teamOwner && (
                    <div className="my-1 flex items-center space-x-2 text-sm font-medium text-slate-400">
                      <Avatar
                        image={teamOwner?.profilePicUrl}
                        dimensions="h-6 w-6"
                      />

                      <p className="text-slate-200">
                        {teamOwner?.name}{' '}
                        {team?.membersIds.length > 0 && (
                          <span className="font-normal text-slate-400">
                            and {team?.membersIds.length} other{' '}
                            {team?.membersIds.length == 1
                              ? 'teammate'
                              : 'teammates'}
                          </span>
                        )}
                      </p>
                    </div>
                  )}
                  <div className="no-scrollbar flex flex-wrap items-center overflow-x-scroll py-2 sm:flex-nowrap">
                    {team.techStack?.map((stack, index) => (
                      <TechBadge tech={stack} key={index} size={'xs'} />
                    ))}
                  </div>
                </div>
                {team.status !== 'ACTIVE' && (
                  <div className="hidden h-5 items-center space-x-2 whitespace-nowrap text-right text-xs font-medium text-slate-400 sm:flex">
                    Coming soon
                  </div>
                )}
              </div>
            </div>
          </Link>
        </button>
      ) : (
        <button className="group relative w-full rounded-lg border-2 border-transparent bg-base-800 p-2 duration-300 sm:p-4">
          <div className="sm:space-y-6">
            <div className="hidden justify-between space-x-4 sm:flex">
              <div className="flex w-full space-x-4">
                <div>
                  <div className="relative h-14 w-20 overflow-hidden rounded-lg sm:h-24 sm:w-24">
                    {team.image && (
                      <Image
                        src={team.image}
                        className="h-full w-full object-cover"
                        alt={team.name || ''}
                        title={team.name}
                        referrerPolicy="no-referrer"
                        width={100}
                        height={100}
                        layout="fill"
                        priority={true}
                      />
                    )}
                  </div>
                </div>
                <div className="block w-full overflow-hidden text-left">
                  <div className="flex items-center justify-between">
                    <p className="text-xl font-semibold sm:text-2xl">
                      {team.name}
                    </p>
                    {team.status !== 'ACTIVE' ? (
                      <div className="hidden h-5 items-center space-x-2 whitespace-nowrap text-right text-xs font-medium text-slate-400 sm:flex">
                        Coming soon
                      </div>
                    ) : (
                      <div className="mt-1 hidden items-end space-y-2 text-xs font-medium sm:flex sm:flex-col">
                        {team?.businessDetails.isHiring && (
                          <div className="badge badge-xs whitespace-nowrap bg-purple-600 font-medium">
                            Open roles
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-slate-400 sm:text-base">
                    {team.description}
                  </p>
                  <div className="no-scrollbar flex flex-wrap items-center overflow-x-scroll py-2 text-xs sm:flex-nowrap">
                    {team.businessDetails?.location?.map((place, index) => (
                      <div
                        className="w-min whitespace-nowrap rounded-md border border-base-600 px-2 py-0.5"
                        key={index}
                      >
                        {place}
                      </div>
                    ))}
                  </div>
                  {teamOwner && (
                    <div className="my-1 flex items-center space-x-2 text-sm font-medium text-slate-400">
                      <Avatar
                        image={teamOwner?.profilePicUrl}
                        dimensions="h-6 w-6"
                      />

                      <p className="text-slate-200">
                        {teamOwner?.name}{' '}
                        {team?.membersIds.length > 0 && (
                          <span className="font-normal text-slate-400">
                            and {team?.membersIds.length} other{' '}
                            {team?.membersIds.length == 1
                              ? 'teammate'
                              : 'teammates'}
                          </span>
                        )}
                      </p>
                    </div>
                  )}
                  <div className="no-scrollbar flex flex-wrap items-center overflow-x-scroll py-2 sm:flex-nowrap">
                    {team.techStack?.map((stack, index) => (
                      <TechBadge tech={stack} key={index} size={'xs'} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="block space-y-2 sm:hidden">
              <div className="flex items-center space-x-4">
                <div>
                  <div className="relative h-20 w-20 overflow-hidden rounded-lg">
                    {team.image && (
                      <Image
                        src={team.image}
                        className="h-full w-full object-cover"
                        alt={team.name || ''}
                        title={team.name}
                        referrerPolicy="no-referrer"
                        width={100}
                        height={100}
                        layout="fill"
                        priority={true}
                      />
                    )}
                  </div>
                </div>

                <div className="text-left">
                  <h4 className="text-xl font-semibold sm:text-2xl">
                    {team.name}
                  </h4>
                  <p className="text-sm text-slate-400 sm:text-base">
                    {team.description}
                  </p>
                </div>
              </div>
              <div className="block overflow-hidden text-left">
                <div className="no-scrollbar flex flex-wrap items-center overflow-x-scroll py-2 text-xs sm:flex-nowrap">
                  {team.businessDetails?.location?.map((place, index) => (
                    <div
                      className="w-min whitespace-nowrap rounded-md border border-base-600 px-2 py-0.5"
                      key={index}
                    >
                      {place}
                    </div>
                  ))}
                </div>
                {teamOwner && (
                  <div className="my-1 flex items-center space-x-2 text-sm font-medium text-slate-400">
                    <Avatar
                      image={teamOwner?.profilePicUrl}
                      dimensions="h-6 w-6"
                    />

                    <p className="text-slate-200">
                      {teamOwner?.name}{' '}
                      {team?.membersIds.length > 0 && (
                        <span className="font-normal text-slate-400">
                          and {team?.membersIds.length} other{' '}
                          {team?.membersIds.length == 1
                            ? 'teammate'
                            : 'teammates'}
                        </span>
                      )}
                    </p>
                  </div>
                )}
                <div className="no-scrollbar flex flex-wrap items-center overflow-x-scroll py-2 sm:flex-nowrap">
                  {team.techStack?.map((stack, index) => (
                    <TechBadge tech={stack} key={index} size={'xs'} />
                  ))}
                </div>
              </div>
              {team.status !== 'ACTIVE' && (
                <div className="hidden h-5 items-center space-x-2 whitespace-nowrap text-right text-xs font-medium text-slate-400 sm:flex">
                  Coming soon
                </div>
              )}
            </div>
          </div>

          {team.status === 'ACTIVE' && team?.businessDetails.isHiring && (
            <div className="badge badge-xs absolute top-2 right-0 mt-1 w-min whitespace-nowrap bg-purple-600 sm:right-2">
              Open roles
            </div>
          )}
          {team.status !== 'ACTIVE' && (
            <button className="group absolute top-0 left-0 z-0 h-full w-full cursor-not-allowed bg-base-900/80 sm:rounded-lg"></button>
          )}
        </button>
      )}
    </div>
  );
};

export default TeamCard;
