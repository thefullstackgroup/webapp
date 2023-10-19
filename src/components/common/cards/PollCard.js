import useSWR from 'swr';
import React, { useEffect, useState } from 'react';
import Icon from '../elements/Icon';
import fetcher from 'utils/fetcher';
import axios from 'axios';
import SignUpPrompt from '../elements/SignUpPrompt';

const PollCard = ({ user, postId }) => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [pollVotes, setPollVotes] = useState(0);
  const [pollUserHasVoted, setPollUserHasVoted] = useState(false);
  const [leadingVote, setLeadingVote] = useState({});

  const url = `${process.env.BASEURL}/api/posts/polls/getPoll?postId=${postId}`;
  const { data: poll } = useSWR(url, fetcher);

  const handleCastVote = async (optionId) => {
    if (!user) {
      setShowSignUp(true);
      return;
    }

    await axios
      .get(
        `${process.env.BASEURL}/api/posts/polls/castVote?postId=${poll._id}&optionId=${optionId}`
      )
      .then((response) => {
        setPollUserHasVoted(true);
      })
      .catch((error) => {
        setPollUserHasVoted(true);
      });
  };

  useEffect(() => {
    const result = poll?.pollOptions?.reduce(
      (total, currentValue) => (total = total + currentValue.voteCount),
      0
    );

    const max = poll?.pollOptions?.reduce(
      (prev, current) => (prev.voteCount > current.voteCount ? prev : current),
      0
    );

    setLeadingVote(max);
    setPollVotes(result);
    setPollUserHasVoted(poll?.currentUserVoted);
  }, [poll]);

  if (!poll) {
    return (
      <div className="flex w-full flex-col items-center justify-center space-y-2 py-20 text-center">
        <Icon name="FiLoader" className="mb-1 h-5 w-5 animate-spin" />
      </div>
    );
  }

  return (
    <>
      {!pollUserHasVoted ? (
        <div className="mb-4 flex w-full flex-col space-y-2 px-4">
          {poll?.pollOptions?.map((option, index) => (
            <button
              className="btn btn-secondary btn-with-icon rounded-xl py-3 text-left"
              key={index}
              onClick={() => handleCastVote(option.pollOptionId)}
            >
              <Icon name="FiCircle" className="h-4 w-4" />
              <span>{option.optionText}</span>
            </button>
          ))}

          <div className="text-sm text-gray-400">
            {pollVotes} {pollVotes == 1 ? 'vote' : 'votes'}
          </div>
        </div>
      ) : (
        <div className="mb-4 flex w-full flex-col space-y-2 px-4">
          <div className="space-y-2 pr-4">
            {poll?.pollOptions?.map((option, index) => (
              <div className="relative w-full text-sm" key={index}>
                <div
                  className={
                    (leadingVote?.pollOptionId == option.pollOptionId
                      ? 'bg-cyan-default dark:bg-cyan-dark'
                      : 'bg-base-300/50 dark:bg-base-600') +
                    ' relative h-12 rounded-r-xl py-3 px-4'
                  }
                  style={{
                    width: `${
                      (option.voteCount / leadingVote.voteCount) * 100
                    }%`,
                  }}
                ></div>
                <div className="absolute top-0.5 flex w-full items-center space-x-4 py-3 px-3">
                  <span className="font-semibold">{`${(
                    (option.voteCount / pollVotes) *
                    100
                  ).toFixed(0)}%`}</span>
                  <span className="truncate text-sm">{option.optionText}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-sm text-gray-400">{pollVotes} votes</div>
        </div>
      )}

      <SignUpPrompt show={showSignUp} setShow={setShowSignUp} />
    </>
  );
};

export default PollCard;
