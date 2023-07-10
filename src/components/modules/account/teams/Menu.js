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
      <div className="">
        <Link href={`/teams/${team.id}`}>
          <button className="btn btn-sm btn-with-icon btn-ghost mb-4 px-0">
            <IoArrowBack className="h-5 w-5" />
            <span>Back to team profile</span>
          </button>
        </Link>

        <div className="relative flex items-center justify-between">
          <h2>
            Manage Team{' '}
            <span className="text-lg font-normal">({team?.name})</span>
          </h2>
          {team && (
            <>
              {team?.status !== 'ACTIVE' && (
                <div className="inline-flex items-center space-x-2 text-xs text-orange-400">
                  <IoInformationCircleSharp className="hidden h-5 w-5 sm:block" />
                  <span className="hidden sm:block">
                    Your team profile is pending review
                  </span>
                  <span className="block pl-6 sm:hidden">
                    Profile awaiting review
                  </span>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {team && (
        <>
          <div className="tabs mb-4">
            <Link href={`/account/teams/profile/${team?.id}`}>
              <button
                className={
                  menuHighlight[3] === 'profile'
                    ? `tab-item tab-item-active`
                    : `tab-item`
                }
              >
                <span>Edit team profile</span>
              </button>
            </Link>

            <Link href={`/account/teams/members/${team?.id}`}>
              <button
                className={
                  menuHighlight[3] === 'members'
                    ? `tab-item tab-item-active`
                    : `tab-item`
                }
              >
                <span>Team members</span>
              </button>
            </Link>

            <Link href={`/account/teams/jobs/${team?.id}`}>
              <button
                className={
                  menuHighlight[3] === 'jobs'
                    ? `tab-item tab-item-active`
                    : `tab-item`
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
