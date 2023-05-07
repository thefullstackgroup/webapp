import validator from 'validator';
import ProjectCategory from 'components/modules/create/ProjectCategory';
import ModalDialog from 'components/common/modals/ModalDialog';
import { IoClose, IoLinkOutline, IoLogoGithub } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { CgSpinner } from 'react-icons/cg';

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
  handleSavePost,
  handlePublishPost,
  setIsDeletePromptOpen,
  postIsPublished,
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
    <ModalDialog show={showSettings} setShow={setShowSettings}>
      <div className="w-full mx-auto space-y-6 py-6 px-2">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-slate-100">
            <span>Settings</span>
          </h3>
          <div className="flex items-center space-x-2">
            <button
              className="btn-secondary bg-transparent hover:bg-red-500/20 text-red-500/80 hover:text-red-500"
              onClick={() => setIsDeletePromptOpen(true)}
            >
              Delete
            </button>

            {!postIsPublished ? (
              <button
                className="btn-secondary"
                onClick={() => {
                  handleSavePost(true);
                  setShowSettings(!showSettings);
                }}
              >
                Save
              </button>
            ) : (
              <button
                className=""
                onClick={() => {
                  setShowSettings(!showSettings);
                }}
              >
                <IoClose className="w-6 h-6 md:w-8 md:h-8 text-slate-400" />
              </button>
            )}
          </div>
        </div>

        <div className="space-y-1">
          <span className="text-sm font-medium">Project links</span>
          <div>
            <div
              className={
                'relative flex rounded-md items-center border ' +
                (gitHubRepoError ? 'border-red-500' : 'border-tfsdark-700')
              }
            >
              <div className="pointer-events-none absolute inset-y-2 left-4 flex pt-1">
                <IoLogoGithub className="h-6 w-6 text-slate-200" />
              </div>
              <input
                type="text"
                name="repo"
                placeholder="Link to GitHub repo"
                className="text-input pl-12 mt-0"
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
                'relative flex rounded-md items-center border ' +
                (projectLinkError ? 'border-red-500' : 'border-tfsdark-700')
              }
            >
              <div className="pointer-events-none absolute inset-y-2 left-4 flex pt-1">
                <IoLinkOutline className="h-6 w-6 text-slate-200" />
              </div>
              <input
                type="text"
                name="link"
                placeholder="Link to demo / project"
                className="text-input pl-12 mt-0"
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
          <div className="mt-6 flex flex-1 items-center pt-2 mb-2 sm:mb-0 justify-between">
            <span className="">
              <span className="font-medium text-slate-100">
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
                  className="h-5 w-5 border-gray-300 text-green-600 focus:ring-0 cursor-pointer"
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
                  className="h-5 w-5 border-gray-300 text-green-600 focus:ring-0 cursor-pointer"
                  onClick={() => setPostOpenToCollab(false)}
                />
                <label htmlFor="collabno" className="cursor-pointer">
                  No
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 pb-20 md:pb-0">
          {publishing ? (
            <button
              disabled
              className="w-full btn-primary py-3 flex space-x-2 items-center justify-center"
            >
              <CgSpinner className="h-4 w-4 animate-spin" />
              <span>Publishing ...</span>
            </button>
          ) : (
            <button
              className="w-full btn-primary py-3 flex space-x-2 items-center justify-center"
              onClick={() => handlePublishPost()}
            >
              <span>Publish</span>
            </button>
          )}
        </div>
      </div>
    </ModalDialog>
  );
};

export default ProjectSettings;
