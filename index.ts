import YouTubeMusic from 'node-youtube-music';
import SpotifyAPI from 'spotify-web-api-node';

export default async function SpotifyToYouTubeMusic({
  clientID,
  clientSecret,
  accessToken,
  ytMusicUrl,
}: {
  clientID: string;
  clientSecret: string;
  accessToken: string;
  ytMusicUrl: string;
}): Promise<(spotifyID: string | string[]) => Promise<string[] | null>> {
  // Check Client ID & Client Secret

  if (!clientID) throw new Error('You need to provide a Client ID');
  if (!clientSecret) throw new Error('You need to provide a Client Secret');

  // Spotify API Setup

  const spotifyAPI = new SpotifyAPI({
    clientId: clientID,
    clientSecret,
  });

  if (!accessToken || accessToken === '')
    spotifyAPI.setAccessToken(
      (await spotifyAPI.clientCredentialsGrant()).body.access_token
    );
  else spotifyAPI.setAccessToken(accessToken);

  // Get Function

  return async function get(spotifyID: string | string[]) {
    let spotifyId = spotifyID;

    // Check if ID is provided

    if (!spotifyId || spotifyId === '')
      throw new Error('You need to provide a Spotify Track!');

    // Check if ID is array

    let isArray = true;

    if (!Array.isArray(spotifyId)) {
      spotifyId = [spotifyId];
      isArray = false;
    }

    // Get Track(s)

    const IDs = spotifyId
      .map((track) =>
        track
          .replace('spotify:track:', '')
          .replace('https://open.spotify.com/track/', '')
          .replace('https://api.spotify.com/v1/tracks/', '')
      )
      .map((track) =>
        track.includes('?si=') ? track.split('?si=')[0] : track
      );

    const { tracks } = (await spotifyAPI.getTracks(IDs)).body;

    if (tracks[0] === null)
      throw new Error('Only Spotify Tracks are supported!');

    // Get Song(s)

    let ytList: null | any[] = [];

    // Replace Title

    function replaceTitle(title: string, symbol: string) {
      let toCut = title.slice(title.indexOf(` ${symbol}`), title.length);
      if (title.indexOf(` ${symbol}`) < 0) toCut = '';
      let _title = title.replace(toCut, '');
      toCut = title.slice(title.indexOf(' - '), title.length);
      if (title.indexOf(' - ') < 0) toCut = '';
      _title = _title.replace(toCut, '');
      return _title;
    }

    for (let i = 0; i < tracks.length; i++) {
      // Search on YouTube Music

      const track = tracks[i];
      // eslint-disable-next-line no-await-in-loop
      let content = await YouTubeMusic.searchMusics(
        `${replaceTitle(replaceTitle(track.name, '('), '[')} ${track.artists
          .map((artist) => artist.name)
          .join(' ')}`
      );

      // Select Song

      content = content.filter(
        (song) =>
          replaceTitle(replaceTitle(song.title as string, '('), '[') ===
          replaceTitle(replaceTitle(track.name, '('), '[')
      );
      content = content.filter((song) => (song.artists?.length as number) > 0);
      content = content.filter(
        (song) => song.artists && song.artists[0].name === track.artists[0].name
      );

      // Filter Explicit

      const explicit = content.filter((song) => song.isExplicit);
      content = explicit.length > 0 ? explicit : content;

      // Add YouTube URL

      if (content.length < 1) ytList.push(null);
      else
        ytList.push(
          `https://${ytMusicUrl ? 'music.' : ''}youtube.com/watch?v=${
            content[0].youtubeId
          }`
        );
    }

    // Return Result(s)

    ytList = isArray ? ytList : ytList[0];
    return ytList;
  };
}
