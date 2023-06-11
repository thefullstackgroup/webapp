import ButtonAward from 'components/common/buttons/Award';
import ButtonLike from 'components/common/buttons/Like';
import ToolTip from 'components/common/elements/ToolTip';
import Icon from 'components/common/elements/Icon';

const Actions = (props) => {
  const numberOfComments = props.project.numberOfComments;
  let commentAction = props.setNewCommentOpen;
  if (props.setShowPost) commentAction = props.setShowPost;

  return (
    <>
      <ButtonLike user={props.user} post={props.project} />

      {props.setShowCommentsModal ? (
        <button
          className="group relative flex items-center space-x-1 font-semibold text-base-200"
          onClick={() => props.setShowCommentsModal(true)}
        >
          <ToolTip message={'Comment'} />
          <Icon name="FiMessageSquare" className="h-auto w-6 duration-100" />
          <span className="flex items-center text-sm">{numberOfComments} </span>
        </button>
      ) : (
        <button
          className="btn btn-ghost btn-with-icon group group relative cursor-pointer space-x-1 rounded-xl bg-transparent px-2 text-sm hover:bg-violet-500/40 hover:text-violet-500 dark:hover:bg-violet-500/40 dark:hover:text-violet-500"
          onClick={commentAction}
        >
          <ToolTip message={'Comment'} />
          <Icon name="FiMessageSquare" className="h-auto w-6" />
          <span className="flex items-center text-sm">{numberOfComments}</span>
        </button>
      )}

      <ButtonAward user={props.user} post={props.project} />
    </>
  );
};

export default Actions;
