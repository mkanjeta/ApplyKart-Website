import { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

const VideoPlayer = ({ src }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      const player = videojs(videoRef.current, {
        controls: true,
        autoplay: true,
        muted: true,
        preload: 'auto',
        sources: [{
          src,
          type: 'application/x-mpegURL',
        }],
      });

      return () => {
        if (player) {
          player.dispose();
        }
      };
    }
  }, [src]);

  return (
    <div data-vjs-player>
      <video ref={videoRef} autoPlay height={"350px"} style={{width: "100%"}} className="video-js vjs-default-skin" />
    </div>
  );
};

export default VideoPlayer;