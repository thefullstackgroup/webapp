import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import * as ga from 'lib/ga';
import dynamic from 'next/dynamic';
const ReactMde = dynamic(() => import('react-mde'), { ssr: false });
import validator from 'validator';
import Markdown from 'markdown-to-jsx';
import CodeBlock from 'components/common/elements/CodeBlock';
import GitHubStats from 'components/modules/project/GitHubStats';
import ImportFromGitHub from 'components/modules/create/ImportFromGitHub';
import TagStack from 'components/common/tags/TagStack';
import UploadProjectVideo from 'components/common/elements/mux/UploadProjectVideo';
import VideoPlayer from 'components/common/elements/mux/VideoPlayer';
import Contributors from 'components/modules/project/Contributors';
import ProjectTechStack from 'components/modules/create/ProjectTechStack';
import ProjectSettings from 'components/modules/create/ProjectSettings';
import ValidationErrors from 'components/modules/create/ValidationErrors';
import ModalDialog from 'components/common/modals/ModalDialog';
import { sendSlackMessage } from 'utils/slack/sendMessageSlack';
import { FaMarkdown } from 'react-icons/fa';
import { FiCamera } from 'react-icons/fi';
import { CgSpinner } from 'react-icons/cg';
import { RiSettingsLine } from 'react-icons/ri';
import {
  IoAddOutline,
  IoCubeOutline,
  IoLink,
  IoLogoGithub,
} from 'react-icons/io5';

const customCommand = {
  name: 'markdown-link',
  icon: () => <FaMarkdown className="h-6 w-6" />,
  execute: () => {
    window.open(
      'https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet'
    );
  },
};

const isValidURL = (input) => {
  if (validator.isURL(input, { require_protocol: true })) {
    return true;
  } else {
    return false;
  }
};

const sendGAEvent = (eventName) => {
  ga.event({
    action: eventName,
  });
};

const Scratch = ({ user, setPostType, postData, setIsDeletePromptOpen }) => {
  const router = useRouter();
  let postRef = router.query.ref;
  const [windowSize, setWindowSize] = useState(
    typeof window !== 'undefined' ? getWindowSize() : ''
  );
  const [projectTypeSelected, setProjectTypeSelected] = useState(
    postData ? true : false
  );
  const [gitHubImportSelected, setGitHubImportSelected] = useState(false);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showValidationErrors, setShowValidationErrors] = useState(false);
  const [showTechStackOptions, setShowTechStackOptions] = useState(false);
  const [selectedTab, setSelectedTab] = useState('write');
  const [draftSelected, setDraftSelected] = useState(false);
  const [postIsPublished, setPostIsPublished] = useState(
    !postData?.isDraft || false
  );
  const [postTitle, setPostTitle] = useState(postData?.projectName || '');
  const [postBody, setPostBody] = useState(postData?.projectBody || '');
  const [postTechStack, setPostTechStack] = useState(
    postData?.projectTechStack || []
  );
  const [postCategories, setPostCategories] = useState(
    postData?.projectTechCategories != undefined
      ? postData.projectTechCategories
      : {}
  );
  const [postGitHubRepo, setPostGitHubRepo] = useState(
    postData?.sourceControlLink || ''
  );
  const [postProjectLink, setPostProjectLink] = useState(
    postData?.projectLinkURI || ''
  );
  const [postCoverImage, setPostCoverImage] = useState(
    postData?.projectImgURI || null
  );
  const [postCoverVideo, setPostCoverVideo] = useState(
    postData?.projectVideoURI || null
  );
  const [postOpenToCollab, setPostOpenToCollab] = useState(
    postData?.lookingForCollabs || false
  );

  function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }

  let mdEditorHeight = windowSize.innerHeight - 400;

  const handleUploadImage = async (event) => {
    if (event.target.files.length > 0) {
      const formData = new FormData();
      formData.append('id', user.userId);
      formData.append('file', event.target.files[0]);

      await axios
        .post(
          `${process.env.BASEURL}/api/projects/project/image/upload`,
          formData
        )
        .then((response) => {
          setPostCoverImage(response.data.url);
        });
    }
  };

  const removeTechStack = (skill) => {
    const filteredSavedSkills = postTechStack.filter(function (item) {
      return skill !== item;
    });

    setPostTechStack(filteredSavedSkills);
  };

  const handleSavePost = async (isDraft = true) => {
    if (isDraft) setSaving(true);
    if (!isDraft) setPublishing(true);

    // validaton rules
    if (
      (!postTitle?.trim().length ||
        !postBody ||
        !postTechStack.length ||
        !postProjectLink?.trim().length ||
        !postCoverImage?.trim().length) &&
      !isDraft
    ) {
      setShowValidationErrors(true);
      setDraftSelected(false);
      setPublishing(false);
      return;
    }

    if ((!postTitle?.trim().length || !postBody) && isDraft) {
      setShowValidationErrors(true);
      setDraftSelected(true);
      setSaving(false);
      return;
    }

    if (
      (postProjectLink != '' && !isValidURL(postProjectLink.toString())) ||
      (postGitHubRepo != '' && !isValidURL(postGitHubRepo.toString()))
    ) {
      setSaving(false);
      setPublishing(false);
      return;
    }

    const data = {
      projectId: postRef ? postData?._id : undefined,
      projectData: {
        projectName: postTitle,
        projectBody: postBody,
        projectTechStack: postTechStack,
        projectTechCategories: postCategories,
        projectImgURI: postCoverImage,
        projectVideoURI: postCoverVideo,
        sourceControlLink: postGitHubRepo.toString(),
        projectLinkURI: postProjectLink.toString(),
        shareToNetwork: 'true',
        lookingForCollabs: postOpenToCollab.toString(),
        isOpenSource: 'false',
        isActive: 'true',
        customInformation: '',
        isPublicViewable: 'true',
        isDraft: isDraft,
        projectType: 'PROJECT',
      },
    };

    const result = await axios.post(
      `${process.env.BASEURL}/api/projects/project/${postRef ? 'edit' : 'add'}`,
      data
    );

    sendSlackMessage(
      `NEW POST PAGE: A PROJECT has been ` +
        (postRef ? 'updated' : 'posted') +
        ` by the username '${
          user.displayName
        }'. \n Project is titled '${postTitle}' ${
          isDraft ? '(set to draft)' : ''
        }`
    );

    if (isDraft) {
      setSaving(false);
      setDraftSelected(false);
      setPostIsPublished(false);
      if (!postRef) router.push(`/post?ref=${result.data?._id}`);
    } else {
      sendGAEvent('user_created_project');
      router.push(`/${user.displayName}`);
    }
  };

  const handlePublishPost = async () => {
    handleSavePost(false);
  };

  return (
    <>
      {!projectTypeSelected && (
        <ModalDialog
          show={true}
          setShow={() => router.push('/explore')}
          title="Create Project"
          disabled
        >
          {!gitHubImportSelected && (
            <div className="space-y-2 py-4">
              <p className="mx-3 mb-4 text-center text-2xl font-extrabold">
                Show off your project
              </p>
              <p className="mx-6 mb-8 text-center text-sm">
                Import a project from GitHub or create your project from
                scratch.
              </p>

              <div className="space-y-4 py-6">
                <button
                  className="btn-secondary btn-with-icon w-full justify-center py-3"
                  onClick={() => setGitHubImportSelected(true)}
                >
                  <IoLogoGithub className="h-8 w-8" />
                  <span className="">Import from GitHub</span>
                </button>

                <button
                  className="btn-secondary btn-with-icon w-full justify-center py-3"
                  onClick={() => setProjectTypeSelected(true)}
                >
                  <IoCubeOutline className="h-8 w-8" />
                  <span className="">Create from scratch</span>
                </button>
              </div>
            </div>
          )}

          {gitHubImportSelected && (
            <ImportFromGitHub
              setPostType={setPostType}
              setProjectTypeSelected={setProjectTypeSelected}
            />
          )}
        </ModalDialog>
      )}

      {projectTypeSelected && (
        <>
          {!postIsPublished && (
            <div className="w-full cursor-pointer bg-red-500/40 py-3 px-4 font-normal md:px-8">
              This project is{' '}
              <span className="font-bold text-base-200">unpublished</span> and
              not visible to anyone.
            </div>
          )}
          <div className="sticky top-0 left-0 z-40 w-full bg-base-700 px-4 py-4 md:px-8">
            <div className="sticky top-0 mx-auto flex max-w-screen-2xl items-center justify-end space-x-4 md:space-x-8">
              <button
                className="flex items-center space-x-2 text-base text-base-400"
                onClick={() => handleSavePost(true)}
              >
                {saving ? (
                  <>
                    <CgSpinner className="h-4 w-4 animate-spin" />
                    <span>Saving ...</span>
                  </>
                ) : (
                  <span className="hover:text-base-300">Save draft</span>
                )}
              </button>
              <button
                className="text-base-400 hover:text-base-300"
                onClick={() => setShowSettings(true)}
              >
                <RiSettingsLine className="h-6 w-6" />
              </button>
              <button
                className="btn-primary"
                onClick={() => setShowSettings(true)}
              >
                Publish
              </button>
            </div>
          </div>
          <div className="flex flex-col justify-center space-y-4 bg-base-900/40 text-center">
            {postCoverImage && !postCoverVideo && (
              <div className="group relative h-96 w-full overflow-hidden">
                <div className="h-full w-full">
                  <img
                    src={postCoverImage}
                    className="h-full w-full object-cover object-center"
                    alt=""
                  />
                </div>
                <div className="absolute top-0 left-0 hidden h-full w-full items-center justify-center bg-base-900/40 group-hover:flex">
                  <button
                    onClick={() => setPostCoverImage(null)}
                    className="btn-secondary"
                  >
                    <span>Change image</span>
                  </button>
                </div>
              </div>
            )}

            {postCoverVideo && (
              <div className="group relative h-4/5 w-full">
                <div className="flex h-full w-full overflow-hidden">
                  <VideoPlayer src={postCoverVideo} poster={postCoverImage} />
                </div>
                <div className="absolute top-0 left-0 hidden h-20 w-full items-center justify-end bg-transparent px-8 group-hover:flex">
                  <button
                    onClick={() => {
                      setPostCoverImage(null);
                      setPostCoverVideo(null);
                    }}
                    className="btn-secondary"
                  >
                    <span>Change video</span>
                  </button>
                </div>
              </div>
            )}

            {!postCoverImage && (
              <div className="flex h-96 w-full flex-col">
                <div className="mx-auto flex h-full w-auto items-center justify-center">
                  <div className="flex flex-col space-y-4">
                    <p className="text-base-400">Add a cover image or video</p>
                    <div className="flex items-center space-x-4">
                      <div>
                        <label
                          htmlFor="file-upload"
                          className="btn-secondary btn-with-icon cursor-pointer pl-4"
                        >
                          <FiCamera className="h-6 w-6" />
                          <span>Image</span>

                          <input
                            id="file-upload"
                            name="image"
                            type="file"
                            className="sr-only"
                            onChange={handleUploadImage}
                          />
                        </label>
                      </div>
                      <UploadProjectVideo
                        setCoverImage={setPostCoverImage}
                        setCoverVideo={setPostCoverVideo}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="space-y-4 p-4 md:p-8">
            <div className="flex w-full flex-col justify-between md:flex-row md:items-center md:space-x-4">
              <div className="w-full">
                <input
                  className="text-input h-14 bg-transparent p-0 text-2xl font-semibold md:text-4xl"
                  placeholder="Project title ..."
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2">
                {postGitHubRepo !== '' && (
                  <a href={postGitHubRepo} target="_blank" rel="noreferrer">
                    <button className="btn-secondary btn-with-icon">
                      <IoLogoGithub className="h-auto w-6" />
                    </button>
                  </a>
                )}
                {postProjectLink !== '' && (
                  <a href={postProjectLink} target="_blank" rel="noreferrer">
                    <button className="btn-secondary btn-with-icon py-2.5 text-sm">
                      <IoLink className="h-auto w-5" />
                      <span className="">Visit</span>
                    </button>
                  </a>
                )}
              </div>
            </div>

            <div className="no-scrollbar flex flex-wrap items-center gap-1">
              {postTechStack?.map((stack, index) => (
                <button key={index} onClick={() => removeTechStack(stack)}>
                  <TagStack tech={stack} size={'xs'} />
                </button>
              ))}

              <div className="relative">
                <button
                  className="btn-primary btn-with-icon mb-1 space-x-1 rounded-full py-1 pl-1 pr-2 text-sm"
                  onClick={() => setShowTechStackOptions(true)}
                >
                  <IoAddOutline className="h-5 w-5" />
                  <span>Tag Stack</span>
                </button>

                {showTechStackOptions && (
                  <div className="absolute top-10 left-0 z-20 w-80">
                    <div
                      className="fixed inset-0"
                      onClick={() =>
                        setShowTechStackOptions(!showTechStackOptions)
                      }
                    ></div>

                    <ProjectTechStack
                      postTechStack={postTechStack}
                      setPostTechStack={setPostTechStack}
                    />
                  </div>
                )}
              </div>
            </div>

            {postData?.hasGitHubReadMe && <GitHubStats project={postData} />}

            <div className="markdown dark w-full">
              <ReactMde
                value={postBody}
                onChange={setPostBody}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
                generateMarkdownPreview={(markdown) =>
                  Promise.resolve(
                    <div className="prose prose-dark mt-4 max-w-full">
                      <Markdown
                        options={{
                          overrides: {
                            pre: {
                              component: CodeBlock,
                            },
                            a: {
                              props: { target: '_blank' },
                            },
                          },
                        }}
                      >
                        {markdown}
                      </Markdown>
                    </div>
                  )
                }
                minEditorHeight={mdEditorHeight}
                maxEditorHeight={10000}
                childProps={{
                  textArea: {
                    placeholder: 'Describe your project ...',
                  },
                }}
                commands={{
                  'markdown-link': customCommand,
                }}
                toolbarCommands={[
                  ['header', 'bold', 'italic', 'strikethrough'],
                  ['quote', 'code', 'image'],
                  ['unordered-list', 'ordered-list', 'checked-list'],
                  ['markdown-link'],
                ]}
              />
            </div>

            {postData && <Contributors project={postData} />}
          </div>

          {showSettings && (
            <ProjectSettings
              showSettings={showSettings}
              setShowSettings={setShowSettings}
              postCategories={postCategories}
              setPostCategories={setPostCategories}
              postGitHubRepo={postGitHubRepo}
              setPostGitHubRepo={setPostGitHubRepo}
              postProjectLink={postProjectLink}
              setPostProjectLink={setPostProjectLink}
              postOpenToCollab={postOpenToCollab}
              setPostOpenToCollab={setPostOpenToCollab}
              handleSavePost={handleSavePost}
              handlePublishPost={handlePublishPost}
              setIsDeletePromptOpen={setIsDeletePromptOpen}
              postIsPublished={postIsPublished}
              publishing={publishing}
            />
          )}

          {showValidationErrors && (
            <ValidationErrors
              showValidationErrors={showValidationErrors}
              setShowValidationErrors={setShowValidationErrors}
              draftSelected={draftSelected}
              setDraftSelected={setDraftSelected}
              postTitle={postTitle}
              postBody={postBody}
              postTechStack={postTechStack}
              postCoverImage={postCoverImage}
              postProjectLink={postProjectLink}
            />
          )}
        </>
      )}
    </>
  );
};

export default Scratch;
