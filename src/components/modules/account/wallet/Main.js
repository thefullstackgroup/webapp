import { useState, useEffect } from "react";
import axios from "axios";
import Moment from "moment";
import Confetti from "react-confetti";
import { sendSlackMessage } from "utils/slack/sendMessageSlack";
import { CgSpinner } from "react-icons/cg";
import { IoCheckmark } from "react-icons/io5";
import Icon from "components/common/elements/Icon";
import ModalAlert from "components/common/modals/ModalAlert";

const Page = ({ user, promo }) => {
  const [wallet, setWallet] = useState(null);
  const [walletTransactions, setWalletTransactions] = useState(null);
  const [redeemPromoSuccess, setRedeemPromoSuccess] = useState(false);
  const [transferFunds, setTransferFunds] = useState(false);
  const [promoRedeemed, setPromoRedeemed] = useState(
    user.promosClaimed.includes(promo.code)
  );

  console.log(walletTransactions);
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
      <div className="page page-6xl space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <h2>Wallet</h2>
            <p className="text-sm text-base-300 dark:text-base-500">
              Your wallet contains virtual coin that you can use to reward and
              endorse others.{" "}
              {!promoRedeemed && (
                <button
                  className="btn btn-sm btn-ghost btn-with-icon inline-flex p-0 font-semibold"
                  onClick={() => redeemPromo()}
                >
                  Claim your free $20.
                </button>
              )}
            </p>
          </div>

          <div className="text-base font-medium">
            Wallet balance: ${wallet?.total.toFixed(2)}
          </div>
        </div>

        <div className="box">
          {walletTransactions?.length > 0 && (
            <div className="text-base">
              <div className="grid grid-cols-8 px-2 py-4 text-sm font-bold sm:text-base">
                <div className="col-span-4">Date</div>
                <div className="col-span-2 text-right">Amount</div>
                <div className="col-span-2 text-right">Type</div>
              </div>
              <div>
                {walletTransactions?.map((transaction) => (
                  <div key={transaction.transactionId}>
                    <div className="border-t border-base-200 px-2 py-2 text-sm dark:border-base-700 sm:text-base">
                      <div className="grid grid-cols-8">
                        <div className="col-span-4">
                          {Moment(transaction.createdDate).format(
                            "DD-MMM-YYYY"
                          )}
                        </div>
                        <div className="col-span-2 text-right">
                          {transaction.transactionType === "CREDIT"
                            ? `+$${transaction.transactionAmount.toFixed(2)}`
                            : `-$${transaction.transactionAmount.toFixed(2)}`}
                        </div>
                        <div className="col-span-2 text-right">
                          {transaction.transactionType}
                        </div>
                      </div>
                      <p className="py-1 text-sm text-base-300 dark:text-base-500">
                        {transaction.transactionMessage}{" "}
                        {transaction.transactionType === "DEBIT" &&
                          `(sent coin to @${transaction.outGoingPaymentFromUserDisplayName})`}
                        {transaction.transactionType === "CREDIT" &&
                          `(${transaction.customMessage})`}
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

      <ModalAlert
        show={redeemPromoSuccess}
        setShow={setRedeemPromoSuccess}
        title="Claim your coin"
      >
        <div className="">
          {transferFunds ? (
            <div className="">
              <div className="mx-auto px-2 text-center sm:py-8">
                <img
                  src="/assets/wallet/money.gif"
                  className="mx-auto w-full rounded-md"
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
              <div className="mx-auto space-y-6 py-10 px-2 text-center sm:py-10 sm:px-6 lg:px-8">
                <Icon name="FiThumbsUp" className="mx-auto mb-4 h-20 w-20" />
                <h4 className="text-3xl font-bold">Awesome!</h4>
                <p className="text-lg font-semibold">
                  You have claimed your free ${promo.value} virtual coin.
                </p>
                <p>
                  Give back to the community and spend your coin on rewarding
                  others for great projects, inspiration, insightful braindumps,
                  helpful advice and much more.
                </p>
                <p>Thank you from your community.</p>
                <p>Happy coding!</p>
              </div>
            </div>
          )}
        </div>
      </ModalAlert>
    </>
  );
};

export default Page;
