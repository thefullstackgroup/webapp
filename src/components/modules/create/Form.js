import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import * as ga from 'lib/ga';
import dynamic from 'next/dynamic';
const ReactMde = dynamic(() => import('react-mde'), { ssr: false });
import '@uiw/react-markdown-preview/markdown.css';
const MarkdownPreview = dynamic(
  () => import('@uiw/react-markdown-preview').then((mod) => mod.default),
  { ssr: false }
);
import { useTheme } from 'next-themes';
import rehypeHighlight from 'rehype-highlight';
import validator from 'validator';
import TagStack from 'components/common/tags/TagStack';
import UploadProjectVideo from 'components/common/elements/mux/UploadProjectVideo';
import VideoPlayer from 'components/common/elements/mux/VideoPlayer';
import ProjectTechStack from 'components/modules/create/ProjectTechStack';
import ProjectSettings from 'components/modules/create/ProjectSettings';
import ValidationErrors from 'components/modules/create/ValidationErrors';
import Icon from 'components/common/elements/Icon';
import ModalAlert from 'components/common/modals/ModalAlert';
import Header from './Header';
import { sendSlackMessage } from 'utils/slack/sendMessageSlack';

const customCommand = {
  name: 'markdown-link',
  icon: () => <Icon name="FaMarkdown" pack="Fa" className="h-6 w-6" />,
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

const Preview = ({ markdown, currentTheme }) => {
  return (
    <div className="mt-4 max-w-full">
      <MarkdownPreview
        source={markdown}
        remarkPlugins={[rehypeHighlight, { detect: true }]}
        wrapperElement={{
          'data-color-mode': currentTheme,
        }}
      />
    </div>
  );
};

const Form = ({ user, postData }) => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  const router = useRouter();
  let postRef = router.query.ref;
  const [windowSize, setWindowSize] = useState(
    typeof window !== 'undefined' ? getWindowSize() : ''
  );
  const [isDiscardPromptOpen, setIsDiscardPromptOpen] = useState(false);
  const [isDeletePromptOpen, setIsDeletePromptOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [showTagTechStack, setShowTagTechStack] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showValidationErrors, setShowValidationErrors] = useState(false);
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

  let mdEditorHeight = windowSize.innerHeight - 500;

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
      <Header
        isPublished={postIsPublished}
        setShowSettings={setShowSettings}
        handleSavePost={handleSavePost}
        setIsDiscardPromptOpen={setIsDiscardPromptOpen}
        saving={saving}
      />

      <div className="mx-auto max-w-screen-lg space-y-6 px-4 py-8">
        <div className="relative mx-auto flex flex-col justify-center space-y-4 text-center">
          {postCoverImage && !postCoverVideo && (
            <div className="group relative h-auto overflow-hidden rounded-md">
              <div className="h-full w-full">
                <img
                  src={postCoverImage}
                  className="h-full w-full object-cover object-center"
                  alt=""
                />
              </div>
              <div className="absolute top-2 right-2">
                <button
                  onClick={() => setPostCoverImage(null)}
                  className="btn btn-sm btn-with-icon btn-secondary"
                >
                  <Icon name="FiTrash" className="h-4 w-4" />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          )}

          {postCoverVideo && (
            <div className="group relative h-4/5 w-full">
              <div className="flex h-full w-full overflow-hidden rounded-md">
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
            <div className="flex items-center space-x-4">
              <div>
                <label
                  htmlFor="file-upload"
                  className="btn btn-ghost btn-with-icon cursor-pointer whitespace-nowrap px-0"
                >
                  <Icon name="FiImage" className="h-6 w-6" />
                  <span>Add image</span>

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
          )}
        </div>
        <div className="relative">
          <div className="w-full">
            <input
              className="text-input h-14 bg-transparent p-0 text-2xl font-bold md:text-4xl"
              placeholder="Type your title here ..."
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
            />
          </div>
        </div>

        <div className="relative space-y-2">
          <div className="no-scrollbar flex flex-wrap items-center gap-1">
            {postTechStack?.map((stack, index) => (
              <button key={index} onClick={() => removeTechStack(stack)}>
                <TagStack tech={stack} />
              </button>
            ))}
          </div>
          <button
            className="btn btn-sm btn-secondary btn-with-icon"
            onClick={() => setShowTagTechStack(true)}
          >
            <Icon name="FiPlus" />
            <span>Add tags</span>
          </button>
        </div>
        <div className="space-y-2">
          <div className="markdown w-full overflow-hidden rounded-md">
            <ReactMde
              value={postBody}
              onChange={setPostBody}
              selectedTab={selectedTab}
              onTabChange={setSelectedTab}
              generateMarkdownPreview={(markdown) =>
                Promise.resolve(
                  <Preview markdown={markdown} currentTheme={currentTheme} />
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

      <ProjectTechStack
        show={showTagTechStack}
        setShow={setShowTagTechStack}
        postTechStack={postTechStack}
        setPostTechStack={setPostTechStack}
      />

      <ModalAlert show={isDiscardPromptOpen} setShow={setIsDiscardPromptOpen}>
        <div className="py-8">
          <div className="justify-center sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0">
              <h3 className="text-xl font-bold">Quit?</h3>
              <div className="mt-2 max-w-xs">
                <p className="text-sm">
                  You may loose unsaved changes. Are you sure you want to quit?
                </p>
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

export default Form;
