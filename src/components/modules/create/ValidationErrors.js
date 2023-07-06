import ModalAlert from 'components/common/modals/ModalAlert';

const ValidationErrors = ({
  showValidationErrors,
  setShowValidationErrors,
  draftSelected,
  postTitle,
  postBody,
  postTechStack,
  postCoverImage,
  postProjectLink,
}) => {
  return (
    <ModalAlert
      show={showValidationErrors}
      setShow={setShowValidationErrors}
      title="Oops! Missing some info ..."
    >
      <div className="mx-auto w-full space-y-6 py-6">
        <div className="prose dark:prose-dark">
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
    </ModalAlert>
  );
};

export default ValidationErrors;
