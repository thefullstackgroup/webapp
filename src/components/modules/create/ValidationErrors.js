import { IoClose } from 'react-icons/io5';

const ValidationErrors = ({
  showValidationErrors,
  setShowValidationErrors,
  draftSelected,
  setDraftSelected,
  postTitle,
  postBody,
  postTechStack,
  postCoverImage,
  postProjectLink,
}) => {
  return (
    <div className="fixed z-50 inset-0 overflow-hidden h-screen">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="absolute inset-0 bg-tfsdark-900 bg-opacity-80"
          onClick={() => {
            setShowValidationErrors(!showValidationErrors);
            setDraftSelected(false);
          }}
        ></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
          &#8203;
        </span>

        <div className="inline-block align-bottom transform transition-all sm:align-middle sm:w-1/2 sm:max-w-2xl">
          <div className="bg-tfsdark-800 rounded-md text-left shadow-xl sm:max-w-xl mx-auto overflow-hidden">
            <div className="w-full mx-auto space-y-6 bg-red-500/20 p-4 md:p-8">
              <div className="flex items-start justify-between">
                <h3 className="text-lg md:text-2xl font-bold text-slate-100">
                  <span>Oops! Missing some info ...</span>
                </h3>
                <button
                  className="text-slate-100"
                  onClick={() => {
                    setShowValidationErrors(!showValidationErrors);
                    setDraftSelected(false);
                  }}
                >
                  <IoClose className="h-7 w-7 md:h-8 md:w-8" />
                </button>
              </div>

              <div className="prose prose-dark">
                <ul>
                  {!postTitle?.trim().length && (
                    <li>You need to give your project a title.</li>
                  )}
                  {!postBody && (
                    <li>You need to give a description of your project.</li>
                  )}
                  {!postTechStack?.length && !draftSelected && (
                    <li>Tag the tech stack of your project.</li>
                  )}
                  {!postCoverImage?.trim().length && !draftSelected && (
                    <li>Upload a cover image or video for your project.</li>
                  )}
                  {!postProjectLink?.trim().length && !draftSelected && (
                    <li>Add a link to your project.</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValidationErrors;
