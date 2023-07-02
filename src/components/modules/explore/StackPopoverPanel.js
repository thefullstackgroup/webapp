import { useState } from 'react';
import { Popover, Transition } from '@headlessui/react';
import Icon from 'components/common/elements/Icon';

const PopoverPanel = ({ item, stacks, stack, setStack }) => {
  const [isShowing, setIsShowing] = useState(false);

  return (
    <Popover className="relative z-40 flex items-center">
      {stack && (
        <div className="mr-2 flex items-center gap-2">
          <div className="flex items-center gap-2 text-sm">
            <Icon name={stack.icon} pack={stack.pack || 'Si'} />
            <span>{stack ? stack.label : item.label}</span>
          </div>
          <button
            className="btn-sm btn-ghost btn-with-icon w-full text-xs"
            onClick={() => {
              setStack(null);
              setIsShowing(false);
            }}
          >
            <Icon name="FiX" className="h-4 w-4" />
          </button>
        </div>
      )}

      <Popover.Button
        className={
          'popover-button ' +
          (isShowing && `border-base-900 dark:border-base-200`)
        }
        onMouseEnter={() => setIsShowing(true)}
        onMouseLeave={() => setIsShowing(false)}
      >
        <Icon name="FiLayers" />
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
        <Popover.Panel className="absolute -top-52 right-16 z-50">
          <div className="popover space-y-4">
            <div className="popover-arrow left-auto top-44 -right-[13px] border-l-0 border-r"></div>

            <div>
              <h4 className="mb-2 pl-3 font-medium uppercase dark:text-base-400">
                Frontend
              </h4>
              <div className="grid w-max grid-cols-4">
                {stacks.frontend.map((item, index) => (
                  <div className="w-40" key={index}>
                    <button
                      className="popover-items"
                      onClick={() => {
                        setStack(item);
                        setIsShowing(false);
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <Icon
                          name={item.icon}
                          pack={'Si'}
                          className="h-6 w-6"
                        />
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

            <div>
              <h4 className="mb-2 pl-3 font-medium uppercase dark:text-base-400">
                Backend
              </h4>
              <div className="grid w-max grid-cols-4">
                {stacks.backend.map((item, index) => (
                  <div className="w-40" key={index}>
                    <button
                      className="popover-items"
                      onClick={() => {
                        setStack(item);
                        setIsShowing(false);
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <Icon
                          name={item.icon}
                          pack={'Si'}
                          className="h-6 w-6"
                        />
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
            <div>
              <h4 className="mb-2 pl-3 font-medium uppercase dark:text-base-400">
                Core
              </h4>
              <div className="grid w-max grid-cols-4">
                {stacks.core.map((item, index) => (
                  <div className="w-40" key={index}>
                    <button
                      className="popover-items"
                      onClick={() => {
                        setStack(item);
                        setIsShowing(false);
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <Icon
                          name={item.icon}
                          pack={item.pack || 'Si'}
                          className="h-6 w-6"
                        />
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
            <div>
              <h4 className="mb-2 pl-3 font-medium uppercase dark:text-base-400">
                Infra
              </h4>
              <div className="grid w-max grid-cols-4">
                {stacks.infra.map((item, index) => (
                  <div className="w-40" key={index}>
                    <button
                      className="popover-items"
                      onClick={() => {
                        setStack(item);
                        setIsShowing(false);
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <Icon
                          name={item.icon}
                          pack={'Si'}
                          className="h-6 w-6"
                        />
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
            <div>
              <h4 className="mb-2 pl-3 font-medium uppercase dark:text-base-400">
                Misc
              </h4>
              <div className="grid w-max grid-cols-4">
                {stacks.misc.map((item, index) => (
                  <div className="w-40" key={index}>
                    <button
                      className="popover-items"
                      onClick={() => {
                        setStack(item);
                        setIsShowing(false);
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <Icon
                          name={item.icon}
                          pack={'Si'}
                          className="h-6 w-6"
                        />
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
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default PopoverPanel;
