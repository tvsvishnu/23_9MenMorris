import React from "react";
import axios from "axios";
import moment from 'moment-timezone'
import 'semantic-ui-css/semantic.min.css';


import { useState } from "react";
import { Input } from "semantic-ui-react";
import {Button} from 'semantic-ui-react'
import NAvbar from "./navbar";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
function JoinGame(props) {
    var cookies = new Cookies();
    const [formData, setFormdata] = useState({email : cookies.get("email_id")})
    const handleChange = (e) => {
        setFormdata({ ...formData, [e.target.name]: e.target.value });
    }
    var navigate = useNavigate();
    function handleSub(e) {
        e.preventDefault()
        axios.post('http://localhost:3001/joingame', formData).then((response) => {
            console.log(formData)
            // console.log("Success");
            console.log(response.data.data)


            if(response.data.data === "joined"){
                alert("Joined Game Succesfully");
                cookies.set("curr_game_id", formData.game_id)
                navigate('/created')
                
            }
            else if(response.data.data === "same_user_joining"){
                alert("Both players can't be same");
                // cookies.set("curr_game_id", formData.game_id)
                navigate('/created')
                
            }
            else if(response.data.data === "game_not_found"){
                alert("Game not Found");
                navigate('/created')

            }
            else if(response.data.data === "already_joined"){
                alert("Another User joined already");
                navigate('/created')
            }
            // console.log(response.data.statuss)
        }).catch((e) => {
            console.log(e)
            // console.log(e.response.data);
           
        });
    }

    return (
        <div>
            <h1>SSD Project - 9 Men Morris Game</h1><NAvbar></NAvbar><hr></hr>
            <h1>Join Game</h1>
            <form onSubmit={handleSub} method="post" >
                <b>Game ID to Join : </b><Input type="number" name="game_id" onChange={handleChange}></Input><br></br><br></br>
                <button class="button ui primary button">Submit</button>
            </form>


        </div>
    );
}
export default JoinGame;