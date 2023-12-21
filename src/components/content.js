import React from 'react';
import musicNoteImage from '../images/music.png';

//defines a function called Content
function Content() {
    return (
        //Main container div to hold the content of homepage
        <div>
            {/*Heading on the main page with subtitle*/}
            <h1>Welcome to our Music App!</h1>
            <p>LOG ALL YOUR FAVOURITE MUSIC HERE</p>
            {/* Container for the image and description */}
            <div style={{ textAlign: 'center' }}>
                <img src={musicNoteImage} alt="Music Note" style={{ width: '400px', height: '400px' }} />
                {/* Description of the Music App */}
                <p><br></br>A place where you can strore all your favourite music</p>
            </div>
        </div>
    );
}
// Export the Content component as the default export
export default Content;
