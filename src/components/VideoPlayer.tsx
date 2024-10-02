import React, { useState, useRef } from "react";
import ReactPlayer from "react-player";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { KeyMoment } from "../types";
import styling from "../styling/index.module.scss";

interface Props {
  videoUrl: string;
  keyMoments: KeyMoment[];
}

const VideoPlayer: React.FC<Props> = ({ videoUrl, keyMoments }) => {
  console.log("keyMoments", keyMoments);
  const playerRef = useRef<ReactPlayer>(null);
  const [playing, setPlaying] = useState(false);
  const [played, setPlayed] = useState(0); // Progress as a fraction (0 to 1)
  const [duration, setDuration] = useState(0); // Video duration in seconds
  const [currentTime, setCurrentTime] = useState(0); // Current time in seconds
  const [volume, setVolume] = useState(0.8);
  const [currentMoment, setCurrentMoment] = useState<{
    start_time: number;
    end_time: number;
  } | null>(null);

  // Toggle Play/Pause
  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  // Handle progress updates from ReactPlayer
  const handleProgress = (state: { played: number; playedSeconds: number }) => {
    setPlayed(state.played); // Update the slider based on progress
    setCurrentTime(state.playedSeconds); // Update current time in seconds

    // If a key moment is selected, pause the video at the `end_time`
    if (currentMoment && state.playedSeconds >= currentMoment.end_time) {
      setPlaying(false);
    }
  };

  // Handle video duration when it's available
  const handleDuration = (duration: number) => {
    setDuration(duration);
  };

  // Seek to a specific time in the video
  const handleSeek = (newValue: number | number[]) => {
    if (typeof newValue === "number") {
      playerRef.current?.seekTo(newValue, "seconds");
    }
  };

  // Handle key moment click and play the video from `start_time` to `end_time`
  const handleKeyMomentClick = (start_time: number, end_time: number) => {
    setCurrentMoment({ start_time, end_time }); // Set the current key moment
    handleSeek(start_time); // Seek to the `start_time`
    setPlaying(true); // Start playing the video
  };

  // Map key moments for the slider
  const keyMomentMarkers = keyMoments.map((moment) => ({
    label: `${moment.description}`,
    value: moment.start_time, // Use start_time for markers
  }));

  return (
    <div className={styling["videoPlayer"]}>
      {/* ReactPlayer Component */}

      <ReactPlayer
        ref={playerRef}
        url={videoUrl}
        playing={playing}
        volume={volume}
        onProgress={handleProgress}
        onDuration={handleDuration}
        controls={false} // Using custom controls
        width='100%'
        height='360px'
      />

      <button onClick={handlePlayPause} className={styling["playButton"]}>
        {playing ? "Pause" : "Play"}
      </button>
      <Slider
        min={0}
        max={duration}
        value={currentTime}
        onChange={handleSeek} // Seek on slider change
        marks={keyMomentMarkers.reduce(
          (acc, moment) => ({
            ...acc,
            [moment.value]: "Key moment",
          }),
          {}
        )}
        step={1}
        railStyle={{ backgroundColor: "grey", height: 8 }}
        handleStyle={{
          borderColor: "black",
          height: 15,
          width: 15,
          // marginLeft: -10,
          // marginTop: -5,
        }}
        trackStyle={{ height: 8 }}
      />

      {/* Key Moments Buttons for Quick Seek */}

      <div className={styling["keyMoments"]}>
        <h2>Key Moments</h2>
        {keyMoments.map((moment, index) => (
          <button
            key={index}
            onClick={() =>
              handleKeyMomentClick(moment.start_time, moment.end_time)
            } // Play from start_time to end_time
            className={styling["button"]}
          >
            {moment.description} ({moment.start_time} - {moment.end_time} sec)
          </button>
        ))}
      </div>
    </div>
  );
};

export default VideoPlayer;
