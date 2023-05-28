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
      <div className="mt-4 flex md:mt-12">
        <div className="mx-auto w-full max-w-2xl overflow-hidden lg:max-w-3xl">
          <div className="mx-4 mb-4 rounded-lg bg-base-800 px-4 py-4 sm:px-6 md:mx-0">
            <div className="flex flex-col justify-between sm:flex-row sm:items-center">
              <div className="flex items-center space-x-4">
                <IoWalletOutline className="h-16 w-16 text-gray-300" />
                <div className="flex flex-col">
                  <div className="space-x-1  text-xl font-bold tracking-tight text-gray-200 sm:text-xl lg:text-2xl">
                    Wallet
                  </div>
                  <div className="space-x-1text-lg font-semibold outline-none">
                    <span className="text-slate-300">
                      ${wallet?.total.toFixed(2)} total balance
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 items-start border-t border-base-600 pt-4 sm:flex">
              <IoInformationCircleOutline className="mr-2 hidden h-7 w-7 sm:block" />
              <p className="text-base">
                Your wallet contains virtual coin that you can use to to reward
                and endorse others.
              </p>
            </div>
            {!promoRedeemed && (
              <button
                className="btn-primary btn-with-icon mt-4"
                onClick={() => redeemPromo()}
              >
                <span>💰 Claim your free $20</span>
              </button>
            )}
          </div>

          <div className="mt-4 mb-4 bg-base-800 px-4 py-4 sm:px-6 md:rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-slate-100 sm:text-xl lg:text-xl">
                  Transactions
                </span>
              </div>
            </div>
            <div className="mt-4 pt-4">
              {walletTransactions?.length > 0 && (
                <div className="text-base">
                  <div className="grid grid-cols-8 pb-2 text-sm font-bold sm:text-base">
                    <div className="col-span-4">Date</div>
                    <div className="col-span-2 text-right">Amount</div>
                    <div className="col-span-2 text-right">Type</div>
                  </div>
                  <div className="">
                    {walletTransactions?.map((transaction) => (
                      <div className="" key={transaction.transactionId}>
                        <div className="border-t border-base-600 py-2 text-sm sm:text-base">
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
                          <p className="py-1 text-xs text-slate-400">
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
              <div className="mx-auto py-10 px-2 text-center sm:py-4 sm:px-6 lg:px-8">
                <img
                  src="/assets/wallet/money.gif"
                  className="mx-auto w-96 rounded-md"
                  alt="Waiting"
                />
                <div className="mx-auto mt-8 flex w-full items-center justify-center space-x-2 text-base text-gray-300 sm:space-x-6">
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
