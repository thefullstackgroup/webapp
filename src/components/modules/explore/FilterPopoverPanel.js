import { useState } from 'react';
import { Popover, Transition } from '@headlessui/react';
import Icon from 'components/common/elements/Icon';

const FilterPopoverPanel = ({ filters, filter, setFilter }) => {
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
        {filter.type === 'sort' && (
          <Icon name={'FiFilter'} className="h-4 w-4" />
        )}
        {filter.type === 'range' && (
          <Icon name={'FiClock'} className="h-4 w-4" />
        )}

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
