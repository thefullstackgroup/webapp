import { Dialog, Transition } from '@headlessui/react';
import { useRef } from 'react';
import Icon from '../elements/Icon';

const ModalDialog = ({
  children,
  show,
  setShow,
  title,
  dimensions,
  disabled = false,
}) => {
  const cancelButtonRef = useRef(null);
  let modalSize = 'sm:max-w-xl';
  if (dimensions) modalSize = dimensions;

  return (
    <Transition.Root show={show}>
      <Dialog
        as="div"
        className="relative z-50"
        initialFocus={cancelButtonRef}
        onClose={setShow}
      >
        <Transition.Child
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-base-400/50 dark:bg-base-900/90" />
        </Transition.Child>

        <div className="fixed inset-0 z-10">
          <div className="flex w-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              enter="ease-out duration-200"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              className={`w-full ${modalSize}`}
            >
              <Dialog.Panel
                className={`relative w-full overflow-hidden rounded-lg border bg-white text-left shadow-xl dark:border-base-600  dark:bg-base-900 sm:my-8`}
              >
                {title && (
                  <div className="sticky top-0 z-10 border-b border-base-200 bg-white px-4 py-3 dark:border-base-600 dark:bg-base-900 md:px-6">
                    <h4 className="truncate pt-1 pr-10 text-lg font-semibold">
                      {title}
                    </h4>
                    <div className="absolute top-3 right-2 md:right-4">
                      <button
                        className="btn-with-icon-only"
                        onClick={() => setShow(false)}
                      >
                        <Icon
                          name="FiX"
                          className="h-8 w-8 text-base-600 dark:text-base-200"
                        />
                      </button>
                    </div>
                  </div>
                )}
                <div className="px-6 pb-0">{children}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ModalDialog;
