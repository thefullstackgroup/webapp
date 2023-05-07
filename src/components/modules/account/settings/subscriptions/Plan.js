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
        'bg-black rounded-md w-full md:w-1/3 p-4 space-y-6 border border-transparent hover:border-purple-600 duration-300 cursor-pointer group ' +
        (selected ? 'border-purple-600' : '')
      }
      onClick={() => selectPlan(plan)}
    >
      <div className="flex justify-between border-b border-tfsdark-700 pb-4">
        <div className="flex items-start space-x-2">
          <h4 className="text-2xl font-bold">{plan.title}</h4>
          {frequency == 12 && (
            <span className="mt-1 badge bg-yellow-500/80 text-xs px-1 py-0.5">
              -30%
            </span>
          )}
        </div>
        <div className="flex flex-col text-right">
          <span className="font-bold text-xl">&euro; {plan.price}</span>
          <span className="text-xs text-slate-400">per month</span>
        </div>
      </div>
      <div className="text-sm text-slate-200">{plan.description}</div>
      <ul className="text-sm space-y-2">
        {plan.features.map((feature, index) =>
          feature.value ? (
            <li key={index}>
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-2 text-slate-300">
                  <IoCheckmark className="text-green-500 h-5 w-5" />
                  <span>{feature.label}</span>
                </div>
                <div>{feature.value}</div>
              </div>
            </li>
          ) : (
            <li key={index}>
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-2 text-slate-600">
                  <IoCloseCircleSharp className="text-slate-600 h-5 w-5" />
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
