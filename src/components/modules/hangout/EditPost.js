import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TextareaAutosize from 'react-textarea-autosize';
import { Transition } from '@headlessui/react';
import TagPost from 'components/common/tags/TagPostType';
import TagTech from 'components/modules/hangout/TagTech';
import Loader from 'components/common/elements/Loader';
import {
  IoCodeSlash,
  IoImageOutline,
  IoPricetagOutline,
  IoTrashOutline,
  IoCodeOutline,
  IoCloseOutline,
} from 'react-icons/io5';
import * as ga from 'lib/ga';
import { useRouter } from 'next/router';
import { postTypeOptions, topics } from './constants';
import Icon from 'components/common/elements/Icon';
import ToolTip from 'components/common/elements/ToolTip';
import ModalDialog from 'components/common/modals/ModalDialog';

const sparkCharCount = 300;

const EditPost = ({
  user,
  postSlug,
  postAuthor,
  setShowEditPost,
  setIsDeletePromptOpen,
}) => {
  const router = useRouter();
  const [postButtonDisabled, setPostButtonDisabled] = useState(true);
  const [showFlair, setShowFlair] = useState(false);
  const [showTech, setShowTech] = useState(false);
  const [post, setPost] = useState(null);
  const [savedSkills, setSavedSkills] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [postPublished, setPostPublished] = useState(false);
  const [postType, setPostType] = useState();
  const [postTitle, setPostTitle] = useState();
  const [postBody, setPostBody] = useState();
  const [coverImage, setCoverImage] = useState();
  const [coverVideo, setCoverVideo] = useState('');

  const getPost = async () => {
    const requestUrl = `${process.env.BASEURL}/api/posts/getPost?postId=${postSlug}&authorId=${postAuthor}`;

    if (requestUrl != '') {
      await axios
        .get(requestUrl)
        .then((response) => {
          setPost(response.data);
          setSavedSkills(response.data.projectTechStack);
          setPostType(response.data.projectType);
          setPostTitle(response.data.projectName);
          setPostBody(response.data.projectBody);
          setCoverImage(response.data.projectImgURI);
          setCoverVideo('');
        })
        .catch((error) => {
          console.log(error.status);
        });
    }
  };

  const handleUploadImage = async (event) => {
    event.preventDefault();

    if (event.target.files.length > 0) {
      setUploading(true);
      const formData = new FormData();
      formData.append('id', user.userId);
      formData.append('file', event.target.files[0]);

      await axios
        .post(
          `${process.env.BASEURL}/api/projects/project/image/upload`,
          formData
        )
        .then((response) => {
          setCoverImage(response.data.url);
        });

      setUploading(false);
    }
  };

  const removeSkill = (skill) => {
    const filteredSavedSkills = savedSkills.filter(function (item) {
      return skill !== item;
    });

    setSavedSkills(filteredSavedSkills);
  };

  const sendSlackMessage = async () => {
    await axios.post(
      `${process.env.BASEURL}/api/notifications/slack/postMessage`,
      {
        message: `A post (${postType}) has been updated by the username '${user.displayName}'`,
      }
    );
  };

  const sendGAEvent = (eventName) => {
    ga.event({
      action: eventName,
    });
  };

  const handleSubmitPost = async () => {
    // change post type if character count is great than Spark count
    let type = postType;
    if (postType === 'SPARK' && postBody.length > sparkCharCount) {
      type = 'POST';
      setPostType('POST');
    }

    let title = postTitle;
    if (postTitle === '') {
      title = postBody.substring(0, 30);
      setPostTitle(title);
    }

    const data = {
      projectId: post?._id,
      projectData: {
        projectName: postBody.substring(0, 30),
        projectBody: postBody,
        projectTechStack: !savedSkills.length > 0 ? ['Tech'] : savedSkills,
        projectImgURI: coverImage,
        projectVideoURI: coverVideo,
        sourceControlLink: '',
        projectLinkURI: '',
        shareToNetwork: 'true',
        lookingForCollabs: false,
        isOpenSource: 'false',
        isActive: 'true',
        customInformation: '',
        isPublicViewable: 'true',
        isDraft: false,
        projectType: type,
      },
    };

    await axios
      .post(`${process.env.BASEURL}/api/projects/project/edit`, data)
      .then((result) => {
        setPostPublished(true);
        sendGAEvent('user_updated_post');
        sendSlackMessage();
        setShowEditPost(false);
      })
      .catch((error) => {
        console.log('Error');
      });
  };

  useEffect(() => {
    getPost();
  }, []);

  useEffect(() => {
    if (postBody?.length > 0) {
      setPostButtonDisabled(false);
    } else {
      setPostButtonDisabled(true);
      setPostTitle('');
    }
  }, [postBody, postTitle]);

  if (!post) {
    return (
      <div className="flex h-96 flex-1 items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className="relative flex h-full w-full flex-col space-y-3 bg-transparent py-4 sm:px-2">
        <div className="no-scrollbar h-full w-full overflow-scroll">
          <div className="flex items-start">
            <div className="relative mt-1 w-full">
              <div className="mb-6 h-96 overflow-y-scroll border-gray-800 text-lg text-gray-500">
                {postType !== 'SPARK' && <TagPost postType={postType} />}

                <TextareaAutosize
                  name="postBody"
                  rows={1}
                  className="mt-2 h-auto w-full resize-none border-0 bg-transparent p-0 text-lg text-white placeholder-gray-400 focus:border-0 focus:outline-none focus:ring-0"
                  placeholder="What's happening in your dev world? ..."
                  value={postBody}
                  onChange={(e) => {
                    setPostBody(e.target.value);
                    setPostType(
                      e.target.value.length > sparkCharCount ? 'POST' : 'SPARK'
                    );
                  }}
                />

                {postType === 'POLL' && (
                  <div className="my-2">
                    <div className="rounded-md border border-base-700 px-8 py-20 text-center">
                      Sorry, you cannot edit a poll once it has been posted.
                    </div>
                  </div>
                )}

                {uploading && (
                  <div className="flex justify-center">
                    <Loader />
                  </div>
                )}

                {coverImage !== '' && (
                  <div className="relative mt-4 mb-2 overflow-hidden rounded-md">
                    <img
                      src={coverImage}
                      className="h-auto w-full"
                      alt={postTitle}
                    />
                    <button
                      className="absolute top-2 right-2 rounded-md bg-black bg-opacity-70 p-2"
                      onClick={() => setCoverImage('')}
                    >
                      <IoTrashOutline className="mx-auto h-5 w-auto text-white" />
                    </button>
                  </div>
                )}

                {savedSkills.map((savedSkill, index) => (
                  <div
                    className="mt-1 mr-1 inline-flex items-center overflow-hidden rounded-full bg-base-600 pl-1 text-xs"
                    key={index}
                  >
                    <TagTech tech={savedSkill} />
                    <span
                      className="flex max-w-xs items-center space-x-1 truncate px-1 leading-relaxed text-base-400"
                      x-text="tag"
                    >
                      <Icon name={savedSkill} />
                      <span>{savedSkill}</span>
                    </span>
                    <button className="inline-block h-8 w-6 bg-base-600 align-middle text-base-400 focus:outline-none">
                      <IoCloseOutline
                        className="mx-auto h-4 w-4 fill-current"
                        onClick={() => {
                          removeSkill(savedSkill);
                        }}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="relative w-full">
          <div className="flex w-full space-x-6 text-base-400">
            <div className="flex w-full items-center space-x-3 text-base-400">
              <label
                htmlFor="coverImage"
                className="group relative flex cursor-pointer items-center space-x-1 text-base-400 hover:text-base-900 dark:text-base-300 dark:hover:text-base-50"
              >
                <ToolTip message="Add image" />
                <Icon name={'FiImage'} className="mx-auto h-4 w-auto" />
                <span className="hidden text-sm md:block">Image</span>
                <input
                  id="coverImage"
                  name="coverImage"
                  type="file"
                  className="sr-only"
                  onChange={(e) => handleUploadImage(e)}
                />
              </label>

              <button
                className="group relative flex items-center space-x-1 text-base-400 hover:text-base-900 dark:text-base-300 dark:hover:text-base-50"
                onClick={() => setPostType('POLL')}
              >
                <ToolTip message="Create a poll" />
                <Icon name={'FiPieChart'} className="mx-auto h-4 w-auto" />
                <span className="hidden text-sm md:block">Poll</span>
              </button>
              <button
                className="group relative flex items-center space-x-1 text-base-400 hover:text-base-900 dark:text-base-300 dark:hover:text-base-50"
                onClick={() => setShowFlair(!showFlair)}
              >
                <ToolTip message="Tag a topic" />
                <Icon name={'FiHash'} className="mx-auto h-4 w-auto" />
                <span className="hidden text-sm md:block">Topic</span>
              </button>
              <button
                className="group relative flex items-center space-x-1 text-base-400 hover:text-base-900 dark:text-base-300 dark:hover:text-base-50"
                onClick={() => setShowTech(!showTech)}
              >
                <ToolTip message="Tag tech stack" />
                <Icon name={'FiLayers'} className="mx-auto h-4 w-auto" />
                <span className="hidden text-sm md:block">Tech</span>
              </button>
            </div>

            {/* <label
              htmlFor="coverImage"
              className="flex cursor-pointer items-center space-x-2 font-semibold"
            >
              <IoImageOutline className="mx-auto h-6 w-auto text-base-400" />
              <span className="hidden text-sm md:block">Image</span>
              <input
                id="coverImage"
                name="coverImage"
                type="file"
                className="sr-only"
                onChange={(e) => handleUploadImage(e)}
              />
            </label>

            <button
              className="flex items-center space-x-2 font-semibold"
              onClick={() => setShowFlair(!showFlair)}
            >
              <IoPricetagOutline className="h-5 w-auto text-base-400" />
              <span className="hidden whitespace-nowrap text-sm md:block">
                Topic
              </span>
            </button> */}
            <button
              className="flex items-center space-x-2 font-semibold"
              onClick={() => setShowTech(!showTech)}
            >
              <IoCodeSlash className="mx-auto h-5 w-auto text-base-400" />
              <span className="hidden text-sm md:block">Tech</span>
            </button>
            <div className="flex w-full items-center justify-end space-x-2">
              <button
                onClick={() => setIsDeletePromptOpen(true)}
                className="btn btn-secondary btn-danger bg-transparent text-base-500 hover:bg-transparent hover:text-red-500"
              >
                <span>Delete</span>
              </button>
              {postButtonDisabled ? (
                <button type="button" className="btn btn-primary" disabled>
                  <span>Save</span>
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleSubmitPost()}
                >
                  <span>Save</span>
                </button>
              )}
            </div>
          </div>

          <ModalDialog
            show={showFlair}
            setShow={setShowFlair}
            title="Tag a topic to your post"
            dimensions={'sm:max-w-xl'}
          >
            <div className="">
              <div
                className="fixed inset-0"
                onClick={() => setShowFlair(!showFlair)}
              ></div>
              <div className="relative grid grid-cols-3 gap-4 py-6">
                {topics.map((item, index) => (
                  <button
                    onClick={() => {
                      setPostType(item.slug.toUpperCase());
                      setShowFlair(!showFlair);
                    }}
                    className="btn btn-sm btn-ghost btn-with-icon whitespace-nowrap"
                    key={index}
                  >
                    <Icon name={item.icon} />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </ModalDialog>

          {showTech && (
            <div className="absolute top-10 z-20 w-72 md:left-64">
              <div
                className="fixed inset-0"
                onClick={() => setShowTech(!showTech)}
              ></div>
              <div className="relative flex flex-col rounded-lg border bg-base-100 px-2 shadow-xl dark:border-base-800 dark:bg-base-900">
                <TagTech
                  savedSkills={savedSkills}
                  setSavedSkills={setSavedSkills}
                  setShowTech={setShowTech}
                />
              </div>
            </div>
          )}

          {/* <Transition show={showFlair}>
            <div className="absolute bottom-10 left-48 z-20 w-auto">
              <div
                className="fixed inset-0"
                onClick={() => setShowFlair(!showFlair)}
              ></div>
              <div className="relative flex h-40 w-auto flex-col divide-y-2 divide-base-700 overflow-scroll rounded-lg border border-base-800 bg-base-900 py-1 font-mono text-sm shadow-xl">
                {postTypeOptions.map((item, index) => (
                  <button
                    onClick={() => {
                      setPostType(item.type);
                      setShowFlair(!showFlair);
                    }}
                    className="flex py-2 px-3"
                    key={index}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </Transition> */}

          {/* <Transition show={showTech}>
            <div className="absolute bottom-10 left-64 z-20 w-72">
              <div
                className="fixed inset-0"
                onClick={() => setShowTech(!showTech)}
              ></div>
              <div className="relative flex flex-col rounded-lg border border-base-800 bg-base-900 py-2 px-2 shadow-xl">
                <TagTech
                  savedSkills={savedSkills}
                  setSavedSkills={setSavedSkills}
                  setShowTech={setShowTech}
                />
              </div>
            </div>
          </Transition> */}
        </div>
      </div>
    </>
  );
};

export default EditPost;
