import ButtonBookmark from 'components/common/buttons/Bookmark';
import ButtonShare from 'components/common/buttons/Share';
import ButtonVote from 'components/common/buttons/Vote';
import ButtonComment from 'components/common/buttons/Comment';
import ButtonAward from 'components/common/buttons/Award';

const Actions = (props) => {
  return (
    <>
      <div className="flex w-auto items-center justify-between gap-2">
        <ButtonVote user={props.user} post={props.project} />
        <ButtonComment
          user={props.user}
          post={props.project}
          showModal={props.showCommentsModal}
          action={props.setShowCommentsModal}
        />
        <ButtonAward user={props.user} post={props.project} />

        <ButtonBookmark user={props.user} project={props.project} />
        <ButtonShare
          url={`${process.env.BASEURL}/u/${props.project?.projectCreator?.displayName}/${props.project?.projectSlug}`}
          message={props.project?.projectName}
        />
      </div>
    </>
  );
};

export default Actions;
