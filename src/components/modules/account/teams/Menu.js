import ModalDialog from 'components/common/modals/ModalDialog';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { IoArrowBack, IoInformationCircleSharp } from 'react-icons/io5';
import TeamProfile from 'components/modules/teams/TeamProfile';

const Menu = ({ user, team }) => {
  const router = useRouter();
  const menuHighlight = router.route.split('/');
  const [viewTeamProfile, setViewTeamProfile] = useState(false);

  return (
    <>
      <div className="mx-4 space-y-6 md:mx-0">
        <Link href={`/teams/${team.id}`}>
          <div className="mb-4 flex cursor-pointer items-center space-x-2 px-4 md:px-0">
            <IoArrowBack className="h-5 w-5" />
            <h2 className="text-sm font-bold">Back to team profile</h2>
          </div>
        </Link>
        <div className="flex justify-between">
          <div className="relative flex w-min items-center space-x-4 whitespace-nowrap">
            <h2 className="text-3xl font-bold tracking-tight sm:text-3xl">
              {team?.name || 'Teams'}
            </h2>
            {team && (
              <>
                {team?.status === 'ACTIVE' ? (
                  <div className="flex items-center space-x-1 text-sm text-green-500 sm:text-base">
                    <IoInformationCircleSharp className="hidden h-5 w-5 sm:block" />
                    <h2 className="hidden text-xs sm:block">
                      Your team profile is live
                    </h2>
                    <h2 className="block pl-6 sm:hidden">Profile is live</h2>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 text-xs text-orange-400">
                    <IoInformationCircleSharp className="hidden h-5 w-5 sm:block" />
                    <h2 className="hidden sm:block">
                      Your team profile is pending review
                    </h2>
                    <h2 className="block pl-6 sm:hidden">
                      Profile awaiting review
                    </h2>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      {team && (
        <>
          <div className="my-4 flex items-center space-x-2">
            <Link href={`/account/teams/profile/${team?.id}`}>
              <button
                className={
                  menuHighlight[3] === 'profile'
                    ? `btn-pill-active`
                    : `btn-pill`
                }
              >
                <span>Edit team profile</span>
              </button>
            </Link>

            <Link href={`/account/teams/members/${team?.id}`}>
              <button
                className={
                  menuHighlight[3] === 'members'
                    ? `btn-pill-active`
                    : `btn-pill`
                }
              >
                <span>Team members</span>
              </button>
            </Link>

            <Link href={`/account/teams/jobs/${team?.id}`}>
              <button
                className={
                  menuHighlight[3] === 'jobs' ? `btn-pill-active` : `btn-pill`
                }
              >
                <span>Post open role</span>
              </button>
            </Link>
          </div>
        </>
      )}

      <ModalDialog
        show={viewTeamProfile}
        setShow={setViewTeamProfile}
        title={`${team?.name} team profile`}
        dimensions={'max-w-screen-2xl'}
      >
        <div className="no-scrollbar h-[90vh] overflow-y-scroll overscroll-contain">
          <TeamProfile user={user} slug={team?.id} />
        </div>
      </ModalDialog>
    </>
  );
};

export default Menu;
