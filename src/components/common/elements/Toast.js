import { Transition } from "@headlessui/react";
import { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";

const Toast = ({ message, show, setShow }) => {
  const [isShowing, setIsShowing] = useState(false);

  useEffect(() => {
    if (show) {
      setIsShowing(true);
    }

    const display = setInterval(() => {
      setIsShowing(false);
      setShow(false);
    }, 1500);
    return () => clearInterval(display);
  }, [show, setShow]);

  return (
    <Transition
      show={isShowing}
      enter="transform ease-out duration-150 transition delay-75"
      enterFrom="opacity-0 translate-y-2"
      enterTo="translate-y-0 opacity-100 sm:translate-x-0"
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      className="fixed inset-1 z-50 h-2"
    >
      <div className="pointer-events-none fixed inset-0 z-50 flex h-screen items-start sm:p-4">
        <div
          className="flex w-full flex-col items-center space-y-4 sm:items-end"
          onClick={() => setIsShowing(true)}
        >
          <div className="pointer-events-auto mt-6 w-full max-w-xs overflow-hidden rounded-lg border border-green-500 bg-base-50 shadow-lg dark:bg-base-900">
            <div className="p-4">
              <div className="flex items-center">
                <div className="flex w-0 flex-1 justify-between">
                  <p className="w-0 flex-1 text-sm font-medium text-green-500 dark:text-green-400">
                    {message}
                  </p>
                </div>
                <div className="ml-4 flex flex-shrink-0">
                  <button
                    type="button"
                    className="inline-flex rounded-md text-green-400 hover:text-green-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <span className="sr-only">Close</span>
                    <IoCloseSharp className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
};

export default Toast;
