const YoutubeMusic = require('youtube-music-api')

function SpotifyToYoutubeMusic(spotifyAPI) {

    //SPOTIFY API NOT PROVIDED

    if (!spotifyAPI) return console.error('\x1b[33m%s\x1b[0m','\nYou need to provide an instance of "spotify-web-api-node"\n')

    //YOUTUBE MUSIC SETUP

    const ytMusic = new YoutubeMusic()
    let ytMusicStatus = false

    //GET FUNCTION

    return async function get(spotifyURL) {

        //CHECK YOUTUBE MUSIC STATUS

        if (!ytMusicStatus) {
            await ytMusic.initalize()
            ytMusicStatus = true
        }

        //CHECK IF URL IS ARRAY

        if (!Array.isArray(spotifyURL)) {
            spotifyURL = [spotifyURL]
        }

        //GET TRACKS

        const IDs = spotifyURL.map(URL => URL.replace('spotify:track:','').replace('https://open.spotify.com/track/','').replace('https://api.spotify.com/v1/tracks/',''))
        const { tracks } = (await spotifyAPI.getTracks(IDs)).body

        //GET SONG(S)

        let ytList = tracks.map(async (track) => await youtubeURL(track))

        async function youtubeURL() {
            return 'youtube test :)'
        }

        //RETURN

        return ytList
    }
}

//EXPORT

module.exports = SpotifyToYoutubeMusic