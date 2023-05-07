import Link from 'next/link';
import React, { useEffect, useMemo, useState } from 'react';
import { useAuthUser } from 'next-firebase-auth';
import Knock from '@knocklabs/client';
import axios from 'axios';
import { IoArrowBack } from 'react-icons/io5';
import Loader from 'components/common/elements/Loader';

const defaultWorkFlows = {
  ['chat-new-message']: {
    channel_types: {
      ['email']: true,
    },
  },
  ['connection-request']: {
    channel_types: {
      ['email']: true,
    },
  },
  ['connection-approval']: {
    channel_types: {
      ['email']: true,
    },
  },
  ['project-comment']: {
    channel_types: {
      ['email']: true,
    },
  },
  ['project-comment-comment']: {
    channel_types: {
      ['email']: true,
    },
  },
  ['project-create']: {
    channel_types: {
      ['email']: true,
    },
  },
  ['project-like']: {
    channel_types: {
      ['email']: true,
    },
  },
  ['project-project-mention']: {
    channel_types: {
      ['email']: true,
    },
  },
};

const workflowLabels = {
  'chat-new-message': 'Chat notifications',
  'connection-request':
    'Notifications when someone sends you a connection request.',
  'connection-approval':
    'Notifications when someone accepts your connections request.',
  'project-comment': 'Notifications for comments on your posts.',
  'project-comment-comment':
    'Notifications for comments and replies to your comments.',
  'project-create':
    'Notifications when your connections or people you follow post.',
  'project-like': 'Notifications for upvotes and likes on your posts.',
  'project-project-mention':
    'Notifications when someone mentions you on a post.',
};

const NotificationsPreferences = () => {
  const AuthUser = useAuthUser();
  const [token, setToken] = useState('');
  const [loadingToken, setLoadingToken] = useState(false);
  const [preferences, setPreferences] = useState();
  const [userExistsOnKnock, setUserExistsOnKnock] = useState(true);

  const knockClient = useMemo(() => {
    try {
      const knockClient = new Knock(process.env.KNOCK_API_PUBLIC_KEY);
      knockClient.authenticate(AuthUser.id, token);
      return knockClient;
    } catch (err) {
      identifyKnockUser();
      return null;
    }
  }, [AuthUser, token]);

  const getKnockToken = async () => {
    const accessToken = await AuthUser.getIdToken();
    fetch(`${process.env.BASEURL}/api/notifications/getKnockJwt`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
    })
      .then((response) =>
        response.json().then((result) => {
          setToken(result);
          setLoadingToken(false);
        })
      )
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const identifyKnockUser = async () => {
    await axios
      .post(`${process.env.BASEURL}/api/notifications/identifyKnockUser`)
      .then((response) => {
        setUserExistsOnKnock(true);
      });
  };

  const onPreferenceChange = async (workflowKey, channelType, setting) => {
    const updateChannelPreference = {
      channel_types: { email: setting },
    };

    const preferences = await knockClient.preferences.setWorkflow(
      workflowKey,
      updateChannelPreference
    );
    setPreferences(preferences);
  };

  const fetchPreferences = async () => {
    const preferences = await knockClient.preferences.get();
    setPreferences(preferences);
  };

  useEffect(() => {
    if (token.length < 1 && !loadingToken) {
      setLoadingToken(true);
      getKnockToken();
    } else {
      fetchPreferences();
    }
  }, [token]);

  if (!preferences) {
    return (
      <div className="w-full h-80 flex flex-col text-sm space-y-2 justify-center items-center">
        <Loader />
      </div>
    );
  }

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
                  Notification preferences
                </h2>
              </div>
              <div className="w-full rounded-lg bg-tfsdark-700 mb-4 px-4 sm:px-6 py-4 space-y-6">
                <p className="mt-4 text-slate-100">
                  We send email notifications when you receive upvotes, likes,
                  comments and awards on your projects and posts. We also send
                  email notifications when you make connections or receive chat
                  messages.
                </p>
                <p className="mt-4 text-slate-100">
                  Use the toggles below to enable or disable email
                  notifications.
                </p>

                <div className="border-t border-tfsdark-600">
                  {Object.keys(defaultWorkFlows).map((workflowKey) => {
                    const workflowChannelPreferences =
                      preferences?.workflows[workflowKey]?.channel_types;

                    return (
                      <div key={workflowKey}>
                        {/* <div className="preferences__row-workflow">
                        {workflowLabels[workflowKey]}
                      </div> */}

                        <div className="border-b border-tfsdark-600">
                          {Object.keys(workflowChannelPreferences).map(
                            (channelType) => {
                              // Loop over all the channel types and render a checkbox and a label
                              // per channel type setting in the workflow.
                              const preferenceSetting =
                                workflowChannelPreferences[channelType];

                              if (channelType === 'email') {
                                return (
                                  <div
                                    className="mt-2 flex justify-between items-center py-3 mb-2 rounded-md "
                                    key={channelType}
                                  >
                                    <span className="">
                                      <span className="font-normal text-slate-100">
                                        {workflowLabels[workflowKey]}
                                      </span>
                                    </span>
                                    <div className="flex items-center space-x-2">
                                      <span className="text-xs text-slate-500">
                                        {preferenceSetting
                                          ? 'Enabled'
                                          : 'Disabled'}
                                      </span>
                                      <button
                                        type="button"
                                        className={
                                          'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-0 ' +
                                          (preferenceSetting
                                            ? 'bg-green-500'
                                            : 'bg-tfsdark-600')
                                        }
                                        onClick={() =>
                                          onPreferenceChange(
                                            workflowKey,
                                            channelType,
                                            !preferenceSetting
                                          )
                                        }
                                      >
                                        <span
                                          className={
                                            'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ' +
                                            (preferenceSetting
                                              ? 'translate-x-5'
                                              : 'translate-x-0')
                                          }
                                        ></span>
                                      </button>
                                    </div>
                                  </div>
                                );
                              }
                            }
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationsPreferences;
