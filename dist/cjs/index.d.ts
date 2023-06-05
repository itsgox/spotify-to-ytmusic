export default function SpotifyToYouTubeMusic({ clientID, clientSecret, accessToken, ytMusicUrl, }: {
    clientID: string;
    clientSecret: string;
    accessToken: string;
    ytMusicUrl: string;
}): Promise<(spotifyID: string | string[]) => Promise<string[] | null>>;
