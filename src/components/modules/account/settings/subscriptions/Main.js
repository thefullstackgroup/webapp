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
      <div className="mt-0 flex w-full justify-center lg:mt-12">
        <div className="min-h-screen w-full px-0 md:ml-6 lg:ml-20 lg:max-w-full xl:ml-52 xl:px-4 2xl:ml-56 2xl:px-0">
          <div className="relative mx-auto max-w-4xl">
            <div className="mx-4 space-y-6 md:mx-0">
              <Link href={`/account/settings`}>
                <div className="mb-4 flex cursor-pointer items-center space-x-2 sm:px-4 md:px-0">
                  <IoArrowBack className="h-5 w-5" />
                  <h2 className="text-sm font-bold">
                    Back to account settings
                  </h2>
                </div>
              </Link>
              <div className="relative w-min whitespace-nowrap">
                <h2 className="text-3xl font-bold tracking-tight sm:text-3xl">
                  Subscriptions
                </h2>
              </div>
              <div className="w-full rounded-lg bg-base-700 px-4 py-4 pb-36 sm:px-6 md:pb-4">
                {user.userAttributes.accountType === 'FREE' && (
                  <div className="space-y-2 py-20 text-center">
                    You have no active subscriptions.
                  </div>
                )}
                {user.userAttributes.accountType !== 'FREE' && (
                  <div className="space-y-6">
                    <h4 className="text-lg font-semibold">
                      Your Teams subscription
                    </h4>

                    <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
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

                    <div className="flex flex-col items-center justify-between space-y-4 rounded-md border border-base-600 bg-base-800 px-4 py-4 md:flex-row md:space-y-0 md:px-8">
                      <div className="flex flex-col">
                        <span>Would you like to cancel your subscription?</span>
                        <span className="text-xs text-slate-400">
                          Any active job posts will remain active until expiry
                          date.
                        </span>
                      </div>
                      <button
                        className="btn-secondary w-full whitespace-nowrap md:w-min"
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
            <div className="justify-center sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0">
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
            <div className="mt-5 flex justify-center space-x-2 sm:mt-4">
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
