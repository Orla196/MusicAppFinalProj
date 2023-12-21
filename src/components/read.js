import React, { useEffect, useState } from "react";
import axios from "axios";
import Songs from "./Songs";

function Read() {
    //state variable to store the fetched data from the server
    const [data, setData] = useState([]);

    //useEffect to fetch data from the server
    useEffect(() => {
        axios.get('http://localhost:4000/api/songs')
            .then((response) => {
                //set the data in the component's state
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    //function to refresh and update the data when triggered
    const Reload = (e) => {
        axios.get('http://localhost:4000/api/songs')
            .then(
                (response) => {
                    //update the components state with newly fetched data
                    setData(response.data)
                }
            )
            .catch(
                (error) => {
                    console.log(error);
                }
            )
    }
    return (
        <div>
            <h2>HERE'S ALL YOUR FAVOURITE SONGS IN THE VAULT</h2>
            {/*Pass the fetched data and refresh the function as props*/}
            <Songs mySongs={data} ReloadData={Reload}></Songs>
        </div>
    );
}

export default Read;
