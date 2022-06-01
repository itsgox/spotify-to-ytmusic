const YoutubeMusic = require('youtube-music-api')

function SpotifyToYoutubeMusic(spotifyAPI) {

    //SPOTIFY API NOT PROVIDED

    if (!spotifyAPI) return console.error('\x1b[33m%s\x1b[0m','\nYou need to provide an instance of "spotify-web-api-node"\n')

    //YOUTUBE MUSIC SETUP

    const ytMusic = new YoutubeMusic()
    let ytMusicStatus = false

    //GET FUNCTION

    return async function get(spotifyTrack) {

        //CHECK YOUTUBE MUSIC STATUS

        if (!ytMusicStatus) {
            await ytMusic.initalize()
            ytMusicStatus = true
        }

        //CHECK IF URL IS ARRAY
        
        let isArray = true

        if (!Array.isArray(spotifyTrack)) {
            spotifyTrack = [spotifyTrack]
            isArray = false
        }

        //GET TRACKS

        const IDs = spotifyTrack.map(track => track
            .replace('spotify:track:','')
            .replace('https://open.spotify.com/track/','')
            .replace('https://api.spotify.com/v1/tracks/',''))
        .map(track => track.includes('?si=') ? track.split('?si=')[0] : track)

        const { tracks } = (await spotifyAPI.getTracks(IDs)).body

        //GET SONG(S)

        let ytList = []

        for (let i = 0; i < tracks.length; i++) {

            //SEARCH ON YOUTUBE MUSIC

            let track = tracks[i]
            let content = (await ytMusic.search(`${track.artists.map(artist => artist.name).join(' ')} ${track.name}`)).content
            if (content.length < 1) content = (await ytMusic.search(`${track.artists[0].name} ${track.name}`)).content
            if (content.length < 1) content = (await ytMusic.search(`${track.name} ${track.artists.map(artist => artist.name).join(' ')}`)).content
            if (content.length < 1) content = (await ytMusic.search(`${track.name} ${track.artists[0].name}`)).content

            //SELECT SONG

            content = content.filter(result => result.type === 'song')
            content.length < 1 ? ytList.push(null) : ytList.push(`https://www.youtube.com/watch?v=${content[0].videoId}`)
        }

        //RETURN

        ytList = isArray ? ytList : ytList[0]
        return ytList
    }
}

//EXPORT

module.exports = SpotifyToYoutubeMusic