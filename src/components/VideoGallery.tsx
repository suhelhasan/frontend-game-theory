import React from "react";
import { Link } from "react-router-dom";
import { MatchTypes } from "../types";
import styling from "../styling/index.module.scss";

interface Props {
  //   onSelectMatch: (matchId: string) => void;
  matches: MatchTypes[];
}

const VideoGallery: React.FC<Props> = ({ matches }) => {
  // Add thumbnail title and description also short options
  return (
    <div className={styling["videoList"]}>
      {matches.map((match) => (
        // <Link to={`/detail/${match.user}`}>
        <Link
          to={`/detail/${match.user}`}
          key={match.match_id}
          className={styling["Card"]}
        >
          <video
            className={styling["videoThumbnail"]}
            src={`${match.video_url}#t=5`}
          ></video>
          <div className={styling["details"]}>
            <h3 className={styling["name"]}>Name: {match.user}</h3>
            <h3 className={styling["name"]}>Sports: {match.sport}</h3>
            <h3 className={styling["name"]}>
              Shot Accuracy: {match?.statistics?.shot_accuracy}
            </h3>
          </div>
        </Link>
        // {/* </Link> */}
      ))}
    </div>
  );
};

export default VideoGallery;
