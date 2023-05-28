import ModalDialog from 'components/common/modals/ModalDialog';
import Image from 'next/future/image';
import Link from 'next/link';
import { useState } from 'react';
import { IoSettingsOutline } from 'react-icons/io5';
import useSWR from 'swr';
import Menu from 'components/modules/account/teams/Menu';
import CreateTeam from 'components/modules/teams/CreateTeam';
import fetcher from 'utils/fetcher';

const Page = ({ user }) => {
  const [createTeamPanel, setCreateTeamPanel] = useState(false);

  const teamsURL = `${process.env.BASEURL}/api/teams/getTeamsByUser?userId=${user?.userId}`;
  const { data: teamsData } = useSWR(teamsURL, fetcher);
  const teams = teamsData ? teamsData.data : [];

  return (
    <>
      <div className="mt-0 flex w-full justify-center lg:mt-12">
        <div className="w-full px-0 md:ml-6 lg:ml-20 lg:max-w-full xl:ml-52 xl:px-4 2xl:ml-56 2xl:px-0">
          <div className="relative mx-auto max-w-4xl">
            <div className="mx-4 mb-20 space-y-4 md:mx-0">
              <Menu user={user} />
              <div className="space-y-4 pt-2">
                {teamsData && !teams.length > 0 && (
                  <div className="w-full rounded-lg bg-base-700 px-4 py-4 sm:px-6">
                    <div className="space-y-16 py-10 text-center">
                      <div className="space-y-6">
                        <div className="mx-auto w-2/3 font-medium">
                          You are not associated with any team.
                        </div>
                        <button
                          className="btn-primary"
                          onClick={() => setCreateTeamPanel(true)}
                        >
                          Create a Team Profile
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {teams.map(
                  (team) =>
                    team.ownerId === user.userId && (
                      <Link
                        href={`/account/teams/profile/${team.id}`}
                        key={team.id}
                      >
                        <button className="flex w-full items-center justify-between rounded-md bg-base-600/50 px-3 py-4 text-left duration-300 hover:bg-base-600/80">
                          <div className="flex items-center space-x-4">
                            <div className="h-16 w-16 overflow-hidden rounded-lg">
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
                            </div>
                            <div>
                              <div className="text-xl font-semibold">
                                {team.name}
                              </div>
                              <div className="text-base-400">
                                {team.description}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-10">
                            <span className="text-sm italic text-base-400">
                              You are the owner
                            </span>
                            <button className="btn-ghost btn-with-icon text-sm">
                              <IoSettingsOutline className="h-5 w-5" />
                              <span>Manage team</span>
                            </button>
                          </div>
                        </button>
                      </Link>
                    )
                )}

                {teams.map(
                  (team) =>
                    team.ownerId !== user.userId && (
                      <Link href={`/teams/${team.id}`} key={team.id}>
                        <button className="flex w-full items-center justify-between rounded-md bg-base-600/50 px-3 py-4 text-left duration-300 hover:bg-base-600/80">
                          <div className="flex items-center space-x-4">
                            <div className="h-16 w-16 overflow-hidden rounded-lg">
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
                            </div>
                            <div>
                              <div className="text-xl font-semibold">
                                {team.name}
                              </div>
                              <div className="text-base-400">
                                {team.description}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-10 pr-4">
                            <span className="text-sm italic text-base-400">
                              You are a member
                            </span>
                          </div>
                        </button>
                      </Link>
                    )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ModalDialog
        show={createTeamPanel}
        setShow={setCreateTeamPanel}
        title="Let's setup your team"
        dimensions={'max-w-lg'}
        disabled
      >
        <CreateTeam
          user={user}
          setCreateTeamPanel={setCreateTeamPanel}
          teams={teams}
        />
      </ModalDialog>
    </>
  );
};

export default Page;
