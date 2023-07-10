import axios from "axios";
import { useState } from "react";
import * as ga from "lib/ga";
import { sendSlackMessage } from "utils/slack/sendMessageSlack";
import ToolTip from "components/common/elements/ToolTip";
import Icon from "../elements/Icon";

const ButtonVote = ({
  user,
  post,
  showLabel = false,
  toolTipPosition = "top",
}) => {
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
        action: "user_project_liked",
      });
      sendSlackMessage(`Upvoted the project titled '${post.projectName}'`);
    } else {
      await axios.post(
        `${process.env.BASEURL}/api/projects/project/unlike`,
        data
      );

      ga.event({
        action: "user_project_unliked",
      });
      sendSlackMessage(
        `Removed their vote on the project titled '${post.projectName}'`
      );
    }
  };

  return isLiked ? (
    <button
      className="btn btn-ghost btn-with-icon group group relative cursor-pointer space-x-1 rounded-xl bg-transparent px-2 pl-1 text-sm text-green-600 hover:bg-green-500/20 dark:text-green-400 dark:hover:bg-green-500/20"
      onClick={() => handleVote()}
    >
      <ToolTip message="Remove upvote" position={toolTipPosition} />
      <Icon
        name={"FiTriangle"}
        className="darl:text-green-400 h-6 w-6 text-green-600"
      />
      <span className="text-green-600 dark:text-green-400">
        {Math.abs(refreshLikes)}
      </span>
      {showLabel && <span>Upvote</span>}
    </button>
  ) : (
    <button
      className="btn btn-ghost btn-with-icon group group relative cursor-pointer space-x-1 rounded-xl bg-transparent px-2 pl-1 text-sm text-base-800 hover:bg-green-500/20 hover:text-green-600 dark:text-base-100 dark:hover:bg-green-500/20 dark:hover:text-green-400"
      onClick={() => handleVote()}
    >
      <ToolTip message="Upvote" position={toolTipPosition} />
      {isLiked ? (
        <>
          <Icon
            name={"FiTriangle"}
            className="darl:text-green-400 h-6 w-6 text-green-600"
          />
          <span className="text-green-600 dark:text-green-400">
            {Math.abs(refreshLikes)}
          </span>
          {showLabel && <span>Upvote</span>}
        </>
      ) : (
        <>
          <Icon name={"FiTriangle"} className="h-6 w-6" />
          <span>{Math.abs(refreshLikes)}</span>
          {showLabel && <span>Upvote</span>}
        </>
      )}
    </button>
  );
};

export default ButtonVote;
