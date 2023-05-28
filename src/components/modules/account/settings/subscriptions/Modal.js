import React, { useState } from 'react';
import { pricingPlans } from 'components/modules/account/settings/subscriptions/constants';
import Faq from 'components/modules/account/settings/subscriptions/Faq';
import Plan from './Plan';
import { FaStripe } from 'react-icons/fa';
import ModalDialog from 'components/common/modals/ModalDialog';

const Modal = ({ user, show, setShow }) => {
  const [frequency, setFrequency] = useState(12);
  const [showFaq, setShowFaq] = useState(false);

  return (
    <>
      <ModalDialog
        show={show}
        setShow={setShow}
        title="Post open roles"
        dimensions={'max-w-5xl'}
        disabled
      >
        <div className="mx-4 space-y-6 md:mx-0">
          <div className="mb-4 w-full px-4 py-4 sm:px-6">
            {user.userAttributes.accountType === 'TEAM_PLAN1' && (
              <div>
                <h3 className="text-lg font-bold leading-6 text-gray-200">
                  Teams Subscription Plan
                </h3>
              </div>
            )}
            {user.userAttributes.accountType === 'FREE' && (
              <div>
                <div className="mt-4 flex flex-col space-y-2 text-center text-lg text-slate-400">
                  <h3 className="text-2xl font-semibold text-white">
                    Reach one of the fastest growing dev communities on the web
                  </h3>
                  <span>Select the right plan for you</span>
                </div>
                <div className="sm:align-center sm:flex sm:flex-col">
                  <div className="relative mt-6 flex self-center rounded-lg bg-base-600/50 p-0.5 sm:mt-8">
                    <button
                      type="button"
                      className={
                        'relative w-1/2 whitespace-nowrap rounded-md border-base-700 py-2 text-sm font-medium shadow-sm focus:z-10 focus:outline-none sm:w-auto sm:px-8 ' +
                        (frequency == 1
                          ? 'bg-primary-600 text-white'
                          : 'text-slate-400')
                      }
                      onClick={() => setFrequency(1)}
                    >
                      Monthly billing
                    </button>
                    <button
                      type="button"
                      className={
                        'relative w-1/2 whitespace-nowrap rounded-md border-base-700 py-2 text-sm font-medium shadow-sm focus:z-10 focus:outline-none sm:w-auto sm:px-8 ' +
                        (frequency == 12
                          ? 'bg-primary-600 text-white'
                          : 'text-slate-400')
                      }
                      onClick={() => setFrequency(12)}
                    >
                      Yearly billing
                    </button>
                  </div>
                </div>

                <div className="mt-10 flex space-x-4">
                  {pricingPlans.map(
                    (plan, index) =>
                      plan.period == frequency &&
                      (plan.title === 'Starter' ? (
                        <Plan
                          user={user}
                          plan={plan}
                          frequency={frequency}
                          selected={true}
                          key={index}
                        />
                      ) : (
                        <Plan
                          user={user}
                          plan={plan}
                          frequency={frequency}
                          key={index}
                        />
                      ))
                  )}
                </div>
                <div className="my-6 flex items-center justify-between space-x-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="text-slate-300">
                      Safe & Secure Payments with
                    </span>
                    <FaStripe className="h-10 w-10" />
                  </div>
                  <button
                    className="btn-ghost text-sm"
                    onClick={() => setShowFaq(true)}
                  >
                    Got a question? Check our FAQ
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </ModalDialog>

      <ModalDialog
        show={showFaq}
        setShow={setShowFaq}
        title="Frequently asked questions"
        dimensions={'max-w-3xl'}
        disabled
      >
        <div className="no-scrollbar h-[50vh] overflow-y-scroll overscroll-contain p-4">
          <Faq showTitle={false} />
        </div>
      </ModalDialog>
    </>
  );
};

export default Modal;
