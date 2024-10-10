const SpotifyAPI = require('spotify-web-api-node');
const YTMusic = require('ytmusic-api');

async function SpotifyToYouTubeMusic({ clientID, clientSecret, accessToken, ytMusicUrl }) {

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

	// YouTube Music API

	const ytmusic = new YTMusic();
	await ytmusic.initialize();
    
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
			let content = await ytmusic.searchSongs(`${track.name} ${track.artists.map(artist => artist.name).join(' ')}`);
			content = content.filter(song => song?.artist?.name === track.artists[0].name);

			// Add YouTube URL

			content.length === 0 ? ytList.push(null) : ytList.push(`https://${ytMusicUrl ? 'music.' : ''}youtube.com/watch?v=${content[0].videoId}`);
		}

		// Return Result(s)

		ytList = isArray ? ytList : ytList[0];
		return ytList;
	};
}

module.exports = SpotifyToYouTubeMusic;