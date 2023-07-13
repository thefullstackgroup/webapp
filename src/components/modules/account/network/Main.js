import { useState, useEffect } from 'react';
import useSWR, { mutate } from 'swr';
import Connection from 'components/modules/account/network/Connection';
import Toast from 'components/common/elements/Toast';
import fetcher from 'utils/fetcher';
import Loader from 'components/common/elements/Loader';

const tabs = [
  { tab: 1, label: 'Connections' },
  { tab: 2, label: 'Sent' },
  { tab: 3, label: 'Received' },
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
      <div className="page page-5xl space-y-6">
        <h2>Network</h2>
        <div className="tabs justify-start space-x-6">
          {tabs.map((option, index) => (
            <button
              className={
                tab == option.tab ? 'tab-item tab-item-active' : 'tab-item '
              }
              onClick={() => setTab(option.tab)}
              key={index}
            >
              <span className="relative">
                {option.label}{' '}
                <span className="inline-flex">
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
                  <span className="absolute top-0 -right-4 h-2 w-2 rounded-full bg-highlight-alert px-1"></span>
                )}
              </span>
            </button>
          ))}
        </div>
        <div className="">
          {!data && (
            <div className="my-20 flex justify-center">
              <Loader />
            </div>
          )}
          {tab == 1 && (
            <div>
              {data?.connections?.length == 0 && (
                <div className="box">You currently have no connections</div>
              )}

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
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
            </div>
          )}

          {tab == 2 && (
            <div>
              {data?.requested_pending?.length == 0 && (
                <div className="box">
                  You have no connection requests pending.
                </div>
              )}

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
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
            </div>
          )}

          {tab == 3 && (
            <div>
              {data?.received_pending?.length == 0 && (
                <div className="box">You have no connection invites.</div>
              )}

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
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
