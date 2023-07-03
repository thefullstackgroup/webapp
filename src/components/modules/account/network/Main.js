import { useState, useEffect } from 'react';
import useSWR, { mutate } from 'swr';
import Connection from 'components/modules/account/network/Connection';
import Toast from 'components/common/elements/Toast';
import fetcher from 'utils/fetcher';
import Loader from 'components/common/elements/Loader';

const tabs = [
  { tab: 1, label: 'Connections' },
  { tab: 2, label: 'Requests' },
  { tab: 3, label: 'Invites' },
];

const Main = ({ user }) => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState(false);
  const [tab, setTab] = useState(1);

  const connectionsURL = `${process.env.BASEURL}/api/connections/get?userId=${user?.userId}`;
  const { data, loading } = useSWR(connectionsURL, fetcher);

  useEffect(() => {
    mutate(connectionsURL);
  });

  return (
    <>
      <div className="mx-auto mt-0 mb-20 w-full max-w-5xl justify-center lg:mt-6">
        <div className="hidden w-full py-4 text-4xl font-medium tracking-tight sm:block">
          Connections
        </div>

        <div className="mb-4 overflow-hidden border border-base-200 pb-4 dark:border-base-700 md:rounded-lg">
          <div className="flex items-center justify-start border-b border-base-200 dark:border-base-700">
            {tabs.map((option, index) => (
              <button
                className={
                  'w-full border-b py-5 px-4 text-center text-sm font-semibold sm:px-8 sm:text-base ' +
                  (tab == option.tab
                    ? 'border-base-900 dark:border-base-50'
                    : 'border-transparent text-base-300 hover:text-base-900 dark:text-base-400 dark:hover:text-white')
                }
                onClick={() => setTab(option.tab)}
                key={index}
              >
                <span className="relative">
                  {option.label}{' '}
                  <span className="hidden sm:inline-flex">
                    {option.tab == 1 &&
                      data?.connections?.length > 0 &&
                      `(${data?.connections?.length})`}
                    {option.tab == 2 &&
                      data?.requested_pending?.length > 0 &&
                      `(${data?.requested_pending?.length})`}
                    {option.tab == 3 &&
                      data?.received_pending?.length > 0 &&
                      `(${data?.received_pending?.length})`}
                  </span>
                  {data?.received_pending?.length > 0 && option.tab == 3 && (
                    <span className="absolute top-0 -right-4 h-3 w-3 rounded-full bg-highlight-alert px-1"></span>
                  )}
                </span>
              </button>
            ))}
          </div>
          {!data && (
            <div className="my-20 flex justify-center">
              <Loader />
            </div>
          )}
          {tab == 1 && (
            <div className="w-full gap-8">
              {data?.connections?.length == 0 && (
                <div className="my-20 w-full text-center text-base">
                  You currently have no connections
                </div>
              )}

              {data?.connections?.map((connection, index) => (
                <Connection
                  connection={connection}
                  type="APPROVED"
                  setShowToast={setShowToast}
                  setToastMessage={setToastMessage}
                  key={index}
                />
              ))}
            </div>
          )}

          {tab == 2 && (
            <div className="w-full gap-8">
              {data?.requested_pending?.length == 0 && (
                <div className="my-20 w-full text-center text-base">
                  You have no connection requests pending.
                </div>
              )}

              {data?.requested_pending?.map((connection, index) => (
                <Connection
                  connection={connection}
                  type="REQUEST"
                  setShowToast={setShowToast}
                  setToastMessage={setToastMessage}
                  key={index}
                />
              ))}
            </div>
          )}

          {tab == 3 && (
            <div className="w-full gap-8">
              {data?.received_pending?.length == 0 && (
                <div className="my-20 w-full text-center text-base">
                  You have no connection invites.
                </div>
              )}

              {data?.received_pending?.map((connection, index) => (
                <Connection
                  connection={connection}
                  type="INVITE"
                  setShowToast={setShowToast}
                  setToastMessage={setToastMessage}
                  key={index}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {showToast && (
        <Toast show={showToast} setShow={setShowToast} message={toastMessage} />
      )}
    </>
  );
};

export default Main;
