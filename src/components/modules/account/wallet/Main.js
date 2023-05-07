import { useState, useEffect } from 'react';
import axios from 'axios';
import Moment from 'moment';
import Confetti from 'react-confetti';
import * as ga from 'lib/ga';
import {
  IoCheckmark,
  IoInformationCircleOutline,
  IoWalletOutline,
} from 'react-icons/io5';
import ModalDialog from 'components/common/modals/ModalDialog';
import { CgSpinner } from 'react-icons/cg';

const Page = ({ user, promo }) => {
  const [wallet, setWallet] = useState(null);
  const [walletTransactions, setWalletTransactions] = useState(null);
  const [redeemPromoSuccess, setRedeemPromoSuccess] = useState(false);
  const [transferFunds, setTransferFunds] = useState(false);
  const [promoRedeemed, setPromoRedeemed] = useState(
    user.promosClaimed.includes(promo.code)
  );

  const sendSlackMessage = async () => {
    const message = {
      message: `WALLET: The user ${user.name} has claimed free coin against the '${promo.code} ($${promo.value})' promo`,
    };

    fetch(`${process.env.BASEURL}/api/notifications/slack/postMessage`, {
      method: 'POST',
      body: JSON.stringify(message),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    });
  };

  const getWallet = async () => {
    const requestUrl = `${process.env.BASEURL}/api/profile/wallet/get`;

    if (requestUrl != '') {
      await axios
        .get(requestUrl)
        .then((response) => {
          setWallet(response.data);
        })
        .catch((error) => {
          console.log(error.status);
        });
    }
  };

  const getWalletTransactions = async () => {
    const requestUrl = `${process.env.BASEURL}/api/profile/wallet/transactions`;

    if (requestUrl != '') {
      await axios
        .get(requestUrl)
        .then((response) => {
          setWalletTransactions(response.data.content);
        })
        .catch((error) => {
          console.log(error.status);
        });
    }
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
    // getWallet();
    setTimeout(() => setTransferFunds(false), 4000);
    setPromoRedeemed(true);
    sendSlackMessage();
    ga.event({
      action: 'user_coin_claimed_promo',
    });
  };

  useEffect(() => {
    getWallet();
    getWalletTransactions();
  }, []);

  return (
    <>
      <div className="mt-4 md:mt-12 flex">
        <div className="w-full max-w-2xl lg:max-w-3xl overflow-hidden mx-auto">
          <div className="rounded-lg bg-tfsdark-700 mb-4 px-4 sm:px-6 py-4 mx-4 md:mx-0">
            <div className="sm:items-center flex flex-col sm:flex-row justify-between">
              <div className="flex items-center space-x-4">
                <IoWalletOutline className="h-16 w-16 text-gray-300" />
                <div className="flex flex-col">
                  <div className="space-x-1  text-xl font-bold text-gray-200 sm:text-xl tracking-tight lg:text-2xl">
                    Wallet
                  </div>
                  <div className="outline-none space-x-1text-lg font-semibold">
                    <span className="text-slate-300">
                      ${wallet?.total.toFixed(2)} total balance
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t border-tfsdark-600 mt-4 pt-4 sm:flex items-start">
              <IoInformationCircleOutline className="hidden sm:block h-7 w-7 mr-2" />
              <p className="text-base">
                Your wallet contains virtual coin that you can use to to reward
                and endorse others.
              </p>
            </div>
            {!promoRedeemed && (
              <button
                className="mt-4 btn-primary btn-with-icon"
                onClick={() => redeemPromo()}
              >
                <span>💰 Claim your free $20</span>
              </button>
            )}
          </div>

          <div className="mt-4 md:rounded-lg bg-tfsdark-700 mb-4 px-4 sm:px-6 py-4">
            <div className="items-center flex justify-between">
              <div className="flex flex-col">
                <span className="text-lg font-bold text-slate-100 sm:text-xl tracking-tight lg:text-xl">
                  Transactions
                </span>
              </div>
            </div>
            <div className="mt-4 pt-4">
              {walletTransactions?.length > 0 && (
                <div className="text-base">
                  <div className="grid grid-cols-8 pb-2 text-sm sm:text-base font-bold">
                    <div className="col-span-4">Date</div>
                    <div className="col-span-2 text-right">Amount</div>
                    <div className="col-span-2 text-right">Type</div>
                  </div>
                  <div className="">
                    {walletTransactions?.map((transaction) => (
                      <div className="" key={transaction.transactionId}>
                        <div className="border-t border-tfsdark-600 py-2 text-sm sm:text-base">
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
                          <p className="text-xs py-1 text-slate-400">
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
                <div className="text-base">
                  <p>No transactions recorded</p>
                </div>
              )}
            </div>
          </div>
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
              <div className="mx-auto py-10 px-2 sm:py-4 sm:px-6 lg:px-8 text-center">
                <img
                  src="/assets/wallet/money.gif"
                  className="w-96 mx-auto rounded-md"
                  alt="Waiting"
                />
                <div className="mt-8 flex w-full items-center mx-auto justify-center space-x-2 sm:space-x-6 text-base text-gray-300">
                  <CgSpinner className="h-6 w-6 text-gray-300 animate-spin" />
                  <span>Sending coin to your wallet ...</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative overflow-hidden">
              <Confetti />
              <div className="mx-auto py-10 px-2 sm:py-10 sm:px-6 lg:px-8 text-center">
                <IoCheckmark className="h-24 w-24 text-green-500 mx-auto mb-4" />
                <h4 className="text-3xl font-bold mb-6">Congratulations!</h4>
                <p className="font-bold mb-4 text-lg">
                  You have claimed your free ${promo.value}.{' '}
                </p>
                <p>
                  Give back to the community and spend your coin on rewarding
                  developers for great projects, inspiration, insightful
                  braindumps, helpful advice and much more.
                </p>
                <p className="mt-6 italic mb-8">
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
