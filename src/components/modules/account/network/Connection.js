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
    <div className="flex items-center justify-between py-3 px-4 sm:px-6">
      <div className="flex items-center space-x-4">
        <Avatar
          image={connection.picture}
          href={`/${connection.username}`}
          name={connection.username}
          userId={connection.user_id}
          dimensions=""
        />

        <Link href={`${process.env.BASEURL}/${connection.username}`} passHref>
          <div className="flex-1 min-w-0 cursor-pointer">
            <p className="text-sm sm:text-base font-medium text-slate-100">
              @{connection.username}
            </p>
            <p className="text-xs sm:text-sm font-medium text-slate-400">
              {connection.title}
            </p>
          </div>
        </Link>
      </div>
      {type === 'APPROVED' && (
        <div className="flex space-x-2 items-center">
          <Link href={`${process.env.BASEURL}/${connection.username}`}>
            <button className="btn-primary">
              <IoChatbubblesOutline className="w-5 h-5 block sm:hidden" />
              <span className="hidden sm:block">Chat</span>
            </button>
          </Link>
          <button
            className="btn-secondary"
            onClick={() => handleRemove(connection.user_id)}
          >
            <IoCloseSharp className="w-5 h-5 block sm:hidden" />
            <span className="hidden sm:block">Remove</span>
          </button>
        </div>
      )}

      {type === 'INVITE' && (
        <div className="flex space-x-2 items-center">
          <button
            className="btn-primary"
            onClick={() => handleAccept(connection.user_id)}
          >
            <IoCheckmark className="w-5 h-5 block sm:hidden" />
            <span className="hidden sm:block">Accept</span>
          </button>

          <button
            className="btn-secondary"
            onClick={() => handleDecline(connection.user_id)}
          >
            <IoCloseSharp className="w-5 h-5 block sm:hidden" />
            <span className="hidden sm:block">Decline</span>
          </button>
        </div>
      )}

      {type === 'REQUEST' && (
        <div className="text-sm text-slate-400">Pending...</div>
      )}
    </div>
  );
};

export default CardConnection;
