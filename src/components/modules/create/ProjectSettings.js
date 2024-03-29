import validator from 'validator';
import ProjectCategory from 'components/modules/create/ProjectCategory';
import ModalDialog from 'components/common/modals/ModalDialog';
import { useEffect, useState } from 'react';
import { CgSpinner } from 'react-icons/cg';
import Icon from 'components/common/elements/Icon';

const ProjectSettings = ({
  showSettings,
  setShowSettings,
  postCategories,
  setPostCategories,
  postGitHubRepo,
  setPostGitHubRepo,
  postProjectLink,
  setPostProjectLink,
  postOpenToCollab,
  setPostOpenToCollab,
  handlePublishPost,
  setIsDeletePromptOpen,
  publishing,
}) => {
  const [projectLinkError, setProjectLinkError] = useState(false);
  const [gitHubRepoError, setGitHubRepoError] = useState(false);

  const isValidURL = (input) => {
    if (validator.isURL(input, { require_protocol: true })) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (postProjectLink !== '' && !isValidURL(postProjectLink)) {
      setProjectLinkError(true);
    } else setProjectLinkError(false);

    if (postGitHubRepo !== '' && !isValidURL(postGitHubRepo)) {
      setGitHubRepoError(true);
    } else setGitHubRepoError(false);
  }, [postProjectLink, postGitHubRepo]);

  return (
    <ModalDialog
      show={showSettings}
      setShow={setShowSettings}
      title="Project settings"
    >
      <div className="mx-auto w-full space-y-6 py-6">
        <div className="space-y-1">
          <label className="label">Project links</label>
          <div>
            <div
              className={
                'relative flex items-center rounded-md border ' +
                (gitHubRepoError ? 'border-red-500' : 'border-base-700')
              }
            >
              <div className="pointer-events-none absolute inset-y-2 left-4 flex pt-1">
                <Icon name="SiGithub" pack="Si" className="h-5 w-5" />
              </div>
              <input
                type="text"
                name="repo"
                placeholder="Link to GitHub repo"
                className="text-input mt-0 border-0 pl-12"
                value={postGitHubRepo}
                onChange={(e) => setPostGitHubRepo(e.target.value)}
              />
            </div>
            {gitHubRepoError && (
              <span className="text-sm font-semibold text-red-500">
                Invalid URL
              </span>
            )}
          </div>
          <div>
            <div
              className={
                'relative flex items-center rounded-md border ' +
                (projectLinkError ? 'border-red-500' : 'border-base-700')
              }
            >
              <div className="pointer-events-none absolute inset-y-2 left-4 flex pt-1">
                <Icon name="FiLink" className="h-5 w-5" />
              </div>
              <input
                type="text"
                name="link"
                placeholder="Link to demo / project"
                className="text-input mt-0 border-0 pl-12"
                value={postProjectLink}
                onChange={(e) => setPostProjectLink(e.target.value)}
              />
            </div>
            {projectLinkError && (
              <span className="text-sm font-semibold text-red-500">
                Invalid URL
              </span>
            )}
          </div>
        </div>
        <div>
          <ProjectCategory
            postCategories={postCategories}
            setPostCategories={setPostCategories}
          />
        </div>
        <div className="space-y-1">
          <div className="mt-6 mb-2 flex flex-1 items-center justify-between pt-2 sm:mb-0">
            <span className="">
              <span className="font-medium">
                Is your project open to collaboration?
              </span>
            </span>
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <input
                  id="collabyes"
                  name="collab"
                  type="radio"
                  defaultChecked={postOpenToCollab && 'collabyes'}
                  className="h-5 w-5 cursor-pointer border-gray-300 text-green-600 focus:ring-0"
                  onClick={() => setPostOpenToCollab(true)}
                />
                <label htmlFor="collabyes" className="cursor-pointer">
                  Yes
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  id="collabno"
                  name="collab"
                  type="radio"
                  defaultChecked={!postOpenToCollab && 'collabno'}
                  className="h-5 w-5 cursor-pointer border-gray-300 text-green-600 focus:ring-0"
                  onClick={() => setPostOpenToCollab(false)}
                />
                <label htmlFor="collabno" className="cursor-pointer">
                  No
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center space-y-4 pt-4 pb-20 md:pb-0">
          {publishing ? (
            <button
              disabled
              className="btn btn-primary flex w-full items-center justify-center space-x-2 py-3"
            >
              <CgSpinner className="h-4 w-4 animate-spin" />
              <span>Publishing ...</span>
            </button>
          ) : (
            <button
              className="btn btn-primary flex w-full items-center justify-center space-x-2 py-3"
              onClick={() => handlePublishPost()}
            >
              <span>Publish</span>
            </button>
          )}
          <button
            className="btn btn-sm btn-danger border-0"
            onClick={() => setIsDeletePromptOpen(true)}
          >
            Delete project
          </button>
        </div>
      </div>
    </ModalDialog>
  );
};

export default ProjectSettings;
