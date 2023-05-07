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
        <div className="btn-secondary bg-transparent border hover:bg-transparent border-tfsdark-600 group text-slate-400">
          <span>Pending...</span>
        </div>
      )}

      <ModalDialog show={showModal} setShow={setShowModal} title="Connect">
        {!displayConnectionSuccess && (
          <div className="py-4">
            <div className="flex justify-center space-x-2 sm:space-x-4 my-0 w-full">
              <Avatar
                image={connectTo?.profilePicUrl}
                name={connectTo?.name}
                dimensions="w-24 h-24 border-2 border-tfsdark-800"
              />

              <IoCode className="w-9 h-auto text-slate-400" />

              <Avatar
                image={connectFrom?.profilePicUrl}
                name={connectFrom?.name}
                dimensions="w-24 h-24 border-2 border-tfsdark-800"
              />
            </div>
            <div className="flex flex-col items-center mt-6 max-w-7xl sm:px-12">
              <span className="text-center text-xl sm:text-2xl font-semibold text-slate-100">
                Connect to {connectTo?.name}
              </span>
              <span className="text-center space-x-2 text-slate-400">
                Request to connect and start the conversation.
              </span>
            </div>
            <div className="">
              <div className="max-w-7xl mx-auto py-4 px-2 sm:py-4 sm:px-6 lg:px-8 mt-4">
                <ul>
                  <li className="px-4 rounded-lg mb-0 font-normal text-base sm:text-lg text-slate-100 text-center">
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
          <div className="py-4 relative overflow-hidden">
            <Confetti />
            <div className="flex justify-center space-x-2 sm:-space-x-4 my-0 w-full">
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
            <div className="flex flex-col items-center mt-6 max-w-7xl sm:px-12 mb-6">
              <span className="text-center space-x-2 text-xl sm:text-3xl font-bold tracking-tight text-gray-100">
                Boom!
              </span>
              <span className="mt-2 text-center space-x-2 text-base sm:text-xl font-light tracking-tight text-gray-300">
                Your request was sent to {connectTo.name}.
              </span>
              <span className="text-center my-4">
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
