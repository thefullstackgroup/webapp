import useSWR from "swr";
import Image from "next/future/image";
import TechBadge from "components/common/tags/TagStack";
import Avatar from "components/common/elements/Avatar";
import fetcher from "utils/fetcher";
import { useRouter } from "next/router";

const TeamCard = ({ team }) => {
  const router = useRouter();
  const url = `${process.env.BASEURL}/api/profile/getUser?userId=${team.ownerId}`;
  const { data: teamOwner } = useSWR(url, fetcher);

  const jobsUrl = `${process.env.BASEURL}/api/jobs/getByTeam?teamId=${team.id}`;
  const { data: teamJobs } = useSWR(jobsUrl, fetcher);

  const handleGoToTeam = (active, teamId) => {
    if (active === "ACTIVE") {
      router.push(`/teams/${teamId}`);
    } else {
      return false;
    }
  };

  return (
    <div className="relative w-full px-4 sm:px-0">
      <button
        className={
          "group relative flex h-full w-full flex-col items-start rounded-lg border border-base-200 bg-base-50 p-2 text-left duration-300 hover:border-base-600 dark:border-base-700 dark:bg-base-900 sm:p-4 sm:dark:hover:border-base-200 " +
          (team.status === "ACTIVE" ? "cursor-pointer" : "cursor-not-allowed")
        }
        onClick={() => handleGoToTeam(team.status, team.id)}
      >
        <div className="w-full space-y-6">
          <div className="flex w-full space-x-4">
            <div>
              <div className="relative h-14 w-20 overflow-hidden rounded-lg sm:h-20 sm:w-20">
                {team.image && (
                  <Image
                    src={team.image}
                    className="h-full w-full object-cover"
                    alt={team.name || ""}
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
            <div className="w-full">
              <div className="flex w-full items-start justify-between">
                <div className="text-xl font-semibold sm:text-2xl">
                  {team.name}
                </div>
                {team.status !== "ACTIVE" ? (
                  <div className="badge badge-xs">Coming soon</div>
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

              <p className="text-base-600 dark:text-base-400">
                {team.description}
              </p>
              <div className="no-scrollbar flex flex-wrap items-center gap-1 overflow-x-scroll py-2 text-xs">
                {team.businessDetails?.location?.map((place, index) => (
                  <div className="badge badge-xs" key={index}>
                    {place}
                  </div>
                ))}
              </div>
              {teamOwner && (
                <div className="my-1 flex items-center space-x-2 text-sm font-medium text-base-400">
                  {teamOwner}
                  <Avatar
                    image={teamOwner?.profilePicUrl}
                    dimensions="h-6 w-6"
                  />

                  <p className="text-base-200">
                    {teamOwner?.name}{" "}
                    {team?.membersIds.length > 0 && (
                      <span className="font-normal text-base-400">
                        and {team?.membersIds.length} other{" "}
                        {team?.membersIds.length == 1
                          ? "teammate"
                          : "teammates"}
                      </span>
                    )}
                  </p>
                </div>
              )}
              <div className="no-scrollbar flex flex-wrap items-center overflow-x-scroll py-2">
                {team.techStack?.map((stack, index) => (
                  <TechBadge tech={stack} key={index} size={"xs"} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
};

export default TeamCard;
