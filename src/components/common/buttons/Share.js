import { React, useState } from "react";
import { IoCopyOutline } from "react-icons/io5";
import { sendSlackMessage } from "utils/slack/sendMessageSlack";
import SocialShareLinks from "components/common/elements/SocialShareLinks";
import ToolTip from "components/common/elements/ToolTip";
import ModalAlert from "../modals/ModalAlert";
import Icon from "../elements/Icon";

const ShareButton = ({ url, message, showLabel, toolTipPosition = "top" }) => {
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  return (
    <>
      <button
        className="btn btn-ghost btn-with-icon group group relative cursor-pointer space-x-1 rounded-xl bg-transparent px-2 pl-1 text-sm text-base-800 hover:bg-base-200 hover:text-base-700 dark:text-base-100 dark:hover:bg-base-700 dark:hover:text-base-100"
        onClick={() => setShowShareOptions(!showShareOptions)}
      >
        <ToolTip message="Share" position={toolTipPosition} />
        <Icon name="FiShare2" className="h-auto w-6" />
        {showLabel && <span>Share</span>}
      </button>

      <ModalAlert
        show={showShareOptions}
        setShow={setShowShareOptions}
        title="Share this project"
      >
        <div className="mx-auto p-2 py-4 text-center sm:max-w-xl">
          <div className="max-w-xs space-y-3 text-left md:max-w-full">
            <h4 className="text-sm font-semibold">Copy link</h4>
            <div
              className="text-input flex cursor-pointer items-center justify-between space-x-2 border"
              onClick={() => {
                navigator.clipboard.writeText(url);
                setIsCopied(true);
                sendSlackMessage(
                  `SHARE MODAL: A user has copied the link ${url} and might share it.`
                );
              }}
            >
              <span className="no-scrollbar w-11/12 overflow-hidden overflow-x-scroll whitespace-nowrap ">
                {url}
              </span>
              <IoCopyOutline className="h-6 w-6 text-base-400" />
            </div>
            {isCopied && (
              <span className="text-tfstertiary-500 text-xs font-semibold">
                Copied to clipboard!
              </span>
            )}
          </div>
          <div className="mt-8 space-y-3 text-left">
            <h4 className="text-sm font-semibold">Share via</h4>
            <SocialShareLinks link={url} title={message} />
          </div>
        </div>
      </ModalAlert>
    </>
  );
};

export default ShareButton;
