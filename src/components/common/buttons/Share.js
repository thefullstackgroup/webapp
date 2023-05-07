import { React, useState } from 'react';
import { IoArrowRedoOutline, IoCopyOutline } from 'react-icons/io5';
import { sendSlackMessage } from 'utils/slack/sendMessageSlack';
import SocialShareLinks from 'components/common/elements/SocialShareLinks';
import ModalDialog from 'components/common/modals/ModalDialog';
import ToolTip from 'components/common/elements/ToolTip';

const Share = ({ url, message }) => {
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  return (
    <>
      <button
        className="btn-secondary bg-transparent hover:bg-slate-400/20 rounded-xl px-2 text-sm cursor-pointer group relative"
        onClick={() => setShowShareOptions(!showShareOptions)}
      >
        <ToolTip message="Share" />
        <IoArrowRedoOutline className="w-6 h-auto sm:group-hover:text-slate-300" />
      </button>

      <ModalDialog
        show={showShareOptions}
        setShow={setShowShareOptions}
        title="Share post"
      >
        <div className="py-4 p-2 text-center shadow-xl sm:max-w-xl mx-auto">
          <div className="space-y-3 text-left max-w-xs md:max-w-full">
            <h4 className="text-sm font-semibold">Copy link</h4>
            <div
              className="text-input flex items-center justify-between space-x-2 cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(url);
                setIsCopied(true);
                sendSlackMessage(
                  `SHARE MODAL: A user has copied the link ${url} and might share it.`
                );
              }}
            >
              <span className="w-11/12 overflow-hidden overflow-x-scroll no-scrollbar whitespace-nowrap ">
                {url}
              </span>
              <IoCopyOutline className="h-6 w-6 text-slate-400" />
            </div>
            {isCopied && (
              <span className="text-xs font-semibold text-tfstertiary-500">
                Copied to clipboard!
              </span>
            )}
          </div>
          <div className="mt-8 space-y-3 text-left">
            <h4 className="text-sm font-semibold">Share via</h4>
            <SocialShareLinks link={url} title={message} />
          </div>
        </div>
      </ModalDialog>
    </>
  );
};

export default Share;
