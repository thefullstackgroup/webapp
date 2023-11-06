import axios from 'axios';
import Avatar from 'components/common/elements/Avatar';
import Icon from 'components/common/elements/Icon';
import Loader from 'components/common/elements/Loader';
import ToolTip from 'components/common/elements/ToolTip';
import ModalAlert from 'components/common/modals/ModalAlert';
import TagPostType from 'components/common/tags/TagPostType';
import TagStack from 'components/common/tags/TagStack';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { CgSpinner } from 'react-icons/cg';
import { FiSend } from 'react-icons/fi';
import { IoTrashOutline } from 'react-icons/io5';
import TextareaAutosize from 'react-textarea-autosize';
import { sendSlackMessage } from 'utils/slack/sendMessageSlack';
import TagTechStack from './TagTechStack';
import { topics } from './constants';

import MentionInput from 'components/common/elements/MentionInput';

const sparkCharCount = 300;
const initialPollOptions = ['', ''];

const CreatePost = ({ user }) => {
  const router = useRouter();
  const [postButtonDisabled, setPostButtonDisabled] = useState(true);
  const [posting, setPosting] = useState(false);
  const [showFlair, setShowFlair] = useState(false);
  const [showTech, setShowTech] = useState(false);
  const [savedSkills, setSavedSkills] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [postPublished, setPostPublished] = useState(false);
  const [postType, setPostType] = useState('SPARK');
  const [postTitle, setPostTitle] = useState('');
  const [pollOptions, setPollOptions] = useState(initialPollOptions);
  const [postBody, setPostBody] = useState('');
  const [coverImage, setCoverImage] = useState('');

  const addPollOption = (option) => {
    if (pollOptions.length > 5)
      alert(
        "Wow, that's a lof of choices! We recommend no more that 6 options for your poll."
      );
    else setPollOptions([...pollOptions, option]);
  };

  const updatePollOption = (key, text) => {
    const newPollOptions = Object.assign([...pollOptions], {
      [key]: text,
    });
    setPollOptions(newPollOptions);
  };

  const removePollOption = (index) => {
    setPollOptions([
      ...pollOptions.slice(0, index),
      ...pollOptions.slice(index + 1),
    ]);
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

  const handleSubmitPost = async () => {
    setPosting(true);
    // change post type if character count is great than Spark count
    let type = postType;
    if (postType === 'SPARK' && postBody.length > sparkCharCount) {
      type = 'POST';
      setPostType('POST');
    }

    if (
      postType === 'POLL' &&
      (pollOptions[0] === '' || pollOptions[1] === '')
    ) {
      alert('Please give at least 2 options for your poll');
      setPosting(false);
      return;
    }

    let title = postTitle;
    if (postTitle === '') {
      title = postBody.substring(0, 40);
      setPostTitle(title);
    }

    const data = {
      projectData: {
        projectName: postBody.substring(0, 30),
        projectBody: postBody,
        projectTechStack: savedSkills,
        projectImgURI: coverImage,
        projectVideoURI: '',
        pollOptions: postType === 'POLL' ? pollOptions : [],
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
      .post(`${process.env.BASEURL}/api/projects/project/add`, data)
      .then((result) => {
        setPostPublished(true);
        sendSlackMessage(
          `A post (${postType}) has been posted by the username '${user.displayName}'`
        );
        router.reload(`/hangout`);
      })
      .catch((error) => {
        console.log(error.response.data);
        setPosting(false);
      });
  };

  useEffect(() => {
    if (postBody.length > 0) {
      setPostButtonDisabled(false);
    } else {
      setPostButtonDisabled(true);
      setPostTitle('');
    }
  }, [postBody, postTitle]);

  return (
    <>
      <div className="box mx-0 mb-6 flex rounded-none border-0 border-b py-4 px-4 lg:rounded-lg lg:border lg:border-t">
        <div className="relative w-full">
          <div className="text-lg text-base-500">
            <div className="mb-6 flex items-start space-x-4">
              <div>
                <Avatar
                  image={user?.profilePicUrl}
                  name={user?.displayName}
                  dimensions={'w-10 h-10 mt-2'}
                />
              </div>
              <div className="h-auto w-full">
                {postType !== 'SPARK' && (
                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setPostType('SPARK');
                      }}
                      className="flex text-xs tracking-tight text-gray-500"
                    >
                      <TagPostType postType={postType} />
                    </button>
                  </div>
                )}

                <MentionInput
                  userId={user?.userId}
                  value={postBody}
                  onChange={setPostBody}
                  name="postBody"
                  placeholder={
                    postType === 'POLL'
                      ? `Type your poll question here...`
                      : `Share something today ...`
                  }
                />
              </div>
            </div>

            {postType === 'POLL' && (
              <div className="mb-8 ml-14 space-y-2">
                {pollOptions.map((item, index) => (
                  <div
                    className="grid grid-cols-12 items-center space-x-4"
                    key={index}
                  >
                    <div className="col-span-10">
                      <input
                        type="text"
                        placeholder={`Option ${index + 1}`}
                        name="postOption1"
                        className="text-input"
                        value={pollOptions[index]}
                        onChange={(e) =>
                          updatePollOption(index, e.target.value)
                        }
                      />
                    </div>
                    <div className="col-span-2">
                      {index > 1 && (
                        <button
                          onClick={() => removePollOption(index)}
                          className="btn btn-sm btn-ghost px-0"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => addPollOption('')}
                  className="btn btn-sm btn-ghost px-0"
                >
                  + Add option
                </button>
              </div>
            )}

            {uploading && (
              <div className="flex justify-center py-20">
                <Loader />
              </div>
            )}

            {coverImage != '' && (
              <div className="relative mt-4 mb-6 overflow-hidden rounded-md">
                <img
                  src={coverImage}
                  className="h-auto w-full"
                  alt={postTitle}
                />
                <button
                  className="btn btn-secondary absolute top-2 right-2 px-2"
                  onClick={() => setCoverImage('')}
                >
                  <IoTrashOutline className="mx-auto h-5 w-auto text-white" />
                </button>
              </div>
            )}

            <div className="flex flex-wrap items-center">
              {savedSkills.map((savedSkill, index) => (
                <button
                  onClick={() => {
                    removeSkill(savedSkill);
                  }}
                  key={index}
                >
                  <TagStack tech={savedSkill} size="xs" />
                </button>
              ))}
            </div>
          </div>
          <div className="relative w-full">
            <div className="flex items-center justify-between">
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

              {posting ? (
                <button className="btn-primary btn-with-icon" disabled={true}>
                  <CgSpinner className="h-auto w-4 animate-spin" />
                  <span>Posting...</span>
                </button>
              ) : (
                <button
                  className="btn btn-primary btn-with-icon pl-4"
                  onClick={handleSubmitPost}
                  disabled={postButtonDisabled}
                >
                  <FiSend className="h-auto w-4" />
                  <span>Post</span>
                </button>
              )}
            </div>

            <ModalAlert
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
                <div className="relative grid grid-cols-2 gap-4 py-6 lg:grid-cols-3">
                  {topics.map((item, index) => (
                    <button
                      onClick={() => {
                        setPostType(item.slug.toUpperCase());
                        setShowFlair(!showFlair);
                      }}
                      className="btn btn-sm btn-secondary btn-with-icon whitespace-nowrap rounded-full"
                      key={index}
                    >
                      <Icon name={item.icon} />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </ModalAlert>

            <TagTechStack
              postTechStack={savedSkills}
              setPostTechStack={setSavedSkills}
              show={showTech}
              setShow={setShowTech}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
