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
import TagStack from 'components/common/tags/TagStack';
import UploadProjectVideo from 'components/common/elements/mux/UploadProjectVideo';
import VideoPlayer from 'components/common/elements/mux/VideoPlayer';
import Contributors from 'components/modules/project/Contributors';
import ProjectTechStack from 'components/modules/create/ProjectTechStack';
import ProjectSettings from 'components/modules/create/ProjectSettings';
import ValidationErrors from 'components/modules/create/ValidationErrors';
import { sendSlackMessage } from 'utils/slack/sendMessageSlack';
import { FaMarkdown } from 'react-icons/fa';
import { CgSpinner } from 'react-icons/cg';
import { IoAddOutline, IoLink } from 'react-icons/io5';
import Icon from 'components/common/elements/Icon';
import ModalAlert from 'components/common/modals/ModalAlert';

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

const Scratch = ({ user, setPostType, postData }) => {
  const router = useRouter();
  let postRef = router.query.ref;
  const [windowSize, setWindowSize] = useState(
    typeof window !== 'undefined' ? getWindowSize() : ''
  );
  const [isDiscardPromptOpen, setIsDiscardPromptOpen] = useState(false);
  const [isDeletePromptOpen, setIsDeletePromptOpen] = useState(false);
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

  const deletePost = async () => {
    const data = {
      projectId: postData?._id,
    };
    await axios.post(
      `${process.env.BASEURL}/api/projects/project/delete`,
      data
    );
    setIsDeletePromptOpen(false);
    router.push(`/${user.displayName}`);
  };

  return (
    <>
      {!postIsPublished && (
        <div className="w-full cursor-pointer bg-red-500 py-3 px-4 text-center font-normal text-base-100 md:px-8">
          This project is{' '}
          <span className="font-bold text-base-200">unpublished</span> and not
          visible to anyone.
        </div>
      )}
      <div className="sticky top-0 z-40 border-b border-base-200 bg-base-50 dark:border-base-700 dark:bg-base-900">
        <div className="left-0 mx-auto w-full max-w-screen-lg py-2">
          <div className="sticky top-0 mx-auto flex max-w-screen-2xl items-center justify-end space-x-4">
            <button
              className="btn btn-ghost px-0"
              onClick={() => setShowSettings(true)}
            >
              <Icon name="FiSettings" />
            </button>

            <button
              className="btn btn-ghost"
              onClick={() => handleSavePost(true)}
            >
              {saving ? (
                <>
                  <CgSpinner className="h-4 w-4 animate-spin" />
                  <span>Saving ...</span>
                </>
              ) : (
                <span>Save draft</span>
              )}
            </button>

            <button
              className="btn btn-primary"
              onClick={() => setShowSettings(true)}
            >
              Publish
            </button>

            <button
              className="btn btn-ghost"
              onClick={() => setIsDiscardPromptOpen(true)}
            >
              <Icon name="FiX" className="h-7 w-7" />
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-screen-lg space-y-6 px-4 py-8">
        <div className="mx-auto flex flex-col justify-center space-y-4 text-center">
          {postCoverImage && !postCoverVideo && (
            <div className="group relative h-96 overflow-hidden">
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
                  className="btn btn-sm btn-secondary"
                >
                  Remove image
                </button>
              </div>
            </div>
          )}

          {postCoverVideo && (
            <div className="group relative h-4/5 w-full">
              <div className="flex h-full w-1/2 overflow-hidden">
                <VideoPlayer src={postCoverVideo} poster={postCoverImage} />
              </div>
              <div className="absolute top-0 left-0 hidden h-20 w-full items-center justify-end bg-transparent px-8 group-hover:flex">
                <button
                  onClick={() => {
                    setPostCoverImage(null);
                    setPostCoverVideo(null);
                  }}
                  className="btn btn-sm btn-secondary"
                >
                  Change video
                </button>
              </div>
            </div>
          )}

          {!postCoverImage && (
            <div className="space-y-2">
              <div className="flex items-end space-x-2 text-base-500 dark:text-base-400">
                <h3 className="font-mono text-base font-medium">
                  Add a cover image or video
                </h3>
                <Icon name="FiCornerRightDown" className="h-5 w-5" />
              </div>
              <div className="flex h-[430px] w-full flex-col overflow-hidden">
                <div className="mx-auto flex h-full w-full items-center justify-center rounded-md border">
                  <div className="flex items-center space-x-4">
                    <div>
                      <label
                        htmlFor="file-upload"
                        className="btn btn-secondary btn-with-icon cursor-pointer pl-4"
                      >
                        <Icon name="FiCamera" className="h-6 w-6" />
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
        <div>
          <div className="flex items-end space-x-2 text-base-500 dark:text-base-400">
            <h3 className="font-mono text-base font-medium">Project title</h3>
            <Icon name="FiCornerRightDown" className="h-5 w-5" />
          </div>
          <div className="flex w-full flex-col justify-between md:flex-row md:items-center md:space-x-4">
            <div className="w-full">
              <input
                className="text-input h-14 bg-transparent p-0 text-2xl font-semibold md:text-4xl"
                placeholder="Project title ..."
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-end space-x-2 text-base-500 dark:text-base-400">
            <h3 className="font-mono text-base font-medium">Tag tech stacks</h3>
            <Icon name="FiCornerRightDown" className="h-5 w-5" />
          </div>

          <div className="no-scrollbar flex flex-wrap items-center gap-1">
            {postTechStack?.map((stack, index) => (
              <button key={index} onClick={() => removeTechStack(stack)}>
                <TagStack tech={stack} />
              </button>
            ))}

            <div className="relative">
              <button
                className="btn btn-primary mb-1"
                onClick={() => setShowTechStackOptions(true)}
              >
                <IoAddOutline />
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
        </div>
        <div className="space-y-2">
          <div className="flex items-end space-x-2 pt-6 text-base-500 dark:text-base-400">
            <h3 className="font-mono text-base font-medium">
              Project description or README
            </h3>
            <Icon name="FiCornerRightDown" className="h-5 w-5" />
          </div>

          <div className="markdown dark w-full overflow-hidden rounded-md border dark:border-base-700">
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
        <div className="space-y-2">
          <div className="flex items-end space-x-2 pt-6 text-base-500 dark:text-base-400">
            <h3 className="font-mono text-base font-medium">Project links</h3>
            <Icon name="FiCornerRightDown" className="h-5 w-5" />
          </div>
          <div className="flex items-center space-x-2 pb-20">
            {postGitHubRepo !== '' && (
              <a href={postGitHubRepo} target="_blank" rel="noreferrer">
                <button className="btn btn-secondary btn-with-icon">
                  <span>Code</span>
                  <Icon name="SiGithub" pack="Si" />
                </button>
              </a>
            )}
            {postProjectLink !== '' && (
              <a href={postProjectLink} target="_blank" rel="noreferrer">
                <button className="btn btn-secondary btn-with-icon whitespace-nowrap">
                  <span className="">View project</span>
                  <Icon name="FiExternalLink" />
                </button>
              </a>
            )}
          </div>
        </div>
      </div>

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

      <ModalAlert show={isDiscardPromptOpen} setShow={setIsDiscardPromptOpen}>
        <div className="py-8">
          <div className="justify-center sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0">
              <h3 className="text-xl font-bold">Quit?</h3>
              <div className="mt-2">
                <p className="text-sm">Are you sure you want to quit?</p>
              </div>
            </div>
          </div>
          <div className="mt-5 flex justify-center space-x-2 sm:mt-4">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setIsDiscardPromptOpen(false)}
            >
              No
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => router.back()}
            >
              Yes
            </button>
          </div>
        </div>
      </ModalAlert>

      <ModalAlert show={isDeletePromptOpen} setShow={setIsDeletePromptOpen}>
        <div className="space-y-4 py-8">
          <div className="space-y-2 text-center">
            <h3 className="text-xl font-bold">Delete post?</h3>
            <p className="text-sm">
              Are you sure you want to delete this project? This action cannot
              be undone.
            </p>
          </div>

          <div className="flex justify-center space-x-2">
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => deletePost()}
            >
              Delete
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setIsDeletePromptOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </ModalAlert>
    </>
  );
};

export default Scratch;
