import React, { useState } from 'react';
import useSWR from 'swr';
import { useAuthUser } from 'next-firebase-auth';
import axios from 'axios';
import Link from 'next/link';
import ModalDialog from 'components/common/modals/ModalDialog';
import Confetti from 'react-confetti';
import * as ga from 'lib/ga';
import { BsGem } from 'react-icons/bs';
import { IoCheckmarkSharp } from 'react-icons/io5';
import { sendSlackMessage } from 'utils/slack/sendMessageSlack';
import ToolTip from 'components/common/elements/ToolTip';
import fetcher from 'utils/fetcher';
import Icon from '../elements/Icon';

const rewards = [
  { amount: 0.05, numberOfDiamonds: 1 },
  { amount: 0.1, numberOfDiamonds: 2 },
  { amount: 0.5, numberOfDiamonds: 3 },
  { amount: 1.0, numberOfDiamonds: 4 },
  { amount: 5.0, numberOfDiamonds: 5 },
];

const AwardButton = ({ user, post }) => {
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
        <button className="btn btn-ghost btn-with-icon group relative cursor-not-allowed space-x-1 bg-transparent px-2 text-sm hover:bg-transparent">
          <ToolTip message="Award" />
          {post.contentTotalDiamonds != null &&
          post.contentTotalDiamonds > 0 ? (
            <BsGem className="h-5 w-5 dark:text-yellow-500" />
          ) : (
            <BsGem className="h-5 w-5" />
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
            className="btn btn-ghost btn-with-icon group group relative cursor-pointer space-x-1 rounded-xl bg-transparent px-2 text-sm dark:text-base-200 dark:hover:bg-yellow-500/40 dark:hover:text-yellow-500"
            onClick={() => setSelectAward(!selectAward)}
          >
            <ToolTip message="Award" />
            {post.contentTotalDiamonds != null &&
            post.contentTotalDiamonds > 0 ? (
              <Icon name={'FiGift'} className="h-5 w-5 text-yellow-500" />
            ) : (
              <Icon name={'FiGift'} className="h-5 w-5" />
            )}

            {post.contentTotalDiamonds != null &&
            post.contentTotalDiamonds > 0 ? (
              <span className="">{post.contentTotalDiamonds}</span>
            ) : (
              <span className="">0</span>
            )}
          </button>

          <ModalDialog
            show={selectAward}
            setShow={setSelectAward}
            title="Give reward"
          >
            <div className="flex flex-col space-y-4 px-2 py-4 text-center">
              <span className="mb-3 text-base font-normal text-base-200 line-clamp-2">
                Select your reward to gift to{' '}
                <span className="font-bold">
                  {post.projectCreator?.displayName}
                </span>
                .
              </span>
              <div className="flex flex-col space-y-2">
                {rewards.map((reward, index) => (
                  <button
                    key={index}
                    className="group flex items-center justify-between space-x-4 rounded-xl py-3 px-4 text-base text-base-200 duration-200 dark:bg-base-800 dark:hover:bg-base-600/80 dark:hover:text-yellow-500"
                    onClick={() => {
                      setTransactMessage(
                        `@${
                          user.displayName
                        } rewarded you $${reward.amount.toFixed(2)} coin'`
                      );
                      setTransactAmount(reward.amount);
                      setTransactDiamonds(reward.numberOfDiamonds);
                      setSendReward(true);
                      setSelectAward(false);
                    }}
                  >
                    <div className="flex space-x-2">
                      {[...Array(reward.numberOfDiamonds)].map(
                        (elementInArray, index) => (
                          <Icon
                            name={'FiGift'}
                            key={index}
                            className="h-6 w-6 text-base-200 group-hover:text-yellow-400"
                          />
                        )
                      )}
                    </div>
                    <span>${reward.amount.toFixed(2)}</span>
                  </button>
                ))}
              </div>
            </div>
          </ModalDialog>

          <ModalDialog
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
                          name={'FiGift'}
                          key={index}
                          className="h-10 w-10 text-yellow-400"
                        />
                      )
                    )}
                  </div>
                  <span className="text-xl font-medium text-base-100">
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
                      Your balance is ${walletBalance?.toFixed(2)}
                    </p>
                  </span>

                  <div className="mt-6 flex flex-col-reverse items-center justify-center space-y-4 space-y-reverse sm:flex-row sm:space-y-0 sm:space-x-2">
                    <button
                      className="btn-secondary w-full sm:w-auto"
                      onClick={() => {
                        setSendReward(false);
                        setSelectAward(true);
                      }}
                    >
                      Cancel
                    </button>

                    {transactAmount <= walletBalance && (
                      <button
                        className="btn-primary w-full sm:w-auto"
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
                        <IoCheckmarkSharp className="mx-auto h-12 w-12 text-green-500" />
                        <p className="p-4 text-center text-xl font-semibold text-gray-100">
                          Reward sent to {post.projectCreator.name}
                        </p>
                        <p>Your balance is now ${walletBalance.toFixed(2)}</p>
                        <button
                          className="btn-primary mt-6"
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
          </ModalDialog>
        </div>
      )}
    </>
  );
};

export default AwardButton;
