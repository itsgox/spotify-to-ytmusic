const YoutubeMusic = require('node-youtube-music')
const SpotifyAPI = require('spotify-web-api-node')

async function SpotifyToYoutubeMusic({ clientID, clientSecret }) {

    // Check Client ID & Client Secret

    if (!clientID || !clientSecret) {
        console.error('\x1b[33m%s\x1b[0m','\nYou need to provide a Client ID & Client Secret\n')
        return null
    }

    // Spotify API Setup

    const spotifyAPI = new SpotifyAPI({
        clientId: clientID,
        clientSecret: clientSecret
    })

    spotifyAPI.setAccessToken((await spotifyAPI.clientCredentialsGrant()).body.access_token)
    
    // Get Function

    return async function get(spotifyID) {

        // Check if ID is provided

        if (!spotifyID || spotifyID === '') {
            console.error('\x1b[33m%s\x1b[0m','\nYou need to provide a Spotify Track!\n')
            return null
        }

        // Check if ID is array
        
        let isArray = true

        if (!Array.isArray(spotifyID)) {
            spotifyID = [spotifyID]
            isArray = false
        }

        // Get Track(s)

        const IDs = spotifyID.map(track => track
            .replace('spotify:track:','')
            .replace('https://open.spotify.com/track/','')
            .replace('https://api.spotify.com/v1/tracks/',''))
        .map(track => track.includes('?si=') ? track.split('?si=')[0] : track)

        const { tracks } = (await spotifyAPI.getTracks(IDs)).body

        if (tracks[0] === null) {
            console.error('\x1b[33m%s\x1b[0m','\nOnly Spotify Tracks are supported!\n')
            return null
        }

        // Get Song(s)

        let ytList = []

        for (let i = 0; i < tracks.length; i++) {

            // Search on YouTube Music

            let track = tracks[i]
            let content = await YoutubeMusic.searchMusics(`${track.artists.map(artist => artist.name).join(' ')} ${track.name}`)
            if (content.length < 1) content = await YoutubeMusic.searchMusics(`${track.artists[0].name} ${track.name}`)
            if (content.length < 1) content = await YoutubeMusic.searchMusics(`${track.name} ${track.artists.map(artist => artist.name).join(' ')}`)
            if (content.length < 1) content = await YoutubeMusic.searchMusics(`${track.name} ${track.artists[0].name}`)

            // Select Song

            content.length < 1 ? ytList.push(null) : ytList.push(`https://www.youtube.com/watch?v=${content[0].youtubeId}`)
        }

        // Return Result(s)

        ytList = isArray ? ytList : ytList[0]
        return ytList
    }
}

module.exports = SpotifyToYoutubeMusic