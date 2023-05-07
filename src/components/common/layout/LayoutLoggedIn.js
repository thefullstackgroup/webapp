import { useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/future/image';
import { getChatNotificationsTotal } from 'components/modules/chat/Notifications';
import fetcher from 'utils/fetcher';
import useSWR from 'swr';
import Footer from 'components/common/layout/LayoutFooter';
import { BiCookie } from 'react-icons/bi';
import {
  IoAdd,
  IoApps,
  IoChatbubbleOutline,
  IoChevronBack,
  IoClose,
  IoCloseOutline,
  IoFlashOutline,
  IoGlobeOutline,
  IoHappyOutline,
  IoHeartOutline,
  IoLockClosedOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoMenuSharp,
  IoPeopleOutline,
  IoPlanetOutline,
  IoSearch,
  IoSettingsOutline,
  IoWalletOutline,
} from 'react-icons/io5';

const ModalDialog = dynamic(() =>
  import('components/common/modals/ModalDialog')
);
const Avatar = dynamic(() => import('components/common/elements/Avatar'));
const MobileNavigation = dynamic(() =>
  import('components/common/layout/MobileNavigation')
);
const CodeOfConduct = dynamic(() =>
  import('components/modules/static/policies/CodeOfConduct')
);
const PrivacyPolicy = dynamic(() =>
  import('components/modules/static/policies/PrivacyPolicy')
);
const CookiePolicy = dynamic(() =>
  import('components/modules/static/policies/CookiePolicy')
);

const SearchUsersInput = dynamic(() =>
  import('components/common/elements/SearchUsersInput')
);
const KnockNotificationsComponent = dynamic(() =>
  import('components/modules/account/settings/NotificationsPanel')
);

const LayoutLoggedIn = ({ user, hideMobileNav = false, children }) => {
  const router = useRouter();
  const leftNavSection = router.route.split('/');
  const [showSearchPanel, setShowSearchPanel] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showCodePolicy, setShowCodePolicy] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showCookiePolicy, setShowCookiePolicy] = useState(false);
  const totalChatNotifications = getChatNotificationsTotal(user?.userId);
  const connectionsURL = `${process.env.BASEURL}/api/connections/get?userId=${user?.userId}`;
  const { data: network } = useSWR(connectionsURL, fetcher);

  return (
    <>
      <div className="h-full bg-tfsdark-900 no-scrollbar">
        {!user?.completedOnBoarding && (
          <>
            <div className="z-40 w-full max-w-screen-2xl mx-auto hidden lg:flex fixed md:relative px-8 py-6 justify-between bg-transparent">
              <div className="flex items-center space-x-16">
                <Link href="/" passHref>
                  <div className="flex items-center cursor-pointer">
                    <span className="w-12">
                      <Image
                        src="/assets/thefullstack-icon.webp"
                        className="object-contain"
                        alt="The Full Stack"
                        width={200}
                        height={200}
                      />
                    </span>
                  </div>
                </Link>
              </div>
              <div className="flex items-center space-x-10 text-slate-100 text-base font-normal">
                <Link href="/#howitworks">
                  <button className="text-slate-300">How it works</button>
                </Link>
                <Link href="/about/our-story">
                  <button className="text-slate-300">Why this matters?</button>
                </Link>
                <Link href="/login">
                  <button className="text-slate-300">Login</button>
                </Link>
                <Link href="/signup">
                  <button className="btn-primary py-1.5 bg-slate-100 text-tfsdark-800">
                    Sign up
                  </button>
                </Link>
              </div>
            </div>
            <div className="lg:hidden px-4 py-4 absolute flex justify-between z-50 bg-transparent w-full">
              <div className="">
                <Link href="/" passHref>
                  <div className="flex items-center justify-center">
                    <span className="w-10">
                      <img
                        src="/assets/thefullstack-icon.webp"
                        className="object-contain"
                        alt={process.env.brandName}
                      />
                    </span>
                    <span className="text-slate-100 text-lg tracking-tight font-semibold">
                      thefullstack
                    </span>
                  </div>
                </Link>
              </div>
              <Link href="/login">
                <button className="btn-with-icon text-slate-300 font-bold text-sm">
                  <IoLogInOutline className="w-5 h-5" />
                  <span>Sign in</span>
                </button>
              </Link>
            </div>
          </>
        )}

        {/* Mobile Only */}
        {user?.completedOnBoarding && (
          <div className="block lg:hidden">
            <div className="flex justify-between items-center px-4 py-3 fixed top-0 z-10 w-full bg-[#070B10]">
              <div className="col-span-4">
                {leftNavSection[1] === 'chat' ? (
                  <div
                    className="block lg:hidden"
                    onClick={() => router.back()}
                  >
                    <div className="flex items-center cursor-pointer">
                      <IoChevronBack className="h-6 w-6 mr-2" />
                      <span className="text-slate-100 text-lg tracking-tight font-semibold">
                        Chat
                      </span>
                    </div>
                  </div>
                ) : (
                  <Link href="/explore" passHref>
                    <div className="block lg:hidden">
                      <div className="flex items-center cursor-pointer">
                        <span className="w-9">
                          <img
                            src="/assets/icons/thefullstack.webp"
                            className="object-contain"
                            alt={process.env.brandName}
                          />
                        </span>
                      </div>
                    </div>
                  </Link>
                )}
              </div>
              <div className="flex space-x-4 items-center justify-end col-span-1">
                <button
                  className="hover:text-white"
                  onClick={() => setShowSearchPanel(!showSearchPanel)}
                >
                  <IoSearch className="w-6 h-6" />
                </button>

                <div className="w-6 h-8">
                  <KnockNotificationsComponent userId={user.userId} />
                </div>
              </div>
            </div>
          </div>
        )}

        {user && (
          <main className="">
            <div className="hidden lg:block w-16 xl:w-52 2xl:w-56">
              <nav className="fixed z-0 top-0 w-16 xl:w-52 2xl:w-56 min-h-screen py-8 bg-black border-r border-tfsdark-600/80">
                <Link href="/explore" passHref>
                  <div className="flex items-center cursor-pointer ml-5 xl:ml-16 mb-8">
                    <span className="w-7 xl:w-16">
                      <img
                        src="/assets/icons/thefullstack-circle.webp"
                        className="object-contain"
                        alt={process.env.brandName}
                      />
                    </span>
                  </div>
                </Link>

                <div className="text-base font-normal relative flex-col space-y-2 xl:space-y-1 text-slate-300/70 mx-auto">
                  <Link href="/explore" passHref>
                    <button
                      className={
                        'first-step xl:w-44 ml-2 xl:ml-4 pl-4 py-3 flex items-center space-x-5 xl:hover:bg-tfsdark-800 rounded-full ' +
                        (leftNavSection[1] === 'explore'
                          ? 'text-white'
                          : 'hover:text-white')
                      }
                    >
                      <IoPlanetOutline className="w-6 h-6 -rotate-45" />
                      <span className="cursor-pointer hidden xl:block">
                        Shows
                      </span>
                    </button>
                  </Link>
                  <Link href="/hangout" passHref>
                    <button
                      className={
                        'second-step xl:w-44 ml-2 xl:ml-4 pl-4 py-3 flex items-center space-x-5 xl:hover:bg-tfsdark-800 rounded-full ' +
                        (leftNavSection[1] === 'hangout'
                          ? 'text-white'
                          : 'hover:text-white')
                      }
                    >
                      <IoFlashOutline className="w-6 h-6" />
                      <span className="cursor-pointer hidden xl:block">
                        Hangout
                      </span>
                    </button>
                  </Link>
                  <Link href="/teams" passHref>
                    <button
                      className={
                        'third-step xl:w-44 ml-2 xl:ml-4 pl-4 py-3 flex items-center space-x-5 xl:hover:bg-tfsdark-800 rounded-full ' +
                        (leftNavSection[1] === 'teams'
                          ? 'text-white'
                          : 'hover:text-white')
                      }
                    >
                      <IoPeopleOutline className="w-6 h-6" />
                      <span className="cursor-pointer hidden xl:block">
                        Teams
                      </span>
                    </button>
                  </Link>

                  <button
                    className={
                      'xl:w-44 ml-2 xl:ml-4 pl-4 py-3 flex items-center space-x-5 xl:hover:bg-tfsdark-800 rounded-full ' +
                      (leftNavSection[2] === 'saved'
                        ? 'text-white'
                        : 'hover:text-white')
                    }
                    onClick={() => setShowSearchPanel(!showSearchPanel)}
                  >
                    <IoSearch className="w-6 h-6" />
                    <span className="cursor-pointer hidden xl:block">
                      Search
                    </span>
                  </button>

                  <Link href="/account/network" passHref>
                    <button
                      className={
                        'relative xl:w-44 ml-2 xl:ml-4 pl-4 py-3 flex items-center space-x-5 xl:hover:bg-tfsdark-800 rounded-full ' +
                        (leftNavSection[2] === 'network'
                          ? 'text-white'
                          : 'hover:text-white')
                      }
                    >
                      <IoGlobeOutline className="w-6 h-6" />
                      <span className="cursor-pointer hidden xl:block">
                        Network
                      </span>

                      {network?.received_pending?.length > 0 && (
                        <div
                          className="absolute flex justify-center left-4 top-2 w-3 h-3 text-center rounded-full bg-red-600 font-semibold text-white"
                          style={{ fontSize: '11px' }}
                        ></div>
                      )}
                    </button>
                  </Link>

                  <Link href="/chat" passHref>
                    <button
                      className={
                        'relative xl:w-44 ml-2 xl:ml-4 pl-4 py-3 flex items-center space-x-5 xl:hover:bg-tfsdark-800 rounded-full ' +
                        (leftNavSection[1] === 'chat'
                          ? 'text-white'
                          : 'hover:text-white')
                      }
                    >
                      <IoChatbubbleOutline className="w-6 h-6" />
                      <span className="cursor-pointer hidden xl:block">
                        Chat
                      </span>
                      {totalChatNotifications > 0 && (
                        <div
                          className="absolute flex justify-center left-4 top-2 w-3 h-3 text-center rounded-full bg-red-600 font-semibold text-white"
                          style={{ fontSize: '11px' }}
                        ></div>
                      )}
                    </button>
                  </Link>

                  <Link href="/post" passHref>
                    <button
                      className={
                        'fourth-step xl:w-44 ml-2 xl:ml-4 pl-4 py-3 flex items-center space-x-5 xl:hover:bg-tfsdark-800 rounded-full ' +
                        (leftNavSection[2] === 'new'
                          ? 'text-white'
                          : 'hover:text-white')
                      }
                    >
                      <IoAdd className="w-6 h-6" />
                      <span className="cursor-pointer hidden xl:block">
                        Create
                      </span>
                    </button>
                  </Link>

                  <Link href={`/${user?.displayName}`} passHref>
                    <button
                      className={
                        'relative xl:w-44 ml-2 xl:ml-4 pl-4 py-3 flex items-center space-x-5 xl:hover:bg-tfsdark-800 rounded-full ' +
                        (router.query.userId === user?.displayName
                          ? 'text-white'
                          : 'hover:text-white')
                      }
                    >
                      <Avatar
                        image={user?.profilePicUrl}
                        name={user?.displayName}
                        href={`/${user?.displayName}`}
                        dimensions={'w-7 h-7'}
                      />
                      <span className="cursor-pointer hidden xl:block">
                        Profile
                      </span>
                    </button>
                  </Link>
                </div>
                <div className="hidden md:block absolute bottom-10">
                  <button
                    className="relative xl:w-44 ml-2 xl:ml-4 pl-4 py-3 flex items-center space-x-3 xl:hover:bg-tfsdark-800 rounded-full text-slate-400 hover:text-white"
                    onClick={() => setShowMoreMenu(true)}
                  >
                    <IoMenuSharp className="w-6 h-6" />
                    <span className="cursor-pointer hidden xl:block">More</span>
                  </button>
                </div>
              </nav>
            </div>
            <div className="mt-14 lg:mt-0 sm:px-4 w-full sm:w-[100vw] lg:[100vw] xl:w-full bg-tfsdark-800/50">
              {/* Tablet and Desktop only */}
              <div className="hidden lg:block fixed z-20 w-auto h-20 top-0 right-0 mx-auto pt-4 px-4">
                <div className="flex items-center justify-end space-x-10">
                  <Link href="/account/wallet" passHref>
                    <button className="w-6 text-white">
                      <IoWalletOutline className="w-7 h-7" />
                    </button>
                  </Link>
                  <div className="w-8 h-7">
                    <KnockNotificationsComponent userId={user.userId} />
                  </div>
                </div>
              </div>
              {/* End Tablet and Desktop only */}

              {children}
            </div>
          </main>
        )}

        {!user && children}

        {!user && <Footer />}

        {/* Mobile Only */}
        {user && !hideMobileNav && (
          <div className="block lg:hidden">
            <MobileNavigation user={user} />
          </div>
        )}
      </div>

      {showSearchPanel && (
        <div className="fixed inset-0 z-50 overflow-hidden h-screen">
          <div className="flex min-h-screen pt-4 px-4 pb-20 text-right sm:block sm:p-0">
            <div
              className="absolute inset-0"
              onClick={() => setShowSearchPanel(!showSearchPanel)}
            ></div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
              &#8203;
            </span>

            <div className="absolute z-50 top-0 left-0 sm:align-bottom w-full md:w-72 min-h-screen">
              <div className="bg-tfsdark-700 shadow-xl sm:max-w-xl border-l border-r border-tfsdark-600/50 h-screen">
                <div className="rounded-lg">
                  <button
                    className="pt-2 z-50 w-10 h-10"
                    onClick={() => setShowSearchPanel(false)}
                  >
                    <IoClose className="w-8 h-8 lg:w-6 lg:h-6" />
                  </button>
                  <div className="lg:py-2">
                    <SearchUsersInput />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showMoreMenu && (
        <div className="fixed inset-0 z-50 overflow-hidden h-screen">
          <div className="flex min-h-screen pt-4 px-4 pb-20 text-right sm:block sm:p-0">
            <div
              className="absolute inset-0"
              onClick={() => setShowMoreMenu(!showMoreMenu)}
            ></div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
              &#8203;
            </span>

            <div className="absolute z-50 bottom-24 left-4 sm:align-bottom w-full md:w-48 mt-24 md:mt-16">
              <div className="bg-tfsdark-700 rounded-md shadow-xl sm:max-w-xl border-tfsdark-600 border">
                <div className="rounded-lg bg-tfsdark-700">
                  <ul className="flex flex-col text-sm text-left text-slate-400 divide-y-2 divide-tfsdark-700/50">
                    <li className="pr-2 hover:text-white px-2 py-2">
                      <Link href="/account/dashboard">
                        <button className="flex items-center space-x-2 w-full">
                          <IoApps className="h-5 w-5" />
                          <a>Dashboard</a>
                        </button>
                      </Link>
                    </li>

                    <li className="pr-2 hover:text-white px-2 py-2">
                      <Link href="/account/settings">
                        <button className="flex items-center space-x-2 w-full">
                          <IoSettingsOutline className="h-5 w-5" />
                          <a>Account Settings</a>
                        </button>
                      </Link>
                    </li>

                    <li className="pr-2 hover:text-white px-2 py-2">
                      <Link href="/account/profile/invite">
                        <button className="flex items-center space-x-2 w-full">
                          <IoHeartOutline className="h-5 w-5" />
                          <a>Invite friends</a>
                        </button>
                      </Link>
                    </li>

                    <li className="pr-2 hover:text-white px-2 py-2">
                      <button
                        className="flex items-center space-x-2 w-full"
                        onClick={() => {
                          setShowMoreMenu(!showMoreMenu);
                          setShowCodePolicy(true);
                        }}
                      >
                        <IoHappyOutline className="h-5 w-5" />
                        <a>Code of Conduct</a>
                      </button>
                    </li>

                    <li className="pr-2 hover:text-white px-2 py-2">
                      <button
                        className="flex items-center space-x-2 w-full"
                        onClick={() => {
                          setShowMoreMenu(!showMoreMenu);
                          setShowPrivacyPolicy(true);
                        }}
                      >
                        <IoLockClosedOutline className="h-5 w-5" />
                        <a>Privacy Policy</a>
                      </button>
                    </li>

                    <li className="pr-2 hover:text-white px-2 py-2">
                      <button
                        className="flex items-center space-x-2 w-full"
                        onClick={() => {
                          setShowMoreMenu(!showMoreMenu);
                          setShowCookiePolicy(true);
                        }}
                      >
                        <BiCookie className="h-5 w-5" />
                        <a>Cookie Policy</a>
                      </button>
                    </li>

                    <li className="pr-2 hover:text-white px-2 py-2">
                      <Link href="/account/settings/signout">
                        <button className="flex items-center space-x-2 w-full">
                          <IoLogOutOutline className="h-5 w-5" />
                          <a>Log out</a>
                        </button>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <ModalDialog
        show={showCodePolicy}
        setShow={setShowCodePolicy}
        title="Code of Conduct"
        dimensions="max-w-5xl"
      >
        <div className="pt-2">
          <button
            className="z-50 w-full text-white flex justify-end"
            onClick={() => setShowCodePolicy(!showCodePolicy)}
          >
            <IoCloseOutline className="h-8 w-8" />
          </button>
          <div className="w-full overflow-y-scroll h-[80vh] overscroll-contain">
            <CodeOfConduct />
          </div>
        </div>
      </ModalDialog>

      <ModalDialog
        show={showPrivacyPolicy}
        setShow={setShowPrivacyPolicy}
        title="Privacy Policy"
        dimensions="max-w-5xl"
      >
        <div className="pt-2">
          <button
            className="z-50 w-full text-white flex justify-end"
            onClick={() => setShowPrivacyPolicy(!showPrivacyPolicy)}
          >
            <IoCloseOutline className="h-8 w-8" />
          </button>
          <div className="w-full overflow-y-scroll h-[80vh] overscroll-contain">
            <PrivacyPolicy />
          </div>
        </div>
      </ModalDialog>

      <ModalDialog
        show={showCookiePolicy}
        setShow={setShowCookiePolicy}
        title="Cookie Policy"
        dimensions="max-w-5xl"
      >
        <div className="pt-2">
          <button
            className="z-50 w-full text-white flex justify-end"
            onClick={() => setShowCookiePolicy(!showCookiePolicy)}
          >
            <IoCloseOutline className="h-8 w-8" />
          </button>
          <div className="w-full overflow-y-scroll h-[80vh] overscroll-contain">
            <CookiePolicy />
          </div>
        </div>
      </ModalDialog>
    </>
  );
};

export default LayoutLoggedIn;
