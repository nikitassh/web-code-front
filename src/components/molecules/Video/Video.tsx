import * as React from "react";
import ReactPlayer from "react-player";

import s from "./Video.module.scss";

type VideoProps = {
  url: string | null;
  image: string;
};

export const Video: React.FC<VideoProps> = ({ url, image }) => {
  const [playing, setPlaying] = React.useState(false);

  if (!url) {
    return null;
  }

  return (
    <div className={s.videoContainer}>
      <div className={s.playerWrapper}>
        <ReactPlayer
          url={url}
          playing={playing}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          controls
          light={image}
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
};
