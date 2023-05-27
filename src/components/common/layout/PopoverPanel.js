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
          'nav-item flex items-center space-x-1 pr-3 ' +
          (isShowing && `bg-gray-200/80 dark:bg-tfsdark-800 dark:text-white`)
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
        <Popover.Panel className="absolute top-0 -left-4 z-50 ">
          <div className="relative mt-6 rounded-xl border border-gray-400 bg-white px-2 py-2 shadow-xl shadow-gray-600/20 dark:border-gray-700 dark:bg-black/95">
            <div className="absolute -top-[1px] left-[68px] h-3 w-3 -translate-x-1/2 -translate-y-1/2 rotate-45 transform border-l border-t border-gray-400 bg-white dark:border-gray-700 dark:bg-black"></div>

            <div className="flex items-start">
              <div className="w-full space-y-2">
                {childrenOne.map((item, index) => (
                  <div key={index}>
                    <Link href={item.href}>
                      <button
                        className="nav-item flex w-full items-start gap-3 space-x-1 whitespace-nowrap rounded-md px-3 py-2 text-left hover:bg-gray-200/80 focus:outline-none focus:ring-0 dark:hover:bg-tfsdark-700"
                        onClick={() => setIsShowing(false)}
                      >
                        <Icon name={item.icon} className="h-6 w-6" />
                        <div className="flex flex-col">
                          <span className="text-black dark:text-white">
                            {item.label}
                          </span>
                          <span className="font-normal text-gray-500 dark:text-gray-400">
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
                      className="nav-item flex w-full items-start gap-3 space-x-1 whitespace-nowrap rounded-md px-3 py-2 text-left hover:bg-gray-200/80 focus:outline-none focus:ring-0 dark:hover:bg-tfsdark-700"
                      onClick={() => setIsShowing(false)}
                    >
                      <Icon name={item.icon} className="h-6 w-6" />
                      <div className="flex flex-col">
                        <span className="text-black dark:text-white">
                          {item.label}
                        </span>
                        <span className="font-normal text-gray-500 dark:text-gray-400">
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
