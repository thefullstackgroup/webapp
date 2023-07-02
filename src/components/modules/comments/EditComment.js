import axios from 'axios';
import { useState } from 'react';
import dynamic from 'next/dynamic';
const ReactMde = dynamic(() => import('react-mde'), { ssr: false });
import Avatar from 'components/common/elements/Avatar';
import ToolTip from 'components/common/elements/ToolTip';
import { IoLogoMarkdown } from 'react-icons/io5';
import ModalAlert from 'components/common/modals/ModalAlert';
import Icon from 'components/common/elements/Icon';
import SelectEmoji from 'components/common/elements/SelectEmoji';

const EditComment = ({
  commentToUpdate,
  user,
  editCommentOpen,
  setEditCommentOpen,
  projectId,
}) => {
  const [comment, setComment] = useState(commentToUpdate.commentText);
  const [showEmoji, setShowEmoji] = useState(false);
  const [selectedTab, setSelectedTab] = useState('write');
  const [mentionList, setMentionList] = useState([
    { preview: 'Type name', value: 'Type name' },
  ]);

  const MentionListItem = ({
    profilePicUrl,
    profileName,
    profileCurrentTitle,
  }) => {
    return (
      <div className="flex items-center space-x-2">
        <Avatar image={profilePicUrl} name={profileName} dimensions="h-8 w-8" />
        <div className="flex flex-col text-sm text-gray-700 dark:text-gray-200">
          <span className="font-semibold">{profileName}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {profileCurrentTitle}
          </span>
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

  const handleEditComment = async () => {
    if (!comment?.trim().length) {
      console.log('missing comment2asdvasd');
      return;
    }

    await axios.post(
      `${process.env.BASEURL}/api/posts/comments/updateComment?commentId=${commentToUpdate.id}`,
      {
        projectId: projectId,
        commentText: comment,
      }
    );
    setComment('');
    setEditCommentOpen(false);
  };

  return (
    <ModalAlert
      show={editCommentOpen}
      setShow={setEditCommentOpen}
      title="Update comment"
      dimensions={'sm:max-w-screen-sm'}
      disabled
    >
      <div className="relative py-4 px-2">
        <div className="relative flex items-start sm:space-x-3">
          <Avatar
            image={user.profilePicUrl}
            name={user.displayName}
            dimensions="h-10 w-10"
          />

          <div className=" w-auto flex-1">
            <div className="block">
              <div className="dark text-input mb-2 border">
                <ReactMde
                  value={comment}
                  onChange={setComment}
                  selectedTab={selectedTab}
                  onTabChange={setSelectedTab}
                  minEditorHeight={150}
                  maxEditorHeight={250}
                  childProps={{
                    textArea: {
                      placeholder: 'Edit comment ...',
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
                    <Icon name="FiSmile" className="h-5 w-5 text-base-400" />
                  </button>
                </div>
                <button className="btn btn-primary" onClick={handleEditComment}>
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
        <SelectEmoji
          show={showEmoji}
          setShow={setShowEmoji}
          text={comment}
          setText={setComment}
        />
      </div>
    </ModalAlert>
  );
};

export default EditComment;
