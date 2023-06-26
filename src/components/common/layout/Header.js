import Image from 'next/image';
import Link from 'next/link';
import Mode from 'components/common/buttons/Mode';
import dynamic from 'next/dynamic';
import PopoverPanel from 'components/common/layout/PopoverPanel';
import Icon from '../elements/Icon';
import { useTheme } from 'next-themes';
import { navigation } from './constants';
import { useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';
import ProfilePopoverPanel from './ProfilePopoverPanel';
const KnockNotificationsComponent = dynamic(() =>
  import('components/modules/account/settings/NotificationsPanel')
);

const Header = ({ user, headerFixed = false, setShowCreatePost }) => {
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    if (typeof window !== 'undefined') {
      if (window.scrollY > lastScrollY) {
        if (window.scrollY > 100) {
          setShowHeader(false);
        }
      } else {
        setShowHeader(true);
      }

      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (!headerFixed) {
      if (typeof window !== 'undefined') {
        window.addEventListener('scroll', controlNavbar);

        return () => {
          window.removeEventListener('scroll', controlNavbar);
        };
      }
    }
  }, [lastScrollY]);

  return (
    <>
      <Transition
        show={showHeader}
        enter="transition duration-200 ease-out"
        enterFrom="-translate-y-40 opacity-0"
        enterTo="translate-y-0 opacity-100"
        leave="transition duration-200 ease-in"
        leaveFrom="translate-y-0 opacity-100"
        leaveTo="-translate-y-40 opacity-0"
        className={'sticky top-0 z-50 w-full'}
      >
        <header className="dark:bg-base/90 z-50 border-b border-base-200 bg-white/90 backdrop-blur-sm dark:border-base-700/50 dark:bg-base-900">
          <div className="mx-auto flex max-w-screen-2xl items-center justify-between px-4 py-3">
            <div className="flex w-5/12 items-center space-x-4 text-base">
              <ul className="flex items-center justify-center">
                {navigation.map((item, index) => (
                  <li key={index}>
                    {item.children ? (
                      <PopoverPanel
                        item={item}
                        childrenOne={item.childrenOne}
                        childrenTwo={item.childrenTwo}
                      />
                    ) : (
                      <Link href={item.href} passHref>
                        <a href="#" className="nav-bar">
                          <span>{item.label}</span>
                        </a>
                      </Link>
                    )}
                  </li>
                ))}
                {user ? (
                  <li>
                    <button
                      className="nav-bar flex items-center"
                      onClick={() => setShowCreatePost(true)}
                    >
                      <span>Share</span>
                    </button>
                  </li>
                ) : (
                  <li>
                    <Link href="/signup" passHref>
                      <a href="#" className="nav-bar flex items-center">
                        <span>Share</span>
                      </a>
                    </Link>
                  </li>
                )}
              </ul>
            </div>

            <div className="w-2/12">
              <Link href="/">
                <div className="mx-auto h-10 w-10 cursor-pointer overflow-hidden rounded-lg">
                  <Image
                    src={
                      currentTheme === 'dark'
                        ? '/assets/icons/thefullstack-dark.webp'
                        : '/assets/icons/thefullstack-light.webp'
                    }
                    className="object-contain"
                    alt="The Full Stack"
                    width={200}
                    height={200}
                  />
                </div>
              </Link>
            </div>

            <div className="flex w-5/12 items-center justify-end space-x-3">
              <a
                href="https://github.com/thefullstackgroup/thefullstack"
                className="nav-bar flex items-center space-x-2 bg-base-200 text-sm dark:bg-base-700/50"
              >
                <Icon name={'FiStar'} className="h-3 w-3" />
                <span>Star us on GitHub</span>
              </a>

              <button className="nav-bar nav-bar-icon">
                <Icon name={'FiSearch'} />
              </button>

              {user ? (
                <div className="w-8">
                  <KnockNotificationsComponent userId={user?.userId} />
                </div>
              ) : (
                <button className="nav-bar nav-bar-icon">
                  <Icon name={'FiBell'} />
                </button>
              )}

              <Mode />

              <ProfilePopoverPanel user={user} />
            </div>
          </div>
        </header>
      </Transition>
    </>
  );
};

export default Header;
