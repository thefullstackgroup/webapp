const ModalAlert = ({ children, show, setShow }) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {show ? (
          <div
            className="absolute inset-0 bg-base-600 bg-opacity-90"
            onClick={() => setShow(!show)}
          ></div>
        ) : (
          <div className="absolute inset-0 bg-white bg-opacity-20"></div>
        )}

        <span className="hidden sm:inline-block sm:h-screen sm:align-middle">
          &#8203;
        </span>

        <div className="inline-block transform overflow-hidden rounded-md border border-base-600 bg-base-800 px-4 pt-5 pb-6 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md sm:p-6 sm:align-middle">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModalAlert;
