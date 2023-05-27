import Image from 'next/image';
import Link from 'next/link';
import Mode from 'components/common/buttons/Mode';
import PopoverPanel from 'components/common/layout/PopoverPanel';
import Icon from '../elements/Icon';
import { useTheme } from 'next-themes';
import { navigation } from './constants';
import { useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';

const Header = () => {
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
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);

      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
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
        <header className="z-50 border-b border-gray-200 bg-white/90 backdrop-blur-sm dark:border-gray-800 dark:bg-black/90">
          <div className="mx-auto flex max-w-screen-2xl items-center justify-between px-4 py-3">
            <div className="flex items-center space-x-8 text-base">
              <Link href="/">
                <div className="h-8 w-8 cursor-pointer overflow-hidden rounded-lg">
                  <Image
                    src={
                      currentTheme === 'dark'
                        ? '/assets/icons/thefullstack-dark-square.webp'
                        : '/assets/icons/thefullstack-light-square.webp'
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
                        <a href="#" className="nav-item">
                          <span>{item.label}</span>
                        </a>
                      </Link>
                    )}
                  </li>
                ))}
                <li>
                  <Link href="" passHref>
                    <a
                      href="#"
                      className="nav-item flex items-center space-x-2 "
                    >
                      <span>Create Project</span>
                      {/* <Icon name={'FiPlus'} className="h-4 w-4" /> */}
                    </a>
                  </Link>
                </li>
              </ul>
            </div>

            <ul className="flex items-center space-x-4">
              <li>
                <Link href="" passHref>
                  <a
                    href="#"
                    className="nav-item flex items-center space-x-2 bg-gray-200/50 dark:bg-tfsdark-700"
                  >
                    <Icon name={'FiStar'} className="h-3 w-3" />
                    <span>Star us on GitHub</span>
                  </a>
                </Link>
              </li>
              <li>
                <button className="nav-item nav-item-icon">
                  <Icon name={'FiSearch'} />
                </button>
              </li>
              <li>
                <button className="nav-item nav-item-icon">
                  <Icon name={'FiBell'} />
                </button>
              </li>
              <li>
                <Mode />
              </li>
              <li>
                <button className="nav-item nav-item-icon bg-gray-200/50 dark:bg-tfsdark-600">
                  <Icon name={'FiUser'} />
                </button>
              </li>
            </ul>
          </div>
        </header>
      </Transition>
    </>
  );
};

export default Header;
