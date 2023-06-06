import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { sendSlackMessage } from 'utils/slack/sendMessageSlack';
import TextareaAutosize from 'react-textarea-autosize';
import TagPost from 'components/common/tags/TagPostType';
import TagTech from 'components/modules/hangout/TagTech';
import Loader from 'components/common/elements/Loader';
import { CgSpinner } from 'react-icons/cg';
import { BiPoll } from 'react-icons/bi';
import { FiSend } from 'react-icons/fi';
import {
  IoCodeSlash,
  IoImageOutline,
  IoPricetagOutline,
  IoTrashOutline,
  IoClose,
} from 'react-icons/io5';
import TagStack from 'components/common/tags/TagStack';
import Avatar from 'components/common/elements/Avatar';

const postTypeOptions = [
  {
    label: 'Spark',
    type: 'spark',
    icon: 'HiOutlineLightningBolt',
  },
  {
    label: 'Braindump',
    type: 'POST',
    icon: 'HiOutlineMenu',
  },
  {
    label: 'Frameworks',
    type: 'FRAMEWORKS',
    icon: 'HiOutlineTerminal',
  },
  {
    label: 'Utilities',
    type: 'UTILITIES',
    icon: 'HiOutlineCubeTransparent',
  },
  {
    label: 'Tutorial',
    type: 'TUTORIALS',
    icon: 'HiOutlinePresentationChartBar',
  },
  {
    label: 'Learning',
    type: 'LEARNING',
    icon: 'HiOutlineAcademicCap',
  },
  {
    label: 'Ask Community',
    type: 'ADVICE',
    icon: 'HiOutlineHand',
  },
  {
    label: 'Career Advice',
    type: 'CAREER_ADVICE',
    icon: 'HiOutlineHand',
  },
  {
    label: 'Working Remotely',
    type: 'WORKING_REMOTELY',
    icon: 'HiOutlineRss',
  },
  {
    label: 'My Desk Setup',
    type: 'DESK_SETUP',
    icon: 'HiOutlineDesktopComputer',
  },
  {
    label: 'Design Tips',
    type: 'DESIGN_TIPS',
    icon: 'HiOutlineColorSwatch',
  },
  {
    label: 'Got The Job',
    type: 'GOT_THE_JOB',
    icon: 'HiOutlineThumbUp',
  },
  {
    label: 'Meme',
    type: 'MEME',
    icon: 'HiOutlineEmojiHappy',
  },
  {
    label: 'Project Idea',
    type: 'PROJECT_IDEAS',
    icon: 'HiOutlineLightBulb',
  },
  {
    label: 'Pair Up',
    type: 'COLLABS',
    icon: 'HiOutlineUsers',
  },
];

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
      <div className="mx-0 mb-6 flex rounded-md border border-base-200 py-6 dark:border-base-700">
        <div className="flex w-full px-4">
          <div className="relative ml-2 mr-4 w-full">
            <div className="mb-2 px-2 text-lg text-base-500">
              {postType !== 'SPARK' && (
                <div className="flex items-center space-x-1 pt-2">
                  <TagPost postType={postType} />

                  <button
                    onClick={() => {
                      setPostType('SPARK');
                    }}
                    className="flex text-xs tracking-tight text-gray-500"
                  >
                    <IoClose className="h-4 w-auto" />
                  </button>
                </div>
              )}

              <div className="flex items-start space-x-4">
                <Avatar
                  image={user?.profilePicUrl}
                  name={user?.displayName}
                  dimensions={'w-9 h-9 mt-4'}
                />
                <TextareaAutosize
                  name="postBody"
                  autoFocus
                  rows={1}
                  className="text-input border-0 bg-transparent px-0 text-lg"
                  placeholder={
                    postType === 'POLL'
                      ? `Type question here...`
                      : `Share something today ...`
                  }
                  value={postBody}
                  onChange={(e) => {
                    setPostBody(e.target.value);
                  }}
                />
              </div>

              {postType === 'POLL' && (
                <div className="my-2">
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
                            className="text-primary-600 text-base font-semibold"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() => addPollOption('')}
                    className="text-primary-500 text-base font-semibold"
                  >
                    + Add option
                  </button>
                </div>
              )}

              {uploading && (
                <div className="flex justify-center">
                  <Loader />
                </div>
              )}

              {coverImage != '' && (
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

              <div className="flex items-center">
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
              <div className="flex justify-between">
                <div className="mx-2 flex w-full items-center space-x-4 text-gray-400">
                  <label
                    htmlFor="coverImage"
                    className="flex cursor-pointer items-center space-x-1 font-semibold"
                  >
                    <IoImageOutline className="mx-auto h-5 w-auto text-gray-400" />
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
                    className="flex items-center space-x-1 font-semibold"
                    onClick={() => setPostType('POLL')}
                  >
                    <BiPoll className="mx-auto h-5 w-auto text-gray-400" />
                    <span className="hidden text-sm md:block">Poll</span>
                  </button>
                  <button
                    className="flex items-center space-x-1 font-semibold"
                    onClick={() => setShowFlair(!showFlair)}
                  >
                    <IoPricetagOutline className="mx-auto h-5 w-auto text-gray-400" />
                    <span className="hidden text-sm md:block">Topic</span>
                  </button>
                  <button
                    className="flex items-center space-x-1 font-semibold"
                    onClick={() => setShowTech(!showTech)}
                  >
                    <IoCodeSlash className="mx-auto h-5 w-auto text-gray-400" />
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

              {showFlair && (
                <div className="absolute top-10 z-20 w-auto md:left-72">
                  <div
                    className="fixed inset-0"
                    onClick={() => setShowFlair(!showFlair)}
                  ></div>
                  <div className="relative flex h-40 w-48 flex-col divide-y-2 divide-base-700 overflow-scroll overscroll-contain rounded-lg border border-base-800 bg-base-900 py-1 text-sm shadow-xl">
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
              )}

              {showTech && (
                <div className="absolute top-10 z-20 w-72 md:left-64">
                  <div
                    className="fixed inset-0"
                    onClick={() => setShowTech(!showTech)}
                  ></div>
                  <div className="relative flex flex-col rounded-lg border border-base-800 bg-base-900 px-2 pb-1 shadow-xl">
                    <TagTech
                      savedSkills={savedSkills}
                      setSavedSkills={setSavedSkills}
                      setShowTech={setShowTech}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
