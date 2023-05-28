import { useState } from 'react';
import { Popover, Transition } from '@headlessui/react';
import Icon from 'components/common/elements/Icon';

const FilterPopoverPanel = ({ filters, filter, setFilter }) => {
  const [isShowing, setIsShowing] = useState(false);

  return (
    <Popover className="relative z-40">
      <Popover.Button
        className={
          'flex min-w-min resize-none items-center space-x-2 rounded-lg border border-base-300/50 bg-transparent py-1.5 px-3 text-sm text-base-600 placeholder-base-300 ring-0 hover:border-base-600 focus:border-base-600 focus:outline-none focus:ring-0 dark:border-base-500 dark:text-base-100 dark:hover:border-base-200 dark:focus:border-base-300 ' +
          (isShowing && `border-base-900 dark:border-base-200`)
        }
        onMouseEnter={() => setIsShowing(true)}
        onMouseLeave={() => setIsShowing(false)}
      >
        <span>{filter ? filter.label : filters[0].label}</span>
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
        <Popover.Panel className="absolute -top-3 z-50">
          <div className="popover">
            <div className="popover-arrow"></div>

            <div className="no-scrollbar flex max-h-96 w-44 flex-col overflow-y-scroll overscroll-contain">
              {filters.map((item, index) => (
                <div className="w-44" key={index}>
                  <button
                    className="popover-items"
                    onClick={() => {
                      setFilter(item);
                      setIsShowing(false);
                    }}
                  >
                    <span className="text-black dark:text-white">
                      {item.label}
                    </span>
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

export default FilterPopoverPanel;
