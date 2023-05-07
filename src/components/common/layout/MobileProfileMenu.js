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
        <div className="fixed top-0 z-50 transform shadow-xl left-0 w-full">
          <div className="relative max-w-full bg-dovegray-900 h-screen">
            <div className="flex w-full border-b p-4 border-gray-800 justify-between items-center">
              <div>
                <a
                  href={`/${user.displayName}`}
                  className="flex space-x-2 items-center text-gray-300"
                >
                  <Avatar
                    image={user?.profilePicUrl}
                    name={user?.displayName}
                    dimensions="w-10 h-10"
                  />
                  <div>
                    <span className="text-xl font-bold block">{user.name}</span>
                    <span className="block text-xs">{user.currentTitle}</span>
                  </div>
                </a>
              </div>
              <button
                type="button"
                className="outline-none flex text-gray-400 focus:outline-none"
                onClick={() => setIsProfileTabOpen(!isProfileTabOpen)}
              >
                <HiOutlineX className="h-6 w-auto" />
              </button>
            </div>

            <div className="max-w-7xl mx-auto space-y-4 divide-y divide-gray-800">
              <div className="pt-4 px-4">
                <div>
                  <Link href={`/${user.displayName}`} passHref>
                    <a
                      href="#"
                      className="flex items-center text-gray-300 space-x-4"
                    >
                      <h4 className="min-w-0 flex-1 text-xl truncate">
                        View Profile
                      </h4>
                      <div className="block flex-shrink-0">
                        <BsChevronRight className="h-5 w-auto" />
                      </div>
                    </a>
                  </Link>
                </div>
              </div>
              <div className="pt-4 px-4">
                <div>
                  <Link href="/account/dashboard" passHref>
                    <a
                      href="#"
                      className="flex items-center text-gray-300 space-x-4"
                    >
                      <h4 className="min-w-0 flex-1 text-xl truncate">
                        Dashboard
                      </h4>
                      <div className="block flex-shrink-0">
                        <BsChevronRight className="h-5 w-auto" />
                      </div>
                    </a>
                  </Link>
                </div>
              </div>
              <div className="pt-4 px-4">
                <div>
                  <Link href="/account/network" passHref>
                    <a
                      href="#"
                      className="flex items-center text-gray-300 space-x-4"
                    >
                      <h4 className="min-w-0 flex-1 text-xl truncate">
                        Network
                      </h4>
                      <div className="block flex-shrink-0">
                        <BsChevronRight className="h-5 w-auto" />
                      </div>
                    </a>
                  </Link>
                </div>
              </div>
              <div className="pt-4 px-4">
                <div>
                  <Link href="/account/wallet" passHref>
                    <a
                      href="#"
                      className="flex items-center text-gray-300 space-x-4"
                    >
                      <h4 className="min-w-0 flex-1 text-xl truncate">
                        Wallet
                      </h4>
                      <div className="block flex-shrink-0">
                        <BsChevronRight className="h-5 w-auto" />
                      </div>
                    </a>
                  </Link>
                </div>
              </div>

              <div className="pt-4 px-4">
                <div>
                  <Link href="/account/profile/invite" passHref>
                    <a
                      href="#"
                      className="flex items-center text-gray-300 space-x-1"
                    >
                      <h4 className="min-w-0 flex-1 text-xl truncate">
                        Invite Friends
                      </h4>
                      <div className="block flex-shrink-0">
                        <BsChevronRight className="h-5 w-auto" />
                      </div>
                    </a>
                  </Link>
                </div>
              </div>
              <div className="pt-4 px-4">
                <div>
                  <Link href="/account/settings" passHref>
                    <a
                      href="#"
                      className="flex items-center text-gray-300 space-x-4"
                    >
                      <h4 className="min-w-0 flex-1 text-xl truncate">
                        Account Settings
                      </h4>
                      <div className="block flex-shrink-0">
                        <BsChevronRight className="h-5 w-auto" />
                      </div>
                    </a>
                  </Link>
                </div>
              </div>
              <div className="pt-4 px-4">
                <div>
                  <a
                    className="cursor-pointer flex items-center text-gray-400 space-x-4"
                    onClick={() => handleLogout()}
                  >
                    <h4 className="min-w-0 flex-1 text-xl truncate">
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
