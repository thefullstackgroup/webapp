import { useState } from 'react';
import { Popover, Transition } from '@headlessui/react';
import Icon from '../elements/Icon';
import Link from 'next/link';
import Avatar from '../elements/Avatar';

const ProfilePopoverPanel = ({ user, setShowSignOut, setShowLogin }) => {
  const [isShowing, setIsShowing] = useState(false);

  return (
    <Popover className="relative">
      {user ? (
        <Popover.Button
          className={'btn px-1'}
          onMouseEnter={() => setIsShowing(true)}
          onMouseLeave={() => setIsShowing(false)}
        >
          <Avatar
            image={user.profilePicUrl}
            name={user.displayName}
            dimensions="h-7 w-7"
          />
        </Popover.Button>
      ) : (
        <Popover.Button
          className={
            'nav-bar nav-bar-icon bg-base-200 dark:bg-base-700 ' +
            (isShowing && ` bg-base-200 dark:bg-base-700 dark:text-white`)
          }
          onMouseEnter={() => setIsShowing(true)}
          onMouseLeave={() => setIsShowing(false)}
        >
          <Icon name={'FiUser'} />
        </Popover.Button>
      )}

      <Transition
        show={isShowing}
        onMouseEnter={() => setIsShowing(true)}
        onMouseLeave={() => setIsShowing(false)}
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Popover.Panel className="absolute -top-3 -right-2 z-50 ">
          <div className="popover px-2">
            <div className="popover-arrow left-auto right-4"></div>

            <div className="flex items-start">
              {user ? (
                <div className="w-56 space-y-2">
                  <Link href={`/${user.displayName}`}>
                    <div className="nav-popover cursor-pointer items-center -space-x-1">
                      <Avatar
                        image={user.profilePicUrl}
                        name={user.displayName}
                        dimensions="h-9 w-9"
                      />
                      <div className="flex flex-col text-left">
                        <span className="text-base font-semibold">
                          {user.name}
                        </span>
                        <span className="text-xs font-normal text-base-500 dark:text-base-400">
                          @{user.displayName}
                        </span>
                      </div>
                    </div>
                  </Link>

                  <div className="flex flex-col border-b border-t border-base-200 py-2 dark:border-base-700">
                    <Link href="/account/dashboard">
                      <button
                        className="nav-popover items-center"
                        onClick={() => setIsShowing(false)}
                      >
                        <Icon name={'FiGrid'} />
                        <span className="text-black dark:text-white">
                          Dashboard
                        </span>
                      </button>
                    </Link>
                    <Link href="/account/network">
                      <button
                        className="nav-popover items-center"
                        onClick={() => setIsShowing(false)}
                      >
                        <Icon name={'FiUsers'} />
                        <span className="text-black dark:text-white">
                          My Network
                        </span>
                      </button>
                    </Link>
                    <Link href="/chat">
                      <button
                        className="nav-popover items-center"
                        onClick={() => setIsShowing(false)}
                      >
                        <Icon name={'FiMessageSquare'} />
                        <span className="text-black dark:text-white">
                          Messages
                        </span>
                      </button>
                    </Link>
                    <Link href="/account/wallet">
                      <button
                        className="nav-popover items-center"
                        onClick={() => setIsShowing(false)}
                      >
                        <Icon name={'FiCreditCard'} />
                        <span className="text-black dark:text-white">
                          Wallet
                        </span>
                      </button>
                    </Link>
                    <Link href="/account/profile/invite">
                      <button
                        className="nav-popover items-center"
                        onClick={() => setIsShowing(false)}
                      >
                        <Icon name={'FiHeart'} />
                        <span className="text-black dark:text-white">
                          Invite friends
                        </span>
                      </button>
                    </Link>
                    <Link href="/account/settings">
                      <button
                        className="nav-popover items-center"
                        onClick={() => setIsShowing(false)}
                      >
                        <Icon name={'FiSettings'} />
                        <span className="text-black dark:text-white">
                          Account settings
                        </span>
                      </button>
                    </Link>
                  </div>

                  <button
                    className="nav-popover items-center text-base-500 hover:text-base-500 focus:border-none focus:outline-none focus:ring-0 dark:text-base-300 hover:dark:text-base-300"
                    onClick={() => {
                      setShowSignOut(true);
                      setIsShowing(false);
                    }}
                  >
                    <Icon name={'FiLogOut'} className="h-6 w-6" />
                    <span className="text-base-500 hover:text-base-500 dark:text-base-300 hover:dark:text-base-300">
                      Sign out
                    </span>
                  </button>
                </div>
              ) : (
                <div className="w-64 space-y-2 px-2 py-4 text-center">
                  <div className="mx-auto h-20 w-20 rounded-full bg-base-200 p-4 dark:bg-base-700">
                    <Icon name={'FiUser'} className="h-12 w-12" />
                  </div>
                  <p className="">Sign up or login to your account.</p>
                  <div className="flex items-center justify-center space-x-2">
                    <Link href="/signup">
                      <button className="btn btn-primary btn-with-icon">
                        <span>Sign up</span>
                      </button>
                    </Link>

                    <button
                      className="btn btn-secondary btn-with-icon"
                      onClick={() => {
                        setShowLogin(true);
                        setIsShowing(false);
                      }}
                    >
                      <span>Log in</span>
                    </button>
                  </div>
                </div>
              )}

              {/* {childrenOne.map((item, index) => (
                  <div key={index}>
                    <Link href={item.href}>
                      <button
                        className="nav-popover"
                        onClick={() => setIsShowing(false)}
                      >
                        <Icon name={item.icon} className="h-6 w-6" />
                        <div className="flex flex-col">
                          <span className="text-black dark:text-white">
                            {item.label}
                          </span>
                          <span className="font-normal text-base-500 dark:text-base-300">
                            {item.desc}
                          </span>
                        </div>
                      </button>
                    </Link>
                  </div>
                ))} */}
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default ProfilePopoverPanel;
