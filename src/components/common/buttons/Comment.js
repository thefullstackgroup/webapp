import { useState } from 'react';
import ToolTip from 'components/common/elements/ToolTip';
import NewComment from 'components/modules/comments/NewComment';
import Icon from '../elements/Icon';

const ButtonComment = ({
  user,
  post,
  action = false,
  showLabel = false,
  toolTipPosition = top,
}) => {
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
        className="btn btn-ghost btn-with-icon group group relative cursor-pointer space-x-1 rounded-xl bg-transparent px-2 text-sm text-base-800 hover:bg-violet-500/40 hover:text-violet-500 dark:text-base-100 dark:hover:bg-violet-500/40 dark:hover:text-violet-500"
        onClick={() => handleComment()}
      >
        <ToolTip message="Comment" position={toolTipPosition} />
        <Icon
          name="FiMessageSquare"
          className="sm:group-hover:text-primary-500 h-6 w-6"
        />
        <span className="flex items-center text-sm">
          {post.numberOfComments}
        </span>
        {showLabel && <span>Comment</span>}
      </button>

      {user && (
        <NewComment user={user} show={show} setShow={setShow} project={post} />
      )}
    </>
  );
};

export default ButtonComment;
