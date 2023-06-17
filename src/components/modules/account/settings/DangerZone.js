import axios from 'axios';
import { useAuthUser } from 'next-firebase-auth';
import { useState } from 'react';
import Menu from './Menu';

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
      <div className="mx-auto mt-0 w-full max-w-5xl justify-center lg:mt-6">
        <div className="hidden w-full pt-4 pb-10 text-4xl font-medium tracking-tight sm:block">
          Account settings
        </div>
        <div className="flex min-h-[60vh] items-start space-x-4">
          <div className="w-3/12">
            <Menu selected="Danger zone" />
          </div>
          {!deleteAccountRequested && (
            <div className="mb-4 w-full rounded-lg border border-base-200 bg-base-50 px-4 py-4 dark:border-base-700 dark:bg-base-900 sm:px-6">
              <h4 className="mb-6 text-2xl font-medium">Danger zone</h4>
              <p className="mt-1 mb-6">
                Complete the step below if you wish to remove your account
                entirely.
              </p>
              <div className="mb-6">
                <div className="">
                  <label className="label">
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
                      We would love any feedback you could provide in order to
                      help us improve. Please select an option below and hit the
                      button to delete your account.
                    </p>
                    <div className="flex flex-col space-y-2">
                      <button
                        className={
                          reason === 'I signed up by accident'
                            ? 'btn-pill-active'
                            : 'btn-pill'
                        }
                        onClick={() => setReason('I signed up by accident')}
                      >
                        I signed up by accident
                      </button>
                      <button
                        className={
                          reason === 'The Full Stack is not for me'
                            ? 'btn-pill-active'
                            : 'btn-pill'
                        }
                        onClick={() =>
                          setReason('The Full Stack is not for me')
                        }
                      >
                        The Full Stack is not for me
                      </button>
                      <button
                        className={
                          reason === 'I received too many emails'
                            ? 'btn-pill-active'
                            : 'btn-pill'
                        }
                        onClick={() => setReason('I received too many emails')}
                      >
                        I received too many emails
                      </button>
                      <button
                        className={
                          reason === 'Duplicate account'
                            ? 'btn-pill-active'
                            : 'btn-pill'
                        }
                        onClick={() => setReason('Duplicate account')}
                      >
                        Duplicate account
                      </button>
                      <button
                        className={
                          reason === 'Other' ? 'btn-pill-active' : 'btn-pill'
                        }
                        onClick={() => setReason('Other')}
                      >
                        Other
                      </button>
                    </div>
                    {reason && (
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteUserRequest()}
                      >
                        <a>Delete my account</a>
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
    </>
  );
};

export default Page;
