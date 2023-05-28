import { useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/future/image';
import { getChatNotificationsTotal } from 'components/modules/chat/Notifications';
import fetcher from 'utils/fetcher';
import useSWR from 'swr';
import Footer from 'components/common/layout/Footer';
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
      <div className="no-scrollbar h-full bg-black">
        {!user?.completedOnBoarding && (
          <>
            <div className="fixed z-40 mx-auto hidden w-full max-w-screen-2xl justify-between bg-transparent px-8 py-6 md:relative lg:flex">
              <div className="flex items-center space-x-16">
                <Link href="/" passHref>
                  <div className="flex cursor-pointer items-center">
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
              <div className="flex items-center space-x-10 text-base font-normal text-base-100">
                <Link href="/#howitworks">
                  <button className="text-base-300">How it works</button>
                </Link>
                <Link href="/about/our-story">
                  <button className="text-base-300">Why this matters?</button>
                </Link>
                <Link href="/login">
                  <button className="text-base-300">Login</button>
                </Link>
                <Link href="/signup">
                  <button className="btn-primary bg-base-100 py-1.5 text-base-800">
                    Sign up
                  </button>
                </Link>
              </div>
            </div>
            <div className="absolute z-50 flex w-full justify-between bg-transparent px-4 py-4 lg:hidden">
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
                    <span className="text-lg font-semibold tracking-tight text-base-100">
                      thefullstack
                    </span>
                  </div>
                </Link>
              </div>
              <Link href="/login">
                <button className="btn-with-icon text-sm font-bold text-base-300">
                  <IoLogInOutline className="h-5 w-5" />
                  <span>Sign in</span>
                </button>
              </Link>
            </div>
          </>
        )}

        {/* Mobile Only */}
        {user?.completedOnBoarding && (
          <div className="block lg:hidden">
            <div className="fixed top-0 z-10 flex w-full items-center justify-between bg-[#070B10] px-4 py-3">
              <div className="col-span-4">
                {leftNavSection[1] === 'chat' ? (
                  <div
                    className="block lg:hidden"
                    onClick={() => router.back()}
                  >
                    <div className="flex cursor-pointer items-center">
                      <IoChevronBack className="mr-2 h-6 w-6" />
                      <span className="text-lg font-semibold tracking-tight text-base-100">
                        Chat
                      </span>
                    </div>
                  </div>
                ) : (
                  <Link href="/explore" passHref>
                    <div className="block lg:hidden">
                      <div className="flex cursor-pointer items-center">
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
              <div className="col-span-1 flex items-center justify-end space-x-4">
                <button
                  className="hover:text-white"
                  onClick={() => setShowSearchPanel(!showSearchPanel)}
                >
                  <IoSearch className="h-6 w-6" />
                </button>

                <div className="h-8 w-6">
                  <KnockNotificationsComponent userId={user.userId} />
                </div>
              </div>
            </div>
          </div>
        )}

        {user && (
          <main className="">
            <div className="hidden w-16 lg:block xl:w-52 2xl:w-56">
              <nav className="fixed top-0 z-0 min-h-screen w-16 border-r border-base-600/80 bg-black py-8 xl:w-52 2xl:w-56">
                <Link href="/explore" passHref>
                  <div className="ml-5 mb-8 flex cursor-pointer items-center xl:ml-16">
                    <span className="w-7 xl:w-16">
                      <img
                        src="/assets/icons/thefullstack-circle.webp"
                        className="object-contain"
                        alt={process.env.brandName}
                      />
                    </span>
                  </div>
                </Link>

                <div className="relative mx-auto flex-col space-y-2 text-base font-normal text-base-300/70 xl:space-y-1">
                  <Link href="/explore" passHref>
                    <button
                      className={
                        'first-step ml-2 flex items-center space-x-5 rounded-full py-3 pl-4 xl:ml-4 xl:w-44 xl:hover:bg-base-800 ' +
                        (leftNavSection[1] === 'explore'
                          ? 'text-white'
                          : 'hover:text-white')
                      }
                    >
                      <IoPlanetOutline className="h-6 w-6 -rotate-45" />
                      <span className="hidden cursor-pointer xl:block">
                        Shows
                      </span>
                    </button>
                  </Link>
                  <Link href="/hangout" passHref>
                    <button
                      className={
                        'second-step ml-2 flex items-center space-x-5 rounded-full py-3 pl-4 xl:ml-4 xl:w-44 xl:hover:bg-base-800 ' +
                        (leftNavSection[1] === 'hangout'
                          ? 'text-white'
                          : 'hover:text-white')
                      }
                    >
                      <IoFlashOutline className="h-6 w-6" />
                      <span className="hidden cursor-pointer xl:block">
                        Hangout
                      </span>
                    </button>
                  </Link>
                  <Link href="/teams" passHref>
                    <button
                      className={
                        'third-step ml-2 flex items-center space-x-5 rounded-full py-3 pl-4 xl:ml-4 xl:w-44 xl:hover:bg-base-800 ' +
                        (leftNavSection[1] === 'teams'
                          ? 'text-white'
                          : 'hover:text-white')
                      }
                    >
                      <IoPeopleOutline className="h-6 w-6" />
                      <span className="hidden cursor-pointer xl:block">
                        Teams
                      </span>
                    </button>
                  </Link>

                  <button
                    className={
                      'ml-2 flex items-center space-x-5 rounded-full py-3 pl-4 xl:ml-4 xl:w-44 xl:hover:bg-base-800 ' +
                      (leftNavSection[2] === 'saved'
                        ? 'text-white'
                        : 'hover:text-white')
                    }
                    onClick={() => setShowSearchPanel(!showSearchPanel)}
                  >
                    <IoSearch className="h-6 w-6" />
                    <span className="hidden cursor-pointer xl:block">
                      Search
                    </span>
                  </button>

                  <Link href="/account/network" passHref>
                    <button
                      className={
                        'relative ml-2 flex items-center space-x-5 rounded-full py-3 pl-4 xl:ml-4 xl:w-44 xl:hover:bg-base-800 ' +
                        (leftNavSection[2] === 'network'
                          ? 'text-white'
                          : 'hover:text-white')
                      }
                    >
                      <IoGlobeOutline className="h-6 w-6" />
                      <span className="hidden cursor-pointer xl:block">
                        Network
                      </span>

                      {network?.received_pending?.length > 0 && (
                        <div
                          className="absolute left-4 top-2 flex h-3 w-3 justify-center rounded-full bg-red-600 text-center font-semibold text-white"
                          style={{ fontSize: '11px' }}
                        ></div>
                      )}
                    </button>
                  </Link>

                  <Link href="/chat" passHref>
                    <button
                      className={
                        'relative ml-2 flex items-center space-x-5 rounded-full py-3 pl-4 xl:ml-4 xl:w-44 xl:hover:bg-base-800 ' +
                        (leftNavSection[1] === 'chat'
                          ? 'text-white'
                          : 'hover:text-white')
                      }
                    >
                      <IoChatbubbleOutline className="h-6 w-6" />
                      <span className="hidden cursor-pointer xl:block">
                        Chat
                      </span>
                      {totalChatNotifications > 0 && (
                        <div
                          className="absolute left-4 top-2 flex h-3 w-3 justify-center rounded-full bg-red-600 text-center font-semibold text-white"
                          style={{ fontSize: '11px' }}
                        ></div>
                      )}
                    </button>
                  </Link>

                  <Link href="/post" passHref>
                    <button
                      className={
                        'fourth-step ml-2 flex items-center space-x-5 rounded-full py-3 pl-4 xl:ml-4 xl:w-44 xl:hover:bg-base-800 ' +
                        (leftNavSection[2] === 'new'
                          ? 'text-white'
                          : 'hover:text-white')
                      }
                    >
                      <IoAdd className="h-6 w-6" />
                      <span className="hidden cursor-pointer xl:block">
                        Create
                      </span>
                    </button>
                  </Link>

                  <Link href={`/${user?.displayName}`} passHref>
                    <button
                      className={
                        'relative ml-2 flex items-center space-x-5 rounded-full py-3 pl-4 xl:ml-4 xl:w-44 xl:hover:bg-base-800 ' +
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
                      <span className="hidden cursor-pointer xl:block">
                        Profile
                      </span>
                    </button>
                  </Link>
                </div>
                <div className="absolute bottom-10 hidden md:block">
                  <button
                    className="relative ml-2 flex items-center space-x-3 rounded-full py-3 pl-4 text-base-400 hover:text-white xl:ml-4 xl:w-44 xl:hover:bg-base-800"
                    onClick={() => setShowMoreMenu(true)}
                  >
                    <IoMenuSharp className="h-6 w-6" />
                    <span className="hidden cursor-pointer xl:block">More</span>
                  </button>
                </div>
              </nav>
            </div>
            <div className="lg:[100vw] mt-14 w-full sm:w-[100vw] sm:px-4 lg:mt-0 xl:w-full">
              {/* Tablet and Desktop only */}
              <div className="fixed top-0 right-0 z-20 mx-auto hidden h-20 w-auto px-4 pt-4 lg:block">
                <div className="flex items-center justify-end space-x-10">
                  <Link href="/account/wallet" passHref>
                    <button className="w-6 text-white">
                      <IoWalletOutline className="h-7 w-7" />
                    </button>
                  </Link>
                  <div className="h-7 w-8">
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
        <div className="fixed inset-0 z-50 h-screen overflow-hidden">
          <div className="flex min-h-screen px-4 pt-4 pb-20 text-right sm:block sm:p-0">
            <div
              className="absolute inset-0"
              onClick={() => setShowSearchPanel(!showSearchPanel)}
            ></div>

            <span className="hidden sm:inline-block sm:h-screen sm:align-middle">
              &#8203;
            </span>

            <div className="absolute top-0 left-0 z-50 min-h-screen w-full sm:align-bottom md:w-72">
              <div className="h-screen border-l border-r border-base-600/50 bg-base-700 shadow-xl sm:max-w-xl">
                <div className="rounded-lg">
                  <button
                    className="z-50 h-10 w-10 pt-2"
                    onClick={() => setShowSearchPanel(false)}
                  >
                    <IoClose className="h-8 w-8 lg:h-6 lg:w-6" />
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
        <div className="fixed inset-0 z-50 h-screen overflow-hidden">
          <div className="flex min-h-screen px-4 pt-4 pb-20 text-right sm:block sm:p-0">
            <div
              className="absolute inset-0"
              onClick={() => setShowMoreMenu(!showMoreMenu)}
            ></div>

            <span className="hidden sm:inline-block sm:h-screen sm:align-middle">
              &#8203;
            </span>

            <div className="absolute bottom-24 left-4 z-50 mt-24 w-full sm:align-bottom md:mt-16 md:w-48">
              <div className="rounded-md border border-base-600 bg-base-700 shadow-xl sm:max-w-xl">
                <div className="rounded-lg bg-base-700">
                  <ul className="flex flex-col divide-y-2 divide-base-700/50 text-left text-sm text-base-400">
                    <li className="px-2 py-2 pr-2 hover:text-white">
                      <Link href="/account/dashboard">
                        <button className="flex w-full items-center space-x-2">
                          <IoApps className="h-5 w-5" />
                          <a>Dashboard</a>
                        </button>
                      </Link>
                    </li>

                    <li className="px-2 py-2 pr-2 hover:text-white">
                      <Link href="/account/settings">
                        <button className="flex w-full items-center space-x-2">
                          <IoSettingsOutline className="h-5 w-5" />
                          <a>Account Settings</a>
                        </button>
                      </Link>
                    </li>

                    <li className="px-2 py-2 pr-2 hover:text-white">
                      <Link href="/account/profile/invite">
                        <button className="flex w-full items-center space-x-2">
                          <IoHeartOutline className="h-5 w-5" />
                          <a>Invite friends</a>
                        </button>
                      </Link>
                    </li>

                    <li className="px-2 py-2 pr-2 hover:text-white">
                      <button
                        className="flex w-full items-center space-x-2"
                        onClick={() => {
                          setShowMoreMenu(!showMoreMenu);
                          setShowCodePolicy(true);
                        }}
                      >
                        <IoHappyOutline className="h-5 w-5" />
                        <a>Code of Conduct</a>
                      </button>
                    </li>

                    <li className="px-2 py-2 pr-2 hover:text-white">
                      <button
                        className="flex w-full items-center space-x-2"
                        onClick={() => {
                          setShowMoreMenu(!showMoreMenu);
                          setShowPrivacyPolicy(true);
                        }}
                      >
                        <IoLockClosedOutline className="h-5 w-5" />
                        <a>Privacy Policy</a>
                      </button>
                    </li>

                    <li className="px-2 py-2 pr-2 hover:text-white">
                      <button
                        className="flex w-full items-center space-x-2"
                        onClick={() => {
                          setShowMoreMenu(!showMoreMenu);
                          setShowCookiePolicy(true);
                        }}
                      >
                        <BiCookie className="h-5 w-5" />
                        <a>Cookie Policy</a>
                      </button>
                    </li>

                    <li className="px-2 py-2 pr-2 hover:text-white">
                      <Link href="/account/settings/signout">
                        <button className="flex w-full items-center space-x-2">
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
            className="z-50 flex w-full justify-end text-white"
            onClick={() => setShowCodePolicy(!showCodePolicy)}
          >
            <IoCloseOutline className="h-8 w-8" />
          </button>
          <div className="h-[80vh] w-full overflow-y-scroll overscroll-contain">
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
            className="z-50 flex w-full justify-end text-white"
            onClick={() => setShowPrivacyPolicy(!showPrivacyPolicy)}
          >
            <IoCloseOutline className="h-8 w-8" />
          </button>
          <div className="h-[80vh] w-full overflow-y-scroll overscroll-contain">
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
            className="z-50 flex w-full justify-end text-white"
            onClick={() => setShowCookiePolicy(!showCookiePolicy)}
          >
            <IoCloseOutline className="h-8 w-8" />
          </button>
          <div className="h-[80vh] w-full overflow-y-scroll overscroll-contain">
            <CookiePolicy />
          </div>
        </div>
      </ModalDialog>
    </>
  );
};

export default LayoutLoggedIn;
