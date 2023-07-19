import React, { useState } from 'react';
import useSWR from 'swr';
import { useAuthUser } from 'next-firebase-auth';
import axios from 'axios';
import Link from 'next/link';
import Confetti from 'react-confetti';
import * as ga from 'lib/ga';
import { sendSlackMessage } from 'utils/slack/sendMessageSlack';
import ToolTip from 'components/common/elements/ToolTip';
import fetcher from 'utils/fetcher';
import Icon from '../elements/Icon';
import ModalAlert from '../modals/ModalAlert';

const rewards = [
  { amount: 0.05, numberOfDiamonds: 1 },
  { amount: 0.1, numberOfDiamonds: 2 },
  { amount: 0.5, numberOfDiamonds: 3 },
  { amount: 1.0, numberOfDiamonds: 4 },
  { amount: 5.0, numberOfDiamonds: 5 },
];

const AwardButton = ({
  user,
  post,
  showLabel = false,
  toolTipPosition = 'top',
}) => {
  const [selectAward, setSelectAward] = useState(false);
  const [sendReward, setSendReward] = useState(false);
  const [coinSent, setCoinSent] = useState(false);
  const [transactAmount, setTransactAmount] = useState(0);
  const [transactDiamonds, setTransactDiamonds] = useState(0);
  const [transactMessage, setTransactMessage] = useState(false);
  const AuthUser = useAuthUser();

  const url = `${process.env.BASEURL}/api/profile/wallet/get`;
  const { data } = useSWR(url, fetcher);
  const walletBalance = data ? data?.total : 0;

  const handleSendCoin = async (transactToUsedId) => {
    setCoinSent(false);

    const transactData = {
      idOfUserToGift: transactToUsedId,
      amountToGift: transactAmount,
      contentId: post.projectId || post._id,
      customMessage: transactMessage,
    };

    const accessToken = await AuthUser.getIdToken();

    await axios.patch(
      `${process.env.BASEURL}/api/profile/wallet/gift`,
      transactData,
      {
        headers: { Authorization: accessToken },
      }
    );
    setCoinSent(true);
    sendSlackMessage(
      `Awarded ${transactDiamonds} diamond(s) of value $${transactAmount} to @${post.projectCreator.displayName}`
    );
    ga.event({
      action: 'user_coin_spent',
      label: 10,
    });
  };

  return (
    <>
      {user?.userId === post?.projectCreator?.userId ? (
        <button className="btn btn-ghost btn-with-icon group relative cursor-not-allowed space-x-1 bg-transparent px-2 text-sm text-base-800 hover:bg-transparent dark:text-base-200">
          <ToolTip message="Award" position={toolTipPosition} />
          {post.contentTotalDiamonds != null &&
          post.contentTotalDiamonds > 0 ? (
            <Icon name={'FiStar'} className="h-6 w-6 dark:text-yellow-500" />
          ) : (
            <Icon name={'FiStar'} className="h-6 w-6" />
          )}

          {post.contentTotalDiamonds != null &&
          post.contentTotalDiamonds > 0 ? (
            <span className="">{post.contentTotalDiamonds}</span>
          ) : (
            <span className="">0</span>
          )}
        </button>
      ) : (
        <div>
          <button
            className="btn btn-ghost btn-with-icon group group relative cursor-pointer space-x-1 rounded-xl bg-transparent px-2 text-sm text-base-800 hover:bg-yellow-500/40 hover:text-yellow-600 dark:text-base-200 dark:hover:bg-yellow-500/40 dark:hover:text-yellow-500"
            onClick={() => setSelectAward(!selectAward)}
          >
            <ToolTip message="Award" position={toolTipPosition} />
            {post.contentTotalDiamonds != null &&
            post.contentTotalDiamonds > 0 ? (
              <Icon name={'FiStar'} className="h-6 w-6 text-yellow-500" />
            ) : (
              <Icon name={'FiStar'} className="h-6 w-6" />
            )}

            {post.contentTotalDiamonds != null &&
            post.contentTotalDiamonds > 0 ? (
              <span className="text-yellow-500">
                {post.contentTotalDiamonds}
              </span>
            ) : (
              <span className="">0</span>
            )}
            {showLabel && <span>Award</span>}
          </button>

          <ModalAlert
            show={selectAward}
            setShow={setSelectAward}
            title="Give reward"
          >
            <div className="flex flex-col space-y-4 px-2 py-8 text-center">
              <span className="mb-3 text-base font-normal line-clamp-2">
                Select your reward amount to gift to{' '}
                <span className="font-bold">
                  {post.projectCreator?.displayName}
                </span>
                .
              </span>
              <div className="flex flex-col space-y-3">
                {rewards.map((reward, index) => (
                  <button
                    key={index}
                    className="btn btn-with-icon btn-secondary group justify-between hover:border-yellow-500 hover:bg-base-50 hover:text-yellow-500 dark:hover:border-yellow-500 dark:hover:text-yellow-500"
                    onClick={() => {
                      setTransactMessage(
                        `@${
                          user.displayName
                        } rewarded you $${reward.amount.toFixed(2)} coin'`
                      );
                      setTransactAmount(reward.amount);
                      setTransactDiamonds(reward.numberOfDiamonds);
                      setSendReward(true);
                    }}
                  >
                    <div className="flex space-x-2">
                      {[...Array(reward.numberOfDiamonds)].map(
                        (elementInArray, index) => (
                          <Icon
                            name={'FiStar'}
                            key={index}
                            className="h-6 w-6 dark:group-hover:text-yellow-500"
                          />
                        )
                      )}
                    </div>
                    <span>${reward.amount.toFixed(2)}</span>
                  </button>
                ))}
              </div>
            </div>
          </ModalAlert>

          <ModalAlert
            show={sendReward}
            setShow={setSendReward}
            title="Give reward"
          >
            <div className="flex flex-col space-y-4 py-4 px-2 text-center">
              {!coinSent && (
                <div className="">
                  <div className="my-2 flex justify-center space-x-2">
                    {[...Array(transactDiamonds)].map(
                      (elementInArray, index) => (
                        <Icon
                          name={'FiStar'}
                          key={index}
                          className="h-10 w-10 text-yellow-400"
                        />
                      )
                    )}
                  </div>
                  <span className="text-xl font-medium">
                    Send ${transactAmount} reward to{' '}
                    {post.projectCreator.displayName}?
                  </span>
                  <span>
                    {transactAmount > walletBalance && (
                      <p className="mt-2 text-sm text-red-500">
                        Oops, you dont have enough coin in your wallet. <br />
                        <Link href="/account/wallet">
                          <a href="#" className="font-bold hover:text-red-500">
                            Click to claim free coin.
                          </a>
                        </Link>
                      </p>
                    )}
                    <p className="mt-2 text-sm text-base-500">
                      Your current balance is ${walletBalance?.toFixed(2)}
                    </p>
                  </span>

                  <div className="my-6 flex flex-col-reverse items-center justify-center space-y-4 space-y-reverse sm:flex-row sm:space-y-0 sm:space-x-2">
                    <button
                      className="btn btn-secondary w-full sm:w-auto"
                      onClick={() => {
                        setSendReward(false);
                        setSelectAward(true);
                      }}
                    >
                      Cancel
                    </button>

                    {transactAmount <= walletBalance && (
                      <button
                        className="btn btn-primary w-full sm:w-auto"
                        onClick={() => handleSendCoin(post.userId)}
                      >
                        Send reward
                      </button>
                    )}
                  </div>
                </div>
              )}

              {coinSent && (
                <>
                  <div className="relative overflow-hidden">
                    <Confetti />
                    <div className="mx-auto max-w-7xl py-4 px-2 sm:py-4 sm:px-6 lg:px-8">
                      <div>
                        <Icon
                          name="IoCheckmarkSharp"
                          pack="Io"
                          className="mx-auto h-12 w-12 text-green-500"
                        />
                        <p className="p-4 text-center text-xl font-semibold">
                          Reward sent to {post.projectCreator.name}
                        </p>
                        <p>
                          You are awesome! <br />
                          Your balance is now ${walletBalance.toFixed(2)}.
                        </p>
                        <button
                          className="btn btn-primary mt-6"
                          onClick={() => setSendReward(false)}
                        >
                          <span>Done</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </ModalAlert>
        </div>
      )}
    </>
  );
};

export default AwardButton;
