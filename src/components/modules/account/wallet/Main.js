import { useState, useEffect } from 'react';
import axios from 'axios';
import Moment from 'moment';
import Confetti from 'react-confetti';
import ModalDialog from 'components/common/modals/ModalDialog';
import { sendSlackMessage } from 'utils/slack/sendMessageSlack';
import { CgSpinner } from 'react-icons/cg';
import {
  IoCheckmark,
  IoInformationCircleOutline,
  IoWalletOutline,
} from 'react-icons/io5';
import Icon from 'components/common/elements/Icon';

const Page = ({ user, promo }) => {
  const [wallet, setWallet] = useState(null);
  const [walletTransactions, setWalletTransactions] = useState(null);
  const [redeemPromoSuccess, setRedeemPromoSuccess] = useState(false);
  const [transferFunds, setTransferFunds] = useState(false);
  const [promoRedeemed, setPromoRedeemed] = useState(
    user.promosClaimed.includes(promo.code)
  );

  const getWallet = async () => {
    await axios
      .get(`${process.env.BASEURL}/api/profile/wallet/get`)
      .then((response) => {
        setWallet(response.data);
      })
      .catch((error) => {
        console.log(error.status);
      });
  };

  const getWalletTransactions = async () => {
    await axios
      .get(`${process.env.BASEURL}/api/profile/wallet/transactions`)
      .then((response) => {
        setWalletTransactions(response.data.content);
      })
      .catch((error) => {
        console.log(error.status);
      });
  };

  const redeemPromo = async () => {
    setRedeemPromoSuccess(true);
    setTransferFunds(true);

    const redeemData = {
      amount: promo.value,
      promo: promo.code,
      userId: user.userId,
    };

    await axios.post(
      `${process.env.BASEURL}/api/profile/wallet/redeem`,
      redeemData
    );
    setTimeout(() => setTransferFunds(false), 4000);
    setPromoRedeemed(true);
    sendSlackMessage(
      `WALLET: The user ${user.name} has claimed free coin against the '${promo.code} ($${promo.value})' promo`
    );
  };

  useEffect(() => {
    getWallet();
    getWalletTransactions();
  }, []);

  return (
    <>
      <div className="mx-auto mt-0 mb-20 w-full max-w-5xl justify-center lg:mt-6">
        <div className="flex items-center justify-between">
          <div className="hidden py-4 text-4xl font-medium tracking-tight sm:block">
            Wallet
          </div>
          <div className="text-lg font-medium text-cyan-dark dark:text-cyan-dark">
            Balance: ${wallet?.total.toFixed(2)}
          </div>
        </div>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center text-base-300 dark:text-base-500">
            <Icon name={'FiInfo'} className="mr-2 hidden h-5 w-5 sm:block" />
            <p className="text-sm text-base-300 dark:text-base-500">
              Your wallet contains virtual coin that you can use to to reward
              and endorse others.
            </p>
          </div>
          {promoRedeemed && (
            <button
              className="btn btn-sm btn-secondary btn-with-icon"
              onClick={() => redeemPromo()}
            >
              <span>💰 Claim your free $20</span>
            </button>
          )}
        </div>
        <div className="mb-4 overflow-hidden border border-base-200 pb-4 dark:border-base-700 md:rounded-lg">
          {walletTransactions?.length > 0 && (
            <div className="text-base">
              <div className="grid grid-cols-8 px-6 py-4 text-sm font-bold sm:text-base">
                <div className="col-span-4">Date</div>
                <div className="col-span-2 text-right">Amount</div>
                <div className="col-span-2 text-right">Type</div>
              </div>
              <div>
                {walletTransactions?.map((transaction) => (
                  <div key={transaction.transactionId}>
                    <div className="border-t border-base-200 px-6 py-2 text-sm dark:border-base-700 sm:text-base">
                      <div className="grid grid-cols-8">
                        <div className="col-span-4">
                          {Moment(transaction.createdDate).format(
                            'DD-MMM-YYYY'
                          )}
                        </div>
                        <div className="col-span-2 text-right">
                          ${transaction.transactionAmount.toFixed(2)}
                        </div>
                        <div className="col-span-2 text-right">
                          {transaction.transactionType}
                        </div>
                      </div>
                      <p className="py-1 text-xs text-base-300 dark:text-base-500">
                        {transaction.transactionMessage}{' '}
                        {transaction.transactionType == 'DEBIT' &&
                          `(sent coin to @${transaction.outGoingPaymentFromUserDisplayName})`}
                        {transaction.transactionType == 'CREDIT' &&
                          `(received coin from @${transaction.inComingPaymentFromUserDisplayName})`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!walletTransactions?.length && (
            <div className="my-20 flex justify-center">
              <p>No transactions recorded</p>
            </div>
          )}
        </div>
      </div>

      <ModalDialog
        show={redeemPromoSuccess}
        setShow={setRedeemPromoSuccess}
        title="Claim your coin"
      >
        <div className="">
          {transferFunds ? (
            <div className="">
              <div className="mx-auto py-10 px-2 text-center sm:py-4 sm:px-6 lg:px-8">
                <img
                  src="/assets/wallet/money.gif"
                  className="mx-auto w-96 rounded-md"
                  alt="Waiting"
                />
                <div className="mx-auto mt-8 flex w-full items-center justify-center space-x-2 text-base text-base-300 sm:space-x-6">
                  <CgSpinner className="h-6 w-6 animate-spin text-gray-300" />
                  <span>Sending coin to your wallet ...</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative overflow-hidden">
              <Confetti />
              <div className="mx-auto py-10 px-2 text-center sm:py-10 sm:px-6 lg:px-8">
                <IoCheckmark className="mx-auto mb-4 h-24 w-24 text-green-500" />
                <h4 className="mb-6 text-3xl font-bold">Congratulations!</h4>
                <p className="mb-4 text-lg font-bold">
                  You have claimed your free ${promo.value}.{' '}
                </p>
                <p>
                  Give back to the community and spend your coin on rewarding
                  developers for great projects, inspiration, insightful
                  braindumps, helpful advice and much more.
                </p>
                <p className="mt-6 mb-8 italic">
                  Thank you from your community.
                </p>
              </div>
            </div>
          )}
        </div>
      </ModalDialog>
    </>
  );
};

export default Page;
