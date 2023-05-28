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
      <div className="mt-0 flex w-full justify-center lg:mt-12">
        <div className="w-full px-0 md:ml-6 lg:ml-20 lg:max-w-full xl:ml-52 xl:px-4 2xl:ml-56 2xl:px-0">
          <div className="relative mx-auto max-w-4xl">
            <div className="mx-4 space-y-6 md:mx-0">
              <Link href={`/account/settings`}>
                <div className="mb-4 flex cursor-pointer items-center space-x-2 px-4 md:px-0">
                  <IoArrowBack className="h-5 w-5" />
                  <h2 className="text-sm font-bold">
                    Back to account settings
                  </h2>
                </div>
              </Link>

              <div className="relative w-min whitespace-nowrap">
                <h2 className="text-3xl font-bold tracking-tight sm:text-3xl">
                  Danger zone
                </h2>
              </div>
              {!deleteAccountRequested && (
                <div className="mb-4 w-full rounded-lg bg-base-700 px-4 py-4 sm:px-6">
                  <p className="mt-1 mb-6 text-gray-300">
                    Complete the step below if you wish to remove your account
                    entirely.
                  </p>
                  <div className="mb-6">
                    <div className="">
                      <label className="block font-medium text-gray-300">
                        Type the word &quot;DELETE&quot; below to continue:
                      </label>
                      <div className="mt-1 flex rounded-md">
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
                        <p className="mt-2 text-base">
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
                              'rounded-full border px-6 py-3 ' +
                              (reason === 'I signed up by accident'
                                ? 'border-base-200 bg-base-700'
                                : 'border-base-600 bg-base-600 hover:bg-base-500')
                            }
                            onClick={() => setReason('I signed up by accident')}
                          >
                            I signed up by accident
                          </button>
                          <button
                            className={
                              'rounded-full border px-6 py-3 ' +
                              (reason === 'The Full Stack is not for me'
                                ? 'border-base-200 bg-base-700'
                                : 'border-base-600 bg-base-600 hover:bg-base-500')
                            }
                            onClick={() =>
                              setReason('The Full Stack is not for me')
                            }
                          >
                            The Full Stack is not for me
                          </button>
                          <button
                            className={
                              'rounded-full border px-6 py-3 ' +
                              (reason === 'I received too many emails'
                                ? 'border-base-200 bg-base-700'
                                : 'border-base-600 bg-base-600 hover:bg-base-500')
                            }
                            onClick={() =>
                              setReason('I received too many emails')
                            }
                          >
                            I received too many emails
                          </button>
                          <button
                            className={
                              'rounded-full border px-6 py-3 ' +
                              (reason === 'Duplicate account'
                                ? 'border-base-200 bg-base-700'
                                : 'border-base-600 bg-base-600 hover:bg-base-500')
                            }
                            onClick={() => setReason('Duplicate account')}
                          >
                            Duplicate account
                          </button>
                          <button
                            className={
                              'rounded-full border px-6 py-3 ' +
                              (reason === 'Other'
                                ? 'border-base-200 bg-base-700'
                                : 'border-base-600 bg-base-600 hover:bg-base-500')
                            }
                            onClick={() => setReason('Other')}
                          >
                            Other
                          </button>
                        </div>
                        {reason && (
                          <button
                            className="btn-primary w-full bg-red-600 py-3 uppercase hover:bg-red-500"
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
                <div className="mb-4 w-full rounded-lg bg-base-700 px-4 py-20 sm:px-6">
                  <p className="mt-1 mb-6 text-center text-lg font-medium">
                    Sorry to see you go.
                  </p>
                  <p className="mt-1 mb-6 text-center text-gray-300">
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
