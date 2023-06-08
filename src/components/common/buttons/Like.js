import axios from 'axios';
import { useState } from 'react';
import { sendSlackMessage } from 'utils/slack/sendMessageSlack';
import * as ga from 'lib/ga';
import ToolTip from 'components/common/elements/ToolTip';
import Icon from '../elements/Icon';

const ButtonLike = ({ user, post }) => {
  const postId = post._id || post.projectId;
  const [isLiked, setIsLiked] = useState(post.likedByCurrentUser || false);
  const [refreshLikes, setRefreshLikes] = useState(post?.numberOfLikes);

  const handleLike = async () => {
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

      sendSlackMessage(`Liked the project '${post.projectName}'`);

      ga.event({
        action: 'user_project_liked',
      });
    } else {
      await axios.post(
        `${process.env.BASEURL}/api/projects/project/unlike`,
        data
      );

      sendSlackMessage(`Unliked the project '${post.projectName}'`);

      ga.event({
        action: 'user_project_unliked',
      });
    }
  };

  return (
    <>
      <button
        className="btn btn-ghost btn-with-icon group relative space-x-1 rounded-xl bg-transparent py-1 pl-0.5 pr-2 text-sm hover:bg-red-500/20 hover:text-red-400 dark:hover:bg-red-500/20 dark:hover:text-red-400"
        onClick={() => handleLike()}
      >
        <ToolTip message="Like" />
        {isLiked ? (
          <>
            <Icon name="FiHeart" className="h-5 w-5 text-red-500" />
            <span className="flex items-center text-sm text-red-400">
              {Math.abs(refreshLikes)}
            </span>
          </>
        ) : (
          <>
            <Icon
              name="FiHeart"
              className="h-5 w-5 sm:group-hover:text-red-400"
            />
            <span>{Math.abs(refreshLikes)}</span>
          </>
        )}
      </button>
    </>
  );
};

export default ButtonLike;
