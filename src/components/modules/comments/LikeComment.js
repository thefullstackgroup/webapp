import axios from 'axios';
import Icon from 'components/common/elements/Icon';
import { useState } from 'react';
import { sendSlackMessage } from 'utils/slack/sendMessageSlack';

const LikeComment = ({ comment }) => {
  const [isLiked, setIsLiked] = useState(comment.likedByYou || false);
  const [count, setCount] = useState(comment.commentLikeCount || 0);

  const performLike = (comment) => {
    if (isLiked) {
      axios.post(`${process.env.BASEURL}/api/posts/comments/unlikeComment`, {
        commentId: comment.id,
      });
      setIsLiked(false);
      setCount(count - 1);
      sendSlackMessage(
        `Unliked the comment "${comment.commentText}" by @${comment.authorName}`
      );
    } else {
      axios.post(`${process.env.BASEURL}/api/posts/comments/likeComment`, {
        commentId: comment.id,
      });
      setIsLiked(true);
      setCount(count + 1);
      sendSlackMessage(
        `Liked the comment "${comment.commentText}" by @${comment.authorName}`
      );
    }
  };

  return isLiked ? (
    <button
      className="flex items-center text-red-500 focus:outline-none"
      onClick={() => performLike(comment)}
    >
      <Icon name="FaHeart" pack="Fa" className="mr-1 h-4 w-4" />
      <span className="">{count}</span>
    </button>
  ) : (
    <button
      className="flex items-center text-base-400 hover:text-base-500 focus:outline-none"
      onClick={() => performLike(comment)}
    >
      <Icon name="FiHeart" className="mr-1 h-4 w-4" />
      <span className="">{count}</span>
    </button>
  );
};

export default LikeComment;
