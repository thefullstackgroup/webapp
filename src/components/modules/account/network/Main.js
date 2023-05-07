import { useState, useEffect } from 'react';
import useSWR, { mutate } from 'swr';
import Connection from 'components/modules/account/network/Connection';
import Toast from 'components/common/elements/Toast';
import Avatar from 'components/common/elements/Avatar';
import fetcher from 'utils/fetcher';

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
  const { data } = useSWR(connectionsURL, fetcher);

  useEffect(() => {
    mutate(connectionsURL);
  });

  return (
    <>
      <div className="mt-0 lg:mt-12 w-full flex justify-center">
        <div className="w-full lg:max-w-full px-0 xl:px-4 2xl:px-0 md:ml-6 lg:ml-20 xl:ml-52 2xl:ml-56">
          <div className="relative max-w-4xl mx-auto mb-20">
            <div className="flex items-start space-x-4 mb-10 px-4 sm:px-0 mt-4">
              <Avatar
                image={user.profilePicUrl}
                name={user.displayName}
                userId={user.userId}
                dimensions="h-14 w-14 sm:h-16 sm:w-16"
              />
              <div>
                <div className="text-2xl font-bold text-slate-200 tracking-tight lg:text-3xl">
                  My Network
                </div>
                <div className="text-sm sm:text-base text-slate-500">
                  Opportunities come around when you expand your network.
                </div>
              </div>
            </div>

            <div className="mt-4 md:rounded-lg bg-tfsdark-700 mb-4 pb-4 overflow-hidden">
              <div className="flex items-center justify-start divide-x divide-black mb-2">
                {tabs.map((option, index) => (
                  <button
                    className={
                      'py-3 px-4 sm:px-8 text-center w-full text-sm sm:text-base font-semibold ' +
                      (tab == option.tab
                        ? 'bg-tfsdark-700'
                        : 'bg-tfsdark-800 text-slate-500 hover:text-white')
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
                      {data?.received_pending?.length > 0 &&
                        option.tab == 3 && (
                          <span className="absolute top-0 -right-4 w-3 h-3 rounded-full bg-red-500 px-1"></span>
                        )}
                    </span>
                  </button>
                ))}
              </div>
              {tab == 1 && (
                <div className="gap-8 w-full divide-y divide-tfsdark-800">
                  {!data && (
                    <div className="my-20 w-full text-center text-base">
                      You currently have no connections
                    </div>
                  )}

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
                <div className="gap-8 w-full divide-y divide-tfsdark-800">
                  {!data && (
                    <div className="my-20 w-full text-center text-base">
                      You have no connection requests pending.
                    </div>
                  )}

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
                <div className="gap-8 w-full divide-y divide-tfsdark-800">
                  {!data && (
                    <div className="my-20 w-full text-center text-base">
                      You have no connection invites.
                    </div>
                  )}

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
        </div>
      </div>

      {showToast && (
        <Toast show={showToast} setShow={setShowToast} message={toastMessage} />
      )}
    </>
  );
};

export default Main;
