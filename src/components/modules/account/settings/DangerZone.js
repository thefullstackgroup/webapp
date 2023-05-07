import axios from 'axios';
import { useAuthUser } from 'next-firebase-auth';
import Link from 'next/link';
import { useState } from 'react';
import { IoArrowBack } from 'react-icons/io5';

const Page = ({ user }) => {
  const AuthUser = useAuthUser();
  const defaultMail = 'support@thefullstackgroup.com';
  const [disabledDelete, setDisabledDelete] = useState(true);
  const [deleteAccountRequested, setDeleteAccountRequested] = useState(false);
  const [reason, setReason] = useState('');

  const sendSlackMessage = async () => {
    await axios.post(
      `${process.env.BASEURL}/api/notifications/slack/postMessage`,
      {
        message: `************ \nDELETE ACCOUNT REQUEST: \nUsername: ${user.displayName} \nUserId: ${AuthUser.id} \nReason: ${reason} \n************`,
      }
    );
  };

  const deleteUserRequest = () => {
    sendSlackMessage();
    setDeleteAccountRequested(true);
  };

  return (
    <>
      <div className="mt-0 lg:mt-12 w-full flex justify-center">
        <div className="w-full lg:max-w-full px-0 xl:px-4 2xl:px-0 md:ml-6 lg:ml-20 xl:ml-52 2xl:ml-56">
          <div className="relative max-w-4xl mx-auto">
            <div className="mx-4 md:mx-0 space-y-6">
              <Link href={`/account/settings`}>
                <div className="flex items-center space-x-2 px-4 md:px-0 mb-4 cursor-pointer">
                  <IoArrowBack className="h-5 w-5" />
                  <h2 className="font-bold text-sm">
                    Back to account settings
                  </h2>
                </div>
              </Link>

              <div className="relative w-min whitespace-nowrap">
                <h2 className="text-3xl sm:text-3xl font-bold tracking-tight">
                  Danger zone
                </h2>
              </div>
              {!deleteAccountRequested && (
                <div className="w-full rounded-lg bg-tfsdark-700 mb-4 px-4 sm:px-6 py-4">
                  <p className="mt-1 text-gray-300 mb-6">
                    Complete the step below if you wish to remove your account
                    entirely.
                  </p>
                  <div className="mb-6">
                    <div className="">
                      <label className="block font-medium text-gray-300">
                        Type the word &quot;DELETE&quot; below to continue:
                      </label>
                      <div className="mt-1 rounded-md flex">
                        <input
                          type="text"
                          name="delete"
                          id="delete"
                          className="text-input w-1/2"
                          onChange={(e) => {
                            if (e.target.value === 'DELETE') {
                              setDisabledDelete(false);
                            } else {
                              setDisabledDelete(true);
                            }
                          }}
                        />
                      </div>
                    </div>
                    {!disabledDelete && (
                      <div className="space-y-10">
                        <p className="text-base mt-2">
                          <i>We&apos;re really sorry to see you go.</i> 😔
                        </p>
                        <p>
                          We would love any feedback you could provide in order
                          to help us improve. Please select an option below and
                          hit the button to delete your account.
                        </p>
                        <div className="flex flex-col space-y-2">
                          <button
                            className={
                              'rounded-full px-6 py-3 border ' +
                              (reason === 'I signed up by accident'
                                ? 'bg-tfsdark-700 border-slate-200'
                                : 'bg-tfsdark-600 hover:bg-tfsdark-500 border-tfsdark-600')
                            }
                            onClick={() => setReason('I signed up by accident')}
                          >
                            I signed up by accident
                          </button>
                          <button
                            className={
                              'rounded-full px-6 py-3 border ' +
                              (reason === 'The Full Stack is not for me'
                                ? 'bg-tfsdark-700 border-slate-200'
                                : 'bg-tfsdark-600 hover:bg-tfsdark-500 border-tfsdark-600')
                            }
                            onClick={() =>
                              setReason('The Full Stack is not for me')
                            }
                          >
                            The Full Stack is not for me
                          </button>
                          <button
                            className={
                              'rounded-full px-6 py-3 border ' +
                              (reason === 'I received too many emails'
                                ? 'bg-tfsdark-700 border-slate-200'
                                : 'bg-tfsdark-600 hover:bg-tfsdark-500 border-tfsdark-600')
                            }
                            onClick={() =>
                              setReason('I received too many emails')
                            }
                          >
                            I received too many emails
                          </button>
                          <button
                            className={
                              'rounded-full px-6 py-3 border ' +
                              (reason === 'Duplicate account'
                                ? 'bg-tfsdark-700 border-slate-200'
                                : 'bg-tfsdark-600 hover:bg-tfsdark-500 border-tfsdark-600')
                            }
                            onClick={() => setReason('Duplicate account')}
                          >
                            Duplicate account
                          </button>
                          <button
                            className={
                              'rounded-full px-6 py-3 border ' +
                              (reason === 'Other'
                                ? 'bg-tfsdark-700 border-slate-200'
                                : 'bg-tfsdark-600 hover:bg-tfsdark-500 border-tfsdark-600')
                            }
                            onClick={() => setReason('Other')}
                          >
                            Other
                          </button>
                        </div>
                        {reason && (
                          <button
                            className="w-full btn-primary uppercase bg-red-600 hover:bg-red-500 py-3"
                            onClick={() => deleteUserRequest()}
                          >
                            <a>Delete my account &rarr;</a>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {deleteAccountRequested && (
                <div className="w-full rounded-lg bg-tfsdark-700 mb-4 px-4 sm:px-6 py-20">
                  <p className="mt-1 text-lg font-medium text-center mb-6">
                    Sorry to see you go.
                  </p>
                  <p className="mt-1 text-gray-300 mb-6 text-center">
                    Your account will be deleted in the next 24-48 hours.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
