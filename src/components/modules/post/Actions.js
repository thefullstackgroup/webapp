import { useState } from 'react';
import ButtonAward from 'components/common/buttons/Award';
import ButtonLike from 'components/common/buttons/Like';

import { IoChatboxOutline } from 'react-icons/io5';
import { BsGem } from 'react-icons/bs';
import ToolTip from 'components/common/elements/ToolTip';

const Actions = (props) => {
  const numberOfComments = props.project.numberOfComments;
  const [projectAwards, setProjectAwards] = useState(
    props.project.contentTotalDiamonds
  );

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
          <IoChatboxOutline className="sm:group-hover:text-link h-auto w-6 duration-100 sm:group-hover:scale-125" />
          <span className="flex items-center text-sm">{numberOfComments} </span>
        </button>
      ) : (
        <button
          className="btn btn-ghost btn-with-icon group group relative cursor-pointer space-x-1 rounded-xl bg-transparent px-2 text-sm dark:hover:bg-violet-500/40 dark:hover:text-violet-500"
          onClick={commentAction}
        >
          <ToolTip message={'Comment'} />
          <IoChatboxOutline className="sm:group-hover:text-primary-500 h-auto w-6" />
          <span className="flex items-center text-sm">{numberOfComments}</span>
        </button>
      )}

      {props.user?.userId != props.project?.projectCreator?.userId ? (
        <ButtonAward user={props.user} post={props.project} />
      ) : (
        <div className="hidden cursor-default items-center space-x-1 font-semibold text-base-200 md:inline-flex">
          {projectAwards != null && projectAwards > 0 ? (
            <BsGem className="text-primary-500 h-6 w-7" />
          ) : (
            <BsGem className="h-6 w-7" />
          )}

          {projectAwards != null && projectAwards > 0 ? (
            <span className="text-sm">{projectAwards}</span>
          ) : (
            <span className="text-sm">0</span>
          )}
        </div>
      )}
    </>
  );
};

export default Actions;
