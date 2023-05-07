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
      <div className="mx-4 md:mx-0 space-y-6">
        <Link href={`/account/settings`}>
          <div className="flex items-center space-x-2 px-4 md:px-0 mb-4 cursor-pointer">
            <IoArrowBack className="h-5 w-5" />
            <h2 className="font-bold text-sm">Back to account settings</h2>
          </div>
        </Link>
        <div className="flex justify-between">
          <div className="flex items-center space-x-4 relative w-min whitespace-nowrap">
            <h2 className="text-3xl sm:text-3xl font-bold tracking-tight">
              {team?.name || 'Teams'}
            </h2>
            {team && (
              <>
                {team?.status === 'ACTIVE' ? (
                  <div className="flex items-center space-x-1 text-green-500 text-sm sm:text-base">
                    <IoInformationCircleSharp className="hidden sm:block w-5 h-5" />
                    <h2 className="hidden sm:block text-xs">
                      Your team profile is live
                    </h2>
                    <h2 className="block sm:hidden pl-6">Profile is live</h2>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 text-orange-400 text-xs">
                    <IoInformationCircleSharp className="hidden sm:block w-5 h-5" />
                    <h2 className="hidden sm:block">
                      Your team profile is pending review
                    </h2>
                    <h2 className="block sm:hidden pl-6">
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
          <div className="my-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Link href={`/account/teams/profile/${team?.id}`}>
                <button
                  className={
                    `text-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-md whitespace-nowrap font-medium ` +
                    (menuHighlight[3] === 'profile'
                      ? `bg-tfsdark-600/70 text-white`
                      : `bg-tfsdark-700/70 text-slate-400 hover:text-white`)
                  }
                >
                  <span>Edit team profile</span>
                </button>
              </Link>

              <Link href={`/account/teams/members/${team?.id}`}>
                <button
                  className={
                    `text-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-md whitespace-nowrap font-medium ` +
                    (menuHighlight[3] === 'members'
                      ? `bg-tfsdark-600/70 text-white`
                      : `bg-tfsdark-700/70 text-slate-400 hover:text-white`)
                  }
                >
                  <span>Team members</span>
                </button>
              </Link>

              <Link href={`/account/teams/jobs/${team?.id}`}>
                <button
                  className={
                    `text-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-md whitespace-nowrap font-medium ` +
                    (menuHighlight[3] === 'jobs'
                      ? `bg-tfsdark-600/70 text-white`
                      : `bg-tfsdark-700/70 text-slate-400 hover:text-white`)
                  }
                >
                  <span>Post a job</span>
                </button>
              </Link>
            </div>
            <div>
              <button
                className="btn-ghost text-sm bg-tfsdark-700 px-4"
                onClick={() => setViewTeamProfile(true)}
              >
                <span>View Profile</span>
              </button>
            </div>
          </div>
        </>
      )}

      <ModalDialog
        show={viewTeamProfile}
        setShow={setViewTeamProfile}
        title={`${team?.name} team profile`}
        dimensions={'max-w-screen-2xl'}
      >
        <div className="overflow-y-scroll h-[90vh] overscroll-contain no-scrollbar">
          <TeamProfile user={user} slug={team?.id} />
        </div>
      </ModalDialog>
    </>
  );
};

export default Menu;
