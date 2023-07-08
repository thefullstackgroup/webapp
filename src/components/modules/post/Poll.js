import { useEffect, useState } from 'react';
import Icon from 'components/common/elements/Icon';
import fetcher from 'utils/fetcher';
import useSWR from 'swr';
import SignUpPrompt from 'components/common/elements/SignUpPrompt';

const Poll = ({ user, post }) => {
  const [showSignUp, setShowSignUp] = useState(false);
  const projectId = post?.projectId || post?._id;
  const [pollVotes, setPollVotes] = useState(0);
  const [pollUserHasVoted, setPollUserHasVoted] = useState(false);
  const [leadingVote, setLeadingVote] = useState({});

  const url = `${process.env.BASEURL}/api/posts/polls/getPoll?postId=${projectId}`;
  const { data: pollData } = useSWR(url, fetcher);

  const handleCastVote = (optionId) => {
    if (!user) {
      setShowSignUp(true);
      return;
    }
    fetch(
      `${process.env.BASEURL}/api/posts/polls/castVote?postId=${pollData?._id}&optionId=${optionId}`
    )
      .then((response) => {
        if (response.status == 304) {
          setPollUserHasVoted(true);
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          setPollUserHasVoted(true);
        }
      });
  };

  useEffect(() => {
    if (pollData) {
      const result = pollData.pollOptions.reduce(
        (total, currentValue) => (total = total + currentValue.voteCount),
        0
      );
      const max = pollData.pollOptions.reduce(
        (prev, current) =>
          prev.voteCount > current.voteCount ? prev : current,
        0
      );
      setPollUserHasVoted(pollData.currentUserVoted);
      setLeadingVote(max);
      setPollVotes(result);
    }
  }, [pollData]);

  if (!pollData) {
    return (
      <div className="mt-4 flex w-full flex-col items-center justify-center space-y-2 py-20 text-center">
        <Icon name="FiLoader" className="mb-1 h-5 w-5 animate-spin" />
      </div>
    );
  }

  return (
    <>
      {!pollUserHasVoted && post?.projectType === 'POLL' && (
        <div className="mt-4 flex w-full flex-col space-y-2 px-4 sm:px-0">
          {pollData?.pollOptions?.map((option, index) => (
            <button
              className="btn btn-secondary btn-with-icon rounded-xl py-3 text-left"
              key={index}
              onClick={() => handleCastVote(option.pollOptionId)}
            >
              <Icon name="FiCircle" className="h-4 w-4" />
              <span>{option.optionText}</span>
            </button>
          ))}

          <div className="text-sm text-base-400">{pollVotes} votes</div>
        </div>
      )}

      {pollUserHasVoted && post?.projectType === 'POLL' && (
        <div className="mt-4 flex w-full flex-col space-y-2 px-4 sm:px-0">
          {pollData?.pollOptions?.map((option, index) => (
            <div className="relative w-full text-sm" key={index}>
              <div
                className={
                  (leadingVote?.pollOptionId == option.pollOptionId
                    ? 'bg-cyan-default dark:bg-cyan-dark'
                    : 'bg-base-300/50 dark:bg-base-600') +
                  ' relative h-11 rounded-r-xl py-2 px-4'
                }
                style={{
                  width: `${(option.voteCount / leadingVote.voteCount) * 100}%`,
                }}
              ></div>
              <div className="absolute top-0.5 flex w-full items-center space-x-4 py-2 px-4">
                <span className="font-semibold">{`${(
                  (option.voteCount / pollVotes) *
                  100
                ).toFixed(0)}%`}</span>
                <span className="text-base">{option.optionText}</span>
              </div>
            </div>
          ))}

          <div className="text-sm text-base-400">
            {pollVotes} {pollVotes == 1 ? 'vote' : 'votes'}
          </div>
        </div>
      )}

      <SignUpPrompt show={showSignUp} setShow={setShowSignUp} />
    </>
  );
};

export default Poll;
