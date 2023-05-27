import { useState } from 'react';
import { Popover, Transition } from '@headlessui/react';
import Icon from 'components/common/elements/Icon';

const FilterPopoverPanel = ({ filters, filter, setFilter }) => {
  const [isShowing, setIsShowing] = useState(false);

  return (
    <Popover className="relative z-40">
      <Popover.Button
        className={
          'flex min-w-min resize-none items-center space-x-2 rounded-lg border border-gray-300/50 bg-transparent py-1.5 px-3 text-sm text-gray-600 placeholder-gray-300 ring-0 hover:border-gray-600 focus:border-gray-600 focus:outline-none focus:ring-0 dark:border-gray-700 dark:text-gray-200 dark:hover:border-gray-200 dark:focus:border-gray-300 ' +
          (isShowing && `border-gray-600 dark:border-gray-200`)
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
        <Popover.Panel className="absolute top-0 left-2 z-50">
          <div className="relative mt-3 rounded-xl border border-gray-400 bg-white px-2 py-2 shadow-xl shadow-gray-600/20 dark:border-gray-600 dark:bg-black/95">
            <div className="absolute -top-[1px] left-[50px] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 transform border-l border-t border-gray-400 bg-white dark:border-gray-600 dark:bg-black"></div>

            <div className="no-scrollbar flex max-h-96 w-44 flex-col overflow-y-scroll overscroll-contain">
              {filters.map((item, index) => (
                <div className="w-44" key={index}>
                  <button
                    className="nav-item group w-full whitespace-nowrap rounded-md px-3 py-2 hover:bg-gray-200/80 dark:hover:bg-tfsdark-700"
                    onClick={() => {
                      setFilter(item);
                      setIsShowing(false);
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <span className="text-black dark:text-white">
                          {item.label}
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

export default FilterPopoverPanel;
