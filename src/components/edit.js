import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Edit() {
    //Extracting 'id' from route parameters
    let { id } = useParams();

    //state variables for storing song data
    const [artist, setArtist] = useState('');
    const [songTitle, setSongTitle] = useState('');
    const [albumCover, setAlbumCover] = useState('');
    const [duration, setDuration] = useState('');
    const [youtubeLink, setYoutubeLink] = useState('');

    //Navigation for rediresting after editing
    const navigate = useNavigate();
    //Fetch song details from server 
    useEffect(
        () => {

            axios.get('http://localhost:4000/api/song/' + id)
                .then((response) => {
                    setArtist(response.data.artist);
                    setSongTitle(response.data.songTitle);
                    setAlbumCover(response.data.albumCover);
                    setDuration(response.data.duration);
                    setYoutubeLink(response.data.youtubeLink);
                })
                .catch(
                    (error) => {
                        console.log(error);
                    }
                );
        }, []
    );
    // Handle form submission to edit song details
    const handleSubmit = (e) => {
        e.preventDefault();
         // Create a 'song' object with updated details
        const song = {
            artist: artist,
            songTitle: songTitle,
            albumCover: albumCover,
            duration: duration,
            youtubeLink: youtubeLink
        }
        //send a PUT request to update the song on the server
        axios.put('http://localhost:4000/api/song/' + id, song)
            .then((res) => {
                //redirects to read page after edit is successful
                navigate('/read');
            })
            .catch(
                (error) => {
                    console.log(error)
                });
    }
    //renders the edit form with input fields
    return (
        <div>
            <h2>Edit Your Songs Here!</h2>
            <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto' }}>
                <div className="form-group">
                    {/*edit artist field*/}
                    <label>Edit Artist: </label>
                    <input type="text"
                        className="form-control"
                        value={artist}
                        onChange={(e) => { setArtist(e.target.value) }}
                    />
                </div>
                <div className="form-group">
                    {/*edit song title field*/}
                    <label>Edit Song Title: </label>
                    <input type="text"
                        className="form-control"
                        value={songTitle}
                        onChange={(e) => { setSongTitle(e.target.value) }}
                    />
                </div>
                <div className="form-group">
                    {/*edit album cover field*/}
                    <label>Edit Album Cover: </label>
                    <input type="text"
                        className="form-control"
                        value={albumCover}
                        onChange={(e) => { setAlbumCover(e.target.value) }}
                    />
                </div>
                <div className="form-group">
                    {/*edit song duration field*/}
                    <label>Edit Song Duration: </label>
                    <input type="text"
                        className="form-control"
                        value={duration}
                        onChange={(e) => { setDuration(e.target.value) }}
                    />
                </div>
                <div className="form-group">
                    {/*edit youtube link field*/}
                    <label>Edit YouTube Link: </label>
                    <input type="text"
                        className="form-control"
                        value={youtubeLink}
                        onChange={(e) => { setYoutubeLink(e.target.value) }}
                    />
                </div>
                <div>
                    {/*submits button for the edit form*/}
                    <input type="submit"
                        value="Edit Song">
                    </input>
                </div>
            </form>

        </div>
    );
}