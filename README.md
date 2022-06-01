# Spotify to YouTube Music

Convert songs from **Spotify** to **YouTube Music**!

## Installation

To use this package, you also need to install **[spotify-web-api-node](https://www.npmjs.com/package/spotify-web-api-node)**.

```bash
npm install spotify-to-ytmusic spotify-web-api-node
```

## Usage

Before using **Spotify to YouTube Music**, you need to setup a **Spotify API client**.

```javascript
const SpotifyToYoutubeMusic = require('spotify-to-ytmusic')
const SpotifyWebApi = require('spotify-web-api-node')

// Use your Client ID, Client Secret & Redirect URI

const spotifyApi = new SpotifyWebApi({
    clientId: 'CLIENT_ID',
    clientSecret: 'CLIENT_SECRET',
    redirectUri: 'REDIRECT_URI'
})

// Or use an Access Token

const spotifyApi = new SpotifyWebApi()
spotifyApi.setAccessToken('ACCESS_TOKEN')
```

Now using the **spotifyApi**, we can convert songs from **Spotify** to **YouTube Music**.

```javascript
// Setup spotify-to-ytmusic

let spotifyToYoutubeMusic = SpotifyToYoutubeMusic(spotifyApi)

// Convert Spotify song to YouTube Music

async function convert() {
    let song = await spotifyToYoutubeMusic('4cOdK2wGLETKBW3PvgPWqT')
    console.log(song) // https://www.youtube.com/watch?v=lYBUbBu4W08
}
convert()
```

Other ways to provide a **Spotify Track ID**.

```javascript
await spotifyToYoutubeMusic('4cOdK2wGLETKBW3PvgPWqT')

await spotifyToYoutubeMusic('https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT')

await spotifyToYoutubeMusic('spotify:track:4cOdK2wGLETKBW3PvgPWqT')

await spotifyToYoutubeMusic('https://api.spotify.com/v1/tracks/4cOdK2wGLETKBW3PvgPWqT')
```