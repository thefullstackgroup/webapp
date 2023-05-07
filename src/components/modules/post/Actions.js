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
          className="flex space-x-1 text-slate-200 items-center font-semibold group relative"
          onClick={() => props.setShowCommentsModal(true)}
        >
          <ToolTip message={'Comment'} />
          <IoChatboxOutline className="w-6 h-auto sm:group-hover:text-link sm:group-hover:scale-125 duration-100" />
          <span className="flex items-center text-sm">{numberOfComments} </span>
        </button>
      ) : (
        <button
          className="btn-secondary btn-with-icon bg-transparent hover:bg-primary-400/20 sm:hover:text-primary-500 rounded-xl group pl-2 pr-2 text-sm space-x-1 cursor-pointer group relative"
          onClick={commentAction}
        >
          <ToolTip message={'Comment'} />
          <IoChatboxOutline className="w-6 h-auto sm:group-hover:text-primary-500" />
          <span className="flex items-center text-sm">{numberOfComments}</span>
        </button>
      )}

      {props.user.userId != props.project?.projectCreator?.userId ? (
        <ButtonAward user={props.user} post={props.project} />
      ) : (
        <div className="hidden md:inline-flex space-x-1 items-center text-slate-200 font-semibold cursor-default">
          {projectAwards != null && projectAwards > 0 ? (
            <BsGem className="h-6 w-7 text-primary-500" />
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
