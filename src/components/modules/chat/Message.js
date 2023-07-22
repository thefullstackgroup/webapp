import Moment from 'moment';

const Message = ({ user, message, numberOfMessages, currentMessageIndex }) => {
  const sender = message.sender === user.userId;
  return (
    <>
      <div className={!sender ? `flex justify-start` : `flex justify-end`}>
        <div
          className={
            !sender
              ? `my-1 mb-2 w-4/5 max-w-max break-words rounded-lg rounded-bl-none bg-base-200 py-2 px-2.5 text-base dark:bg-base-700 sm:w-auto sm:max-w-lg sm:px-4 sm:text-sm`
              : `my-1 mb-2 w-4/5 max-w-max break-words rounded-lg rounded-br-none bg-blue-600 py-2 px-2.5 text-base text-white sm:w-auto sm:max-w-lg sm:px-4 sm:text-sm`
          }
        >
          {message.text}
        </div>
      </div>

      {numberOfMessages == currentMessageIndex + 1 && (
        <div className={!sender ? `flex justify-start` : `flex justify-end`}>
          <span className="px-1 text-xs text-gray-400">
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
