import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import axios from "axios";

// Functional component for rendering a song item
function SongItem(props) {

    return (
        <div>
            {/* Card component from React Bootstrap */}
            <Card>
                {/* Displaying song title in the card header */}
                <Card.Header><strong>{props.mySong.songTitle}</strong> by <strong>{props.mySong.artist}</strong></Card.Header>
                <Card.Body>
                    <blockquote className="blockquote mb-0">
                        {/* Displaying album cover image */}
                        <img src={props.mySong.albumCover} alt="Album Cover" style={{ width: '300px', height: '300px' }} />

                        <footer>
                            {/* Displaying song duration */}
                            Duration: {props.mySong.duration}
                        </footer>
                        <footer>
                            {/* Displaying song link */}
                            Youtube: <a href={props.mySong.youtubeLink} target="_blank" rel="noopener noreferrer">Watch on YouTube</a>
                        </footer>
                    </blockquote>
                </Card.Body><div style={{ textAlign: 'center' }}>
                    {/* Link to navigate to the Edit page with the song's ID */}
                    <Link to={'/edit/' + props.mySong._id} className='btn btn-outline-primary' style={{ width: '80px', height: '30px' }}>EDIT</Link>
                    {/* Button to delete the song */}</div>
                <div style={{ textAlign: 'center' }}><Button onClick={(e) => {
                    e.preventDefault();
                    axios.delete('http://localhost:4000/api/song/' + props.mySong._id)
                        .then((res) => {
                            let reload = props.Reload();
                        })
                        .catch();
                }} variant="btn btn-outline-danger" style={{ width: '80px', height: '30px' }}>DELETE</Button></div>
            </Card>
        </div>
    );

}

// Exporting the SongItem component
export default SongItem;
