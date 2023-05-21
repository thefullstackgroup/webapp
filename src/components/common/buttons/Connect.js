import { React, useState, useEffect } from 'react';
import * as ga from 'lib/ga';
import ModalDialog from 'components/common/modals/ModalDialog';
import Avatar from 'components/common/elements/Avatar';
import Confetti from 'react-confetti';
import { sendSlackMessage } from 'utils/slack/sendMessageSlack';
import { IoCode } from 'react-icons/io5';

const ButtonConnect = ({ connectionPending, connectFrom, connectTo }) => {
  const [showPendingButton, setShowPendingButton] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [displayConnectionSuccess, setDisplayConnectionSuccess] =
    useState(false);

  const actionConnect = async () => {
    let formData = {
      requester_user_id: connectFrom.userId,
      connectTo: connectTo.displayName,
      company: null,
    };

    const response = await fetch(`${process.env.BASEURL}/api/profile/connect`, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status != 200) {
      console.log('Connection request could not be sent at this time');
    } else {
      sendSlackMessage(
        `CONNECTION REQUEST from ${connectFrom.name} to ${connectTo.name}.`
      );
      setDisplayConnectionSuccess(true);
      ga.event({
        action: 'user_sent_connection_request',
      });
    }
  };

  useEffect(() => {
    setShowPendingButton(connectionPending);
  }, [connectionPending]);

  return (
    <>
      {!showPendingButton && (
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          <span>Connect</span>
        </button>
      )}

      {showPendingButton && (
        <div className="btn btn-secondary group border border-tfsdark-600 bg-transparent text-slate-400 hover:bg-transparent">
          <span>Pending...</span>
        </div>
      )}

      <ModalDialog show={showModal} setShow={setShowModal} title="Connect">
        {!displayConnectionSuccess && (
          <div className="py-4">
            <div className="my-0 flex w-full justify-center space-x-2 sm:space-x-4">
              <Avatar
                image={connectTo?.profilePicUrl}
                name={connectTo?.name}
                dimensions="w-24 h-24 border-2 border-tfsdark-800"
              />

              <IoCode className="h-auto w-9 text-slate-400" />

              <Avatar
                image={connectFrom?.profilePicUrl}
                name={connectFrom?.name}
                dimensions="w-24 h-24 border-2 border-tfsdark-800"
              />
            </div>
            <div className="mt-6 flex max-w-7xl flex-col items-center sm:px-12">
              <span className="text-center text-xl font-semibold text-slate-100 sm:text-2xl">
                Connect to {connectTo?.name}
              </span>
              <span className="space-x-2 text-center text-slate-400">
                Request to connect and start the conversation.
              </span>
            </div>
            <div className="">
              <div className="mx-auto mt-4 max-w-7xl py-4 px-2 sm:py-4 sm:px-6 lg:px-8">
                <ul>
                  <li className="mb-0 rounded-lg px-4 text-center text-base font-normal text-slate-100 sm:text-lg">
                    <button
                      className="btn-primary px-10"
                      onClick={() => actionConnect()}
                    >
                      <span>Request</span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {displayConnectionSuccess && (
          <div className="relative overflow-hidden py-4">
            <Confetti />
            <div className="my-0 flex w-full justify-center space-x-2 sm:-space-x-4">
              <Avatar
                image={connectTo.profilePicUrl}
                name={connectTo.name}
                dimensions="w-24 h-24 border-2 border-tfsdark-800"
              />
              <Avatar
                image={connectFrom.profilePicUrl}
                name={connectFrom.name}
                dimensions="w-24 h-24 border-2 border-tfsdark-800"
              />
            </div>
            <div className="mt-6 mb-6 flex max-w-7xl flex-col items-center sm:px-12">
              <span className="space-x-2 text-center text-xl font-bold tracking-tight text-gray-100 sm:text-3xl">
                Boom!
              </span>
              <span className="mt-2 space-x-2 text-center text-base font-light tracking-tight text-gray-300 sm:text-xl">
                Your request was sent to {connectTo.name}.
              </span>
              <span className="my-4 text-center">
                Unlike other networks, making connections on The Full Stack
                carries meaning and value. Good luck to you both becoming
                buddies!
              </span>
            </div>
          </div>
        )}
      </ModalDialog>
    </>
  );
};

export default ButtonConnect;
