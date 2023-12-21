import React, { useState } from "react";
import axios from "axios";

function CreateSong() {
    // State variables for song details
    const [artist, setArtist] = useState('');
    const [songTitle, setSongTitle] = useState('');
    const [albumCover, setAlbumCover] = useState('');
    const [duration, setDuration] = useState('');
    const [youtubeLink, setYoutubeLink] = useState('');

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Log song details to the console
        console.log(
            "Artist: " + artist +
            " Song Title: " + songTitle +
            " Album Cover: " + albumCover +
            " Duration: " + duration +
            " YouTube Link: " + youtubeLink
        );

        // Create a song object
        const song = {
            artist: artist,
            songTitle: songTitle,
            albumCover: albumCover,
            duration: duration,
            youtubeLink: youtubeLink
        };

        // Make a POST request to the server
        axios.post('http://localhost:4000/api/song', song)
            .then(response => {
                // Handle success
                console.log("Song added successfully:", response.data);
                //adds a popup alert telling the user their song was added
                window.alert("Song added successfully");

                // Reload the page after user presses ok on popup
                window.location.reload();
            })
            .catch(error => {
                // Handle error, if needed
                console.error("Error adding song:", error);
            });
    };

    return (
        <div>
            <h2>ADD YOUR FAVOURITE SONGS TO THE VAULT</h2>
            <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto' }}>
                {/* Input field for artist */}
                <div className="form-group">
                    <label>Add Artist: </label>
                    <input
                        type="text"
                        className="form-control"
                        value={artist}
                        onChange={(e) => { setArtist(e.target.value) }}
                    />
                </div>

                {/* Input field for song title */}
                <div className="form-group">
                    <label>Add Song Title: </label>
                    <input
                        type="text"
                        className="form-control"
                        value={songTitle}
                        onChange={(e) => { setSongTitle(e.target.value) }}
                    />
                </div>

                {/* Input field for album cover */}
                <div className="form-group">
                    <label>Add Album Cover: </label>
                    <input
                        type="text"
                        className="form-control"
                        value={albumCover}
                        onChange={(e) => { setAlbumCover(e.target.value) }}
                    />
                </div>

                {/* Input field for song duration */}
                <div className="form-group">
                    <label>Add Song Duration: </label>
                    <input
                        type="text"
                        className="form-control"
                        value={duration}
                        onChange={(e) => { setDuration(e.target.value) }}
                    />
                </div>

                {/* Input field for YouTube link */}
                <div className="form-group">
                    <label>Add YouTube Link: </label>
                    <input
                        type="text"
                        className="form-control"
                        value={youtubeLink}
                        onChange={(e) => { setYoutubeLink(e.target.value) }}
                    />
                </div>

                {/* Submit button */}
                <div>
                    <input type="submit" value="Add Song" />
                </div>
            </form>
        </div>
    );
}
// Export the CreateSong component as the default export
export default CreateSong;
