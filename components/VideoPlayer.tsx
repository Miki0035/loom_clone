import { createIframeLink } from "@/lib/utilis";
import React from "react";

const VideoPlayer = ({ videoId }: VideoPlayerProps) => {
  return (
    <div className="video-player">
      <iframe
        src={createIframeLink(videoId)}
        loading="lazy"
        title="Video player"
        style={{ border: 0, zIndex: 50 }}
        allowFullScreen
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
      ></iframe>
    </div>
  );
};

export default VideoPlayer;
