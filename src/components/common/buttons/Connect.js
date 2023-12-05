import { React, useState, useEffect } from 'react';
import * as ga from 'lib/ga';
import ModalAlert from 'components/common/modals/ModalAlert';
import Avatar from 'components/common/elements/Avatar';
import Confetti from 'react-confetti';
import { sendSlackMessage } from 'utils/slack/sendMessageSlack';
import { IoCode } from 'react-icons/io5';

const ButtonConnect = ({
  connectionPending,
  connectFrom,
  connectTo,
  size = '',
  label,
}) => {
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
        <button
          className={`btn btn-primary ${size}`}
          onClick={() => setShowModal(true)}
        >
          <span>{label ? label : 'Connect'}</span>
        </button>
      )}

      {showPendingButton && (
        <div className="btn btn-secondary group" disabled>
          <span>Pending...</span>
        </div>
      )}

      <ModalAlert
        show={showModal}
        setShow={setShowModal}
        title="Connection request"
      >
        {!displayConnectionSuccess && (
          <div className="space-y-6 py-6">
            <div className="my-0 flex w-full justify-center space-x-2 sm:space-x-4">
              <Avatar
                image={connectTo?.profilePicUrl}
                name={connectTo?.name}
                dimensions="w-24 h-24"
              />

              <IoCode className="h-auto w-9 text-base-300" />

              <Avatar
                image={connectFrom?.profilePicUrl}
                name={connectFrom?.name}
                dimensions="w-24 h-24"
              />
            </div>
            <div className="mt-6 flex max-w-7xl flex-col items-center">
              <span className="text-center text-xl font-semibold sm:text-2xl">
                Connect to {connectTo?.name}
              </span>
              <span className="text-center dark:text-base-300">
                Send a connection request.
              </span>
            </div>
            <div className="flex justify-center">
              <button
                className="btn btn-primary px-10"
                onClick={() => actionConnect()}
              >
                <span>Send</span>
              </button>
            </div>
          </div>
        )}

        {displayConnectionSuccess && (
          <div className="relative overflow-hidden py-6">
            <Confetti />
            <div className="my-0 flex w-full justify-center space-x-2 sm:-space-x-4">
              <Avatar
                image={connectTo.profilePicUrl}
                name={connectTo.name}
                dimensions="w-24 h-24 border-2 border-base-800"
              />
              <Avatar
                image={connectFrom.profilePicUrl}
                name={connectFrom.name}
                dimensions="w-24 h-24 border-2 border-base-800"
              />
            </div>
            <div className="mt-6 mb-6 flex max-w-7xl flex-col items-center sm:px-12">
              <span className="space-x-2 text-center text-xl font-bold tracking-tight sm:text-3xl">
                Boom!
              </span>
              <span className="mt-2 space-x-2 text-center text-base font-light tracking-tight sm:text-xl">
                Your request was sent to {connectTo.name}.
              </span>
              <span className="my-4 text-center">
                Good luck to you both becoming buddies. <br />
                Happy coding!
              </span>
            </div>
          </div>
        )}
      </ModalAlert>
    </>
  );
};

export default ButtonConnect;
