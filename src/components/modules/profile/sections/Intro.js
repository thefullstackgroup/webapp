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
      <div className="fixed bottom-20 right-4 h-96 w-56 sm:bottom-4 sm:right-8">
        <div
          className="h-full w-full cursor-pointer overflow-hidden rounded-xl border-2 border-purple-700 bg-black shadow-xl shadow-purple-700/30"
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
      className="fixed bottom-20 right-4 h-40 w-28 cursor-pointer sm:bottom-4 sm:right-8 sm:h-56 sm:w-40"
      onClick={() => setShowVideoIntro(true)}
    >
      <div className="h-full w-full overflow-hidden rounded-xl">
        <Image
          src={`https://image.mux.com/${profile?.profileVideoUrl}/animated.gif`}
          alt="Teams"
          className="h-full w-full rounded-lg object-cover object-center"
          width={200}
          height={200}
          layout="fill"
        />
      </div>
      <span className="absolute top-4 left-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-purple-600 px-2 py-1 text-sm text-white transition before:absolute before:left-1/2 before:top-full before:-translate-x-1/2 before:border-4 before:border-transparent before:border-t-purple-600 before:content-['']">
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
