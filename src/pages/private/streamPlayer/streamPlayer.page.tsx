import { useLocation } from "react-router-dom";
import HeaderComponent from "../../../common/components/header/header.component";
import "./style.css";
import { useEffect, useState } from "react";
import { Streamer } from "../../../common/interfaces/streamer.interface";
import CardStreamersLiveComponent from "./components/cardStreamerlive.component";
import CardStreamerComponent from "../../../common/components/cardStreamer/cardStreamer.component";

export default function StreamPage() {
  const location = useLocation();
  const { user_name, game_name, title, viewer_count, profile_image_url } = location.state || {};

  const [streamerData, setStreamerData] = useState<Streamer[]>([]);
  const [imgProfileStreamer, setImgProfileStreamer] = useState<string | undefined>(profile_image_url);
  const [error,] = useState<string | null>(null);

  const clientId = import.meta.env.VITE_TWITCH_CLIENT_ID;
  const accessToken = import.meta.env.VITE_TWITCH_ACCESS_TOKEN;

  if (!clientId || !accessToken) {
    throw new Error("Client ID or Access Token is missing");
  }

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchDataStreamer = async () => {
      try {
        const streamsResponse = await fetch(
          `${import.meta.env.VITE_TWITCH_USERS_URL}?login=${user_name}`,
          {
            headers: {
              "Client-ID": clientId,
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!streamsResponse.ok) throw new Error(streamsResponse.statusText);

        const userData = await streamsResponse.json();
        const userProfile = userData.data[0];
        setImgProfileStreamer(userProfile.profile_image_url);

        const gamesResponse = await fetch(
          `https://api.twitch.tv/helix/games?name=${game_name}`,
          {
            headers: {
              "Client-ID": clientId,
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!gamesResponse.ok) throw new Error(gamesResponse.statusText);

        const gamesData = await gamesResponse.json();
        const gameId = gamesData.data[0]?.id;

        const matchContentData = await fetch(
          `${import.meta.env.VITE_TWITCH_STREAMS_URL}&game_id=${gameId}`,
          {
            headers: {
              "Client-ID": clientId,
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!matchContentData.ok) throw new Error(matchContentData.statusText);

        const matchContentDataToJson = await matchContentData.json();
        const filteredStreamers = matchContentDataToJson.data.filter(
          (streamer: any) => streamer.user_name !== user_name
        );
        setStreamerData(filteredStreamers);
      } catch (err) {
        // setError(err.message);
      }
    };

    fetchDataStreamer();
  }, [user_name]);

  return (
    <div className="container-streamerViewer-page">
      <HeaderComponent />
      <div className="stream-container">
        <div className="container-streamer-live">
          <iframe
            className="iframe-streamTwitch"
            src={`https://player.twitch.tv/?channel=${user_name}&parent=https://vortextream.netlify.app`}
            height="720"
            width="1280"
            allowFullScreen
          ></iframe>
        </div>
        <div className="container-info-streamer-live">
          {error && <p className="error-message">{error}</p>}
          <div className="container-card-streamer">
            <CardStreamersLiveComponent
              user_name={user_name}
              title={title}
              game_name={game_name}
              viewer_count={viewer_count}
              profile_image_url={imgProfileStreamer || "Not updated yet"}
            />
          </div>
          <h2 className="similar-content-title">Similar Content</h2>
          <div className="match-content-WatchStream">
            {streamerData.map((streamer) => (
              <CardStreamerComponent
                key={streamer.id}
                thumbnail_url={streamer.thumbnail_url}
                title={streamer.title}
                game_name={streamer.game_name}
                viewer_count={streamer.viewer_count}
                id={streamer.id}
                user_name={streamer.user_name}
                profile_image_url={streamer.profile_image_url}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
