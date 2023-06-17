import ButtonBookmark from 'components/common/buttons/Bookmark';
import ButtonShare from 'components/common/buttons/Share';
import ButtonVote from 'components/common/buttons/Vote';
import ButtonComment from 'components/common/buttons/Comment';
import ButtonAward from 'components/common/buttons/Award';

const Actions = (props) => {
  return (
    <>
      <div className="flex w-full items-center justify-around space-x-10">
        <ButtonVote
          user={props.user}
          post={props.project}
          showLabel={props.showLabel}
        />

        <ButtonComment
          user={props.user}
          post={props.project}
          action={props.setShowComments}
          showLabel={props.showLabel}
        />

        <ButtonAward
          user={props.user}
          post={props.project}
          showLabel={props.showLabel}
        />

        <ButtonBookmark
          user={props.user}
          project={props.project}
          showLabel={props.showLabel}
        />
        <ButtonShare
          url={`${process.env.BASEURL}/u/${props.project?.projectCreator?.displayName}/${props.project?.projectSlug}`}
          message={props.project?.projectName}
          showLabel={props.showLabel}
        />
      </div>
    </>
  );
};

export default Actions;
