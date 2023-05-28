import Link from 'next/link';
import React, { useEffect } from 'react';
import { useAuthUser } from 'next-firebase-auth';
import { IoArrowBack } from 'react-icons/io5';
import { sendSlackMessage } from 'utils/slack/sendMessageSlack';

const SubscriptionConfirmation = () => {
  const AuthUser = useAuthUser();

  useEffect(() => {
    sendSlackMessage(
      `TEAMS PLAN: ${AuthUser.displayName} has purchased a TEAMS plan.`
    );
  }, []);

  return (
    <>
      <div className="mt-4 flex md:mt-12">
        <div className="mx-auto w-full max-w-2xl overflow-hidden lg:max-w-4xl">
          <Link href={`${process.env.BASEURL}/account/teams`}>
            <div className="mb-4 flex cursor-pointer items-center space-x-2 px-4 md:px-0">
              <IoArrowBack className="h-5 w-5" />
              <h2 className="text-sm font-bold">Back to teams</h2>
            </div>
          </Link>
          <div className="mx-4 mb-4 rounded-lg bg-base-700 px-4 py-4 sm:px-6 md:mx-0">
            <div className="mb-4 space-y-6">
              <div className="space-y-16 py-10 text-center">
                <div className="space-y-6">
                  <div className="mx-auto w-2/3 text-lg font-semibold">
                    Thank you. Your subscription is now active.
                  </div>
                  <div className="mx-auto w-2/3 text-slate-300">
                    You can now post open positions on your Team profile. Select
                    the team profile below to get started.
                  </div>
                  <div>
                    <Link href="/account/teams">
                      <button className="btn-primary">
                        Select Team Profile
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubscriptionConfirmation;
