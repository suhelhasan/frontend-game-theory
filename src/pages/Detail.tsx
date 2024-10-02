import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import VideoPlayer from "../components/VideoPlayer";
import { MatchTypes } from "../types";
import html2canvas from "html2canvas";
import styling from "../styling/index.module.scss";
import { Link } from "react-router-dom";

const ShareableCardd: React.FC = () => {
  const { user } = useParams();
  const divRef = useRef<HTMLDivElement>(null);
  const [match, setMatch] = useState<MatchTypes | null>(null); // Update to handle single match object
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://web-production-e322.up.railway.app/highlight?user=${user}`
        );
        setMatch(response?.data[0]); // Expecting a single match object
        console.log("response", response?.data[0]);
      } catch (err) {
        setError("Failed to fetch match data");
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [user]);

  // Loading UI
  if (loading) return <div className={styling["initialText"]}>Loading...</div>;

  // Error UI
  if (error) return <div className={styling["initialText"]}>Error :(</div>;

  if (!match)
    return <div className={styling["initialText"]}>No match data found.</div>;

  const handleDownloadImage = async () => {
    if (divRef.current) {
      // Capture the div content as an image using html2canvas
      const canvas = await html2canvas(divRef.current);
      const image = canvas.toDataURL("image/png");

      // Create a link to download the image
      const link = document.createElement("a");
      link.href = image;
      link.download = "div-image.png"; // The image filename
      link.click(); // Programmatically click the link to trigger the download
    }
  };

  // video, key moments, and statistics.
  return (
    <div className={styling["detailsPage"]}>
      <div className={styling["detailsPageInner"]}>
        <Link to='/' key={match.match_id} className={styling["backButton"]}>
          {"<"} Back to homepage
        </Link>
        <VideoPlayer
          videoUrl={match.video_url}
          keyMoments={match.key_moments}
        />
        <div ref={divRef} className={styling["cardDetails"]}>
          <h2 className={styling["heading"]}>
            {match.sport} - {match.match_type}
          </h2>
          <div>
            <p className={styling["details"]}>Match ID: {match.match_id}</p>
            <p className={styling["details"]}>User: {match.user}</p>
            <p className={styling["details"]}>
              Score: {match.statistics?.calories_burned}
            </p>
            <p className={styling["details"]}>
              Shot Accuracy: {match.statistics?.shot_accuracy}
            </p>
          </div>

          <button className={styling["button"]} onClick={handleDownloadImage}>
            Share Match Card
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareableCardd;
