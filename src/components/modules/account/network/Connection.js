import Avatar from 'components/common/elements/Avatar';
import { useAuthUser } from 'next-firebase-auth';
import Link from 'next/link';
import { sendSlackMessage } from 'utils/slack/sendMessageSlack';
import {
  IoChatbubblesOutline,
  IoCheckmark,
  IoCloseSharp,
} from 'react-icons/io5';

const CardConnection = ({
  connection,
  type,
  setShowToast,
  setToastMessage,
}) => {
  const AuthUser = useAuthUser();

  const handleRemove = async (userIdToReject) => {
    let formData = {
      requester_user_id: userIdToReject,
      receiver_user_id: AuthUser.id,
    };

    const accessToken = await AuthUser.getIdToken();
    await fetch(`${process.env.BASEURL}/api/accounts/connections/reject`, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
    });
    setToastMessage('Connection removed');
    setShowToast(true);
    sendSlackMessage(`Removed a connection request`);
  };

  const handleDecline = async (userIdToReject) => {
    const accessToken = await AuthUser.getIdToken();

    const formData = {
      requester_user_id: userIdToReject,
      receiver_user_id: AuthUser.id,
    };

    await fetch(`${process.env.BASEURL}/api/accounts/connections/reject`, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
    });
    setToastMessage('Connection invite declined');
    setShowToast(true);
    sendSlackMessage(`Declined a connection request`);
  };

  const handleAccept = async (userIdToApprove) => {
    const formData = {
      requester_user_id: userIdToApprove,
      receiver_user_id: AuthUser.id,
    };

    const accessToken = await AuthUser.getIdToken();

    await fetch(`${process.env.BASEURL}/api/accounts/connections/approve`, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
    });
    setToastMessage('Connection invite accepted');
    setShowToast(true);
    sendSlackMessage(`Approved a connection request`);
  };

  return (
    <div className="box box-link">
      <div className="flex items-start space-x-3">
        <Avatar
          image={connection.picture}
          href={`/${connection.username}`}
          name={connection.username}
          userId={connection.user_id}
          dimensions="w-14 h-14"
        />

        <div className="space-y-2">
          <div className="flex cursor-pointer flex-col whitespace-normal">
            <p className="whitespace-nowrap font-semibold">
              @{connection.username}
            </p>

            <p className="text-sm text-base-300 dark:text-base-400">
              {connection.title}
            </p>
          </div>

          {type === 'APPROVED' && (
            <div className="flex items-center space-x-2">
              <Link href={`${process.env.BASEURL}/${connection.username}`}>
                <button className="btn btn-sm btn-secondary">
                  <span>Send message</span>
                </button>
              </Link>
              {/* <button
                className="btn btn-sm btn-secondary"
                onClick={() => handleRemove(connection.user_id)}
              >
                <IoCloseSharp className="block h-5 w-5 sm:hidden" />
                <span className="hidden sm:block">Remove</span>
              </button> */}
            </div>
          )}

          {type === 'INVITE' && (
            <div className="flex items-center space-x-2">
              <button
                className="btn btn-sm btn-primary"
                onClick={() => handleAccept(connection.user_id)}
              >
                <IoCheckmark className="block h-5 w-5 sm:hidden" />
                <span className="hidden sm:block">Accept</span>
              </button>

              <button
                className="btn btn-sm btn-secondary"
                onClick={() => handleDecline(connection.user_id)}
              >
                <IoCloseSharp className="block h-5 w-5 sm:hidden" />
                <span className="hidden sm:block">Decline</span>
              </button>
            </div>
          )}

          {type === 'REQUEST' && (
            <div className="btn btn-sm btn-ghost px-0">Request pending...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardConnection;
