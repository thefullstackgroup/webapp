import Link from 'next/link';
import React, { useState } from 'react';
import Plan from 'components/modules/account/settings/subscriptions/Plan';
import { pricingPlans } from 'components/modules/account/settings/subscriptions/constants';
import { IoArrowBack } from 'react-icons/io5';
import ModalAlert from 'components/common/modals/ModalAlert';
import axios from 'axios';
import { useRouter } from 'next/router';

const Page = ({ user }) => {
  const router = useRouter();
  const [frequency, setFrequency] = useState(1);
  const [showCancelSubscription, setShowCancelSubscription] = useState(false);

  const handleCancelSubscription = async () => {
    const data = {
      userAttributes: {
        accountType: 'FREE',
      },
    };

    await axios
      .patch(`${process.env.BASEURL}/api/profile/update`, data)
      .then((response) => {
        router.reload();
      })
      .catch((error) => {
        console.log(error);
        alert('Opps, there was an error');
      });
  };

  return (
    <>
      <div className="mt-0 lg:mt-12 w-full flex justify-center">
        <div className="min-h-screen w-full lg:max-w-full px-0 xl:px-4 2xl:px-0 md:ml-6 lg:ml-20 xl:ml-52 2xl:ml-56">
          <div className="relative max-w-4xl mx-auto">
            <div className="mx-4 md:mx-0 space-y-6">
              <Link href={`/account/settings`}>
                <div className="flex items-center space-x-2 sm:px-4 md:px-0 mb-4 cursor-pointer">
                  <IoArrowBack className="h-5 w-5" />
                  <h2 className="font-bold text-sm">
                    Back to account settings
                  </h2>
                </div>
              </Link>
              <div className="relative w-min whitespace-nowrap">
                <h2 className="text-3xl sm:text-3xl font-bold tracking-tight">
                  Subscriptions
                </h2>
              </div>
              <div className="w-full rounded-lg bg-tfsdark-700 pb-36 md:pb-4 px-4 sm:px-6 py-4">
                {user.userAttributes.accountType === 'FREE' && (
                  <div className="space-y-2 text-center py-20">
                    You have no active subscriptions.
                  </div>
                )}
                {user.userAttributes.accountType !== 'FREE' && (
                  <div className="space-y-6">
                    <h4 className="text-lg font-semibold">
                      Your Teams subscription
                    </h4>

                    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                      {pricingPlans.map(
                        (plan, index) =>
                          plan.period == frequency &&
                          (plan.title === 'Starter' ? (
                            <Plan
                              plan={plan}
                              frequency={frequency}
                              selected={true}
                              upgrade={true}
                              key={index}
                            />
                          ) : (
                            <Plan
                              plan={plan}
                              frequency={frequency}
                              upgrade={true}
                              key={index}
                            />
                          ))
                      )}
                    </div>

                    <div className="bg-tfsdark-800 rounded-md border border-tfsdark-600 flex flex-col md:flex-row space-y-4 md:space-y-0 items-center justify-between px-4 md:px-8 py-4">
                      <div className="flex flex-col">
                        <span>Would you like to cancel your subscription?</span>
                        <span className="text-xs text-slate-400">
                          Any active job posts will remain active until expiry
                          date.
                        </span>
                      </div>
                      <button
                        className="btn-secondary w-full md:w-min whitespace-nowrap"
                        onClick={() => setShowCancelSubscription(true)}
                      >
                        Cancel subscription
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showCancelSubscription && (
        <ModalAlert
          show={showCancelSubscription}
          setShow={setShowCancelSubscription}
        >
          <div>
            <div className="sm:flex sm:items-start justify-center">
              <div className="mt-3 sm:mt-0 text-center">
                <h3 className="text-xl font-bold text-slate-200">
                  Cancel subscription?
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-slate-300">
                    Are you sure you want to cancel your subscription? This
                    action cannot be undone.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-4 flex space-x-2 justify-center">
              <button
                type="button"
                className="btn-primary bg-red-600/80 hover:bg-red-500"
                onClick={() => handleCancelSubscription()}
              >
                Yes, cancel my subscripiton
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setShowCancelSubscription(false)}
              >
                No
              </button>
            </div>
          </div>
        </ModalAlert>
      )}
    </>
  );
};

export default Page;
