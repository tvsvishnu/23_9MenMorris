import React from "react";
import axios from "axios";
import { useState } from "react";
import {Input, Button} from "semantic-ui-react"
import Cookies from 'universal-cookie';
import NAvbar from "./navbar";
import { useNavigate } from "react-router-dom";
function LoginPage(props) {
    const [formData, setFormdata] = useState({})
    const navigate = useNavigate()
    const handleChange = (e) => {
        setFormdata({ ...formData, [e.target.name]: e.target.value });
    }
    function register(e){
        navigate('/register')
    }
    function handleSub(e) {
        e.preventDefault()

        axios.post('http://localhost:3001/login', formData).then((response) => {
            console.log(formData)
            console.log("Success");
            if (response.data.statuss == "logged") {
                var cookies = new Cookies();
                cookies.set('logged_in', true);
                cookies.set('email_id', formData.email, { path: '/', expires: new Date(Date.now() + 86400000) });
                if(cookies.get("email_id") === "admin@gmail.com"){
                        window.location.replace('/admin');
                }
                else{
                        window.location.replace('/created');
                }

            }
            else if (response.data.statuss == "exists") {
                alert("Wrong Password");
            }
            else {
                alert("User Doesnot Exist");

            }
            console.log(response.data.statuss)
        }).catch((e) => {
            console.log(e.response.data);
            
        });
    }

    return (
        <div>
            <h1>SSD Lab 7</h1>

            <hr></hr>
            <NAvbar></NAvbar>
            <h1>Login Page</h1>
            <form onSubmit={handleSub} method="post" >
                <b>Email ID : </b><Input onChange={handleChange} placeholder='Enter Email ID' name="email" /><br></br><br></br>
                <b>Password : </b><Input onChange={handleChange} placeholder='Enter Password' type="password" name="password" />
                <br></br><br></br>
                <button class="button ui primary">Login</button>
            </form><br></br>
            <button class="button ui primary" onClick={register}>New User? Register</button>


        </div>
    );
}
export default LoginPage;