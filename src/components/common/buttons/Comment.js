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
        className="btn btn-ghost btn-with-icon group group relative cursor-pointer space-x-1 rounded-xl bg-transparent px-2 text-sm dark:text-base-200 dark:hover:bg-violet-500/40 dark:hover:text-violet-500"
        onClick={() => handleComment()}
      >
        <ToolTip message="Comment" />
        <IoChatboxOutline className="sm:group-hover:text-primary-500 h-auto w-6" />
        <span className="flex items-center text-sm">
          {post.numberOfComments}
        </span>
      </button>

      <NewComment user={user} show={show} setShow={setShow} project={post} />
    </>
  );
};

export default ButtonComment;
