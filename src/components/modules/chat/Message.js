import Moment from 'moment';

const Message = ({ user, message, numberOfMessages, currentMessageIndex }) => {
  const sender = message.sender === user.userId;
  return (
    <>
      <div className={!sender ? `flex justify-start` : `flex justify-end`}>
        <div
          className={
            !sender
              ? `bg-gray-700 py-2 px-2 sm:px-4 rounded-lg rounded-bl-none my-1 text-sm w-4/5 sm:w-auto max-w-max sm:max-w-lg`
              : `bg-blue-600 text-white py-2 px-2 sm:px-4 rounded-lg rounded-br-none my-1 text-sm w-4/5 sm:w-auto max-w-max sm:max-w-lg`
          }
        >
          {message.text}
        </div>
      </div>

      {numberOfMessages == currentMessageIndex + 1 && (
        <div className={!sender ? `flex justify-start` : `flex justify-end`}>
          <span className="text-xs text-gray-400 px-1">
            Sent{' '}
            {Moment(new Date(message?.timestamp?.seconds * 1000)).format(
              'MMM DD, YYYY h:mm a'
            )}
          </span>
        </div>
      )}
    </>
  );
};

export default Message;
