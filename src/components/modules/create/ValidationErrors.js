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
    <div className="fixed inset-0 z-50 h-screen overflow-hidden">
      <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="absolute inset-0 bg-base-900 bg-opacity-80"
          onClick={() => {
            setShowValidationErrors(!showValidationErrors);
            setDraftSelected(false);
          }}
        ></div>

        <span className="hidden sm:inline-block sm:h-screen sm:align-middle">
          &#8203;
        </span>

        <div className="inline-block transform align-bottom transition-all sm:w-1/2 sm:max-w-2xl sm:align-middle">
          <div className="mx-auto overflow-hidden rounded-md bg-base-800 text-left shadow-xl sm:max-w-xl">
            <div className="mx-auto w-full space-y-6 bg-red-500/20 p-4 md:p-8">
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-bold text-base-100 md:text-2xl">
                  <span>Oops! Missing some info ...</span>
                </h3>
                <button
                  className="text-base-100"
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
