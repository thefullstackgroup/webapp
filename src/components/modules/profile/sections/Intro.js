import Image from 'next/future/image';
import VideoPlayerProfile from 'components/common/elements/mux/ProfileVideoPlayer';
import { IoCloseCircle } from 'react-icons/io5';

const Intro = ({
  profile,
  showVideoIntro,
  setShowVideoIntro,
  setHideVideoIntro,
}) => {
  return showVideoIntro ? (
    <div
      className="fixed inset-0 left-0 top-0"
      onClick={() => setShowVideoIntro(false)}
    >
      <div className="fixed bottom-20 right-4 sm:bottom-4 sm:right-8 w-56 h-96">
        <div
          className="w-full h-full rounded-xl overflow-hidden border-2 border-purple-700 shadow-xl shadow-purple-700/30 cursor-pointer bg-black"
          onClick={() => setShowVideoIntro(false)}
        >
          <VideoPlayerProfile
            src={`https://stream.mux.com/${profile?.profileVideoUrl}.m3u8`}
            controls={false}
            muted={false}
            autoPlay={true}
          />
        </div>
      </div>
    </div>
  ) : (
    <div
      className="fixed bottom-20 right-4 sm:bottom-4 sm:right-8 w-28 h-40 sm:w-40 sm:h-56 cursor-pointer"
      onClick={() => setShowVideoIntro(true)}
    >
      <div className="w-full h-full rounded-xl overflow-hidden">
        <Image
          src={`https://image.mux.com/${profile?.profileVideoUrl}/animated.gif`}
          alt="Teams"
          className="w-full h-full object-cover object-center rounded-lg"
          width={200}
          height={200}
          layout="fill"
        />
      </div>
      <span className="absolute text-sm top-4 left-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-purple-600 px-2 py-1 text-white transition before:absolute before:left-1/2 before:top-full before:-translate-x-1/2 before:border-4 before:border-transparent before:border-t-purple-600 before:content-['']">
        Hello!
      </span>
      <div className="absolute -top-3 -right-2">
        <button onClick={() => setHideVideoIntro(true)}>
          <IoCloseCircle className="h-7 w-7 text-white" />
        </button>
      </div>
    </div>
  );
};

export default Intro;
