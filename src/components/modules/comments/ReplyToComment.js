import axios from 'axios';
import { useState } from 'react';
import dynamic from 'next/dynamic';
const ReactMde = dynamic(() => import('react-mde'), { ssr: false });
import Markdown from 'markdown-to-jsx';
import CodeBlock from 'components/common/elements/CodeBlock';
import Avatar from 'components/common/elements/Avatar';
import * as ga from 'lib/ga';
import ToolTip from 'components/common/elements/ToolTip';
import { IoLogoMarkdown } from 'react-icons/io5';
import ModalAlert from 'components/common/modals/ModalAlert';
import Icon from 'components/common/elements/Icon';
import SelectEmoji from 'components/common/elements/SelectEmoji';
import MentionInput from 'components/common/elements/MentionInput';

const ReplyToComment = ({
  commentReplyTo,
  user,
  postCommentOpen,
  setPostCommentOpen,
  projectId,
}) => {
  const [commentReply, setCommentReply] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const [selectedTab, setSelectedTab] = useState('write');
  const [mentionList, setMentionList] = useState([
    { preview: 'Type name', value: 'Type name' },
  ]);

  // Tag mentions witing ReactMDE
  const MentionListItem = ({
    profilePicUrl,
    profileName,
    profileCurrentTitle,
  }) => {
    return (
      <div className="flex items-center space-x-2">
        <Avatar image={profilePicUrl} name={profileName} dimensions="h-8 w-8" />
        <div className="flex flex-col text-sm text-gray-200">
          <span className="font-semibold">{profileName}</span>
          <span className="text-xs text-gray-400">{profileCurrentTitle}</span>
        </div>
      </div>
    );
  };

  const searchUsers = (term) => {
    if (term.length > 1) {
      axios
        .post(
          `${process.env.BASEURL}/api/profile/search`,
          JSON.stringify(term),
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        .then((response) => {
          if (response.data.content.length > 0) {
            const results = [];
            var i;
            for (i = 0; i < response.data.content.length; i++) {
              results.push({
                preview: (
                  <MentionListItem
                    profilePicUrl={response.data.content[i].profilePicUrl}
                    profileName={response.data.content[i].name}
                    profileCurrentTitle={response.data.content[i].currentTitle}
                  />
                ),
                value: `[@${response.data.content[i].displayName}](/${response.data.content[i].displayName})`,
              });
            }
            setMentionList(results);
          }
        });
    }
  };

  const loadSuggestions = (text) => {
    return new Promise((accept, reject) => {
      setTimeout(() => {
        searchUsers(text);

        mentionList.filter((i) =>
          i.value.toLowerCase().includes(text.toLowerCase())
        );

        accept(mentionList);
        reject(mentionList);
      }, 100);
    });
  };
  // End Tag mentions witing ReactMDE

  const sendSlackMessage = async () => {
    await axios.post(
      `${process.env.BASEURL}/api/notifications/slack/postMessage`,
      {
        message: `User @${user.displayName} has replied to a comment on a post`,
      }
    );
  };

  // post comment
  const handlePostReply = async () => {
    if (!commentReply?.trim().length) {
      console.log('missing comment');
      return;
    }

    await axios.post(
      `${process.env.BASEURL}/api/posts/comments/postReply?commentId=${commentReplyTo.id}`,
      {
        projectId: projectId,
        commentText: commentReply,
      }
    );
    setCommentReply('');
    setPostCommentOpen(false);
    sendSlackMessage();
    ga.event({
      action: 'user_comment_reply',
    });
  };

  return (
    <ModalAlert
      show={postCommentOpen}
      setShow={setPostCommentOpen}
      title="Post your reply"
      dimensions={'sm:max-w-screen-sm'}
      disabled
    >
      <div className="py-4">
        <div className="hidden items-start sm:flex">
          <div>
            <Avatar
              image={commentReplyTo?.authorProfileImageURL}
              name={commentReplyTo?.authorName}
              dimensions="h-10 w-10"
            />
          </div>
          <div className="no-scrollbar mr-0 ml-2 w-auto max-w-full overflow-scroll overscroll-contain rounded bg-base-200/70 p-4 py-2 dark:bg-base-600/80 sm:max-h-56">
            <p className="text-sm font-medium">{commentReplyTo?.authorName}</p>

            <div className="prose-comments no-scrollbar prose w-full max-w-full overflow-scroll overscroll-contain rounded dark:prose-dark">
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
                  disableParsingRawHTML: true,
                }}
              >
                {commentReplyTo?.commentText}
              </Markdown>
            </div>
          </div>
        </div>

        <div className="relative mt-4">
          <div className="relative flex items-start sm:space-x-3">
            <div className="flex w-full sm:ml-12 sm:space-x-4">
              <div>
                <Avatar
                  image={user?.profilePicUrl}
                  name={user?.displayName}
                  dimensions="hidden sm:block h-10 w-10"
                />
              </div>
              <div className="w-auto flex-1">
                <div className="block">
                  <MentionInput
                    userId={user?.userId}
                    value={commentReply}
                    onChange={setCommentReply}
                    placeholder={'Leave your reply ....'}
                    name={'reply'}
                  />

                  <div className="item-center flex justify-between">
                    <div className="flex items-center space-x-4">
                      <button className="group relative text-xs text-base-400">
                        <ToolTip message={'Markdown supported'} />
                        <IoLogoMarkdown className="h-6 w-6 text-base-400" />
                      </button>
                      <button onClick={() => setShowEmoji(!showEmoji)}>
                        <Icon
                          name="FiSmile"
                          className="h-5 w-5 text-base-400"
                        />
                      </button>
                    </div>
                    <button
                      className="btn btn-primary"
                      onClick={handlePostReply}
                    >
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <SelectEmoji
          show={showEmoji}
          setShow={setShowEmoji}
          text={commentReply}
          setText={setCommentReply}
        />
      </div>
    </ModalAlert>
  );
};

export default ReplyToComment;
