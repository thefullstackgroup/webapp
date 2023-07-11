import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

const VideoPlayer = ({
  src,
  poster,
  controls = true,
  muted = false,
  autoPlay = false,
}) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = muted;
    video.controls = controls;

    let hls;

    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
      video.addEventListener('canplay', function () {});
      video.addEventListener('ended', () => {});
      video.play();
    } else if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
      video.addEventListener('canplay', function () {});
      video.addEventListener('ended', () => {});
      video.play();
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

  return (
    <>
      <video
        ref={videoRef}
        poster={poster}
        className="h-full w-full object-contain"
      />
    </>
  );
};

export default VideoPlayer;
