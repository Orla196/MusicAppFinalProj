import React from 'react';
import SongItem from "./SongItem";

function Songs(props) {
    //map through each song in the list of mySongs
    return props.mySongs.map(
        (song) => {
            //render the SongItem component for each song
            return <SongItem mySong={song} key={song._id} Reload={() => { props.ReloadData(); }}></SongItem>
        }
    );
}

export default Songs;
