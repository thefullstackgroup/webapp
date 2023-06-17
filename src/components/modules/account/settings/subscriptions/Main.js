import React, { useState } from 'react';
import Plan from 'components/modules/account/settings/subscriptions/Plan';
import { pricingPlans } from 'components/modules/account/settings/subscriptions/constants';
import ModalAlert from 'components/common/modals/ModalAlert';
import axios from 'axios';
import { useRouter } from 'next/router';
import Menu from '../Menu';

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
      <div className="mx-auto mt-0 w-full max-w-5xl justify-center lg:mt-6">
        <div className="hidden w-full pt-4 pb-10 text-4xl font-medium tracking-tight sm:block">
          Account settings
        </div>
        <div className="flex min-h-[60vh] items-start space-x-4">
          <div className="w-3/12">
            <Menu selected="Subscriptions" />
          </div>
          <div className="w-full rounded-lg border border-base-200 bg-base-50 px-4 py-4 pb-36 dark:border-base-700 dark:bg-base-900 sm:px-6 md:pb-4">
            {user.userAttributes.accountType === 'FREE' && (
              <div className="space-y-2 py-20 text-center">
                You have no active subscriptions.
              </div>
            )}
            {user.userAttributes.accountType !== 'FREE' && (
              <div className="space-y-6">
                <h4 className="text-2xl font-medium">
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

                <div className="flex flex-col items-center justify-between space-y-4 rounded-md py-4 md:flex-row md:space-y-0">
                  <div className="flex flex-col">
                    <span>Would you like to cancel your subscription?</span>
                    <span className="text-xs text-base-400">
                      Any active job posts will remain active until expiry date.
                    </span>
                  </div>
                  <button
                    className="btn btn-secondary w-full whitespace-nowrap md:w-min"
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

      {showCancelSubscription && (
        <ModalAlert
          show={showCancelSubscription}
          setShow={setShowCancelSubscription}
        >
          <div>
            <div className="mt-3 text-center">
              <h3 className="text-xl font-bold text-base-200">
                Cancel subscription?
              </h3>
              <div className="mt-2">
                <p className="text-sm text-base-300">
                  Are you sure you want to cancel your subscription? This action
                  cannot be undone.
                </p>
              </div>
            </div>

            <div className="mt-5 flex justify-center space-x-2">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => handleCancelSubscription()}
              >
                Yes, cancel my subscription
              </button>
              <button
                type="button"
                className="btn btn-secondary"
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
