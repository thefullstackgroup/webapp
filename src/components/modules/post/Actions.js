import ButtonAward from 'components/common/buttons/Award';
import ButtonLike from 'components/common/buttons/Like';
import ToolTip from 'components/common/elements/ToolTip';
import Icon from 'components/common/elements/Icon';
import { useState } from 'react';
import SignUpPrompt from 'components/common/elements/SignUpPrompt';

const Actions = (props) => {
  const [showSignUp, setShowSignUp] = useState(false);
  const numberOfComments = props.project.numberOfComments;
  let commentAction = props.setNewCommentOpen;
  if (props.setShowPost) commentAction = props.setShowPost;

  return (
    <>
      {props.user ? (
        <div className="flex justify-between border-t border-base-200 px-4 py-2 dark:border-base-700/70">
          <ButtonLike user={props.user} post={props.project} />

          {props.setShowCommentsModal ? (
            <button
              className="group relative flex items-center space-x-1 font-semibold text-base-200"
              onClick={() => props.setShowCommentsModal(true)}
            >
              <ToolTip message={'Comment'} />
              <Icon
                name="FiMessageSquare"
                className="h-auto w-6 duration-100"
              />
              <span className="flex items-center text-sm">
                {numberOfComments}{' '}
              </span>
            </button>
          ) : (
            <button
              className="btn btn-ghost btn-with-icon group group relative cursor-pointer space-x-1 rounded-xl bg-transparent px-2 text-sm text-base-800 hover:bg-violet-500/40 hover:text-violet-500 dark:text-base-200 dark:hover:bg-violet-500/40 dark:hover:text-violet-500"
              onClick={() => commentAction(true)}
            >
              <ToolTip message={'Comment'} />
              <Icon name="FiMessageSquare" className="h-auto w-6" />
              <span className="flex items-center text-sm">
                {numberOfComments}
              </span>
            </button>
          )}

          <ButtonAward user={props.user} post={props.project} />
        </div>
      ) : (
        <div className="flex justify-between border-t border-base-200 px-4 py-2 dark:border-base-700">
          <button
            className="btn btn-ghost btn-with-icon group relative space-x-1 rounded-xl bg-transparent py-1 pl-0.5 pr-2 text-sm text-base-800 hover:bg-red-500/20 hover:text-red-400 dark:text-base-200 dark:hover:bg-red-500/20 dark:hover:text-red-400"
            onClick={() => setShowSignUp(!showSignUp)}
          >
            <ToolTip message="Like" />

            <Icon name="FiHeart" className="h-5 w-5" />
            <span>{Math.abs(props.project.numberOfLikes)}</span>
          </button>
          <button
            className="btn btn-ghost btn-with-icon group group relative cursor-pointer space-x-1 rounded-xl bg-transparent px-2 text-sm text-base-800 hover:bg-violet-500/40 hover:text-violet-500 dark:text-base-200 dark:hover:bg-violet-500/40 dark:hover:text-violet-500"
            onClick={() => setShowSignUp(!showSignUp)}
          >
            <ToolTip message="Comment" />
            <Icon name="FiMessageSquare" className="h-5 w-5" />
            <span>{Math.abs(props.project.numberOfComments)}</span>
          </button>
          <button
            className="btn btn-ghost btn-with-icon group group relative cursor-pointer space-x-1 rounded-xl bg-transparent px-2 text-sm text-base-800 hover:bg-yellow-500/40 hover:text-yellow-600 dark:text-base-200 dark:hover:bg-yellow-500/40 dark:hover:text-yellow-500"
            onClick={() => setShowSignUp(!showSignUp)}
          >
            <ToolTip message="Award" />
            <Icon name="FiStar" className="h-5 w-5" />
            <span>{Math.abs(props.project.contentTotalDiamonds)}</span>
          </button>
        </div>
      )}

      <SignUpPrompt show={showSignUp} setShow={setShowSignUp} />
    </>
  );
};

export default Actions;
