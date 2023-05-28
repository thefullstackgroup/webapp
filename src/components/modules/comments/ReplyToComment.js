import axios from 'axios';
import { useState } from 'react';
import dynamic from 'next/dynamic';
const ReactMde = dynamic(() => import('react-mde'), { ssr: false });
import EmojiPicker from 'emoji-picker-react';
import Markdown from 'markdown-to-jsx';
import CodeBlock from 'components/common/elements/CodeBlock';
import Avatar from 'components/common/elements/Avatar';
import * as ga from 'lib/ga';
import ModalDialog from 'components/common/modals/ModalDialog';
import ToolTip from 'components/common/elements/ToolTip';
import { IoHappy, IoLogoMarkdown } from 'react-icons/io5';

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

  const onEmojiClick = (e) => {
    let sym = e.unified.split('-');
    let codesArray = [];
    sym.forEach((el) => codesArray.push('0x' + el));
    let emoji = String.fromCodePoint(...codesArray);
    setCommentReply(commentReply + emoji);
    setShowEmoji(false);
  };

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
                value: `**[@${response.data.content[i].displayName}](/${response.data.content[i].displayName})**`,
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
    <ModalDialog
      show={postCommentOpen}
      setShow={setPostCommentOpen}
      title="Post your reply"
      dimensions={'sm:max-w-screen-sm'}
      disabled
    >
      <div className="py-4">
        <div className="hidden items-start px-2 sm:flex">
          <Avatar
            image={commentReplyTo?.authorProfileImageURL}
            name={commentReplyTo?.authorName}
            dimensions="h-10 w-10"
          />
          <div className="no-scrollbar mr-0 ml-2 w-auto max-w-full overflow-scroll overscroll-contain rounded bg-base-600/80 p-4 py-2 sm:max-h-56">
            <p className="font-semibold text-white">
              {commentReplyTo?.authorName}
            </p>

            <div className="prose-comments no-scrollbar prose prose-dark w-full max-w-full overflow-scroll overscroll-contain rounded">
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

        <div className="relative mt-4 px-2">
          <div className="relative flex items-start sm:space-x-3">
            <div className="flex w-full sm:ml-12 sm:space-x-4">
              <Avatar
                image={user?.profilePicUrl}
                name={user?.displayName}
                dimensions="hidden sm:block h-10 w-10"
              />

              <div className="w-auto flex-1">
                <div className="block">
                  <div className="dark mb-2 w-full overflow-scroll rounded bg-base-700">
                    <ReactMde
                      value={commentReply}
                      onChange={setCommentReply}
                      selectedTab={selectedTab}
                      onTabChange={setSelectedTab}
                      minEditorHeight={150}
                      maxEditorHeight={250}
                      childProps={{
                        textArea: {
                          placeholder: 'Leave your reply ...',
                        },
                      }}
                      toolbarCommands={[]}
                      loadSuggestions={loadSuggestions}
                    />
                  </div>

                  <div className="item-center flex justify-between">
                    <div className="flex items-center space-x-4">
                      <button className="group relative text-xs text-base-400">
                        <ToolTip message={'Markdown supported'} />
                        <IoLogoMarkdown className="h-6 w-6 text-base-400" />
                      </button>
                      <button onClick={() => setShowEmoji(!showEmoji)}>
                        <IoHappy className="h-5 w-5 text-base-400" />
                      </button>
                    </div>
                    <button className="btn-primary" onClick={handlePostReply}>
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {showEmoji && (
          <div className="mt-2 sm:ml-28">
            <EmojiPicker
              theme="dark"
              lazyLoadEmojis={true}
              height={380}
              onEmojiClick={onEmojiClick}
            />
          </div>
        )}
      </div>
    </ModalDialog>
  );
};

export default ReplyToComment;
