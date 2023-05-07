import axios from 'axios';
import { useState } from 'react';
import * as ga from 'lib/ga';
import { sendSlackMessage } from 'utils/slack/sendMessageSlack';
import { BiUpvote } from 'react-icons/bi';
import ToolTip from 'components/common/elements/ToolTip';

const ButtonVote = ({ user, post }) => {
  const postId = post._id || post.projectId;
  const [isLiked, setIsLiked] = useState(post.likedByCurrentUser || false);
  const [refreshLikes, setRefreshLikes] = useState(post?.numberOfLikes);

  const handleVote = async () => {
    setIsLiked(!isLiked);
    setRefreshLikes(!isLiked ? refreshLikes + 1 : refreshLikes - 1);

    const data = {
      projectId: postId,
    };

    if (!isLiked) {
      await axios.post(
        `${process.env.BASEURL}/api/projects/project/like`,
        data
      );

      ga.event({
        action: 'user_project_liked',
      });
      sendSlackMessage(`Upvoted the project titled '${post.projectName}'`);
    } else {
      await axios.post(
        `${process.env.BASEURL}/api/projects/project/unlike`,
        data
      );

      ga.event({
        action: 'user_project_unliked',
      });
      sendSlackMessage(
        `Removed their vote on the project titled '${post.projectName}'`
      );
    }
  };

  return (
    <button
      className="btn-secondary btn-with-icon bg-transparent hover:bg-tfstertiary-600/10 sm:hover:text-green-400 rounded-xl group pl-0 pr-2 text-sm space-x-1 group relative"
      onClick={() => handleVote()}
    >
      <ToolTip message="Upvote" />
      {isLiked ? (
        <>
          <BiUpvote className="text-tfstertiary-500 w-6 h-6" />
          <span className="text-tfstertiary-500">{Math.abs(refreshLikes)}</span>
        </>
      ) : (
        <>
          <BiUpvote className="w-6 h-6 sm:group-hover:text-green-400" />
          <span>{Math.abs(refreshLikes)}</span>
        </>
      )}
    </button>
  );
};

export default ButtonVote;
