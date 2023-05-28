import { useState } from 'react';
import { Popover, Transition } from '@headlessui/react';
import Icon from '../elements/Icon';
import Link from 'next/link';

const PopoverPanel = ({ item, childrenOne, childrenTwo }) => {
  const [isShowing, setIsShowing] = useState(false);

  return (
    <Popover className="relative">
      <Popover.Button
        className={
          'nav-bar flex items-center space-x-1 pr-3 ' +
          (isShowing && ` bg-base-200 dark:bg-base-700/80 dark:text-white`)
        }
        onMouseEnter={() => setIsShowing(true)}
        onMouseLeave={() => setIsShowing(false)}
      >
        <span>{item.label}</span>
        <Icon
          name={'FiChevronDown'}
          className={
            `h-4 w-4 ` + (isShowing && `rotate-180 transform duration-200`)
          }
        />
      </Popover.Button>

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
        <Popover.Panel className="absolute -top-3 -left-4 z-50 ">
          <div className="popover">
            <div className="popover-arrow"></div>

            <div className="flex items-start">
              <div className="w-full space-y-2">
                {childrenOne.map((item, index) => (
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
                ))}
              </div>

              <div className="space-y-2">
                {childrenTwo.map((item, index) => (
                  <Link href={item.href} key={index}>
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
                ))}
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default PopoverPanel;
