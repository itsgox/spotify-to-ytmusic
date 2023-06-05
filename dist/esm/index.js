var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import YouTubeMusic from 'node-youtube-music';
import SpotifyAPI from 'spotify-web-api-node';
export default function SpotifyToYouTubeMusic(_a) {
    var clientID = _a.clientID, clientSecret = _a.clientSecret, accessToken = _a.accessToken, ytMusicUrl = _a.ytMusicUrl;
    return __awaiter(this, void 0, void 0, function () {
        var spotifyAPI, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    // Check Client ID & Client Secret
                    if (!clientID)
                        throw new Error('You need to provide a Client ID');
                    if (!clientSecret)
                        throw new Error('You need to provide a Client Secret');
                    spotifyAPI = new SpotifyAPI({
                        clientId: clientID,
                        clientSecret: clientSecret,
                    });
                    if (!(!accessToken || accessToken === '')) return [3 /*break*/, 2];
                    _c = (_b = spotifyAPI).setAccessToken;
                    return [4 /*yield*/, spotifyAPI.clientCredentialsGrant()];
                case 1:
                    _c.apply(_b, [(_d.sent()).body.access_token]);
                    return [3 /*break*/, 3];
                case 2:
                    spotifyAPI.setAccessToken(accessToken);
                    _d.label = 3;
                case 3: 
                // Get Function
                return [2 /*return*/, function get(spotifyID) {
                        return __awaiter(this, void 0, void 0, function () {
                            // Replace Title
                            function replaceTitle(title, symbol) {
                                var toCut = title.slice(title.indexOf(" ".concat(symbol)), title.length);
                                if (title.indexOf(" ".concat(symbol)) < 0)
                                    toCut = '';
                                var _title = title.replace(toCut, '');
                                toCut = title.slice(title.indexOf(' - '), title.length);
                                if (title.indexOf(' - ') < 0)
                                    toCut = '';
                                _title = _title.replace(toCut, '');
                                return _title;
                            }
                            var spotifyId, isArray, IDs, tracks, ytList, _loop_1, i;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        spotifyId = spotifyID;
                                        // Check if ID is provided
                                        if (!spotifyId || spotifyId === '')
                                            throw new Error('You need to provide a Spotify Track!');
                                        isArray = true;
                                        if (!Array.isArray(spotifyId)) {
                                            spotifyId = [spotifyId];
                                            isArray = false;
                                        }
                                        IDs = spotifyId
                                            .map(function (track) {
                                            return track
                                                .replace('spotify:track:', '')
                                                .replace('https://open.spotify.com/track/', '')
                                                .replace('https://api.spotify.com/v1/tracks/', '');
                                        })
                                            .map(function (track) {
                                            return track.includes('?si=') ? track.split('?si=')[0] : track;
                                        });
                                        return [4 /*yield*/, spotifyAPI.getTracks(IDs)];
                                    case 1:
                                        tracks = (_a.sent()).body.tracks;
                                        if (tracks[0] === null)
                                            throw new Error('Only Spotify Tracks are supported!');
                                        ytList = [];
                                        _loop_1 = function (i) {
                                            var track, content, explicit;
                                            return __generator(this, function (_b) {
                                                switch (_b.label) {
                                                    case 0:
                                                        track = tracks[i];
                                                        return [4 /*yield*/, YouTubeMusic.searchMusics("".concat(replaceTitle(replaceTitle(track.name, '('), '['), " ").concat(track.artists
                                                                .map(function (artist) { return artist.name; })
                                                                .join(' ')))];
                                                    case 1:
                                                        content = _b.sent();
                                                        // Select Song
                                                        content = content.filter(function (song) {
                                                            return replaceTitle(replaceTitle(song.title, '('), '[') ===
                                                                replaceTitle(replaceTitle(track.name, '('), '[');
                                                        });
                                                        content = content.filter(function (song) { var _a; return ((_a = song.artists) === null || _a === void 0 ? void 0 : _a.length) > 0; });
                                                        content = content.filter(function (song) { return song.artists && song.artists[0].name === track.artists[0].name; });
                                                        explicit = content.filter(function (song) { return song.isExplicit; });
                                                        content = explicit.length > 0 ? explicit : content;
                                                        // Add YouTube URL
                                                        if (content.length < 1)
                                                            ytList.push(null);
                                                        else
                                                            ytList.push("https://".concat(ytMusicUrl ? 'music.' : '', "youtube.com/watch?v=").concat(content[0].youtubeId));
                                                        return [2 /*return*/];
                                                }
                                            });
                                        };
                                        i = 0;
                                        _a.label = 2;
                                    case 2:
                                        if (!(i < tracks.length)) return [3 /*break*/, 5];
                                        return [5 /*yield**/, _loop_1(i)];
                                    case 3:
                                        _a.sent();
                                        _a.label = 4;
                                    case 4:
                                        i++;
                                        return [3 /*break*/, 2];
                                    case 5:
                                        // Return Result(s)
                                        ytList = isArray ? ytList : ytList[0];
                                        return [2 /*return*/, ytList];
                                }
                            });
                        });
                    }];
            }
        });
    });
}
