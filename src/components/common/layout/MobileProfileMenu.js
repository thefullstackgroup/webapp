import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuthUser } from 'next-firebase-auth';
import Avatar from 'components/common/elements/Avatar';
import { BsChevronRight } from 'react-icons/bs';
import { HiOutlineX } from 'react-icons/hi';

const MobileProfileMenu = ({ user, setIsProfileTabOpen, isProfileTabOpen }) => {
  const AuthUser = useAuthUser();
  const router = useRouter();

  const handleLogout = async () => {
    AuthUser.signOut();
    router.push('/');
  };

  return (
    <>
      {isProfileTabOpen && (
        <div className="fixed top-0 left-0 z-50 w-full transform shadow-xl">
          <div className="bg-dovegray-900 relative h-screen max-w-full">
            <div className="flex w-full items-center justify-between border-b border-gray-800 p-4">
              <div>
                <a
                  href={`/${user.displayName}`}
                  className="flex items-center space-x-2 text-gray-300"
                >
                  <Avatar
                    image={user?.profilePicUrl}
                    name={user?.displayName}
                    dimensions="w-10 h-10"
                  />
                  <div>
                    <span className="block text-xl font-bold">{user.name}</span>
                    <span className="block text-xs">{user.currentTitle}</span>
                  </div>
                </a>
              </div>
              <button
                type="button"
                className="flex text-gray-400 outline-none focus:outline-none"
                onClick={() => setIsProfileTabOpen(!isProfileTabOpen)}
              >
                <HiOutlineX className="h-6 w-auto" />
              </button>
            </div>

            <div className="mx-auto max-w-7xl space-y-4 divide-y divide-gray-800">
              <div className="px-4 pt-4">
                <div>
                  <Link href={`/${user.displayName}`} passHref>
                    <a
                      href="#"
                      className="flex items-center space-x-4 text-gray-300"
                    >
                      <h4 className="min-w-0 flex-1 truncate text-xl">
                        View Profile
                      </h4>
                      <div className="block flex-shrink-0">
                        <BsChevronRight className="h-5 w-auto" />
                      </div>
                    </a>
                  </Link>
                </div>
              </div>
              <div className="px-4 pt-4">
                <div>
                  <Link href="/account/dashboard" passHref>
                    <a
                      href="#"
                      className="flex items-center space-x-4 text-gray-300"
                    >
                      <h4 className="min-w-0 flex-1 truncate text-xl">
                        Dashboard
                      </h4>
                      <div className="block flex-shrink-0">
                        <BsChevronRight className="h-5 w-auto" />
                      </div>
                    </a>
                  </Link>
                </div>
              </div>
              <div className="px-4 pt-4">
                <div>
                  <Link href="/account/network" passHref>
                    <a
                      href="#"
                      className="flex items-center space-x-4 text-gray-300"
                    >
                      <h4 className="min-w-0 flex-1 truncate text-xl">
                        Network
                      </h4>
                      <div className="block flex-shrink-0">
                        <BsChevronRight className="h-5 w-auto" />
                      </div>
                    </a>
                  </Link>
                </div>
              </div>
              <div className="px-4 pt-4">
                <div>
                  <Link href="/account/wallet" passHref>
                    <a
                      href="#"
                      className="flex items-center space-x-4 text-gray-300"
                    >
                      <h4 className="min-w-0 flex-1 truncate text-xl">
                        Wallet
                      </h4>
                      <div className="block flex-shrink-0">
                        <BsChevronRight className="h-5 w-auto" />
                      </div>
                    </a>
                  </Link>
                </div>
              </div>

              <div className="px-4 pt-4">
                <div>
                  <Link href="/account/profile/invite" passHref>
                    <a
                      href="#"
                      className="flex items-center space-x-1 text-gray-300"
                    >
                      <h4 className="min-w-0 flex-1 truncate text-xl">
                        Invite Friends
                      </h4>
                      <div className="block flex-shrink-0">
                        <BsChevronRight className="h-5 w-auto" />
                      </div>
                    </a>
                  </Link>
                </div>
              </div>
              <div className="px-4 pt-4">
                <div>
                  <Link href="/account/settings" passHref>
                    <a
                      href="#"
                      className="flex items-center space-x-4 text-gray-300"
                    >
                      <h4 className="min-w-0 flex-1 truncate text-xl">
                        Account Settings
                      </h4>
                      <div className="block flex-shrink-0">
                        <BsChevronRight className="h-5 w-auto" />
                      </div>
                    </a>
                  </Link>
                </div>
              </div>
              <div className="px-4 pt-4">
                <div>
                  <a
                    className="flex cursor-pointer items-center space-x-4 text-gray-400"
                    onClick={() => handleLogout()}
                  >
                    <h4 className="min-w-0 flex-1 truncate text-xl">
                      Sign Out
                    </h4>
                    <div className="block flex-shrink-0">
                      <BsChevronRight className="h-5 w-auto" />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileProfileMenu;
