const YouTubeMusic = require('node-youtube-music');
const SpotifyAPI = require('spotify-web-api-node');

async function SpotifyToYouTubeMusic({ clientID, clientSecret, accessToken, ytMusicUrl, explicit }) {

	// Check Client ID / Client Secret

	if (!clientID) throw new Error('You need to provide a Client ID');
	if (!clientSecret) throw new Error('You need to provide a Client Secret');

	// Spotify API

	const spotifyAPI = new SpotifyAPI({
		clientId: clientID,
		clientSecret: clientSecret
	});

	if (!accessToken || accessToken === '') spotifyAPI.setAccessToken((await spotifyAPI.clientCredentialsGrant()).body.access_token);
	else spotifyAPI.setAccessToken(accessToken);
    
	// Get All

	return async function get(spotifyID) {

		// Check ID

		if (!spotifyID || spotifyID === '') throw new Error('You need to provide a Spotify Track!');

		// Check Array
        
		let isArray = true;

		if (!Array.isArray(spotifyID)) {
			spotifyID = [spotifyID];
			isArray = false;
		}

		// Get Track(s)

		const IDs = spotifyID.map(track => track
			.replace('spotify:track:','')
			.replace('https://open.spotify.com/track/','')
			.replace('https://api.spotify.com/v1/tracks/',''))
			.map(track => track.includes('?si=') ? track.split('?si=')[0] : track);

		const { tracks } = (await spotifyAPI.getTracks(IDs)).body;
		if (tracks[0] === null) throw new Error('Only Spotify Tracks are supported!');

		// Get Song(s)

		let ytList = [];

		for (let i = 0; i < tracks.length; i++) {

			// Search on YouTube Music

			let track = tracks[i];
			let content = await YouTubeMusic.searchMusics(`${track.name} ${track.artists.map(artist => artist.name).join(' ')}`);

			// Select Song

			content = content.filter(song => song.artists.length > 0);
			content = content.filter(song => song.artists[0].name === track.artists[0].name);
            
			// Filter Explicit
            
			let explicitList = content.filter(song => song.isExplicit);
			let nonExplicitList = content.filter(song => !song.isExplicit);
			content = explicit && explicitList.length > 0 ? explicitList : explicit === undefined ? content : nonExplicitList;

			// Add YouTube URL

			content.length < 1 ? ytList.push(null) : ytList.push(`https://${ytMusicUrl ? 'music.' : ''}youtube.com/watch?v=${content[0].youtubeId}`);
		}

		// Return Result(s)

		ytList = isArray ? ytList : ytList[0];
		return ytList;
	};
}

module.exports = SpotifyToYouTubeMusic;