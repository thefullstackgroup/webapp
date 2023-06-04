import { IoClose } from 'react-icons/io5';

const ModalDialog = ({
  children,
  show,
  setShow,
  title,
  dimensions,
  disabled = false,
}) => {
  let modalSize = 'sm:max-w-lg';
  if (dimensions) modalSize = dimensions;
  if (show) {
    return (
      <div className="no-scrollbar fixed inset-0 z-50 h-screen overflow-scroll overflow-y-auto overscroll-contain md:overflow-hidden">
        <div className="flex min-h-screen items-center justify-center text-center sm:block sm:p-0 md:px-4 md:pt-4 md:pb-20">
          {!disabled ? (
            <div
              className="absolute inset-0 h-screen overscroll-contain bg-base-400/50 backdrop-blur-sm dark:bg-base-800/70"
              onClick={() => setShow(false)}
            ></div>
          ) : (
            <div className="absolute inset-0 bg-base-700/80 bg-opacity-20"></div>
          )}

          <span className="hidden sm:inline-block sm:h-screen sm:align-middle">
            &#8203;
          </span>

          <div
            className={`inline-block w-full transform align-bottom transition-all sm:align-middle ${modalSize}`}
          >
            <div className="mx-auto max-h-min min-h-screen overflow-hidden bg-base-50 text-left shadow-2xl dark:bg-base-900 sm:min-h-min sm:rounded-md">
              {title && (
                <div className="sticky top-0 z-10 border-b border-base-200 bg-white px-4 py-3 dark:border-base-800 dark:bg-base-900 md:px-6">
                  <h4 className="truncate pt-1 pr-10 text-lg font-semibold">
                    {title}
                  </h4>
                  <div className="absolute top-3 right-2 md:right-4">
                    <button
                      className="btn-with-icon-only"
                      onClick={() => setShow(false)}
                    >
                      <IoClose className="h-8 w-8 text-base-300" />
                    </button>
                  </div>
                </div>
              )}
              <div className="px-4 pb-0">{children}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <></>;
};

export default ModalDialog;
