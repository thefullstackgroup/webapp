import getStripe from 'utils/stripe/getStripe';
import axios from 'axios';
import { IoCheckmark, IoCloseCircleSharp } from 'react-icons/io5';
import { useState } from 'react';

const Plan = ({ user, plan, frequency, selected, upgrade = false }) => {
  const [processing, setProcessing] = useState(false);

  const sendSlackMessage = async (plan) => {
    await axios.post(
      `${process.env.BASEURL}/api/notifications/slack/postMessage`,
      {
        message: `JOBS: ${user.displayName} has selected ${plan.refPlan} plan and is now on Stripe checkout.`,
      }
    );
  };

  const redirectToCheckout = async (plan) => {
    const productDetails = [{ id: plan.product, quantity: 1 }];
    const {
      data: { id },
    } = await axios.post(`${process.env.BASEURL}/api/checkout_sessions`, {
      items: Object.entries(productDetails).map(([_, { id, quantity }]) => ({
        price: `${plan.product}`,
        quantity,
      })),
      refPlan: plan.refPlan,
    });

    // Redirect to checkout
    const stripe = await getStripe();
    await stripe.redirectToCheckout({ sessionId: id });
  };

  const selectPlan = (plan) => {
    setProcessing(true);
    sendSlackMessage(plan);
    redirectToCheckout(plan);
  };

  return (
    <div
      className={
        'group w-full cursor-pointer space-y-6 rounded-md border border-transparent bg-black p-4 duration-300 hover:border-purple-600 md:w-1/3 ' +
        (selected ? 'border-purple-600' : '')
      }
      onClick={() => selectPlan(plan)}
    >
      <div className="flex justify-between border-b border-base-700 pb-4">
        <div className="flex items-start space-x-2">
          <h4 className="text-2xl font-bold">{plan.title}</h4>
          {frequency == 12 && (
            <span className="badge mt-1 bg-yellow-500/80 px-1 py-0.5 text-xs">
              -30%
            </span>
          )}
        </div>
        <div className="flex flex-col text-right">
          <span className="text-xl font-bold">&euro; {plan.price}</span>
          <span className="text-xs text-slate-400">per month</span>
        </div>
      </div>
      <div className="text-sm text-slate-200">{plan.description}</div>
      <ul className="space-y-2 text-sm">
        {plan.features.map((feature, index) =>
          feature.value ? (
            <li key={index}>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2 text-slate-300">
                  <IoCheckmark className="h-5 w-5 text-green-500" />
                  <span>{feature.label}</span>
                </div>
                <div>{feature.value}</div>
              </div>
            </li>
          ) : (
            <li key={index}>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2 text-slate-600">
                  <IoCloseCircleSharp className="h-5 w-5 text-slate-600" />
                  <span>{feature.label}</span>
                </div>
                <div>{feature.value}</div>
              </div>
            </li>
          )
        )}
      </ul>
      {upgrade ? (
        selected ? (
          <button className={'btn-secondary w-full'}>Current plan</button>
        ) : (
          <button className={'btn-primary group-hover:bg-primary-500 w-full'}>
            {processing ? 'Processing ...' : `Upgrade plan`}
          </button>
        )
      ) : (
        <button
          className={
            selected
              ? 'btn-primary group-hover:bg-primary-500 w-full'
              : 'btn-secondary w-full'
          }
        >
          {processing ? 'Processing ...' : `Buy ${plan.title}`}
        </button>
      )}
    </div>
  );
};

export default Plan;
