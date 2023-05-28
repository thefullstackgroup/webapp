import { useState } from 'react';
import axios from 'axios';
import Toast from 'components/common/elements/Toast';
import { CgSpinner } from 'react-icons/cg';
import UploadIntroVideo from 'components/common/elements/mux/UploadIntroVideo';
import VideoPlayerProfile from 'components/common/elements/mux/ProfileVideoPlayer';
import { IoVideocamOutline } from 'react-icons/io5';
import { sendSlackMessage } from 'utils/slack/sendMessageSlack';

const VideoIntro = ({ user }) => {
  const [saving, setSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [toastMessage, setToastMessage] = useState('');
  const [muxAssetId, setMuxAssetId] = useState(user?.profileVideoUrl || '');

  const handleSubmit = async () => {
    setSaving(true);

    const data = {
      profileVideoUrl: muxAssetId,
    };

    await axios
      .post(`${process.env.BASEURL}/api/profile/update`, data)
      .then((response) => {
        setToastMessage('Video intro added');
        setShowToast(true);
        setSaving(false);
        sendSlackMessage('VIDEO INTRO: User has added their video intro.');
      })
      .catch((error) => {
        setSaving(false);
      });
  };

  const handleDelete = async () => {
    setSaving(true);

    const data = {
      profileVideoUrl: '',
    };

    await axios
      .post(`${process.env.BASEURL}/api/profile/update`, data)
      .then((response) => {
        setToastMessage('Video intro removed');
        setShowToast(true);
        setSaving(false);
        sendSlackMessage('VIDEO INTRO: User has removed their video intro.');
      })
      .catch((error) => {
        setSaving(false);
      });
  };

  return (
    <>
      {showSplash && !muxAssetId && (
        <div className="py-4 px-2">
          <div className="grid space-y-6 px-4 py-2 md:grid-cols-2 md:space-y-0">
            <div className="space-y-6">
              <h4 className="text-4xl font-semibold tracking-tight">
                Add a video intro <br />
                to your profile
              </h4>
              <p className="text-lg font-light text-base-300">
                People make real connections with real people, not just code.
                Introduce yourself to others in a whole new way, right from your
                profile. With a video intro on your profile, you&apos;re 2x more
                likely to make better connections and potential opportunities
                from teams so you can work like never before.
              </p>
              <div>
                <button
                  className="btn-primary w-full py-2"
                  onClick={() => setShowSplash(false)}
                >
                  Get started &rarr;
                </button>
              </div>
            </div>
            <div className="relative flex justify-center pb-20 md:justify-end md:pb-0">
              <div className="relative mt-2 h-96 w-64 overflow-hidden rounded-xl border-2 border-base-600 p-2">
                <VideoPlayerProfile
                  src={`https://stream.mux.com/OGgHsrxVO6KHXUBDdtsVPCMMnJej3tuPszF3L00K00m8U.m3u8`}
                  controls={false}
                  muted={true}
                  autoPlay={true}
                />
              </div>

              <span className="absolute top-10 left-28 -translate-x-1/2 whitespace-nowrap rounded-lg bg-purple-600 px-3 py-1 text-lg text-white transition before:absolute before:left-1/2 before:top-full before:-translate-x-1/2 before:border-4 before:border-transparent before:border-t-purple-600 before:content-['']">
                Hello!
              </span>
            </div>
          </div>
        </div>
      )}

      {(!showSplash || muxAssetId) && (
        <div className="py-4 px-2">
          <div className="grid space-y-6 px-4 py-2 md:grid-cols-2 md:space-y-0">
            <div className="space-y-6">
              <h4 className="text-4xl font-semibold tracking-tight">
                3 simple steps...
              </h4>
              <p className="text-lg font-medium">1. Record your video intro</p>
              <span className="font-light text-base-400">
                You can record your video intro on your computer, phone or
                camera - the choice is yours!
              </span>
              <p className="text-lg font-medium">2. Upload your video here</p>
              <span className="font-light text-base-400">
                Most video formats supported, including mp4, mov, mpeg, etc.
                Should be no longer than 2 minutes.
              </span>
              <p className="text-lg font-medium">
                3. Add the video to your profile
              </p>
              <span className="font-light text-base-400">
                Once happy with the preview, click the Add to my profile button.
              </span>
            </div>
            <div className="relative flex justify-center pb-20 md:justify-end md:pb-0">
              <div className="w-64 space-y-4">
                {!muxAssetId && (
                  <div className="mt-2 flex h-96 w-64 max-w-full items-center justify-center rounded-xl border-2 border-base-600 p-2 px-6 pt-5 pb-6">
                    <div className="space-y-1 text-center">
                      <IoVideocamOutline className="mx-auto h-12 w-12 text-gray-300" />
                      <div className="flex text-sm text-gray-600">
                        <UploadIntroVideo
                          setMuxAssetId={setMuxAssetId}
                          buttonLabel={'Upload video'}
                        />
                      </div>
                      <p className="text-xs text-gray-500">
                        mp4, mov, mpeg, etc
                      </p>
                    </div>
                  </div>
                )}

                {muxAssetId != '' && (
                  <div className="space-y-2">
                    <div className="relative mx-auto mt-2 h-96 w-64 overflow-hidden rounded-xl border-2 border-base-600 p-2">
                      <VideoPlayerProfile
                        src={`https://stream.mux.com/${muxAssetId}.m3u8`}
                        controls={false}
                        muted={true}
                        autoPlay={true}
                      />
                    </div>
                    <div>
                      <button
                        className="btn-secondary w-full"
                        onClick={() => {
                          setMuxAssetId('');
                          handleDelete();
                        }}
                      >
                        Retake
                      </button>
                    </div>
                    <div>
                      {saving ? (
                        <button
                          className="btn-primary btn-with-icon w-full justify-center"
                          disabled
                        >
                          <CgSpinner className="h-4 w-4 animate-spin" />
                          <span>Saving</span>
                        </button>
                      ) : (
                        <button
                          className="btn-primary w-full"
                          onClick={() => handleSubmit()}
                        >
                          <span className="hidden sm:block">
                            Add to my profile
                          </span>
                          <span className="block sm:hidden">Save</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {muxAssetId != '' && <div className=""></div>}
              </div>
            </div>
          </div>
        </div>
      )}

      <Toast show={showToast} setShow={setShowToast} message={toastMessage} />
    </>
  );
};

export default VideoIntro;
