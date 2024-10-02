import React, { useState, useEffect } from "react";
import VideoGallery from "../components/VideoGallery";
import { MatchTypes } from "../types";
import axios from "axios";
import styling from "../styling/index.module.scss";

const Home: React.FC = () => {
  const [matches, setMatches] = useState<MatchTypes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get(
          "https://web-production-e322.up.railway.app/highlight"
        );
        console.log("response", response.data);
        setMatches(response.data);
      } catch (err) {
        setError("Failed to fetch matches");
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
  }, []);

  // Loading UI
  if (loading) return <div className={styling["initialText"]}>Loading...</div>;

  // Error UI
  if (error) return <div className={styling["initialText"]}>Error :(</div>;

  return (
    <div className={styling["HomePage"]}>
      <div className={styling["textBox"]}>
        <h1 className={styling["heading"]}>Video Highlight Viewer</h1>
        <p className={styling["subHeading"]}>
          (please click on the card to see more info)
        </p>
      </div>
      <VideoGallery matches={matches} />
    </div>
  );
};

export default Home;
