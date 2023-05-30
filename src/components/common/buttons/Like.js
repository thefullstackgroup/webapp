import axios from 'axios';
import { useState } from 'react';
import { sendSlackMessage } from 'utils/slack/sendMessageSlack';
import * as ga from 'lib/ga';
import ToolTip from 'components/common/elements/ToolTip';
import { IoHeart, IoHeartOutline } from 'react-icons/io5';
import { BiUpvote } from 'react-icons/bi';

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
      {post.projectType === 'PROJECT' ? (
        <>
          <button
            className="btn btn-ghost btn-with-icon hover:bg-tfstertiary-600/10 group relative space-x-1 rounded-xl bg-transparent py-1 pl-0.5 pr-2 text-sm sm:hover:text-green-400"
            onClick={() => handleLike()}
          >
            <ToolTip message="Upvote" />
            {isLiked ? (
              <>
                <BiUpvote className="text-tfstertiary-500 h-6 w-6" />
                <span className="text-tfstertiary-500">
                  {Math.abs(refreshLikes)}
                </span>
              </>
            ) : (
              <>
                <BiUpvote className="h-6 w-6 sm:group-hover:text-green-400" />
                <span>{Math.abs(refreshLikes)}</span>
              </>
            )}
          </button>
        </>
      ) : (
        <button
          className="btn btn-ghost btn-with-icon group relative space-x-1 rounded-xl bg-transparent py-1 pl-0.5 pr-2 text-sm hover:bg-red-500/20 hover:text-red-400 dark:hover:bg-red-500/20 dark:hover:text-red-400"
          onClick={() => handleLike()}
        >
          <ToolTip message="Like" />
          {isLiked ? (
            <>
              <IoHeart className="h-6 w-6 text-red-500" />
              <span className="flex items-center text-sm text-red-400">
                {Math.abs(refreshLikes)}
              </span>
            </>
          ) : (
            <>
              <IoHeartOutline className="h-6 w-6 sm:group-hover:text-red-400" />
              <span>{Math.abs(refreshLikes)}</span>
            </>
          )}
        </button>
      )}
    </>
  );
};

export default ButtonLike;
