import { useState } from 'react';
import { Popover, Transition } from '@headlessui/react';
import Icon from 'components/common/elements/Icon';

const PopoverPanel = ({ item, stacks, stack, setStack }) => {
  const [isShowing, setIsShowing] = useState(false);

  return (
    <Popover className="relative z-40">
      <Popover.Button
        className={
          'popover-button ' +
          (isShowing && `border-base-900 dark:border-base-200`)
        }
        onMouseEnter={() => setIsShowing(true)}
        onMouseLeave={() => setIsShowing(false)}
      >
        <Icon name={item.icon} className="h-4 w-4" />
        <span>{stack ? stack.label : item.label}</span>

        {stack ? (
          <button
            className="btn-sm btn-ghost btn-with-icon w-full text-xs"
            onClick={() => {
              setStack(null);
              setIsShowing(false);
            }}
          >
            <Icon name="FiX" className="h-4 w-4" />
          </button>
        ) : (
          <Icon
            name={'FiChevronDown'}
            className={
              `h-4 w-4 ` + (isShowing && `rotate-180 transform duration-200`)
            }
          />
        )}
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
        <Popover.Panel className="absolute -top-3 -right-2 z-50">
          <div className="popover">
            <div className="popover-arrow left-auto right-14"></div>

            <div className="grid w-max grid-cols-3">
              {stacks.map((item, index) => (
                <div className="w-40" key={index}>
                  <button
                    className="popover-items"
                    onClick={() => {
                      setStack(item);
                      setIsShowing(false);
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <Icon name={item.icon} pack={'Si'} className="h-6 w-6" />
                      <div className="flex flex-col">
                        <span className="text-black dark:text-white">
                          {item.label}
                        </span>
                        <span className="font-normal text-gray-500 dark:text-gray-400">
                          {item.desc}
                        </span>
                      </div>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default PopoverPanel;
