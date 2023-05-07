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
      <div className="mt-4 md:mt-12 flex">
        <div className="w-full max-w-2xl lg:max-w-4xl overflow-hidden mx-auto">
          <Link href={`${process.env.BASEURL}/account/teams`}>
            <div className="flex items-center space-x-2 px-4 md:px-0 mb-4 cursor-pointer">
              <IoArrowBack className="h-5 w-5" />
              <h2 className="font-bold text-sm">Back to teams</h2>
            </div>
          </Link>
          <div className="rounded-lg bg-tfsdark-700 mb-4 px-4 sm:px-6 py-4 mx-4 md:mx-0">
            <div className="space-y-6 mb-4">
              <div className="text-center py-10 space-y-16">
                <div className="space-y-6">
                  <div className="w-2/3 mx-auto font-semibold text-lg">
                    Thank you. Your subscription is now active.
                  </div>
                  <div className="w-2/3 mx-auto text-slate-300">
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
