import React, { useState } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';

function Lookup() {
  //state variables for search input, reslt and error message
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  //function to  handle search of specific artist
  const handleSearch = async () => {
    try {
      //fetch songs from the server based on the users query 
      const response = await axios.get('http://localhost:4000/api/songs', {
        params: { artist: searchQuery },
      });

      //extracts the data from the response
      const data = response.data;

      //if statement to update state based on search results
      if (data.length === 0) {
        //if no songs found a message will tell the user
        setErrorMessage(`No songs found for ${searchQuery}.`);
        setSearchResults([]);
      } else {
        setSearchResults(data);
        setErrorMessage('');
      }
      //catch an error if the results can not be gained
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  //render the search input an dresults
  return (
    <div>
      <h2>Search for an Artist</h2>
      <div>
        {/*input field to enter artists name*/}
        <input
          type="text"
          placeholder="Enter artist name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {/*button to trigger the search*/}
        <button onClick={handleSearch}>Search</button>
      </div>
      <div>
        {errorMessage ? (
          //display error message if no results found
          <p>{errorMessage}</p>
        ) : (
          <>
            <h3><br></br>Search Results For: {searchQuery}</h3>
            {searchResults.map((song) => (
              <div key={song._id}>
                {/* Card component from React Bootstrap */}
                <Card>
                  {/* Displaying song title in the card header */}
                  <Card.Header>{song.songTitle} by {song.artist}</Card.Header>
                  <Card.Body>
                    <blockquote className="blockquote mb-0">
                      {/* Displaying album cover image */}
                      <img src={song.albumCover} alt="Album Cover" style={{ width: '300px', height: '300px' }} />

                      <footer>
                        {/* Displaying song duration */}
                        Duration: {song.duration}
                      </footer>
                      <footer>
                        {/* Displaying song link */}
                        Youtube: <a href={song.youtubeLink} target="_blank" rel="noopener noreferrer">Watch on YouTube</a>
                      </footer>
                    </blockquote>
                  </Card.Body>
                </Card>
              </div>
            ))}

          </>
        )}
      </div>
    </div>
  );
}

export default Lookup;
