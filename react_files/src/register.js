import React from "react";
import axios from "axios";
import 'semantic-ui-css/semantic.min.css';


import { useState } from "react";
import { Input } from "semantic-ui-react";
import {Button} from 'semantic-ui-react'
import NAvbar from "./navbar";
import { useNavigate } from "react-router-dom";
function RegisterPage(props) {
    const [formData, setFormdata] = useState({"email" : ""})
    const handleChange = (e) => {
        if(e.target.name === "email"){
            formData["email"] = e.target.value;
        }
        else{
            setFormdata({ ...formData, [e.target.name]: e.target.value });

        }
    }
    var nav = useNavigate();
    function login(){
        nav('/login')
    }
    function handleSub(e) {
        e.preventDefault()
        if(formData.email === ""){
            alert("Username cannot be empty")
        }
        else if(formData.password === formData.confirm){

        // alert("Enteredd")
        console.log(formData)
        axios.post('http://localhost:3001/register', formData).then((response) => {
            console.log(formData)
            console.log("Success");
            if (response.data.statuss == "already") {
                alert("User Already Exists");
            }
            else {
                alert("Registration Succesful");
                window.location.replace('/login');

            }
            console.log(response.data.statuss)
            // alert(response.hi)
        }).catch((e) => {
            console.log(e.response.data);
            //this console logs Error: Network Error
            // at createError (monkeytype.js:formatted:35086:25)
            // at XMLHttpRequest.handleError (monkeytype.js:formatted:34457:28)
        });

    }
    else{
        alert("Password and Confirm Password Should be Same")
    }
    }

    return (
        <div>
            <h1>SSD Lab 7</h1><hr></hr>      <NAvbar></NAvbar>

            <h1>Registration Page</h1>
            <form onSubmit={handleSub} method="post" >
                <b>Email ID : </b><Input onChange={handleChange} placeholder='Enter Email ID' name="email" /><br></br><br></br>
                <b>Password : </b><Input onChange={handleChange} placeholder='Enter Password' type="password" name="password" /><br></br><br></br>
                <b>Confirm Password : </b><Input onChange={handleChange} placeholder='Enter Password' type="password" name="confirm" />
                <br></br><br></br>
                {/* <Button primary>Click</Button> */}
                <button class="button ui primary button">Submit</button>
            </form>
<br></br>
            <button class="button ui primary" onClick={login}>Already have account? Login</button>

        </div>
    );
}
export default RegisterPage;