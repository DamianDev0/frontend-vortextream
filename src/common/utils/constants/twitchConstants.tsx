export const clientId = import.meta.env.VITE_TWITCH_CLIENT_ID;
export const accessToken = import.meta.env.VITE_TWITCH_ACCESS_TOKEN;

export const streamsUrl = "https://api.twitch.tv/helix/streams?first=5&sort=viewer_count"; // Stream más vistos en vivo, solo primeros 5
export const usersUrl = "https://api.twitch.tv/helix/users";
