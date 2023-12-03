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
function CreateGame(props) {
    var cookies = new Cookies();
    const [formData, setFormdata] = useState({email : cookies.get("email_id")})
    const handleChange = (e) => {
        setFormdata({ ...formData, [e.target.name]: e.target.value });
    }
    var navigate = useNavigate();
    function handleSub(e) {
        e.preventDefault()
        axios.post('http://localhost:3001/creategame', {"email" : cookies.get("email_id")}).then((response) => {
            console.log(formData)
            console.log("Success");
            if(response.data.statuss === "success"){
                alert("New Game Created Succesfully");
                navigate('/created')
                
            }
            else{
                alert("Game Creation Unsuccesful");
                navigate('/login')

            }
            console.log(response.data.statuss)
        }).catch((e) => {
            console.log(e.response.data);
           
        });
    }

    return (
        <div>
            <h1>SSD Project - 9 Men Morris Game</h1><NAvbar></NAvbar><hr></hr>
            <h1>Create Game</h1>
            <form onSubmit={handleSub} method="post" >
                
                <button class="button ui primary button">Submit</button>
            </form>


        </div>
    );
}
export default CreateGame;