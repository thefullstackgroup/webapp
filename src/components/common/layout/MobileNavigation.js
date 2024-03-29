import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { getChatNotificationsTotal } from 'components/modules/chat/Notifications';
import MobileProfileMenu from 'components/common/layout/MobileProfileMenu';
import {
  IoChatbubbleOutline,
  IoFlash,
  IoFlashOutline,
  IoPeople,
  IoPeopleOutline,
  IoPlanetOutline,
  IoPlanetSharp,
} from 'react-icons/io5';
import Avatar from 'components/common/elements/Avatar';

const MobileNavigation = ({ user }) => {
  const router = useRouter();
  const navSection = router.route.split('/');
  const [isProfileTabOpen, setIsProfileTabOpen] = useState(false);
  const totalChatNotifications = getChatNotificationsTotal(user?.userId);

  return (
    <>
      {isProfileTabOpen && (
        <MobileProfileMenu
          isProfileTabOpen={isProfileTabOpen}
          setIsProfileTabOpen={setIsProfileTabOpen}
          user={user}
        />
      )}

      <div className="fixed bottom-0 z-40 w-full bg-base-900">
        <div className="flex w-full justify-evenly bg-base-900 pt-2.5 pb-3 lg:hidden">
          <Link href="/explore" passHref>
            <button
              className={
                'flex w-20 items-center justify-center p-2 outline-none focus:outline-none ' +
                (navSection[1] === 'explore' ? 'text-white' : 'text-base-400')
              }
            >
              <div className="flex flex-col justify-center space-y-1 text-center">
                {navSection[1] === 'explore' ? (
                  <IoPlanetSharp className="block h-6 w-auto -rotate-45" />
                ) : (
                  <IoPlanetOutline className="block h-6 w-auto -rotate-45" />
                )}
              </div>
            </button>
          </Link>

          <Link href="/hangout" passHref>
            <button
              className={
                'flex w-20 items-center justify-center p-2 outline-none focus:outline-none ' +
                (navSection[1] === 'hangout' ? 'text-white' : 'text-base-400')
              }
            >
              <div className="flex flex-col justify-center space-y-1 text-center">
                {navSection[1] === 'hangout' ? (
                  <IoFlash className="block h-6 w-auto" />
                ) : (
                  <IoFlashOutline className="block h-6 w-auto" />
                )}
              </div>
            </button>
          </Link>

          <Link href="/teams" passHref>
            <button
              className={
                'flex w-20 items-center justify-center p-2 outline-none focus:outline-none ' +
                (navSection[1] === 'teams' ? 'text-white' : 'text-base-400')
              }
            >
              <div className="flex flex-col justify-center space-y-1 text-center">
                {navSection[1] === 'teams' ? (
                  <IoPeople className="block h-6 w-auto" />
                ) : (
                  <IoPeopleOutline className="block h-6 w-auto" />
                )}
              </div>
            </button>
          </Link>

          <Link href="/chat" passHref>
            <button
              className={
                'flex w-20 items-center justify-center p-2 outline-none focus:outline-none ' +
                (navSection[1] === 'chat' ? 'text-white' : 'text-base-400')
              }
            >
              <div className="relative flex flex-col justify-center space-y-1 text-center">
                {navSection[1] === 'chat' ? (
                  <IoChatbubbleOutline className="block h-6 w-auto" />
                ) : (
                  <IoChatbubbleOutline className="block h-6 w-auto" />
                )}
                {totalChatNotifications > 0 && (
                  <div
                    className="absolute left-5 -top-1.5 flex h-5 w-5 justify-center rounded-full bg-purple-500 text-center font-semibold text-white"
                    style={{ fontSize: '11px' }}
                  >
                    <div className="mt-0.5 w-3">{totalChatNotifications}</div>
                  </div>
                )}
              </div>
            </button>
          </Link>

          <button
            className={
              'flex w-20 items-center justify-center p-2 outline-none focus:outline-none ' +
              (navSection[1] === 'account' ? 'text-white' : 'text-base-400')
            }
            onClick={() => setIsProfileTabOpen(!isProfileTabOpen)}
          >
            <div className="flex flex-col justify-center space-y-1 text-center">
              <Avatar
                image={user?.profilePicUrl}
                name={user?.displayName}
                dimensions="w-6 h-6"
              />
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default MobileNavigation;
