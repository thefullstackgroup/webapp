import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';

const ProfileVideoPlayer = ({
  src,
  poster,
  controls = true,
  muted = false,
  autoPlay = false,
}) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const actionPlay = () => {
    const video = videoRef.current;
    video.play();
    setIsPlaying(true);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = muted;
    video.controls = controls;
    let hls;

    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // This will run in safari, where HLS is supported natively
      video.src = src;
      video.addEventListener('click', function () {
        video.play();
        setIsPlaying(true);
      });
      video.addEventListener('ended', () => {
        setIsPlaying(false);
      });
    } else if (Hls.isSupported()) {
      // This will run in all other modern browsers
      hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
      video.addEventListener('click', function () {
        video.play();
        setIsPlaying(true);
      });
      video.addEventListener('ended', () => {
        setIsPlaying(false);
      });
    } else {
      console.error(
        'This is an old browser that does not support MSE https://developer.mozilla.org/en-US/docs/Web/API/Media_Source_Extensions_API'
      );
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [src, videoRef]);

  useEffect(() => {
    if (autoPlay) actionPlay();
  });

  return (
    <>
      <video
        ref={videoRef}
        poster={poster}
        className="h-full w-full rounded-lg object-cover"
      />
      {!isPlaying && (
        <button
          className="absolute top-10 bottom-0 left-0 hidden h-32 w-full sm:top-20 sm:block sm:h-48 sm:w-52"
          onClick={() => actionPlay()}
        ></button>
      )}
    </>
  );
};

export default ProfileVideoPlayer;
