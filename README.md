## v1.0.5 Changelog

> The authentication is now handled by **spotify-to-ytmusic**, only using a **Client ID** & **Client Secret**, the previously required **Redirect URI** & **Access Token** is not needed anymore.

## Installation

```bash
npm install spotify-to-ytmusic
```

## Usage

- To use **Spotify to YouTube Music**, first you need to provide your **Spotify Credentials** (**[Client ID & Client Secret](https://www.avermedia.com/us/creator_central_spotify)**), in order to have access to the **Spotify API**.
- You can only provide **Spotify Tracks** *(Playlists / Albums / Podcasts are not supported)*

## Example

```javascript
const SpotifyToYoutubeMusic = require('spotify-to-ytmusic')

async function example() {

    // Set Spotify Credentials

    const spotifyToYoutubeMusic = await SpotifyToYoutubeMusic({
        clientID: "CLIENT_ID",
        clientSecret: "CLIENT_SECRET"
    })

    // Convert a Spotify Track

    let song = await spotifyToYoutubeMusic('4cOdK2wGLETKBW3PvgPWqT')
    console.log(song) // https://www.youtube.com/watch?v=lYBUbBu4W08
}

example()
```

*Other ways to provide a **Spotify Track**:*

```javascript
await spotifyToYoutubeMusic('https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT')

await spotifyToYoutubeMusic('spotify:track:4cOdK2wGLETKBW3PvgPWqT')

await spotifyToYoutubeMusic('https://api.spotify.com/v1/tracks/4cOdK2wGLETKBW3PvgPWqT')

await spotifyToYoutubeMusic(['4cOdK2wGLETKBW3PvgPWqT','06JvOZ39sK8D8SqiqfaxDU'])
```

## Note

This system is not 100% perfect, and sometimes will not get the right song(s) from YouTube Music.