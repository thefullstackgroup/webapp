import { useState } from 'react';
import ToolTip from 'components/common/elements/ToolTip';
import NewComment from 'components/modules/comments/NewComment';
import { IoChatboxOutline } from 'react-icons/io5';

const ButtonComment = ({ user, post, action = false }) => {
  const [show, setShow] = useState(false);

  const handleComment = () => {
    if (action) {
      action(true);
    } else {
      setShow(!show);
    }
  };

  return (
    <>
      <button
        className="btn-secondary btn-with-icon bg-transparent hover:bg-primary-400/20 sm:hover:text-primary-500 rounded-xl group pl-1 pr-2 text-sm space-x-1 cursor-pointer group relative"
        onClick={() => handleComment()}
      >
        <ToolTip message="Comment" />
        <IoChatboxOutline className="w-6 h-auto sm:group-hover:text-primary-500" />
        <span className="flex items-center text-sm">
          {post.numberOfComments}
        </span>
      </button>

      <NewComment user={user} show={show} setShow={setShow} project={post} />
    </>
  );
};

export default ButtonComment;
