import { Dialog, Transition, Disclosure } from '@headlessui/react';
import { useRef, useState } from 'react';
import Link from 'next/link';
import Icon from '../elements/Icon';
import { navigation } from './constants';

const Drawer = ({ show, setShow }) => {
  const [activeDisclosurePanel, setActiveDisclosurePanel] = useState(null);
  const cancelButtonRef = useRef(null);

  const togglePanels = (newPanel) => {
    if (activeDisclosurePanel) {
      if (
        activeDisclosurePanel.key !== newPanel.key &&
        activeDisclosurePanel.open
      ) {
        activeDisclosurePanel.close();
      }
    }

    setActiveDisclosurePanel({
      ...newPanel,
      open: !newPanel.open,
    });
  };

  return (
    <Transition.Root show={show}>
      <Dialog
        as="div"
        className="relative z-50"
        initialFocus={cancelButtonRef}
        onClose={setShow}
      >
        <Transition.Child
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-800/50 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 flex justify-center">
          <div className="flex w-full items-end justify-center text-center sm:items-center sm:p-0">
            <Transition.Child
              enter="ease-out duration-200"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="ease-in duration-200"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
              className={` fixed left-0 top-0 h-screen w-[85vw] bg-white md:w-[40vw]`}
            >
              <Dialog.Panel
                className={`relative h-full w-full overflow-hidden border-l bg-white text-left shadow-xl dark:border-base-600 dark:bg-base-900`}
              >
                <div className="flex min-h-screen flex-col justify-between overflow-scroll">
                  <div className="flex justify-end px-4 pt-4">
                    <button onClick={() => setShow(false)} aria-label="Close">
                      <Icon name={'FiX'} className="h-6 w-6 text-gray-600" />
                    </button>
                  </div>
                  <div className="space-y-4 border-b px-4 py-4">
                    <div className="flex flex-col space-y-3 ">
                      {navigation.map((item, index) => (
                        <Disclosure key={index}>
                          {(panel) => {
                            const { open, close } = panel;
                            return (
                              <>
                                <Disclosure.Button
                                  className="flex items-center justify-between text-left text-lg font-medium uppercase focus:outline-none"
                                  onClick={() => {
                                    if (!open) {
                                      close();
                                    }
                                    togglePanels({ ...panel, key: index });
                                  }}
                                >
                                  <span>{item.label}</span>
                                  <Icon
                                    name="FiChevronDown"
                                    className={
                                      'h-5 w-5 text-gray-800 ' +
                                      (open
                                        ? 'rotate-180 transform duration-200'
                                        : '')
                                    }
                                  />
                                </Disclosure.Button>
                                {/* <Transition
                                  enter="transition duration-300 ease-out"
                                  enterFrom="opacity-0"
                                  enterTo="opacity-100"
                                >
                                  <Disclosure.Panel className="text-gray-500">
                                    <ul className="mb-2 ml-2 space-y-3">
                                      {item.childrenOne.map(
                                        (navItem, index) => (
                                          <li key={index}>
                                            <Link
                                              href={navItem.href}
                                              className="flex items-center justify-between text-lg text-gray-600"
                                            >
                                              {navItem.label}
                                            </Link>
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  </Disclosure.Panel>
                                </Transition> */}
                              </>
                            );
                          }}
                        </Disclosure>
                      ))}
                      <Link
                        href="/for/developers"
                        className="text-left text-lg font-medium uppercase"
                      >
                        Developers
                      </Link>
                      <Link
                        href="/teams"
                        className="text-left text-lg font-medium uppercase"
                      >
                        Teams
                      </Link>
                    </div>

                    <div className="flex flex-col space-y-4 border-b px-4 py-6">
                      <Link
                        href="#"
                        className="text-left text-lg font-medium uppercase"
                      >
                        Find our clinic
                      </Link>
                      <Link
                        href="#"
                        className="text-left text-lg font-medium uppercase"
                      >
                        Pricing
                      </Link>
                    </div>
                  </div>
                  <div className="px-4 py-6">
                    <p className="text-xs text-gray-500">
                      &copy; {new Date().getFullYear()} Valterous Limited. All
                      Rights Reserved.
                    </p>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Drawer;
