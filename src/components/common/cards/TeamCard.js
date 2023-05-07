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
    <div className="relative px-4 sm:px-0 w-full">
      {team.status === 'ACTIVE' ? (
        <button className="relative w-full rounded-lg bg-tfsdark-800 group border-2 border-transparent sm:hover:border-primary-600/80 p-2 sm:p-4 duration-300">
          <Link href={`/teams/${team.id}`}>
            <div className="sm:space-y-6">
              <div className="hidden sm:flex justify-between space-x-4">
                <div className="flex space-x-4 w-full">
                  <div>
                    <div className="relative w-20 h-14 sm:w-24 sm:h-24 overflow-hidden rounded-lg">
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
                  <div className="block overflow-hidden text-left w-full">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-xl sm:text-2xl">
                        {team.name}
                      </p>
                      {team.status !== 'ACTIVE' ? (
                        <div className="hidden sm:flex text-right items-center text-xs whitespace-nowrap font-medium space-x-2 text-slate-400 h-5">
                          Coming soon
                        </div>
                      ) : (
                        <div className="hidden sm:flex sm:flex-col items-end text-xs font-medium space-y-2 mt-1">
                          {teamJobs?.data?.length > 0 && (
                            <div className="badge badge-xs bg-purple-600 font-medium whitespace-nowrap">
                              Open roles
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <p className="text-sm sm:text-base text-slate-400">
                      {team.description}
                    </p>
                    <div className="py-2 flex flex-wrap sm:flex-nowrap overflow-x-scroll no-scrollbar items-center text-xs">
                      {team.businessDetails?.location?.map((place, index) => (
                        <div
                          className="border border-tfsdark-600 px-2 py-0.5 rounded-md w-min whitespace-nowrap"
                          key={index}
                        >
                          {place}
                        </div>
                      ))}
                    </div>
                    {teamOwner && (
                      <div className="my-1 flex items-center text-sm font-medium space-x-2 text-slate-400">
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
                    <div className="py-2 flex flex-wrap sm:flex-nowrap overflow-x-scroll no-scrollbar items-center">
                      {team.techStack?.map((stack, index) => (
                        <TechBadge tech={stack} key={index} size={'xs'} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="block sm:hidden space-y-2">
                <div className="flex items-center space-x-4">
                  <div>
                    <div className="relative w-20 h-20 overflow-hidden rounded-lg">
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
                    <h4 className="font-semibold text-xl sm:text-2xl">
                      {team.name}
                    </h4>
                    <p className="text-sm sm:text-base text-slate-400">
                      {team.description}
                    </p>
                  </div>
                </div>
                <div className="block overflow-hidden text-left">
                  <div className="py-2 flex flex-wrap sm:flex-nowrap overflow-x-scroll no-scrollbar items-center text-xs">
                    {team.businessDetails?.location?.map((place, index) => (
                      <div
                        className="border border-tfsdark-600 px-2 py-0.5 rounded-md w-min whitespace-nowrap"
                        key={index}
                      >
                        {place}
                      </div>
                    ))}
                  </div>
                  {teamOwner && (
                    <div className="my-1 flex items-center text-sm font-medium space-x-2 text-slate-400">
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
                  <div className="py-2 flex flex-wrap sm:flex-nowrap overflow-x-scroll no-scrollbar items-center">
                    {team.techStack?.map((stack, index) => (
                      <TechBadge tech={stack} key={index} size={'xs'} />
                    ))}
                  </div>
                </div>
                {team.status !== 'ACTIVE' && (
                  <div className="hidden sm:flex text-right items-center text-xs whitespace-nowrap font-medium space-x-2 text-slate-400 h-5">
                    Coming soon
                  </div>
                )}
              </div>
            </div>
          </Link>
        </button>
      ) : (
        <button className="relative w-full rounded-lg bg-tfsdark-800 group border-2 border-transparent p-2 sm:p-4 duration-300">
          <div className="sm:space-y-6">
            <div className="hidden sm:flex justify-between space-x-4">
              <div className="flex space-x-4 w-full">
                <div>
                  <div className="relative w-20 h-14 sm:w-24 sm:h-24 overflow-hidden rounded-lg">
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
                <div className="block overflow-hidden text-left w-full">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-xl sm:text-2xl">
                      {team.name}
                    </p>
                    {team.status !== 'ACTIVE' ? (
                      <div className="hidden sm:flex text-right items-center text-xs whitespace-nowrap font-medium space-x-2 text-slate-400 h-5">
                        Coming soon
                      </div>
                    ) : (
                      <div className="hidden sm:flex sm:flex-col items-end text-xs font-medium space-y-2 mt-1">
                        {team?.businessDetails.isHiring && (
                          <div className="badge badge-xs bg-purple-600 font-medium whitespace-nowrap">
                            Open roles
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <p className="text-sm sm:text-base text-slate-400">
                    {team.description}
                  </p>
                  <div className="py-2 flex flex-wrap sm:flex-nowrap overflow-x-scroll no-scrollbar items-center text-xs">
                    {team.businessDetails?.location?.map((place, index) => (
                      <div
                        className="border border-tfsdark-600 px-2 py-0.5 rounded-md w-min whitespace-nowrap"
                        key={index}
                      >
                        {place}
                      </div>
                    ))}
                  </div>
                  {teamOwner && (
                    <div className="my-1 flex items-center text-sm font-medium space-x-2 text-slate-400">
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
                  <div className="py-2 flex flex-wrap sm:flex-nowrap overflow-x-scroll no-scrollbar items-center">
                    {team.techStack?.map((stack, index) => (
                      <TechBadge tech={stack} key={index} size={'xs'} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="block sm:hidden space-y-2">
              <div className="flex items-center space-x-4">
                <div>
                  <div className="relative w-20 h-20 overflow-hidden rounded-lg">
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
                  <h4 className="font-semibold text-xl sm:text-2xl">
                    {team.name}
                  </h4>
                  <p className="text-sm sm:text-base text-slate-400">
                    {team.description}
                  </p>
                </div>
              </div>
              <div className="block overflow-hidden text-left">
                <div className="py-2 flex flex-wrap sm:flex-nowrap overflow-x-scroll no-scrollbar items-center text-xs">
                  {team.businessDetails?.location?.map((place, index) => (
                    <div
                      className="border border-tfsdark-600 px-2 py-0.5 rounded-md w-min whitespace-nowrap"
                      key={index}
                    >
                      {place}
                    </div>
                  ))}
                </div>
                {teamOwner && (
                  <div className="my-1 flex items-center text-sm font-medium space-x-2 text-slate-400">
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
                <div className="py-2 flex flex-wrap sm:flex-nowrap overflow-x-scroll no-scrollbar items-center">
                  {team.techStack?.map((stack, index) => (
                    <TechBadge tech={stack} key={index} size={'xs'} />
                  ))}
                </div>
              </div>
              {team.status !== 'ACTIVE' && (
                <div className="hidden sm:flex text-right items-center text-xs whitespace-nowrap font-medium space-x-2 text-slate-400 h-5">
                  Coming soon
                </div>
              )}
            </div>
          </div>

          {team.status === 'ACTIVE' && team?.businessDetails.isHiring && (
            <div className="absolute top-2 right-0 sm:right-2 mt-1 w-min badge badge-xs bg-purple-600 whitespace-nowrap">
              Open roles
            </div>
          )}
          {team.status !== 'ACTIVE' && (
            <button className="absolute group z-0 bg-tfsdark-900/80 sm:rounded-lg top-0 left-0 w-full h-full cursor-not-allowed"></button>
          )}
        </button>
      )}
    </div>
  );
};

export default TeamCard;
