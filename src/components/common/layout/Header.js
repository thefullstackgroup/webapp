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
import { useRouter } from 'next/router';
import ToolTip from '../elements/ToolTip';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
const KnockNotificationsComponent = dynamic(() =>
  import('components/modules/account/settings/NotificationsPanel')
);

const Header = ({
  user,
  headerAutoHide = false,
  setShowDrawer,
  setShowCreatePost,
  setShowSignOut,
  setShowLogin,
}) => {
  const router = useRouter();
  const q = router.query.q !== '' ? router.query.q : '';
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [term, setTerm] = useState(q || '');
  const [query, setQuery] = useState(q || '');

  const handleSearch = (term) => {
    setQuery(term);
    router.replace(`/search?q=${term}`);
  };

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
    if (headerAutoHide) {
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
      <div className="sticky top-0 z-50 h-14 border-b border-base-200 bg-white px-4 dark:border-base-800 dark:bg-base-900 lg:hidden">
        <div className="flex h-14 items-center py-2">
          <div className="w-1/5">
            <button
              className="flex justify-start text-base-900 outline-none focus:bg-transparent focus:outline-none dark:text-gray-100"
              onClick={() => setShowDrawer(true)}
              aria-label="Open menu"
            >
              <HiOutlineMenuAlt2 className="h-7 w-7" />
            </button>
          </div>

          <div className="flex w-3/5 justify-center">
            <Link href="/">
              <div className="h-8 w-8 cursor-pointer overflow-hidden rounded-lg">
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
          <div className="flex w-1/5 justify-end">
            {user ? (
              <div className="w-8">
                <KnockNotificationsComponent userId={user?.userId} />
              </div>
            ) : (
              <button
                className="btn btn-ghost px-0 text-base-700 dark:text-base-200"
                onClick={() => setShowLogin(true)}
              >
                <Icon name={'FiUser'} className="h-6 w-6" />
              </button>
            )}
          </div>
        </div>
      </div>

      <Transition
        show={showHeader}
        enter="transition duration-200 ease-out"
        enterFrom="-translate-y-40 opacity-0"
        enterTo="translate-y-0 opacity-100"
        leave="transition duration-200 ease-in"
        leaveFrom="translate-y-0 opacity-100"
        leaveTo="-translate-y-40 opacity-0"
        className={'sticky top-0 z-50 hidden w-full lg:block'}
      >
        <header className="dark:bg-base/90 z-50 border-b border-base-200 bg-white/90 backdrop-blur dark:border-base-700/50 dark:bg-base-900">
          <div className="mx-auto flex max-w-full items-center justify-between px-8 py-3">
            <div className="flex w-6/12 items-center space-x-4 text-base 2xl:space-x-6">
              <Link href="/">
                <div className="h-8 w-8 cursor-pointer overflow-hidden rounded-lg">
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
                        <a href="#" className="nav-bar relative">
                          <span>{item.label}</span>
                        </a>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div
                href="#"
                className="nav-bar ml-6 hidden w-64 items-center space-x-2 bg-base-200/50 font-sans text-base-300 hover:text-base-500 dark:bg-base-700/50 dark:text-base-500 2xl:flex 2xl:w-[400px]"
              >
                <Icon name="FiSearch" className="h-4 w-4 hover:text-base-300" />
                <input
                  type="text"
                  name="q"
                  placeholder="Search showcase..."
                  className="text-input m-0 border-0 bg-transparent px-0 py-0 text-base font-normal"
                  value={term || ''}
                  onChange={(e) => setTerm(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch(term);
                    }
                  }}
                />
              </div>
            </div>

            <div className="flex w-6/12 items-center justify-end space-x-4">
              {user ? (
                <button
                  className="btn btn-primary rounded-full font-medium"
                  onClick={() => setShowCreatePost(true)}
                >
                  Share project
                </button>
              ) : (
                <Link href="/signup" passHref>
                  <a
                    href="#"
                    className="btn btn-primary rounded-full px-5 font-medium"
                  >
                    Share project
                  </a>
                </Link>
              )}
              <a
                href="https://github.com/thefullstackgroup/thefullstack"
                target="_blank"
                className="nav-bar nav-bar-icon group relative"
                rel="noreferrer"
              >
                <ToolTip message="Star us on GitHub" position={'bottom'} />
                <Icon name="FaGithub" pack="Fa" className={'h-6 w-6'} />
              </a>

              {user ? (
                <div className="w-8">
                  <KnockNotificationsComponent userId={user?.userId} />
                </div>
              ) : (
                <button className="nav-bar nav-bar-icon">
                  <Icon name={'FiBell'} className={'h-6 w-6'} />
                </button>
              )}

              <Mode />

              <ProfilePopoverPanel
                user={user}
                setShowSignOut={setShowSignOut}
                setShowLogin={setShowLogin}
              />
            </div>
          </div>
        </header>
      </Transition>
    </>
  );
};

export default Header;
