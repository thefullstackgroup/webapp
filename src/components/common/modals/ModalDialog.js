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
      <div className="fixed z-50 inset-0 overflow-scroll no-scrollbar md:overflow-hidden h-screen overflow-y-auto overscroll-contain">
        <div className="flex items-center justify-center min-h-screen md:pt-4 md:px-4 md:pb-20 text-center sm:block sm:p-0">
          {!disabled ? (
            <div
              className="absolute inset-0 bg-tfsdark-700/80 overscroll-contain h-screen backdrop-blur-sm"
              onClick={() => setShow(false)}
            ></div>
          ) : (
            <div className="absolute inset-0 bg-tfsdark-700/80 bg-opacity-20"></div>
          )}

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
            &#8203;
          </span>

          <div
            className={`inline-block align-bottom transform transition-all sm:align-middle w-full ${modalSize}`}
          >
            <div className="bg-tfsdark-900 sm:rounded-md text-left shadow-2xl mx-auto min-h-screen sm:min-h-min max-h-min overflow-hidden">
              {title && (
                <div className="px-4 md:px-6 py-3 border-b border-tfsdark-600/80 sticky top-0 z-10 bg-tfsdark-900">
                  <h4 className="font-semibold text-lg pt-1 truncate pr-10">
                    {title}
                  </h4>
                  <div className="absolute top-3 right-2 md:right-4">
                    <button
                      className="btn-with-icon-only"
                      onClick={() => setShow(false)}
                    >
                      <IoClose className="h-8 w-8 text-slate-300" />
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
