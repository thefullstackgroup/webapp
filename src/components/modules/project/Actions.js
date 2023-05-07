import ButtonBookmark from 'components/common/buttons/Bookmark';
import ButtonShare from 'components/common/buttons/Share';
import ButtonVote from 'components/common/buttons/Vote';
import ButtonComment from 'components/common/buttons/Comment';
import ButtonAward from 'components/common/buttons/Award';

const Actions = (props) => {
  return (
    <>
      <div className="flex justify-between gap-2 w-auto">
        <div className="flex items-center gap-2 sm:gap-6">
          <ButtonVote user={props.user} post={props.project} />
          <ButtonComment
            user={props.user}
            post={props.project}
            showModal={props.showCommentsModal}
            action={props.setShowCommentsModal}
          />
          <ButtonAward user={props.user} post={props.project} />
        </div>

        <div className="flex items-center gap-2">
          <ButtonBookmark user={props.user} project={props.project} />
          <ButtonShare
            url={`${process.env.BASEURL}/u/${props.project?.projectCreator?.displayName}/${props.project?.projectSlug}`}
            message={props.project?.projectName}
          />
        </div>
      </div>
    </>
  );
};

export default Actions;
