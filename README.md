# Spotify to YouTube Music

Convert songs from **Spotify** to **YouTube Music**!

## Features

- Super **easy-to-use**
- Access/refresh token **not required**
- Convert **multiple songs**
- **99% accuracy**
- Perfect for **Discord Bots**

## Installation

```bash
npm install spotify-to-ytmusic
```

## Usage

- To use **spotify-to-ytmusic**, first you need to provide your **[Spotify Credentials](https://www.avermedia.com/us/creator_central_spotify)**, in order to have access to the **Spotify API**.
- You can only provide **Tracks** // **Playlists**, **Albums** and **Podcasts** are **`NOT`** supported!

## Example

```javascript
const SpotifyToYoutubeMusic = require('spotify-to-ytmusic')

async function example() {

    // Set Spotify Credentials

    const spotifyToYoutubeMusic = await SpotifyToYoutubeMusic({
        clientID: "CLIENT_ID",
        clientSecret: "CLIENT_SECRET",
        accessToken: "ACCESS_TOKEN" // Optional
    })

    // Convert a Spotify Track

    let song = await spotifyToYoutubeMusic('4cOdK2wGLETKBW3PvgPWqT')
    console.log(song) // https://www.youtube.com/watch?v=lYBUbBu4W08
}

example()
```

### *Other ways to provide a Spotify Track*

```javascript
await spotifyToYoutubeMusic('https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT')

await spotifyToYoutubeMusic('spotify:track:4cOdK2wGLETKBW3PvgPWqT')

await spotifyToYoutubeMusic('https://api.spotify.com/v1/tracks/4cOdK2wGLETKBW3PvgPWqT')

await spotifyToYoutubeMusic(['4cOdK2wGLETKBW3PvgPWqT','06JvOZ39sK8D8SqiqfaxDU'])
```