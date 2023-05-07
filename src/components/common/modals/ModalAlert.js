const ModalAlert = ({ children, show, setShow }) => {
  return (
    <div className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {show ? (
          <div
            className="absolute inset-0 bg-tfsdark-600 bg-opacity-90"
            onClick={() => setShow(!show)}
          ></div>
        ) : (
          <div className="absolute inset-0 bg-white bg-opacity-20"></div>
        )}

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-tfsdark-800 rounded-md px-4 pt-5 pb-6 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full sm:p-6 border border-tfsdark-600">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModalAlert;
