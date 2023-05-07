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
      <div className="flex mx-0 sm:mx-0 sm:rounded-lg sm:bg-tfsdark-800 mb-6 border-b sm:border-b-0 border-tfsdark-600">
        <div className="flex w-full">
          <div className="relative ml-2 mr-4 w-full pb-4">
            <div className="text-lg text-slate-500 border-gray-800 mb-2 px-2">
              {postType !== 'SPARK' && (
                <div className="flex items-center space-x-1 pt-2">
                  <TagPost postType={postType} />

                  <button
                    onClick={() => {
                      setPostType('SPARK');
                    }}
                    className="flex tracking-tight text-xs text-gray-500"
                  >
                    <IoClose className="h-4 w-auto" />
                  </button>
                </div>
              )}

              <TextareaAutosize
                name="postBody"
                autoFocus
                rows={1}
                className="text-input bg-transparent px-0"
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

              {postType === 'POLL' && (
                <div className="my-2">
                  {pollOptions.map((item, index) => (
                    <div
                      className="grid grid-cols-12 space-x-4 items-center"
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
                            className="text-primary-600 font-semibold text-base"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() => addPollOption('')}
                    className="text-primary-500 font-semibold text-base"
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
                <div className="relative rounded-md overflow-hidden mt-4 mb-2">
                  <img
                    src={coverImage}
                    className="w-full h-auto"
                    alt={postTitle}
                  />
                  <button
                    className="absolute top-2 right-2 bg-black bg-opacity-70 rounded-md p-2"
                    onClick={() => setCoverImage('')}
                  >
                    <IoTrashOutline className="h-5 mx-auto w-auto text-white" />
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
            <div className="w-full relative">
              <div className="flex justify-between">
                <div className="flex items-center space-x-4 text-gray-400 w-full mx-2">
                  <label
                    htmlFor="coverImage"
                    className="flex space-x-1 items-center font-semibold cursor-pointer"
                  >
                    <IoImageOutline className="h-5 mx-auto w-auto text-gray-400" />
                    <span className="hidden md:block text-sm">Image</span>
                    <input
                      id="coverImage"
                      name="coverImage"
                      type="file"
                      className="sr-only"
                      onChange={(e) => handleUploadImage(e)}
                    />
                  </label>

                  <button
                    className="flex space-x-1 items-center font-semibold"
                    onClick={() => setPostType('POLL')}
                  >
                    <BiPoll className="h-5 mx-auto w-auto text-gray-400" />
                    <span className="hidden md:block text-sm">Poll</span>
                  </button>
                  <button
                    className="flex space-x-1 items-center font-semibold"
                    onClick={() => setShowFlair(!showFlair)}
                  >
                    <IoPricetagOutline className="h-5 mx-auto w-auto text-gray-400" />
                    <span className="hidden md:block text-sm">Topic</span>
                  </button>
                  <button
                    className="flex space-x-1 items-center font-semibold"
                    onClick={() => setShowTech(!showTech)}
                  >
                    <IoCodeSlash className="h-5 mx-auto w-auto text-gray-400" />
                    <span className="hidden md:block text-sm">Tech</span>
                  </button>
                </div>

                {posting ? (
                  <button className="btn-primary btn-with-icon" disabled={true}>
                    <CgSpinner className="w-4 h-auto animate-spin" />
                    <span>Posting...</span>
                  </button>
                ) : (
                  <button
                    className="btn-primary btn-with-icon pl-4"
                    onClick={handleSubmitPost}
                    disabled={postButtonDisabled}
                  >
                    <FiSend className="w-4 h-auto" />
                    <span>Post</span>
                  </button>
                )}
              </div>

              {showFlair && (
                <div className="top-10 absolute z-20 md:left-72 w-auto">
                  <div
                    className="fixed inset-0"
                    onClick={() => setShowFlair(!showFlair)}
                  ></div>
                  <div className="relative w-48 bg-tfsdark-900 py-1 rounded-lg flex flex-col shadow-xl border border-tfsdark-800 overflow-scroll h-40 divide-y-2 divide-tfsdark-700 text-sm overscroll-contain">
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
                <div className="top-10 absolute z-20 md:left-64 w-72">
                  <div
                    className="fixed inset-0"
                    onClick={() => setShowTech(!showTech)}
                  ></div>
                  <div className="relative bg-tfsdark-900 rounded-lg flex flex-col shadow-xl px-2 border border-tfsdark-800 pb-1">
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
