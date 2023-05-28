import { React, useState } from 'react';
import axios from 'axios';
import ModalDialog from 'components/common/modals/ModalDialog';
import { Transition } from '@headlessui/react';
import {
  IoEllipsisHorizontal,
  IoFlagOutline,
  IoLinkOutline,
} from 'react-icons/io5';
import { sendSlackMessage } from 'utils/slack/sendMessageSlack';

const reasons = [
  'Spam',
  'Incorrect Connection Request',
  'Plagiarism',
  'Harrasment',
  'False Information',
  'Hate Speech',
  'Racist Activity',
  'Other',
];

const ButtonReport = ({ user, profile }) => {
  const [showPanel, setShowPanel] = useState(false);
  const [showReportProfile, setShowReportProfile] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [reportComments, setReportComments] = useState('');
  const [reportSubmitted, setReportSubmitted] = useState(false);

  const handleSubmitReport = async () => {
    if (!reportReason.trim().length) {
      alert('Please select reason');
      return;
    }

    const message = `Hey <br/><br/> <strong>${user.name}</strong> (${user.displayName}) has reported the following profile. 
    <br/><br/> <strong>Profile:</strong> ${profile.name} (${profile.displayName})
    <br/> <strong>Reason:</strong> ${reportReason}
    <br/> <strong>Other comments:</strong> ${reportComments}
    <br/><br/>Please reach out to user and investigate.`;

    const data = {
      email: 'legal@thefullstack.network',
      name: 'Support',
      subject: '!Important: Profile Reported',
      client_message: message,
    };

    await axios.post(`${process.env.BASEURL}/api/mail/send`, data, {});
    sendSlackMessage(
      `\nREPORTED THE PROFILE '${profile.displayName}'. \nReason for profile reported was '${reportReason}'`
    );
    setReportSubmitted(true);
  };

  return (
    <>
      <div>
        <button
          type="button"
          className="btn btn-ghost group w-full border border-transparent bg-transparent px-0 hover:bg-transparent"
          onClick={() => setShowPanel(true)}
        >
          <IoEllipsisHorizontal className="group-hover:text-primary-500 h-5 w-5 text-base-400" />
          <span className="hidden">Report</span>
        </button>

        <Transition show={showPanel}>
          <div className="absolute right-0 z-20 mt-4 w-auto">
            <div
              className="fixed inset-0"
              onClick={() => setShowPanel(!showPanel)}
            ></div>
            <div className="relative flex h-20 w-48 flex-col divide-y-2 divide-base-700 overflow-scroll overscroll-contain rounded-md border border-base-600 bg-base-700 py-0.5 text-sm shadow-xl sm:max-w-xl">
              <div className="rounded-lg bg-base-700">
                <ul className="flex flex-col divide-y-2 divide-base-600/50 text-left text-sm text-base-400">
                  <li className="px-2 py-2 hover:text-white">
                    <button
                      className="flex w-full items-center space-x-2"
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `${process.env.BASEURL}/${profile.displayName}`
                        );
                        setIsCopied(true);
                        sendSlackMessage(
                          `@${user.displayName} has copied the link to the profile for @${profile.displayName}`
                        );
                      }}
                    >
                      <IoLinkOutline className="h-5 w-5" />
                      {isCopied ? (
                        <a className="text-green-500">Link copied!</a>
                      ) : (
                        <a>Copy link to profile</a>
                      )}
                    </button>
                  </li>
                  <li className="px-2 py-2 text-red-500 hover:text-red-600">
                    <button
                      className="flex w-full items-center space-x-2"
                      onClick={() => {
                        setShowReportProfile(true);
                        setShowPanel(false);
                      }}
                    >
                      <IoFlagOutline className="h-5 w-5" />
                      <a>Report profile</a>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Transition>
      </div>

      <ModalDialog
        show={showReportProfile}
        setShow={setShowReportProfile}
        title={`Report ${profile.name}`}
        disabled
      >
        <div className="mx-auto p-2 py-4 text-center shadow-xl sm:max-w-xl">
          {reportSubmitted ? (
            <div className="space-y-3 text-left">
              <p className="mb-6 font-bold">Report submitted.</p>
              <p className="mb-6 pb-6 text-sm">
                Thank you for notifying us and we will investigate as soon as
                possible. Please make sure you have included any information you
                think could help us with our investigation, including
                screenshots. Thank you!
              </p>

              <button
                className="btn-primary w-full"
                onClick={() => setShowReportProfile(false)}
              >
                Done
              </button>
            </div>
          ) : (
            <div className="space-y-3 text-left">
              <p className="mb-6 text-sm">
                Help us keep The Full Stack community safe by reporting any
                content or users you see that violates our{' '}
                <a
                  href={`${process.env.BASEURL}/code-of-conduct`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-link font-semibold"
                >
                  Code of Conduct
                </a>
                .
              </p>
              <h4 className="text-sm font-semibold">
                Why are you reporting this profile?
              </h4>
              <div className="flex items-center">
                <select
                  className="text-input"
                  onChange={(e) => setReportReason(e.target.value)}
                >
                  <option value={''}>Please select a reason ...</option>
                  {reasons.map((reason, index) => (
                    <option value={reason} key={index}>
                      {reason}
                    </option>
                  ))}
                </select>
              </div>
              <h4 className="text-sm font-semibold">Other comments</h4>
              <div className="flex items-center">
                <textarea
                  className="text-input"
                  rows={3}
                  value={reportComments}
                  onChange={(e) => setReportComments(e.target.value)}
                ></textarea>
              </div>
              <button
                className="btn-primary w-full"
                onClick={() => handleSubmitReport()}
              >
                Submit report
              </button>
              <button
                className="w-full pt-4 text-center text-sm text-base-500"
                onClick={() => setShowReportProfile(false)}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </ModalDialog>
    </>
  );
};

export default ButtonReport;
